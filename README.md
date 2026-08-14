# 📋 TaskFlow - Lightweight Team Task Board

TaskFlow is a lightweight, full-stack Kanban-style task management board built for small teams. Designed as part of a full-stack developer assignment, it allows users to view, create, edit, delete, move, and filter tasks across custom columns with real-time database persistence and strong data validation.

---

## 🔗 Live Demo & Links

* **Live Application:** [https://taskflow-frontend.vercel.app](https://taskflow-frontend.vercel.app)
* **Backend API:** [https://taskflow-backend.onrender.com/api/board](https://taskflow-backend.onrender.com/api/board)
* **GitHub Repository:** [https://github.com/YOUR_GITHUB_USERNAME/taskflow-app](https://github.com/YOUR_GITHUB_USERNAME/taskflow-app)

---

## ✨ Features

* 🗂️ **Board & Column View:** View tasks grouped under columns ("To Do", "In Progress", "Done").
* ➕ **Task CRUD Operations:** Create, edit, and delete tasks with real-time UI updates.
* 🔄 **Task Movement:** Move tasks between columns using an intuitive dropdown control per task.
* 🎯 **Priority Filtering:** Filter tasks by priority (`High`, `Medium`, `Low`).
* 📱 **Fully Responsive Layout:** Horizontal Kanban layout on desktop and smooth auto-stacking vertical layout on mobile devices.
* 🛡️ **Validation & Error Handling:** Enforced title validation on both frontend and backend with user-friendly toast notifications on network or API failures.
* 💾 **Data Persistence:** Relational SQLite database ensuring state is maintained across page refreshes.

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite), Tailwind CSS, Axios, Lucide React, React Hot Toast
* **Backend:** Node.js, Express.js (`asyncHandler`, `ApiError`, `ApiResponse` design pattern)
* **Database:** SQLite (`better-sqlite3`)
* **Testing:** Jest, Supertest

---

## 🗄️ Database Schema & Required Custom SQL Queries

### 1. Database Schema (`schema.sql`)
```sql
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS boards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS columns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    board_id INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,
    position INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    column_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(10) CHECK(priority IN ('Low', 'Medium', 'High')) DEFAULT 'Medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (column_id) REFERENCES columns(id) ON DELETE CASCADE
);