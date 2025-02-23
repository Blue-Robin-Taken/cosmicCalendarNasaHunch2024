'use server';
import { db } from '@/app/database';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { useEffect } from 'react';
export default async function loginServerAction(
    formData: FormData
): Promise<boolean> {
    'use server';

    const rawFormData = {
        username: formData.get('username'),
        password: formData.get('password'),
    };
    const user = await new Promise<{
        username: string;
        password: string;
    } | null>((resolve, reject) => {
        db.get(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [rawFormData.username, rawFormData.password],
            (err, row) => {
                if (err) reject(err);
                resolve(row);
            }
        );
    });

    if (user) {
        // Generate JWT
        const token = await new SignJWT({ username: user.username })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('2h')
            .sign(new TextEncoder().encode(process.env.JWT_KEY_SIGNATURE!));

        // Set the cookie inside the correct scope
        let cookie = await cookies();
        cookie.set('token', token);

        return false;
    } else {
        return true;
    }
}
