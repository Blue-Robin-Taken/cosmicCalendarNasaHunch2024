"use client";
import ttime from "@tubular/time";
import React from "react";
import { useState, useEffect } from "react";
import Clocks from "../clocks/page";

export default function Clock() {
  const [time, setTime] = useState(ttime(1));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(ttime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="text-9xl flex flex-col justify-center items-center text-black font-serif p-16">
        {time
          .format("hh:mm:ss - ddd MM/DD")
          .split("-")
          .map((value, index) => (
            <span key={index}>{value}</span>
          ))}
      </div>
      <Clocks />
    </div>
  );
}
