import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "", // för windows är det "" (tomt lösenord)
    database: "bloggproj",
    port: 3306, // Obs! 3306 för windowsanvändare //8889 mac
  });