"use server"; // DO NOT REMOVE, it resolves to client. (endpoints must be secured here as well)
import { db } from "@/app/database";
import { error } from "console";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export default async function loginServerAction(formData: FormData) {
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
  console.log(rawFormData.password?.toString());
  const getDB = db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [rawFormData.username?.toString(), rawFormData.password?.toString()],
    async (err, row: { username: string; password: string }) => {
      if (row != null) {
        giveToken(row.username);
      }
    }
  );
}
