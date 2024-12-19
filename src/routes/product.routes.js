import { Router } from "express";

import {
  postProductItem,
  getAllProducItems,
  deleteProductItem,
  singleProductItem,
  updateProductItem,
} from "../controllers/product.controller.js";

const router = new Router();

router.post("/", postProductItem);
router.get("/", getAllProducItems);
router.delete("/:id", deleteProductItem);
router.get("/:id", singleProductItem);
router.patch("/:id", updateProductItem);

export default router;
