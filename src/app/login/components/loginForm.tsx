import { db } from "../../database";
export default function LoginForm() {
  async function loginSubmit(formData: FormData) {
    "use server";
    const rawFormData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    console.log(rawFormData);

    console.log();
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
