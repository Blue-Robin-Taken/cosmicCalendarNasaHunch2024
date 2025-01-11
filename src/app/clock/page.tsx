'use client';
import React, { ChangeEventHandler } from 'react';
import { useState, useEffect } from 'react';
import GetTimeCC from './tpsecond';
import Clocks from '../clocks/page';
import { ChangeEvent } from 'react';

export default function Clock() {
    var [getPlanetState, setPlanetState] = useState('Earth');
    function changePage(event: ChangeEvent<HTMLSelectElement>) {
        // current_page = formData.keys().;
        setPlanetState(event.target.value);
    }
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
            
            <h2 className="font-Lato text-6xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16 pt-16">
                Earth
            </h2>
            {/* add am/pm or 24hr support */}
            <p className="font-Lato text-3xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                {GetTimeCC().format('ZZZ')}
            </p>

            <h1 className="font-CommeReg text-[12rem] flex flex-col justify-start items-start text-lm-h1-text dark:text-dm-h1-text ps-16 ">
                {GetTimeCC().format('hh:mm:ss')}
            </h1>

            <p className="font-Lato text-3xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                {GetTimeCC().format('dddd, LL')}
            </p>

            <p className="font-Lato text-3xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                ---------------------------------
            </p>

            <p className="font-Lato text-2xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                UTC {GetTimeCC().format('ZZ')}
            </p>

            <p className="font-Lato text-2xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16 pb-16">
                {GetTimeCC().format('zzz').toString()}
            </p>


            <Clocks planet={getPlanetState} />
        </div>
    );
}
