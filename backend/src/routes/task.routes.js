import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  moveTask
} from "../controllers/task.controller.js";

const router = Router();

router.route("/").get(getTasks).post(createTask);
router.route("/:id").put(updateTask).delete(deleteTask);
router.route("/:id/move").patch(moveTask);

export default router;