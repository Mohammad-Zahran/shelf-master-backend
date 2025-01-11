import { Router } from "express";
import { postModel } from "../Controllers/3d.controller";

const router = new Router();

router.post("/", postModel);

export default router;
