import { Router } from "express";
import { verifyToken } from './../middleware/verifyToken.js';

import {
  createPayment,
  getUserPayments,
  getAllPayments,
} from "../controllers/payment.controller.js";

const router = new Router();

router.post("/", createPayment);
router.get("/", verifyToken, getUserPayments);
router.get("/all", getAllPayments);

export default router;
