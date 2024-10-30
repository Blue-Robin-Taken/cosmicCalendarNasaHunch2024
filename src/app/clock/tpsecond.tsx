"use client";
import ttime from "@tubular/time";
import { useState, useEffect } from "react";

// DateTime<yyyy-mm-ddThh:mm:ss.iii-0:00§>
// y=year ; m=month ; d=date ; T ; h=hour ; m=minute ; s=second ; i=milliseconds ; UTC deviation

export default function GetTimeCC() {
  const [time, setTime] = useState(ttime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(ttime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}
