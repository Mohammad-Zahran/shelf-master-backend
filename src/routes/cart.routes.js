import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import {
  addToCart,
  deleteCart,
  updateCart,
  getSingleCart,
  getCartByEmail,
} from "./../Controllers/cart.controller.js";

const router = new Router();

router.get("/", verifyToken, getCartByEmail);
router.post("/", addToCart);
router.delete("/:id", deleteCart);
router.put("/:id", updateCart);
router.get("/:id", getSingleCart);

export default router;
