'use client';
import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
var color = require('rgb');
import useSound from 'use-sound';
import clockSFX from '@/public/sounds/clock-alarm-8761.mp3';

export default function timeManagement() {
    var [startTime, setTime] = useState(0);
    var [isPlaying, setPlaying] = useState(false);
    const [key, setKey] = useState(0);
    var prevKey = 0;
    const [play] = useSound(clockSFX);
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
                            if (remainingTime == 0) {
                                play();
                            }
                            return `${hours}:${minutes}:${seconds}`;
                        }}
                    </CountdownCircleTimer>
                    <div className="justify-center flex align-middle text-center flex-row space-x-5 m-3 p-2">
                        <div>
                            <p>Seconds</p>
                            <input
                                id="startTimeS"
                                placeholder="seconds"
                                defaultValue={0}
                            />
                        </div>
                        <div>
                            <p>Minutes</p>
                            <input
                                id="startTimeM"
                                placeholder="minutes"
                                defaultValue={0}
                            />
                        </div>
                        <div>
                            <p>Hours</p>
                            <input
                                id="startTimeH"
                                placeholder="hours"
                                defaultValue={0}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setTime(
                                    parseInt(
                                        (
                                            document.getElementById(
                                                'startTimeS'
                                            ) as HTMLInputElement
                                        ).value
                                    ) +
                                        parseInt(
                                            (
                                                document.getElementById(
                                                    'startTimeM'
                                                ) as HTMLInputElement
                                            ).value
                                        ) *
                                            60 +
                                        parseInt(
                                            (
                                                document.getElementById(
                                                    'startTimeH'
                                                ) as HTMLInputElement
                                            ).value
                                        ) *
                                            60 *
                                            60
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
