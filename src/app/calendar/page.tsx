'use client';
import ttime, { YMDDate } from '@tubular/time';
import GetTimeCC from './../clock/tpsecond';

import { useState, ChangeEvent } from 'react';
import { earthMonths } from './data/earthMonths';
import { earthDaysTrunc } from './data/earthDaysTrunc';
import YearDropdown from './components/yearDropdown';
import { earthYears } from './data/earthYears';
import { marsYears } from './data/marsYears';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {
    marsConvertYear,
    marsConvertQuarter,
    marsConvertMonth
} from '../clocks/marsTime/calculating';

import { Tooltip } from '@geist-ui/core';
import { Darian_Date } from 'darian-system';

// discuss the fact that the Gregorian calendar

export default function Calendar() {
    const [getPlanetState, setPlanetState] = useState('Earth');
    var getTimeCC = GetTimeCC();
    var MarsTime = [
            marsConvertYear(getTimeCC.epochMillis)[0],
        ];
   
        function changePage(event: ChangeEvent<HTMLSelectElement>) {
            // current_page = formData.keys().;
            setPlanetState(event.target.value);
            if (getPlanetState.localeCompare("Earth")) {
                setSelectedYear(earthYears[Number(ttime().toLocale('en-us').format('YYYY')) - 1000])
            }
            if (getPlanetState.localeCompare("Mars")) {
                setSelectedYear(marsYears[MarsTime[0]])
            }
            
        }


    const [calMonth, setCalMonth] = useState(
        Number(ttime().toLocale('en-us').format('M'))
    );
    const [selectYear, setSelectedYear] = useState(
        earthYears[Number(ttime().toLocale('en-us').format('YYYY')) - 1000]
    );

    function clickMonthAdd() {
        setCalMonth(calMonth + 1);
        if (calMonth == 12) {
            setCalMonth(1);
            setSelectedYear(earthYears[Number(selectYear.year) + 1 - 1000]);
        }
    }

    function clickMonthSub() {
        setCalMonth(calMonth - 1);
        if (calMonth == 1) {
            setCalMonth(12);
            setSelectedYear(earthYears[Number(selectYear.year) - 1 - 1000]);
        }
    }

    // guys we'll have to write our own custom mars calendar generation code...
    var tupleDates = Object.entries(
        ttime(selectYear.year + '-' + calMonth, null, 'en-us')
            .getCalendarMonth()
            .map((date) => date)
    );
    
    const convertToMarsTime = (date: YMDDate) => {
        const marsTime = new Darian_Date(date.year, date.month, date.day, 1, 1, 1)

        return `${marsTime.mDay} ${marsTime.mMonthName}`
    }

    // TODO: Check all pages and make sure we have at maximum two instances where we use the h1 element
    return (
        
        <div>
            <div>
                <h1>Current Planet:</h1>
                <select onChange={changePage}>
                        <option>Earth</option>
                        <option>Mars</option>
                </select>
            </div>
            <div className="flex flex-grow relative">
                <h2
                    className="my-6 ml-8 text-lm-p-text dark:text-dm-p-text 
                    text-4xl font-CommeReg z-10"
                >
                    {getPlanetState} -&nbsp;{' '}
                </h2>
                <YearDropdown
                    selected={selectYear}
                    setSelected={setSelectedYear}
                />
                <div className="flex w-full justify-center self-end absolute space-x-1">
                    {/* TODO: probably change these < and > into icons i think theres a resource called "react icons" */}


                    <button
                        onClick={clickMonthSub}
                        className="h-14 self-center rounded-xl text-lm-p-text 
                        dark:text-dm-p-text text-4xl font-CommeReg"
                    >
                        <ChevronLeftIcon className="size-5 fill-black/60 dark:fill-white/60" />
                    </button>
                    <h2
                        className="min-w-40 my-6 text-lm-p-text dark:text-dm-p-text 
                        text-2xl font-CommeReg text-center"
                    >
                        {earthMonths[calMonth - 1]}
                    </h2>
                    <button
                        onClick={clickMonthAdd}
                        className="h-14 self-center rounded-xl text-lm-p-text dark:text-dm-p-text text-4xl font-CommeReg"
                    >
                        <ChevronRightIcon className="size-5 fill-black/60 dark:fill-white/60" />
                    </button>
                </div>
            </div>
            {/* https://preline.co/docs/custom-scrollbar.html */}
            <div
                className="grid grid-cols-7 px-8 pb-8 overflow-y-scroll max-h-[45rem] [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
            >
                {earthDaysTrunc.map(({id, weekday}) => (
                    
                    <div key={id} className='bg-lm-grey py-1 dark:bg-dm-grey border-b border-r border-white/[.75] dark:border-black/[.75]'> 
                        <p className='text-black dark:text-white font-Lato flex justify-center'>{weekday}</p> 
                    </div>))}
                
                {tupleDates.map(([id, date]) => (
                    <div

                        key={id} id={id}
                        className={
                            (date.m == calMonth ? 'text-black dark:text-[#ffffff]' : 'text-[#7a7a7a]') +
                            ' border-b border-r bg-lm-grey border-white/[.75] dark:border-black/[.75] dark:bg-dm-grey min-h-[8rem]'
                        }
                    >
                    <div className={((
                            
                            (ttime().toLocale('us-en').format("D M YYYY"))
                            .localeCompare
                            ((date.d).toString() + " " + (calMonth.toString()) + " " + (selectYear.year.toString()))
                            ) == 0 ? 
                            ' bg-dm-yellow rounded-md ml-2 my-1 py-0.5 px-0.5 font-Lato text-sm' : '') + 
                            "ml-2 my-1 py-0.5 px-0.5 grid place-content-center transition-all cursor-pointer max-w-6 max-h-6 font-Lato text-sm hover:bg-white hover:text-black rounded-md"}>
                            <Tooltip text={"243"}>
                                    <span>{date.d}</span>
                            </Tooltip>
                            {/* need to center double digits */}
                        </div>
                        
                        
                    </div>
                ))}
            </div>
        </div>
    );
}
