import { Router } from "express";

import {
    createCategory,
} from "../controllers/category.controller.js"

const router = new Router();

router.post("/",createCategory);

export default router;