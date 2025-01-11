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
