import { Router } from "express";
import { getBoard } from "../controllers/board.controller.js";

const router = Router();

router.route("/").get(getBoard);

export default router;