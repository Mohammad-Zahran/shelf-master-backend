import { Product } from "./../models/product.model.js";
import { User } from "./../models/user.model.js";

export const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { email, rating, comment } = req.body;

    // Validate inputs
    if (!email || !rating || !comment) {
      return res.status(400).json({ message: "Email, rating, and comment are required!" });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5!" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // Check if the user has already reviewed this product
    const existingReview = product.reviews.find((review) => review.userId === user._id.toString());
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product." });
    }

    // Create the new review
    const newReview = {
      userId: user._id,
      userName: user.name,
      rating: Number(rating),
      comment,
    };
    product.reviews.push(newReview);

    // Save the product with the new review
    await product.save();

    res.status(201).json({ message: "Review added successfully!", review: newReview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get All Reviews
export const getReviews = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).json({ reviews: product.reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a specific review
export const getReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    const review = product.reviews.id(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found!" });
    }

    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update Reviews
export const updateReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const { rating, comment } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    const review = product.reviews.id(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found!" });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await product.save();

    res.status(200).json({ message: "Review updated successfully!", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete Review
export const deleteReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    product.reviews = product.reviews.filter(
      (review) => review._id.toString() !== reviewId
    );

    await product.save();

    res.status(200).json({ message: "Review deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Average Rating
export const getAverageRating = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    const totalReviews = product.reviews.length;
    if (totalReviews === 0) {
      return res.status(200).json({ averageRating: 0 });
    }

    const totalRating = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRating / totalReviews;

    res.status(200).json({ averageRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
