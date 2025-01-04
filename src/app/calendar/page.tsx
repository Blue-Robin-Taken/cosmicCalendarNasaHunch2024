"use client"
import ttime from "@tubular/time";
import { useState } from 'react';
import { earthMonths } from "./earthMonths";

    // discuss the fact that the Gregorian calendar 

export default function Calendar() {
    const typeCalendar = 'Earth';
    const [calMonth, setCalMonth] = useState(Number(ttime().toLocale('es').format('M')));
    const initYear = Number(ttime().toLocale('es').format('YYYY'));

    function clickMonthAdd() {
        setCalMonth(calMonth + 1);
        if (calMonth == 12) {
            setCalMonth(1);
        }
    }

    function clickMonthSub() {
        setCalMonth(calMonth - 1);
        if (calMonth == 1) {
            setCalMonth(12);
        }
    }

    // guys we'll have to write our own custom mars calendar generation code...
    const tupleDates = Object.entries(ttime(('2025-'+calMonth), null, 'en-us').getCalendarMonth().map(date => date.m === ttime.JANUARY ? date.d : date.d));

    console.log(calMonth);

    

    // TODO: Check all pages and make sure we have at maximum two instances where we use the h1 element
    return(
        <div>
            <div className="flex flex-grow relative">

                <h2 className="my-6 mx-8 text-lm-p-text dark:text-dm-p-text 
                    text-4xl font-CommeReg z-10">{typeCalendar} - {initYear}</h2>
                <div className="flex w-full justify-center self-end absolute space-x-4">
                    
                    {/* TODO: probably change these < and > into icons i think theres a resource called "react icons" */}
                    {/* !!TODO!!: i also need help with making the <> icons not move when the middle month name changes
                        bc the positions of the <> icons are dependent on the middle month name size.
                        (we could maybe do something by rendering both buttons within the <h2> using <span>) */}

                    <button onClick={clickMonthSub} className="p-2 h-14 self-center rounded-xl text-lm-p-text dark:text-dm-p-text text-4xl font-CommeReg">
                        &lt;
                    </button>
                    <h2 className=" my-6 text-lm-p-text dark:text-dm-p-text 
                        text-3xl font-CommeReg ">{earthMonths[calMonth - 1]}</h2>
                    <button onClick={clickMonthAdd} className="p-2 h-14 self-center rounded-xl text-lm-p-text dark:text-dm-p-text text-4xl font-CommeReg">
                        &gt;
                    </button>
                </div>
                
                
            </div>

            <div className="grid grid-cols-7 gap-4 mx-8">

                
                {tupleDates.map(([id, date]) => (
                    <div key={id} className="bg-dm-grey text-white">{date}</div>
                ))}
            </div>
        </div>
    )
    
}
