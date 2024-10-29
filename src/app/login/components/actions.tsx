"use server"; // DO NOT REMOVE, it resolves to client. (endpoints must be secured here as well)
import { db } from "@/app/database";
import { SignJWT } from "jose";

export default async function loginServerAction(formData: FormData) {
  const rawFormData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const getDB = db.get(
    "SELECT * FROM users WHERE username = ?",
    [rawFormData.username?.toString()],
    (err, row: { username: string; password: string }) => {
      if (row.password) {
        console.log(row.password, rawFormData.username?.toString());
        if (row.password == rawFormData.password?.toString()) {
          console.log("yipppee");
        }
      }
    }
  );
}
