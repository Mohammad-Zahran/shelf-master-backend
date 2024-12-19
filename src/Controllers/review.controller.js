import { Product } from "./../models/product.model.js";

// Add a new review
export const addReview = async (req, res) => {
  try {
    const { productId, userId, userName, rating, comment } = req.body;

    if (!productId || !userId || !userName || !rating) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided!" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    const newReview = { userId, userName, rating, comment };
    product.reviews.push(newReview);

    await product.save();

    res
      .status(201)
      .json({ message: "Review added successfully!", review: newReview });
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

// get Average Rating of a Product

export const getAverageRating = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    const totalReviews = product.reviews.length;

    if (totalReviews === 0) {
      return res.status(200).json({ averageRating: 0 });
    }

    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / totalReviews;

    res.status(200).json({ averageRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
