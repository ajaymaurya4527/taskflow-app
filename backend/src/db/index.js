import Database from "better-sqlite3";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const dbPath = process.env.DB_PATH || "./taskflow.db";
const db = new Database(dbPath);

// Enable Foreign Key Constraints
db.pragma("foreign_keys = ON");

// Initialize Schema automatically if database file is brand new
const initializeDb = () => {
  const schemaPath = path.resolve(process.cwd(), "schema.sql");
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");
    db.exec(schemaSql);
  }
};

initializeDb();

export default db;