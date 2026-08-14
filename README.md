# 📋 TaskFlow - Lightweight Team Task Board

TaskFlow is a lightweight, full-stack Kanban-style task management board built for small teams. Designed as part of a full-stack developer assignment, it allows users to view, create, edit, delete, move, and filter tasks across custom columns with real-time database persistence and strong data validation.

---

## 🔗 Live Demo & Links

* **Live Application:** [https://taskflow-app-ruby.vercel.app/](https://taskflow-app-ruby.vercel.app/)
* **Backend API:** [https://taskflow-app-qgri.onrender.com/](https://taskflow-app-qgri.onrender.com/)
* **GitHub Repository:** [https://github.com/ajaymaurya4527/taskflow-app](https://github.com/ajaymaurya4527/taskflow-app)

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


Step 1: Clone the Repository
Open your terminal and run:

Bash
git clone [https://github.com/ajaymaurya4527/taskflow-app.git](https://github.com/ajaymaurya4527/taskflow-app.git)
cd taskflow-app
Step 2: Setup & Run Backend
Navigate to the backend directory:

Bash
cd backend
Install backend dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the backend folder:

Code snippet
PORT=5000
NODE_ENV=development
DB_PATH=./taskflow.db
Seed the Database:
Run the seed script to create tables and insert initial sample columns & tasks:

Bash
npm run seed
Start the Express backend server:

Bash
npm run dev
The backend server will run at http://localhost:5000

Step 3: Setup & Run Frontend
Open a new terminal window and navigate to the frontend directory:

Bash
cd taskflow-app/frontend
Install frontend dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the frontend folder:

Code snippet
VITE_API_BASE_URL=http://localhost:5000/api
Start the Vite React development server:

Bash
npm run dev
The frontend application will open at http://localhost:3000