'use client';
import { useSearchParams } from 'next/navigation';

export default function err() {
    return (
        <>
            <div className="text-7xl justify-center font-Lato text-center flex flex-grow flex-col h-screen">
                <h1 className="align-middle">ERROR/AlreadyLoggedIn</h1>
                <p>{useSearchParams().get('error')}</p>
            </div>
        </>
    );
}
