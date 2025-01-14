import { Router } from "express";
import {
  postModel,
  getAllModels,
  deleteModel,
  updateModel,
  getModelById,
} from "../Controllers/3d.controller.js";

const router = new Router();

router.post("/", postModel);
router.get("/", getAllModels);
router.get("/:id",getModelById);
router.delete("/:id", deleteModel);
router.put("/:id", updateModel);


export default router;
