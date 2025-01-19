import { Router } from "express";

import {
  postProductItem,
  getAllProducItems,
  deleteProductItem,
  singleProductItem,
  updateProductItem,
  assignCategoryToProduct,
  getPopularProducts,
} from "../controllers/product.controller.js";

const router = new Router();

router.post("/", postProductItem);
router.get("/", getAllProducItems);
router.get("/popular", getPopularProducts);
router.delete("/:id", deleteProductItem);
router.get("/:id", singleProductItem);
router.patch("/:id", updateProductItem);
router.patch("/:productId/category", assignCategoryToProduct);

export default router;
