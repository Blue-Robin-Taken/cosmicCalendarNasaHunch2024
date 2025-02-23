'use client';
import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

export default function TimeManagement() {
    const [startTime, setTime] = useState(0);
    const [isPlaying, setPlaying] = useState(false);
    const [key, setKey] = useState(0);
    const [shouldPlaySound, setShouldPlaySound] = useState(false);
    const [shouldStopSound, setShouldStopSound] = useState(false);
    const [shouldPlaySoundInput, setShouldPlaySoundInput] = useState(false);
    useEffect(() => {
        if (shouldPlaySound) {
            const audio = document.getElementById(
                'timerEnd'
            ) as HTMLAudioElement;
            if (audio && shouldPlaySoundInput) {
                audio.currentTime = 0;
                audio
                    .play()
                    .catch((error) => console.log('Audio play failed:', error));
            }
            setShouldPlaySound(false); // Reset after playing
        }
    }, [shouldPlaySound]); // Runs when shouldPlaySound changes to true

    useEffect(() => {
        if (shouldStopSound) {
            const audio = document.getElementById(
                'timerEnd'
            ) as HTMLAudioElement;
            if (audio) {
                audio.pause();
            }
            setShouldStopSound(false);
        }
    }, [shouldStopSound]);

    return (
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
                    onComplete={() => {
                        setShouldPlaySound(true); // Trigger audio after timer ends
                        setPlaying(false);
                        setTime(1);
                        return { shouldRepeat: false };
                    }}
                >
                    {({ remainingTime }) => {
                        const hours = Math.floor(remainingTime / 3600);
                        const minutes = Math.floor((remainingTime % 3600) / 60);
                        const seconds = remainingTime % 60;
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
                            className="justify-center text-center p-3 m-2 bg-lm-grey rounded-sm font-lato text-sm dark:bg-dm-grey dark:text-dm-lightyellow text-lm-p-text"
                        />
                    </div>
                    <div>
                        <p>Minutes</p>
                        <input
                            id="startTimeM"
                            placeholder="minutes"
                            defaultValue={0}
                            className="justify-center text-center p-3 m-2 bg-lm-grey rounded-sm font-lato text-sm  dark:bg-dm-grey dark:text-dm-lightyellow text-lm-p-text"
                        />
                    </div>
                    <div>
                        <p>Hours</p>
                        <input
                            id="startTimeH"
                            placeholder="hours"
                            defaultValue={0}
                            className="justify-center text-center p-3 m-2 bg-lm-grey rounded-sm font-lato text-sm  dark:bg-dm-grey dark:text-dm-lightyellow text-lm-p-text"
                        />
                    </div>
                    <div className="flex flex-col align-middle justify-center items-center justify-items-center">
                        <p className="align-middle">Play Sound</p>
                        <label className="inline-flex items-center cursor-pointer align-middle">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                id="playSoundInput"
                                onClick={(x) => {
                                    setShouldPlaySoundInput(
                                        !shouldPlaySoundInput
                                    );
                                }}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                        </label>{' '}
                        {/*https://flowbite.com/docs/forms/toggle/*/}
                    </div>
                    <button
                        className="align-middle dark:bg-dm-yellow bg-lm-grey rounded-lg m-3 p-1"
                        type="button"
                        onClick={() => {
                            setTime(
                                parseInt(
                                    (
                                        document.getElementById(
                                            'startTimeS'
                                        ) as HTMLInputElement
                                    ).value
                                ) ||
                                    0 +
                                        parseInt(
                                            (
                                                document.getElementById(
                                                    'startTimeM'
                                                ) as HTMLInputElement
                                            ).value
                                        ) ||
                                    0 * 60 +
                                        parseInt(
                                            (
                                                document.getElementById(
                                                    'startTimeH'
                                                ) as HTMLInputElement
                                            ).value
                                        ) ||
                                    0 * 3600
                            );
                            setKey((prevKey) => prevKey + 1);
                            setPlaying(true);
                        }}
                    >
                        Set Time
                    </button>
                    <button className="align-middle dark:bg-dm-yellow bg-lm-grey rounded-lg m-3 p-1">
                        Stop Sound
                    </button>
                    <audio
                        id="timerEnd"
                        src={'/sounds/clock1.mp3'}
                        preload="auto"
                    />
                </div>
            </div>
        </div>
    );
}
