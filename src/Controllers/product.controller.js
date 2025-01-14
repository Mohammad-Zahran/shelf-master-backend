import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { Payment } from "../models/payment.model.js";

// post a new product item
export const postProductItem = async (req, res) => {
  const newItem = req.body;
  try {
    const result = await Product.create(newItem);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all productItems
export const getAllProducItems = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a product item
export const deleteProductItem = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedItem = await Product.findByIdAndDelete(productId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product Item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single product item
export const singleProductItem = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update single product item
export const updateProductItem = async (req, res) => {
  const productId = req.params.id;
  const {
    name,
    description,
    images,
    category,
    dimensions,
    material,
    loadCapacity,
    price,
    stock,
  } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        images,
        category,
        dimensions,
        material,
        loadCapacity,
        price,
        stock,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Updated assignCategoryToProduct function
export const assignCategoryToProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { categoryId } = req.body;

    const product = await Product.findById(productId);
    const category = await Category.findById(categoryId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }

    // Check if the category ID is valid according to the enum
    if (
      !["Heavy-Duty", "Adjustable", "Wall-Mounted", "Freestanding"].includes(
        category.name
      )
    ) {
      return res.status(400).json({ message: "Invalid category type!" });
    }

    product.category = categoryId;
    await product.save();

    res
      .status(200)
      .json({ message: "Category assigned to product successfully!", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get popular products (based on number of reviews)
export const getPopularProducts = async (req, res) => {
  try {
    const popularProducts = await Product.aggregate([
      {
        $project: {
          name: 1,
          price: 1,
          images: 1,
          reviewsCount: { $size: "$reviews" }, // Count number of reviews for each product
        },
      },
      { $sort: { reviewsCount: -1 } }, // Sort by number of reviews in descending order
      { $limit: 5 }, // Get the top 5 most reviewed products
    ]);

    // Check if popular products exist
    if (!popularProducts.length) {
      return res.status(404).json({ message: "No popular products found!" });
    }

    // Send the popular products as a response
    res.status(200).json(popularProducts);
  } catch (error) {
    console.error("Error fetching popular products:", error.message); // Debugging log
    res
      .status(500)
      .json({ message: "Error fetching popular products: " + error.message });
  }
};
