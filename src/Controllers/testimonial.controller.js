import { User } from "../models/user.model.js";

// Add a testimonial
export const addTestimonial = async (req, res) => {
  const { email, testimonial } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.testimonials.push(testimonial);
    await user.save();

    res.status(200).json({ message: "Testimonial added successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all testimonials across all users
export const getAllTestimonials = async (req, res) => {
  try {
    const users = await User.find({}, "testimonials");
    const allTestimonials = users.map((user) => user.testimonials).flat();

    res.status(200).json(allTestimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
