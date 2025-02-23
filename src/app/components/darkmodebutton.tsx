'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import darkmodeimage from '@/app/images/darkmode&lightmode/darkmode.png';

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
                <button className="dark:text-dm-lightyellow">
                    <Image
                        src={darkmodeimage.src}
                        onClick={() => {
                            setTheme('light');
                        }}
                        alt="DarkmodeImage"
                        width={50}
                        height={50}
                    />
                </button>
            </>
        );
    }
}
