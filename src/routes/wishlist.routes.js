import { Router } from "express";
import {
  addWishlistItem,
  getWishListItems,
  removeWishlistItem,
} from "../controllers/wishlist.controller.js";

const router = new Router();

router.post("/", addWishlistItem);
router.get("/", getWishListItems);
router.delete('/:id', removeWishlistItem);

export default router;
