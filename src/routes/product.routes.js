import { Router } from "express";

import {
  postProductItem,
  getAllProducItems,
  deleteProductItem,
  singleProductItem,
} from "../controllers/product.controller.js";

const router = new Router();

router.post("/", postProductItem);
router.get("/", getAllProducItems);
router.delete("/:id", deleteProductItem);
router.get("/:id", singleProductItem);

export default router;
