'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ErrorMessage() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    return <p>{error}</p>;
}

export default function Err() {
    return (
        <div className="text-7xl justify-center font-Lato text-center flex flex-grow flex-col h-screen">
            <h1 className="align-middle">
                Something happened but this is intended ☺
            </h1>

            <Suspense fallback={<p>Loading error message...</p>}>
                <ErrorMessage />
            </Suspense>
        </div>
    );
}
