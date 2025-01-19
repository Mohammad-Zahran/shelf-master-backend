import { User } from "../models/user.model.js";

// Add an item to the wishlist
export const addWishlistItem = async (req, res) => {
  const { email, product } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishlist.push(product);
    await user.save();

    res.status(200).json({ message: "Product added to wishlist", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all wishlist items
export const getWishListByEmail = async (req, res) => {
  try {
    const email = req.query.email;

    // Find the user by email and return only the cart field
    const user = await User.findOne({ email: email }).select("wishlist").exec();

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeWishlistItem = async (req, res) => {
  const { id: wishListId } = req.params;

  try {
    const user = await User.findOne({ "wishlist._id": wishListId });

    if (!user) {
      return res.status(404).json({ message: "WishList item not found!" });
    }

    // Filter out the cart item
    const originalWishListLength = user.wishlist.length;
    user.wishlist = user.wishlist.filter((item) => item._id.toString() !== wishListId);

    // If no items were removed, return an error
    if (originalWishListLength === user.wishlist.length) {
      return res.status(404).json({ message: "WishList item not found!" });
    }

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "WishList item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleWishlistItem = async (req, res) => {
  const { email, product } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingIndex = user.wishlist.findIndex(
      (item) => item._id.toString() === product._id
    );

    if (existingIndex !== -1) {
      user.wishlist.splice(existingIndex, 1); // Remove item
      await user.save();
      return res.status(200).json({ message: "Item removed from wishlist" });
    }

    user.wishlist.push(product); // Add item
    await user.save();
    res.status(200).json({ message: "Item added to wishlist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleWishList = async (req, res) => {
  const { id: wishlistId } = req.params;

  try {
    // Find the user containing the cart item with the given ID
    const user = await User.findOne(
      { "wishlistId._id": wishlistId },
      { "wishlistId.$": 1 } // Only retrieve the matching cart item
    );

    if (!user || !user.wishlist || user.wishlist.length === 0) {
      return res.status(404).json({ message: "WishList item not found!" });
    }

    res.status(200).json({ wishlist: user.wishlist[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
