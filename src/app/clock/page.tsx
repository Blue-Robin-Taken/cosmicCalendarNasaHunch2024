"use client";
import ttime from "@tubular/time";
import React from "react";
import { useState, useEffect } from "react";
import GetTimeCC from "./tpsecond";

export default function Clock() {


    return (
    
    // wasn't too sure what Arnav wanted with this; I'm keeping it just in case but I'm changing the css on my own for now

    // <div className="text-9xl flex flex-col justify-center items-center text-black font-serif p-16">
    //   {time
    //     .format("hh:mm:ss - ddd MM/DD")
    //     .split("-")
    //     .map((value, index) => (
    //       <span key={index}>{value}</span>
    //     ))}
    // </div>

        <div>
            <h1 className="text-9xl flex flex-col justify-center items-center text-black font-serif p-16">
                {GetTimeCC().format('hh:mm:ss')}

                

            </h1>
            
            <p className="text-9xl flex flex-col justify-center items-center text-black font-serif p-16">
                {GetTimeCC().format('ddd MM/DD')}
            </p>

        </div>
    );
}
