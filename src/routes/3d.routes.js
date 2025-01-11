import { Router } from "express";
import {
  postModel,
  getAllModels,
  deleteModel,
  updateModel,
} from "../Controllers/3d.controller.js";

const router = new Router();

router.post("/", postModel);
router.get("/", getAllModels);
router.delete("/:id", deleteModel);
router.put("/:id", updateModel);

export default router;
