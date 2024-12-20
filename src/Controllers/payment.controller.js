import { Payment } from "../models/payment.model.js";
import { User } from "../models/user.model.js";

// post payment to inform to db
export const createPayment = async (req, res) => {
  const paymentData = req.body;

  try {
    const user = await User.findOne({ email: paymentData.email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newPayment = await Payment.create(paymentData);

    user.cart = [];
    await user.save();

    res.status(200).json({
      message: "Payment recorded and cart cleared successfully.",
      payment: newPayment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};

// Get payments for a user
export const getUserPayments = async (req, res) => {
  const email = req.query.email;
  const query = { email: email };

  try {
    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      res.status(403).json({ message: "Forbidden Access" });
    }
    const result = await Payment.find(query).sort({ createdAt: -1 }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get all payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).sort({ createdAt: -1 }).exec();
    res.status(200).json(payments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// confirm payments status
export const confirmPayment = async (req, res) => {
  const payId = req.params.id;
  const { status } = req.body;
  try {
    const updatedStatus = await Payment.findByIdAndUpdate(
      payId,
      { status: "confirmed" },
      { new: true, runValidators: true }
    );

    if (!updatedStatus) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
