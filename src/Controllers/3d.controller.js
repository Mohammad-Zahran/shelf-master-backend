import { Model3D } from "../models/3d.model.js";

export const postModel = async (req, res) => {
  try {
    const { name, photo, model3D } = req.body;

    if (!name || !photo || !model3D) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newModel = new Model3D({
      name,
      photo,
      model3D,
    });

    const savedModel = await newModel.save();

    res
      .status(201)
      .json({ message: "3D model created successfully.", data: savedModel });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating 3D model.", error: error.message });
  }
};

export const getAllModels = async (req, res) => {
  try {
    const models = await Model3D.find();

    if (!models || models.length === 0) {
      return res.status(404).json({ message: "No models found." });
    }

    res
      .status(200)
      .json({ message: "Models fetched successfully.", data: models });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching models.", error: error.message });
  }
};
