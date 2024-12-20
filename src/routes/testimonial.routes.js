import { Router } from "express";
import {
  addTestimonial,
  getAllTestimonials
} from "../controllers/testimonial.controller.js";

const router = new Router();

router.post("/", addTestimonial); 
router.get("/",getAllTestimonials);

export default router;
