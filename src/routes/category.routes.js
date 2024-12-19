import { Router } from "express";

import {
  createCategory,
  getCategories,
  getCategoryById,
} from "../controllers/category.controller.js";

const router = new Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);

export default router;
