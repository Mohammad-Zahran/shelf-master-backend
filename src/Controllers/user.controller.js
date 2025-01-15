import { User } from "../models/user.model.js";

// register
export const register = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  const defaultPhotoURL = "https://example.com/default-profile-pic.png"; // Replace with your default profile picture URL

  try {
    const existingUser = await User.findOne(query);
    if (existingUser) {
      return res.status(302).json({ message: "User already exists!" });
    }

    // Add default photoURL if not provided
    if (!user.photoURL) {
      user.photoURL = defaultPhotoURL;
    }

    const result = await User.create(user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a user
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get admin
export const getAdmin = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  try {
    const user = await User.findOne(query);

    if (email !== req.decoded.email) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    let admin = false;
    if (user) {
      admin = user?.role === "admin";
    }
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// make admin of a user
export const makeAdmin = async (req, res) => {
  const userId = req.params.id;
  const {name, email, photoURL, role} = req.body;
  try {
      const updatedUser = await User.findByIdAndUpdate(
          userId, 
          {role: "admin"},
          {new: true, runValidators: true}
      );

      if(!updatedUser){
          return res.status(404).json({message: "User not found"})
      }
      res.status(200).json(updatedUser)
      
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

export const updateProfile = async (req, res) => {
  const { email, name, photoURL } = req.body;

  try {
    // Validate request body
    if (!email || !name || !photoURL) {
      return res.status(400).json({ message: "Email, name, and photoURL are required!" });
    }

    // Find the user by email and update
    const updatedUser = await User.findOneAndUpdate(
      { email }, // Query by email
      { name, photoURL },
      { new: true, runValidators: true } // Return updated user and validate inputs
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ message: "Profile updated successfully!", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: error.message });
  }
};
