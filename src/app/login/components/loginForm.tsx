'use client';
import { useState } from 'react';
import loginServerAction from './actions';
export default function LoginForm() {
    const [showInvalid, setInvalid] = useState(false); // For invalid credentials

    async function loginSubmit(formData: FormData) {
        const loginReturn: boolean = await loginServerAction(formData);
        console.log(loginReturn);
        if (loginReturn) {
            setInvalid(true);
        } else {
            alert('Logged in!');
            setInvalid(false);
        }
    }
    return (
        <>
            <div className="dark:bg-dm-back bg-white flex flex-grow flex-col justify-center align-center min-h-screen">
                <h1 className="dark:text-dm-h1-text text-center text-5xl text-gray-950">
                    Log In
                </h1>
                <form
                    action={loginSubmit}
                    className="m-5 p-5 flex place-items-center flex-col justify-center"
                >
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        className="text-black p-3 m-3 text-lg border-2 border-black rounded-md dark:text-dm-p-text"
                        onKeyDown={() => {
                            setInvalid(false);
                        }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        className="text-black p-3 m-3 text-lg border-2 border-black rounded-md dark:text-dm-p-text"
                        onKeyDown={() => {
                            setInvalid(false);
                        }}
                    ></input>

                    {showInvalid && (
                        <p className="justify-center flex align-middle text-lg text-red-400">
                            Incorrect password or username
                        </p>
                    )}

                    <button
                        type="submit"
                        className="bg-slate-600 rounded-lg m-2 p-3 w-32"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </>
    );
}
