import { Router } from "express";
import {
  addTestimonial,
} from "../controllers/testimonial.controller.js";

const router = new Router();

router.post("/", addTestimonial); // Add a testimonial

export default router;
