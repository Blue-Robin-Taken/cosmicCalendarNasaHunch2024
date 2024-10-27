import { db } from "@/app/database";
export default function SignUpForm() {
  async function signupSubmit(formData: FormData) {
    "use server";
    const rawFormData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    db.get(
      "SELECT username FROM users WHERE username IS ?",
      rawFormData.username,
      (err, row) => {
        console.log(err, row);
      }
    );
    db.close();
  }
  return (
    <>
      <form action={signupSubmit}>
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label htmlFor="password">
          Password
          <input type="text" name="password"></input>
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}
