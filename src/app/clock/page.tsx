'use client';
import { DateTime } from "@tubular/time"
import ttime from "@tubular/time"
import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import GetTimeCC from './tpsecond'


export default function Clock() {
    const [time, setTime] = useState(ttime(1))

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(ttime());
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    return (
        <div className="text-9xl flex flex-col justify-center items-center text-black font-serif p-16">
            {time.format('hh:mm:ss - ddd MM/DD').split('-').map((value, index, s) => <span key={index}>{value}</span>)}
        </div>
    );
}