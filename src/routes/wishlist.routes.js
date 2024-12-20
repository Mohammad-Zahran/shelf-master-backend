import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addWishlistItem,
  getWishListByEmail,
  removeWishlistItem,
} from "../controllers/wishlist.controller.js";

const router = new Router();

router.post("/", addWishlistItem);
router.get("/", verifyToken, getWishListByEmail);
router.delete('/:id', removeWishlistItem);

export default router;
