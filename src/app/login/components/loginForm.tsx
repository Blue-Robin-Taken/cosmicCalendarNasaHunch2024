"use client";
import { useState } from "react";
import loginServerAction from "./actions";
export default function LoginForm() {
  const [showInvalid, setInvalid] = useState(false); // For invalid credentials

  async function loginSubmit(formData: FormData) {
    const loginReturn: boolean = await loginServerAction(formData);
    console.log(loginReturn);
    if (loginReturn) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }
  return (
    <>
      <div className="flex flex-grow flex-col justify-center align-center min-h-screen">
        <h1 className="text-center text-5xl">Log In</h1>
        <form
          action={loginSubmit}
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
            Log In
          </button>
        </form>

        {showInvalid && (
          <p className="justify-center">Incorrect password or username</p>
        )}
      </div>
    </>
  );
}
