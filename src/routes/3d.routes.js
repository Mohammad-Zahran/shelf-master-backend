import { Router } from "express";
import {
  postModel,
  getAllModels,
  deleteModel,
} from "../Controllers/3d.controller.js";

const router = new Router();

router.post("/", postModel);
router.get("/", getAllModels);
router.delete("/:id", deleteModel);

export default router;
