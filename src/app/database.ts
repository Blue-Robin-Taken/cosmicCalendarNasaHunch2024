import { Database, OPEN_READWRITE, OPEN_CREATE } from "sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "users.db"); // https://krimsonhart.medium.com/how-i-built-my-portfolio-using-next-js-and-sqlite-db-part-2-37595ca4dc40

export const db = new Database(dbPath, OPEN_READWRITE | OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the users database.");
});

db.exec("CREATE TABLE IF NOT EXISTS users(username VARCHAR, password VARCHAR)");
db.all("PRAGMA table_info(users)", (error, rows) => {
  // if (error?.message) {
  //   // If there is a column then it will produce an error trying to obtain the column
  //   // Undefined col
  //   db.exec("ALTER TABLE users ADD email");
  //   console.log(col);
  // }

  if (
    !rows.find((row: any) => {
      if (row["name"] == "email") {
        return true;
      }
    })
  ) {
    db.exec("ALTER TABLE users ADD email");
  } else {
    // Nothing, there is an email column
  }
});
