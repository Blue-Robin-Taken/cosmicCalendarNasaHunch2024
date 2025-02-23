import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    console.log(request.url.split('/')[3]);
    console.log(request.cookies.get('token')!.value);
    if (
        request.url.split('/')[3] == 'login' &&
        (await jwtVerify(
            request.cookies.get('token')!.value,
            new TextEncoder().encode(process.env.JWT_KEY_SIGNATURE?.toString())
        ))
    ) {
        alert("You're already logged in!");
        return NextResponse.redirect(new URL('/', request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/login',
};
