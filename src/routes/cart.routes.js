import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import {
  addToCart,
  deleteCart,
  updateCart,
  getSingleCart,
  getCartByEmail,
} from "./../controllers/cart.controller.js";

const router = new Router();

router.get("/", getCartByEmail);
router.post("/", addToCart);
router.delete("/:id", deleteCart);
router.put("/:id", updateCart);
router.get("/:id", getSingleCart);

export default router;
