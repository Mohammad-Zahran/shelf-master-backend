import { User } from "../models/user.model.js";

// get carts using email
export const getCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;

    // Find the user by email and return only the cart field
    const user = await User.findOne({ email: email }).select("cart").exec();

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add to Cart
export const addToCart = async (req, res) => {
  const { email, productId, name, images, material, price, quantity } =
    req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if the product already exists in the user's cart
    const existingCartItem = user.cart.find(
      (item) => item.productId === productId
    );

    if (existingCartItem) {
      return res
        .status(400)
        .json({ message: "Product already exists in the cart!" });
    }

    // Add the new product to the cart
    user.cart.push({ productId, name, images, material, price, quantity });

    // Save the updated user document
    await user.save();

    res.status(201).json({
      message: "Item added to cart successfully!",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Delete Cart Item by cartId
// export const deleteCart = async (req, res) => {
//   const { email } = req.body;
//   const { id: cartId } = req.params;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found!" });
//     }

//     const cartIndex = user.cart.findIndex(
//       (item) => item._id.toString() === cartId
//     );

//     if (cartIndex === -1) {
//       return res.status(404).json({ message: "Cart item not found!" });
//     }

//     user.cart.splice(cartIndex, 1);

//     await user.save();

//     res
//       .status(200)
//       .json({ message: "Cart item deleted successfully!", cart: user.cart });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const deleteCart = async (req, res) => {
  const { id: cartId } = req.params;

  try {
    const user = await User.findOne({ "cart._id": cartId });

    if (!user) {
      return res.status(404).json({ message: "Cart item not found!" });
    }

    // Filter out the cart item
    const originalCartLength = user.cart.length;
    user.cart = user.cart.filter((item) => item._id.toString() !== cartId);

    // If no items were removed, return an error
    if (originalCartLength === user.cart.length) {
      return res.status(404).json({ message: "Cart item not found!" });
    }

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Cart item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCart = async (req, res) => {
  const { id: cartId } = req.params; // Get cart item ID from request params
  const { productId, name, images, material, price, quantity, email } = req.body; // Destructure request body

  try {
    // Find and update the cart item inside the user's cart
    const user = await User.findOneAndUpdate(
      { email, "cart._id": cartId }, // Match user by email and cart item ID
      {
        $set: {
          "cart.$": { productId, name, images, material, price, quantity },
        },
      },
      { new: true, runValidators: true } // Return updated document and validate
    );

    if (!user) {
      return res.status(404).json({ message: "Cart item not found!" });
    }

    res.status(200).json({
      message: "Cart item updated successfully!",
      cart: user.cart, // Return updated cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Get Single Cart Item
// export const getSingleCart = async (req, res) => {
//   const { email } = req.body;
//   const { id: cartId } = req.params;

//   try {
//     const user = await User.findOne(
//       { email, "cart._id": cartId },
//       { "cart.$": 1 }
//     );

//     if (!user || !user.cart || user.cart.length === 0) {
//       return res.status(404).json({ message: "Cart item not found!" });
//     }

//     res.status(200).json({ cart: user.cart[0] });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getSingleCart = async (req, res) => {
  const { id: cartId } = req.params;

  try {
    // Find the user containing the cart item with the given ID
    const user = await User.findOne(
      { "cart._id": cartId },
      { "cart.$": 1 } // Only retrieve the matching cart item
    );

    if (!user || !user.cart || user.cart.length === 0) {
      return res.status(404).json({ message: "Cart item not found!" });
    }

    res.status(200).json({ cart: user.cart[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
