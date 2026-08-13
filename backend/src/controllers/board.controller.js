import db from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// GET /api/board - Fetches board with columns & nested tasks
export const getBoard = asyncHandler(async (req, res) => {
  const board = db.prepare("SELECT * FROM boards LIMIT 1").get();

  if (!board) {
    throw new ApiError(404, "Board not found. Please run seed script.");
  }

  const columns = db.prepare("SELECT * FROM columns WHERE board_id = ? ORDER BY position ASC").all(board.id);
  const tasks = db.prepare(`
    SELECT t.* 
    FROM tasks t
    JOIN columns c ON t.column_id = c.id
    WHERE c.board_id = ?
    ORDER BY t.created_at DESC
  `).all(board.id);

  const formattedColumns = columns.map((col) => ({
    ...col,
    tasks: tasks.filter((task) => task.column_id === col.id)
  }));

  return res.status(200).json(
    new ApiResponse(200, { ...board, columns: formattedColumns }, "Board retrieved successfully")
  );
});