'use client';
import React, { ChangeEventHandler } from 'react';
import { useState, useEffect } from 'react';
import GetTimeCC from './tpsecond';
import Clocks from '../clocks/page';
import { ChangeEvent } from 'react';
import marsStandardDate from '../clocks/marsTime/calculating';
import {
    getJulianDate2000Epoch,
    getJulianDateTerrestrialTime,
    getJulianDate,
} from '../clocks/earthTime/calculating';

export default function Clock() {
    const [getPlanetState, setPlanetState] = useState('Earth');
    function changePage(event: ChangeEvent<HTMLSelectElement>) {
        // current_page = formData.keys().;
        setPlanetState(event.target.value);
    }
    var getTimeCC = GetTimeCC(); // Only run this once
    var EarthTime = [
        getTimeCC.format('ZZZ'), // 0
        getTimeCC.format('hh:mm:ss'), // 1
        getTimeCC.format('dddd, LL'), // 2
        getTimeCC.format('ZZ'), // 3
        getTimeCC.format('zzz').toString(), // 4
        getJulianDate(getTimeCC.epochMillis), // 5
        getJulianDateTerrestrialTime(getTimeCC.epochMillis), // 6
        getJulianDate2000Epoch(getTimeCC.epochMillis), // 7
    ];

    var MarsTime = [marsStandardDate(getTimeCC.epochMillis)];

    return (
        <div className="selection:bg-highlight-yellow-lm dark:selection:bg-highlight-yellow-dm ">
            {/*Form for changing the selected clock*/}

            <div>
                <h1>Current Planet:</h1>
                <select onChange={changePage}>
                    <option>Earth</option>
                    <option>Mars</option>
                </select>
            </div>
            {getPlanetState == 'Earth' && (
                <div>
                    <h2 className="font-Lato text-6xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16 pt-16">
                        Earth
                    </h2>

                    {/* timezone */}
                    <p className="font-Lato text-3xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                        {EarthTime[0]}
                    </p>

                    {/* clock */}
                    <h1 className="font-CommeReg text-[12rem] flex flex-col justify-start items-start text-lm-h1-text dark:text-dm-h1-text ps-16 ">
                        {EarthTime[1]}
                    </h1>

                    {/* date */}
                    <p className="font-Lato text-3xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                        {EarthTime[2]}
                    </p>

                    <p className="font-Lato text-3xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                        ---------------------------------
                    </p>

                    {/* difference from meridian */}
                    <p className="font-Lato text-2xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                        UTC {EarthTime[3]}
                    </p>

                    {/* common name for difference from meridian */}
                    <p className="font-Lato text-2xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16 pb-16">
                        {EarthTime[4]}
                    </p>

                    <p className="font-Lato text-2xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16 pb-16">
                        {EarthTime[5]}
                    </p>
                    <p className="font-Lato text-2xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16 pb-16">
                        {EarthTime[6]}
                    </p>
                    <p className="font-Lato text-2xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16 pb-16">
                        {EarthTime[7]}
                    </p>
                </div>
            )}
            {/* add am/pm or 24hr support */}
            {getPlanetState == 'Mars' && (
                <div>
                    <h2 className="font-Lato text-6xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16 pt-16">
                        Mars
                    </h2>

                    {/* timezone */}
                    <p className="font-Lato text-3xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                        Default: Airy-0 (crater)
                    </p>

                    {/* MSD (mars standard date) */}
                    <h1 className="font-CommeReg text-[6rem] flex flex-col justify-start items-start text-lm-h1-text dark:text-dm-h1-text ps-16 ">
                        Mars Sol Date: {MarsTime[0]}
                    </h1>

                    {/* date */}
                    <p className="font-Lato text-3xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                        {}
                    </p>

                    <p className="font-Lato text-3xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                        ---------------------------------
                    </p>

                    {/* difference from meridian */}
                    <p className="font-Lato text-2xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                        MSD{}
                    </p>

                    {/* common name for difference from meridian */}
                    <p className="font-Lato text-2xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16 pb-16">
                        {}
                    </p>
                </div>
            )}

            <Clocks planet={getPlanetState} />
        </div>
    );
}
