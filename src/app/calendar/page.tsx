'use client';
import ttime, { YMDDate } from '@tubular/time';
import GetTimeCC from './../clock/tpsecond';

import { useState, ChangeEvent } from 'react';
import { earthMonths, marsMonths } from './data/monthsData';
import { earthDays, marsDays } from './data/weekdaysData';
import YearDropdown from './components/yearDropdown';
import { earthYears } from './data/earthYears';
import { marsYears } from './data/marsYears';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {
    marsStandardDate,
    marsConvertYear,
    marsConvertMonth,
    marsCalendar,
    marsYMDtoDays
} from '../clocks/marsTime/calculating';

import { Tag, Tooltip } from 'antd';
import EventModal from './components/eventModal';

export type CalendarEvent = {
    day: number,
    month: number,
    year: number,
    name: string
}

// discuss the fact that the Gregorian calendar

export default function Calendar() {
    const [eventArray, setEventArray] = useState<CalendarEvent[]>([])

    const [getPlanetState, setPlanetState] = useState('Earth');
    const currentMarsSol = marsStandardDate(GetTimeCC().epochMillis);
    

   
        function changePage(event: ChangeEvent<HTMLSelectElement>) {
            // current_page = formData.keys().;
            setPlanetState(event.target.value);
            if (getPlanetState.localeCompare("Earth")) {
                setSelectedYear(earthYears[Number(ttime().toLocale('en-us').format('YYYY')) - 1000])
                setCalMonth(Number(ttime().toLocale('en-us').format('M')))
            }
            if (getPlanetState.localeCompare("Mars")) {
                setSelectedYear(marsYears[marsConvertYear(currentMarsSol)[0]])
                setCalMonth(marsConvertMonth(currentMarsSol)[0])
            }
            
        }


    const [calMonth, setCalMonth] = useState(
        Number(ttime().toLocale('en-us').format('M'))
    );
    const [selectYear, setSelectedYear] = useState(
        earthYears[Number(ttime().toLocale('en-us').format('YYYY')) - 1000]
    );

    var calMonthDiff = 0

    // guys we'll have to write our own custom mars calendar generation code...
    // var tupleDates = Object.entries(
    //     ttime(selectYear.year + '-' + calMonth, null, 'en-us')
    //         .getCalendarMonth()
    //         .map((date) => date)
    // );
    var tupleDates = 
            (getPlanetState == "Earth") ? Object.entries(
                ttime(selectYear.year + '-' + calMonth, null, 'en-us')
                 .getCalendarMonth()
                 .map((date) => date)) : 
            (getPlanetState == "Mars") ? Object.entries(marsCalendar(marsYMDtoDays( Number(selectYear.year),calMonth, marsConvertMonth(currentMarsSol)[1]))) : [1337]

    const tooltipConvertToMarsTime = (date: YMDDate) => {
        if (Number(selectYear.year) > 1873) {
            const solsMonth = marsConvertMonth(marsStandardDate(ttime(date.year+"-"+date.month+"-"+date.day, undefined, 'en-us').epochMillis))
            return `${marsMonths[solsMonth[0]]} ${solsMonth[1]}`
            // return "temp"
        }
        return "Data Not Available"
    }
    function ifEventOrNull(day: number, month: number, year: number){
        const event = eventArray.find((event) => {if(event.day === day && event.month === month && event.year === year){return true} return false})

        if(event){
            return <Tag color="gold">{event.name}</Tag>
        } else {
            return null
        }
    }

    var weekdaysData = 
        (getPlanetState == "Earth") ? earthDays :
        (getPlanetState == "Mars") ? marsDays : 
        ["not"]
        function clickMonthAdd() {
            if (getPlanetState == "Earth") {
                setCalMonth(calMonth + 1);
                if (calMonth == 12) {
                    setCalMonth(1);
                    setSelectedYear(earthYears[Number(selectYear.year) + 1 - 1000]);
                }
            }
            if (getPlanetState == "Mars") {
                calMonthDiff += 1;
                setCalMonth(calMonth + 1);
                
                if (calMonth == 16) {
                    setCalMonth(1);
                    setSelectedYear(marsYears[Number(selectYear.year) + 1]);
                    
                }
                console.log(tupleDates)
            }
    
        }
    
        function clickMonthSub() {
            if (getPlanetState == "Earth") {
                setCalMonth(calMonth - 1);
                if (calMonth == 1) {
                    setCalMonth(12);
                    setSelectedYear(earthYears[Number(selectYear.year) - 1 - 1000]);
                }
            }
            if (getPlanetState == "Mars") {
                calMonthDiff -= 1;
                setCalMonth(calMonth - 1);
                
                if (calMonth == 1) {
                    setCalMonth(16);
                    setSelectedYear(marsYears[Number(selectYear.year) - 1]);
                    
                }
                console.log(tupleDates)
            }
    
        }
    // TODO: Check all pages and make sure we have at maximum two instances where we use the h1 element
    return (
        <div>
            <div className="font-CommeReg mx-6">
                <h1 className="">Current Planet:</h1>
                <select onChange={changePage}>
                    <option value="Earth">Earth</option>
                    <option value="Mars">Mars</option>
                </select>
            </div>
            <div className="flex flex-grow w-full justify-between place-content-stretch relative">
                <div className="flex min-w-80">
                    <h2
                        className="my-6 ml-8 text-lm-p-text dark:text-dm-p-text 
                        text-4xl font-CommeReg z-10"
                    >
                        {getPlanetState} -&nbsp;{' '}
                    </h2>
                    <YearDropdown
                        selected={selectYear}
                        setSelected={setSelectedYear}
                        planetState={{getPlanetState}}
                />
                </div>
                {/* TODO: probably change these < and > into icons i think theres a resource called "react icons" */}

                <div className="flex">
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
                        {getPlanetState == 'Earth'
                            ? earthMonths[calMonth - 1]
                            : getPlanetState == 'Mars'
                            ? marsMonths[calMonth - 1]
                            : 'Null'}
                    </h2>
                    <button
                        onClick={clickMonthAdd}
                        className="h-14 self-center rounded-xl text-lm-p-text dark:text-dm-p-text text-4xl font-CommeReg"
                    >
                        <ChevronRightIcon className="size-5 fill-black/60 dark:fill-white/60" />
                    </button>

                    {/*<Button className="self-center ml-40" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Add Event</Button>*/}
                    {/*<EventModal></EventModal>*/}
                </div>
    
                <span>{getPlanetState == "Earth" ? <EventModal updateEvents={(event: CalendarEvent) => {setEventArray((prev) => {console.log([event, ...prev]); return [event, ...prev]})}}></EventModal>: ''}</span>
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
                {weekdaysData.map(({ id, weekday }) => (
                    <div
                        key={id}
                        className="bg-lm-grey py-1 dark:bg-dm-grey border-b border-r border-white/[.75] dark:border-black/[.75]"
                    >
                        <p className="text-black dark:text-white font-Lato flex justify-center">
                            {weekday}
                        </p>
                    </div>
                ))}

                {tupleDates.map(([id, date]) => (
                    <div
                        key={id}
                        id={id}
                        className={
                            (getPlanetState == 'Earth' && date.m == calMonth
                                ? 'text-black dark:text-[#ffffff]'
                                : getPlanetState == 'Mars' &&
                                  date[1].y == selectYear.year &&
                                  date[1].m == calMonth
                                ? 'text-black dark:text-[#ffffff]'
                                : 'text-[#7a7a7a]') +
                            ' border-b border-r bg-lm-grey border-white/[.75] dark:border-black/[.75] dark:bg-dm-grey min-h-[8rem]'
                        }
                    >
                        <div
                            className={
                                (getPlanetState == 'Earth' &&
                                ttime()
                                    .toLocale('us-en')
                                    .format('D M YYYY')
                                    .localeCompare(
                                        date.d.toString() +
                                            ' ' +
                                            calMonth.toString() +
                                            ' ' +
                                            selectYear.year.toString()
                                    ) == 0
                                    ? ' bg-dm-yellow rounded-md ml-2 my-1 mx-1 py-0.5 px-0.5 font-Lato text-sm'
                                    : getPlanetState == 'Mars' &&
                                      date[1].y == marsConvertYear(currentMarsSol)[0] &&
                                      date[1].m == marsConvertMonth(currentMarsSol)[0] &&
                                      date[1].d ==
                                          marsConvertMonth(
                                              currentMarsSol
                                          )[1]
                                    ? ' bg-dm-yellow rounded-md ml-2 my-1 mx-1 py-0.5 px-0.5 font-Lato text-sm '
                                    : '') +
                                'ml-2 my-1 py-0.5 px-0.5 grid place-content-center transition-all cursor-pointer max-w-6 max-h-6 font-Lato text-sm hover:bg-white hover:text-black rounded-md'
                            }
                        >
                            
                            <Tooltip title={tooltipConvertToMarsTime(date)}>
                                <span>
                                    {getPlanetState == 'Earth'
                                        ? date.d
                                        : getPlanetState == 'Mars'
                                        ? date[1].d
                                        : '1337'}
                                </span>
                            </Tooltip>

                            
                            {/* need to center double digits */}
                        </div>
                        
                        <div style={{paddingLeft: "10px"}}>
                            {getPlanetState == "Earth" ? ifEventOrNull(date.d, date.m-1, date.y) : ''}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
