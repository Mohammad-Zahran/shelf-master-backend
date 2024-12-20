import {Router} from "express";
import { addWishlistItem } from "../controllers/wishlist.controller.js";

const router = new Router();

router.post("/", addWishlistItem);

export default router;
