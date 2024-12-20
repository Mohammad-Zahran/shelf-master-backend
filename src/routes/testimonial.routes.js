import { Router } from "express";
import {
  addTestimonial,
  getAllTestimonials,
  updateTestimonial,
} from "../controllers/testimonial.controller.js";

const router = new Router();

router.post("/", addTestimonial); 
router.get("/",getAllTestimonials);
router.put("/:email/:testimonialId", updateTestimonial); 

export default router;
