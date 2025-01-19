import { Router } from "express";
import {
  addTestimonial,
  getTestimonials,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial,
} from "../Controllers/testimonial.controller.js";

const router = new Router();

router.post("/", addTestimonial);
router.get("/", getTestimonials);
router.get("/all", getAllTestimonials);
router.put("/:email/:testimonialId", updateTestimonial);
router.delete("/:testimonialId", deleteTestimonial); // Updated to use only testimonialId

export default router;
