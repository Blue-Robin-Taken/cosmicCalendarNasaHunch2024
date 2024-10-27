"use client";

import { useState } from "react";
import serverSignup from "./actions";
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
      <div className="flex flex-grow flex-col justify-center align-center min-h-screen">
        <h1 className="text-center text-5xl">Sign Up!</h1>

        <form
          action={signupSubmit}
          className="m-5 p-5 flex place-items-center flex-col justify-center"
        >
          <input
            type="text"
            name="username"
            placeholder="username"
            className="text-black p-3 m-3 text-lg"
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            className="text-black p-3 m-3 text-lg"
          ></input>
          <button
            type="submit"
            className="bg-slate-600 rounded-lg m-2 p-3 w-32"
          >
            Sign Up
          </button>
          {passLengthInvalid && (
            <p className="justify-center">
              Password is too small! (Must be &gt;6 characters!)
            </p>
          )}
          {showInvalid && (
            <p className="justify-center">Username already taken!</p>
          )}
        </form>
      </div>
    </>
  );
}
