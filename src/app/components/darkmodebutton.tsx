'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import darkmodeimage from '@/app/images/darkmode&lightmode/lightmode.png';
import lightmodeimage from '@/app/images/darkmode&lightmode/darkmode.png';

const imageSize = 40;

export default function DarkmodeButton() {
    const [mounted, setMounted] = useState(false);

    const { setTheme, theme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        if (theme == 'dark' || true) {
            return <>Loading</>;
        }
    }
    if (theme === 'dark') {
        return (
            <>
                <button className="dark:text-dm-lightyellow align-middle">
                    <Image
                        src={darkmodeimage.src}
                        onClick={() => {
                            setTheme('light');
                        }}
                        alt="DarkmodeImage"
                        width={imageSize}
                        height={imageSize}
                    />
                </button>
            </>
        );
    } else {
        return (
            <>
                <button className="dark:text-dm-lightyellow align-middle">
                    <Image
                        src={lightmodeimage.src}
                        onClick={() => {
                            setTheme('dark');
                        }}
                        alt="LightmodeImage"
                        width={imageSize}
                        height={imageSize}
                    />
                </button>
            </>
        );
    }
}
