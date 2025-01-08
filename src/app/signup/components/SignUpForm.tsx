'use client'; // DO NOT REMOVE

import { useState } from 'react';
import serverSignup from './actions';
export default function SignUpForm() {
    const [showInvalid, setInvalid] = useState(false); // For invalid credentials
    const [passLengthInvalid, setPassLengthInvalid] = useState(false); // For invalid password length

    async function signupSubmit(formData: FormData) {
        const serverReturn: {
            formLengthInvalid: boolean;
            userExists: boolean;
        } = await serverSignup(formData);
        if (serverReturn.formLengthInvalid) {
            setPassLengthInvalid(true);
        } else {
            setPassLengthInvalid(false);

            if (serverReturn.userExists) {
                setInvalid(true);
            } else {
                setInvalid(false);
            }
        }
    }

    return (
        <>
            <div className="dark:bg-darkmode bg-white flex flex-grow flex-col justify-center align-center min-h-screen">
                <h1 className="text-center dark:text-darkmode-textlightlight text-black text-5xl">
                    Sign Up!
                </h1>

                <form
                    action={signupSubmit}
                    className="m-5 p-5 flex place-items-center flex-col justify-center"
                >
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        className="text-black p-3 m-3 text-lg border-2 border-black rounded-md"
                        onKeyDown={() => {
                            setInvalid(false);
                            setPassLengthInvalid(false);
                        }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        className="text-black p-3 m-3 text-lg border-2 border-black rounded-md"
                        onKeyDown={() => {
                            setInvalid(false);
                            setPassLengthInvalid(false);
                        }}
                    ></input>

                    {passLengthInvalid && (
                        <p className="justify-center flex align-middle text-lg text-red-400">
                            Password is too small! (Must be &gt;6 characters!)
                        </p>
                    )}
                    {showInvalid && (
                        <p className="justify-center flex align-middle text-lg text-red-400">
                            Username already taken!
                        </p>
                    )}

                    <button
                        type="submit"
                        className="bg-slate-600 rounded-lg m-2 p-3 w-32"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </>
    );
}
