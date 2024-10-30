"use client";
import React from "react";
import { useState, useEffect } from "react";
import GetTimeCC from "./tpsecond";
import Clocks from "../clocks/page";

export default function Clock() {


  return (
    <div>
        <h1 className="text-9xl flex flex-col justify-center items-center text-black font-serif p-16">
            {GetTimeCC().format('hh:mm:ss')}
        </h1>
            
        <p className="text-9xl flex flex-col justify-center items-center text-black font-serif p-16">
            {GetTimeCC().format('ddd MM/DD')}
        </p>

      <Clocks />
    </div>
  );
}
