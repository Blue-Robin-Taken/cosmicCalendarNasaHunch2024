"use client";
import { useState } from "react";
import { db } from "../../database";
import loginServerAction from "./actions";
export default function LoginForm() {
  const [showInvalid, setInvalid] = useState(false); // For invalid credentials

  async function loginSubmit(formData: FormData) {
    loginServerAction(formData);
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
    </>
  );
}
