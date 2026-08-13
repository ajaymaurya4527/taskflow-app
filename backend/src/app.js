import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Route Imports
import boardRouter from "./routes/board.routes.js";
import taskRouter from "./routes/task.routes.js";
import analyticsRouter from "./routes/analytics.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

// Route Declarations
app.use("/api/board", boardRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/analytics", analyticsRouter);

// Global Error Handler Middleware
app.use(errorHandler);

export { app };