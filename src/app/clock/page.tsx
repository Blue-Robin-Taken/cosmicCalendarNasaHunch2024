'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import GetTimeCC from './tpsecond';
import Clocks from '../clocks/page';

export default function Clock() {
    return (
        <div className="selection:bg-highlight-yellow">
            <h2 className="dark:text-darkmode-textlightlight font-PublicSans text-6xl flex flex-col justify-center items-start text-black ps-16 pt-16">
                Earth
            </h2>

            <p className="dark:text-darkmode-textlightlight font-PublicSans text-3xl flex flex-col justify-center items-start text-black ps-16">
                {GetTimeCC().format('ZZZ')}
            </p>

            <h1 className=" dark:text-darkmode-textlightlight font-PublicSans text-[12rem] flex flex-col justify-start items-start text-black ps-16 ">
                {GetTimeCC().format('hh:mm:ss')}
            </h1>

            <p className="dark:text-darkmode-textlightlight font-PublicSans text-3xl flex flex-col justify-center items-start text-black ps-16">
                {GetTimeCC().format('dddd, LL')}
            </p>

            <p className="dark:text-darkmode-textlightlight font-PublicSans text-3xl flex flex-col justify-center items-start text-black ps-16">
                ---------------------------------
            </p>

            <p className="dark:text-darkmode-textlightlight font-PublicSans text-2xl flex flex-col justify-center items-start text-black ps-16">
                UTC {GetTimeCC().format('ZZ')}
            </p>

            <p className="dark:text-darkmode-textlightlight font-PublicSans text-2xl flex flex-col justify-center items-start text-black ps-16 pb-16">
                {GetTimeCC().format('zzz').toString()}
            </p>

            <Clocks />
        </div>
    );
}
