import { Router } from "express";
import { getTasksCountPerColumn } from "../controllers/analytics.controller.js";

const router = Router();

router.route("/tasks-count").get(getTasksCountPerColumn);

export default router;