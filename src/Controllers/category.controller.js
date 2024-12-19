import { Category } from "./../models/category.model.js";

// Create a Category
export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res
      .status(201)
      .json({ message: "Category created successfully!", category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Category
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
