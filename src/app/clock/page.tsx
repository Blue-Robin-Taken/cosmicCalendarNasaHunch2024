'use client';
import React, { ChangeEventHandler } from 'react';
import { useState, useEffect } from 'react';
import GetTimeCC from './tpsecond';
import Clocks from '../clocks/page';
import { ChangeEvent } from 'react';

export default function Clock() {
    const [getPlanetState, setPlanetState] = useState('Earth');
    function changePage(event: ChangeEvent<HTMLSelectElement>) {
        // current_page = formData.keys().;
        setPlanetState(event.target.value);
    }
    var ZZZtime = GetTimeCC().format('ZZZ');
    var hhmmssTime = GetTimeCC().format('hh:mm:ss');
    var ddddLLTime = GetTimeCC().format('dddd, LL');
    var ZZTime = GetTimeCC().format('ZZ');
    var zzzTime = GetTimeCC().format('zzz').toString();
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

                    <p className="font-Lato text-3xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                        {ZZZtime}
                    </p>

                    <h1 className="font-CommeReg text-[12rem] flex flex-col justify-start items-start text-lm-h1-text dark:text-dm-h1-text ps-16 ">
                        {hhmmssTime}
                    </h1>

                    <p className="font-Lato text-3xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                        {ddddLLTime}
                    </p>

                    <p className="font-Lato text-3xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                        ---------------------------------
                    </p>

                    <p className="font-Lato text-2xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                        UTC {ZZTime}
                    </p>

                    <p className="font-Lato text-2xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16 pb-16">
                        {zzzTime}
                    </p>
                </div>
            )}
            {/* add am/pm or 24hr support */}

            <Clocks planet={getPlanetState} />
        </div>
    );
}
