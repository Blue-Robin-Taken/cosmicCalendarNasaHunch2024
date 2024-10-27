"use server";
import { db } from "@/app/database";

export default async function serverSignup(formData: FormData): Promise<any> {
  var returnData: {
    formLengthInvalid: boolean;
    loggedIn: boolean;
    userExists: boolean;
  } = {
    formLengthInvalid: false,
    loggedIn: false,
    userExists: false,
  };
  var rawFormData: {
    username: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
  } = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  if (rawFormData.username == null) {
    rawFormData.username = "";
  }
  if (rawFormData.password == null) {
    rawFormData.password = "";
  }

  if (rawFormData.password.toString().length < 6) {
    // Length of password set is too little
    returnData.formLengthInvalid = true;
  } else {
  }

  db.get(
    "SELECT username FROM users WHERE username IS ?",
    rawFormData.username,
    (err, row) => {
      console.log(err, row);
      if (row == undefined) {
        // User does not exist
      }
    }
  );

  console.log(rawFormData);
  return returnData;
}
