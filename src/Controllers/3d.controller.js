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

export const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Model ID is required." });
    }

    const deletedModel = await Model3D.findByIdAndDelete(id);

    if (!deletedModel) {
      return res.status(404).json({ message: "Model not found." });
    }

    res
      .status(200)
      .json({ message: "Model deleted successfully.", data: deletedModel });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting model.", error: error.message });
  }
};

export const updateModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, photo, model3D } = req.body;

    // Build the update object dynamically
    const updateData = {};
    if (name) updateData.name = name;
    if (photo) updateData.photo = photo;
    if (model3D) updateData.model3D = model3D;

    const updatedModel = await Model3D.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
    });

    if (!updatedModel) {
      return res.status(404).json({ message: "Model not found." });
    }

    res
      .status(200)
      .json({ message: "Model updated successfully.", data: updatedModel });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating model.", error: error.message });
  }
};

export const getModelById = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await Model3D.findById(id);

    if (!model) {
      return res.status(404).json({ message: "Model not found." });
    }

    res.status(200).json({
      data: {
        name: model.name,
        photo: model.photo,
        model3D: model.model3D,
        photoName: model.photoName || "Unknown", // Add file name
        model3DName: model.model3DName || "Unknown", // Add file name
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching model.", error: error.message });
  }
};
