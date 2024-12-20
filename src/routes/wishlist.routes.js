import { Router } from "express";
import {
  addWishlistItem,
  getWishListByEmail,
  removeWishlistItem,
} from "../controllers/wishlist.controller.js";

const router = new Router();

router.post("/", addWishlistItem);
router.get("/", getWishListByEmail);
router.delete('/:id', removeWishlistItem);

export default router;
