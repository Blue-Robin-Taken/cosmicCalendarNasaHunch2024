import { db } from '@/app/database';
import { NextResponse } from 'next/server';
export async function GET() {
    const rowed = await new Promise<{
        user: string;
        title: string;
        body: string;
    } | null>((resolve, reject) => {
        db.all('SELECT * FROM posts', (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
    console.log(rowed, 'asfsdf');
    return new NextResponse(JSON.stringify(rowed));
}
