import { Category } from "./../models/category.model.js";

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
