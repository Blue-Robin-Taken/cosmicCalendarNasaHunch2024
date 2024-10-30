import { DateTime } from "@tubular/time"
import ttime from "@tubular/time"
import React from "react";

const timeNow = ttime().toString()
// DateTime<yyyy-mm-ddThh:mm:ss.iii-0:00§>
// y=year ; m=month ; d=date ; T ; h=hour ; m=minute ; s=second ; i=milliseconds ; UTC deviation

function GetTime() {
    const timeNow = ttime()
    const msNow = timeNow.format('x')


    return timeNow;
}

setInterval(GetTime, 1000)

export default function Clock() {
    return <div>
        <p>{timeNow}</p>

    </div>
}