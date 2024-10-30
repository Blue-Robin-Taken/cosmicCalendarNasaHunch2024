"use server"; // DO NOT REMOVE, it resolves to client. (endpoints must be secured here as well)
import { db } from "@/app/database";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export default async function loginServerAction(formData: FormData) {
  let invalidLoginError: boolean = false;

  async function giveToken(user: string) {
    const token = await new SignJWT({
      username: user,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(process.env.JWT_KEY_SIGNATURE));

    cookies().set("token", token);
    return Response.json({ loggedIn: true }); // For the redirect
  }

  const rawFormData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const dbRetrieve = await new Promise(function (resolve, reject) {
    db.get(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [rawFormData.username?.toString(), rawFormData.password?.toString()],
      (err, row: { username: string; password: string }) => {
        if (row != null) {
          giveToken(row.username);
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });
  return dbRetrieve;
}
