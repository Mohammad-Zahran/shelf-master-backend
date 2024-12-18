import { Router } from "express";

import {
  postProductItem,
  getAllProducItems,
  deleteProductItem,
} from "../controllers/product.controller.js";

const router = new Router();

router.post("/", postProductItem);
router.get("/", getAllProducItems);
router.delete("/:id", deleteProductItem);

export default router;
