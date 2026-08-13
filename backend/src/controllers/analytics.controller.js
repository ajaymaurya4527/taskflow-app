import db from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// GET /api/analytics/tasks-count
// REQUIRED CUSTOM QUERY 2: Count of tasks per column on a board
export const getTasksCountPerColumn = asyncHandler(async (req, res) => {
  const query = `
    SELECT 
      c.id AS column_id,
      c.name AS column_name,
      COUNT(t.id) AS task_count
    FROM columns c
    LEFT JOIN tasks t ON c.id = t.column_id
    GROUP BY c.id, c.name
    ORDER BY c.position ASC;
  `;

  const results = db.prepare(query).all();

  return res.status(200).json(
    new ApiResponse(200, results, "Tasks count per column fetched successfully")
  );
});