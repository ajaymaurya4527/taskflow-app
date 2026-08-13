import db from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// GET /api/tasks?priority=High
// REQUIRED CUSTOM QUERY 1: Tasks with a given priority, newest first
export const getTasks = asyncHandler(async (req, res) => {
  const { priority } = req.query;

  let query = "SELECT * FROM tasks";
  const params = [];

  if (priority) {
    query += " WHERE priority = ? ORDER BY created_at DESC";
    params.push(priority);
  } else {
    query += " ORDER BY created_at DESC";
  }

  const tasks = db.prepare(query).all(...params);

  return res.status(200).json(
    new ApiResponse(200, tasks, "Tasks fetched successfully")
  );
});

// POST /api/tasks - Create a new task
export const createTask = asyncHandler(async (req, res) => {
  const { column_id, title, description, priority } = req.body;

  // Backend Validation (Empty title reject requirement)
  if (!title || title.trim() === "") {
    throw new ApiError(400, "Title is required and cannot be empty.");
  }

  if (!column_id) {
    throw new ApiError(400, "Column ID is required.");
  }

  const statement = db.prepare(`
    INSERT INTO tasks (column_id, title, description, priority)
    VALUES (?, ?, ?, ?)
  `);

  const info = statement.run(
    column_id,
    title.trim(),
    description || "",
    priority || "Medium"
  );

  const createdTask = db.prepare("SELECT * FROM tasks WHERE id = ?").get(info.lastInsertRowid);

  return res.status(201).json(
    new ApiResponse(201, createdTask, "Task created successfully")
  );
});

// PUT /api/tasks/:id - Edit an existing task
export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, priority } = req.body;

  if (!title || title.trim() === "") {
    throw new ApiError(400, "Title is required.");
  }

  const existingTask = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  if (!existingTask) {
    throw new ApiError(404, "Task not found.");
  }

  db.prepare(`
    UPDATE tasks 
    SET title = ?, description = ?, priority = ?
    WHERE id = ?
  `).run(title.trim(), description || "", priority || "Medium", id);

  const updatedTask = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  return res.status(200).json(
    new ApiResponse(200, updatedTask, "Task updated successfully")
  );
});

// DELETE /api/tasks/:id - Delete task
export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingTask = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  if (!existingTask) {
    throw new ApiError(404, "Task not found.");
  }

  db.prepare("DELETE FROM tasks WHERE id = ?").run(id);

  return res.status(200).json(
    new ApiResponse(200, { id: Number(id) }, "Task deleted successfully")
  );
});

// PATCH /api/tasks/:id/move - Move task to another column
export const moveTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { column_id } = req.body;

  if (!column_id) {
    throw new ApiError(400, "Target column_id is required.");
  }

  const existingTask = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  if (!existingTask) {
    throw new ApiError(404, "Task not found.");
  }

  db.prepare("UPDATE tasks SET column_id = ? WHERE id = ?").run(column_id, id);

  const updatedTask = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  return res.status(200).json(
    new ApiResponse(200, updatedTask, "Task moved successfully")
  );
});