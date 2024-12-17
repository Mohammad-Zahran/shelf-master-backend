import User from "../models/user.model.js"

// post a new user
const createUser = async (req, res) => {
    const user = req.body;
    const query = { email: user.email };
    try {
      const existingUser = await User.findOne(query);
      if (existingUser) {
        return res.status(302).json({ message: "User already exists!" });
      }
      const result = await User.create(user);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    createUser
  };

