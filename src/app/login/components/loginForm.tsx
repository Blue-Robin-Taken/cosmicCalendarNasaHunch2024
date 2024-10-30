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
      <form action={loginSubmit}>
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label htmlFor="password">
          Password
          <input type="text" name="password"></input>
        </label>
        <button type="submit">Login</button>
      </form>

      {showInvalid && (
        <p className="justify-center">Incorrect password or username</p>
      )}
    </>
  );
}
