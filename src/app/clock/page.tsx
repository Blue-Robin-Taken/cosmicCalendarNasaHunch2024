'use client';
import { DateTime } from "@tubular/time"
import ttime from "@tubular/time"
import React from "react";
import { useState, useEffect } from "react";
import GetTimeCC from './tpsecond'


export default function Clock() {
   
    return <p className="bg-slate-600" suppressHydrationWarning >{GetTimeCC().toString()}</p>;
}