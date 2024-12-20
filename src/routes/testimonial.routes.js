import { Router } from "express";
import {
  addTestimonial,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial
} from "../controllers/testimonial.controller.js";

const router = new Router();

router.post("/", addTestimonial); 
router.get("/",getAllTestimonials);
router.put("/:email/:testimonialId", updateTestimonial);
router.delete("/:email/:testimonialId", deleteTestimonial);

export default router;
