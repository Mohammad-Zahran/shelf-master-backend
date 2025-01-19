import { Router } from "express";
import { askAI } from "./../Controllers/ai.controller.js";

const router = new Router();

router.post("/ask", askAI);

export default router;
