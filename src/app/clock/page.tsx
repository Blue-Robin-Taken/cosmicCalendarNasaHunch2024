'use client';
import { DateTime } from "@tubular/time"
import ttime from "@tubular/time"
import React from "react";
import { useState, useEffect } from "react";


const timeNow = ttime().toString()
// DateTime<yyyy-mm-ddThh:mm:ss.iii-0:00§>
// y=year ; m=month ; d=date ; T ; h=hour ; m=minute ; s=second ; i=milliseconds ; UTC deviation

// function GetTime() {
//     const [time, setTime] = useState(ttime())

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setTime(ttime());
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [])

//     return time;
    
// }

//setInterval(GetTime, 5)

export default function Clock() {
    const [time, setTime] = useState(ttime())

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(ttime());
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    return <p>{time.toString()}</p>;
}