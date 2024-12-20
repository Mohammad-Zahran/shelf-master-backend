import { Router } from "express";
import {
  addWishlistItem,
  getWishListItems,
} from "../controllers/wishlist.controller.js";

const router = new Router();

router.post("/", addWishlistItem);
router.get("/", getWishListItems);

export default router;
