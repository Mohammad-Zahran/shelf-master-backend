import { Router } from "express";
import { postModel, getAllModels } from "../Controllers/3d.controller.js";

const router = new Router();

router.post("/", postModel);
router.get("/",getAllModels);


export default router;
