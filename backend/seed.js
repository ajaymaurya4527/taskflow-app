import db from "./src/db/index.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedDatabase = () => {
  try {
    console.log("🌱 Seeding database...");

    // Execute schema.sql
    const schemaSql = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf-8");
    db.exec(schemaSql);

    // Clear existing data
    db.prepare("DELETE FROM tasks").run();
    db.prepare("DELETE FROM columns").run();
    db.prepare("DELETE FROM boards").run();

    // Insert Default Board
    const boardResult = db.prepare("INSERT INTO boards (name) VALUES (?)").run("Main Workspace");
    const boardId = boardResult.lastInsertRowid;

    // Insert Default Columns
    const insertColumn = db.prepare("INSERT INTO columns (board_id, name, position) VALUES (?, ?, ?)");
    const col1 = insertColumn.run(boardId, "To Do", 1).lastInsertRowid;
    const col2 = insertColumn.run(boardId, "In Progress", 2).lastInsertRowid;
    const col3 = insertColumn.run(boardId, "Done", 3).lastInsertRowid;

    // Insert Seed Tasks
    const insertTask = db.prepare("INSERT INTO tasks (column_id, title, description, priority) VALUES (?, ?, ?, ?)");
    insertTask.run(col1, "Setup Express Server", "Initialize backend architecture with Hitesh Choudhary structure", "High");
    insertTask.run(col1, "Design SQL Schema", "Create schema.sql with boards, columns, and tasks tables", "High");
    insertTask.run(col2, "Build Frontend Components", "Create TaskBoard and Column UI components", "Medium");
    insertTask.run(col3, "Project Initialization", "Create Git repository and folder structure", "Low");

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

seedDatabase();