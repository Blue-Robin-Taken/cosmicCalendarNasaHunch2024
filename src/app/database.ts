import { Database, OPEN_READWRITE, OPEN_CREATE } from "sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "users.db"); // https://krimsonhart.medium.com/how-i-built-my-portfolio-using-next-js-and-sqlite-db-part-2-37595ca4dc40

export const db = new Database(dbPath, OPEN_READWRITE | OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the users database.");
});

db.exec(
  "CREATE TABLE IF NOT EXISTS users(username VARCHAR, password VARCHAR, email VARCHAR)"
);
