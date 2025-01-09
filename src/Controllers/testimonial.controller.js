import { User } from "../models/user.model.js";

export const addTestimonial = async (req, res) => {
  const { email, name, rating, comment } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const testimonial = { name, rating, comment, createdAt: new Date() };

    user.testimonials.push(testimonial);
    await user.save();

    res
      .status(200)
      .json({ message: "Testimonial added successfully", testimonial });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all testimonials across all users
export const getAllTestimonials = async (req, res) => {
  try {
    const users = await User.find({}, "photoURL testimonials"); // Fetch only photoURL and testimonials

    const allTestimonials = users
      .map((user) =>
        user.testimonials.map((testimonial) => ({
          ...testimonial.toObject(), // Convert testimonial to plain object
          photoURL: user.photoURL, // Include user's photoURL
        }))
      )
      .flat();

    res.status(200).json(allTestimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all testimonials for a user
export const getTestimonials = async (req, res) => {
  const email = req.query.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a testimonial
export const updateTestimonial = async (req, res) => {
  const { email, testimonialId } = req.params;
  const updatedTestimonial = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const testimonial = user.testimonials.id(testimonialId);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    Object.assign(testimonial, updatedTestimonial);
    await user.save();

    res.status(200).json({ message: "Testimonial updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  const { testimonialId } = req.params;

  try {
    // Find the user containing the testimonial
    const user = await User.findOne({ "testimonials._id": testimonialId });

    if (!user) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // Find the index of the testimonial
    const testimonialIndex = user.testimonials.findIndex(
      (testimonial) => testimonial._id.toString() === testimonialId
    );

    if (testimonialIndex === -1) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // Remove the testimonial
    user.testimonials.splice(testimonialIndex, 1);
    await user.save();

    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

