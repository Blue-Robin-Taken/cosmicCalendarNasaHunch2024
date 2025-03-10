'use server';
import { db } from '@/app/database';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
export default async function chatServerComponent(formData: FormData) {
    const rawFormData = {
        title: formData.get('title'),
        body: formData.get('body'),
    };
    let payload;
    const cooked = await cookies();
    const jwt_token = cooked.get('token')?.value;
    console.log();
    try {
        let { payload } = await jwtVerify(
            jwt_token,
            new TextEncoder().encode(process.env.JWT_KEY_SIGNATURE?.toString())
        );
    } catch {
        payload = false;
    }

    console.log(payload);

    if (payload) {
        db.run('INSERT INTO posts (title, body, user) VALUES(?, ?, ?)', [
            rawFormData.title.toString(),
            rawFormData.body.toString(),
            payload.username,
        ]);
    }
}
