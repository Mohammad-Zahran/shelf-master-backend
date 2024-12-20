import { Router } from "express";
import { verifyToken } from './../middleware/verifyToken.js';

import {
  createPayment,
  getUserPayments,
  getAllPayments,
  confirmPayment,
  deletePayment,
} from "../controllers/payment.controller.js";

const router = new Router();

router.post("/", createPayment);
router.get("/", verifyToken, getUserPayments);
router.get("/all", getAllPayments);
router.patch("/:id", confirmPayment);
router.delete("/:id", deletePayment);

export default router;
