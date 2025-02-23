'use client';
import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
var color = require('rgb');

export default function timeManagement() {
    var [startTime, setTime] = useState(0);
    var [isPlaying, setPlaying] = useState(false);
    const [key, setKey] = useState(0);
    var prevKey = 0;
    return (
        <>
            <div className="align-middle text-center justify-items-center justify-center flex flex-col place-items-center m-3 font-lato">
                <h1 className="font-lato text-5xl p-5 m-5">Time Management</h1>

                <div className="p-10 m-10 flex flex-col justify-items-center place-items-center">
                    <h2 className="font-lato text-3xl p-3">Timer</h2>
                    <CountdownCircleTimer
                        key={key}
                        isPlaying={isPlaying}
                        duration={startTime}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[7, 5, 2, 0]}
                    >
                        {({ remainingTime }) => {
                            const hours = Math.floor(remainingTime / 3600);
                            const minutes = Math.floor(
                                (remainingTime % 3600) / 60
                            );
                            const seconds = remainingTime % 60;

                            return `${hours}:${minutes}:${seconds}`;
                        }}
                    </CountdownCircleTimer>
                    <div className="justify-center flex align-middle text-center">
                        <input id="startTime" />
                        <button
                            type="button"
                            onClick={() => {
                                console.log();
                                setTime(
                                    parseInt(
                                        document.getElementById('startTime')
                                            .value
                                    )
                                );
                                setKey((prevKey) => prevKey + 1);
                                setPlaying(true);
                            }}
                        >
                            Set Time
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
