import { Router } from "express";
import { postModel } from "../Controllers/3d.controller.js";

const router = new Router();

router.post("/", postModel);

export default router;
