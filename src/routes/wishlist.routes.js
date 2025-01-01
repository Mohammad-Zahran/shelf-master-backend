import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addWishlistItem,
  getWishListByEmail,
  removeWishlistItem,
  toggleWishlistItem, // Import the toggleWishlistItem function

} from "../controllers/wishlist.controller.js";

const router = new Router();

router.post("/", addWishlistItem);
router.post("/toggle", toggleWishlistItem); // Toggle item in wishlist
router.get("/", getWishListByEmail);
router.delete('/:id', removeWishlistItem);

export default router;
