import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    console.log(request.url.split('/')[3]);
    console.log(request.cookies.get('token')!.value);
    var checkToken;
    try {
        checkToken = await jwtVerify(
            request.cookies.get('token')!.value,
            new TextEncoder().encode(process.env.JWT_KEY_SIGNATURE?.toString())
        );
    } catch (err) {
        checkToken = false;
    }
    if (request.url.split('/')[3] == 'login' && checkToken) {
        const sendURL = new URL('/login/error', request.url);
        sendURL.searchParams.set('error', 'AlreadyLoggedIn');
        return NextResponse.redirect(sendURL);
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/login',
};
