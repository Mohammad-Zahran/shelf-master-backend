import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import adminStatsRoutes from "./routes/adminStats.routes.js";
import orderStatsRoutes from "./routes/orderStats.routes.js";
import mostOrderedProductRoutes from "./routes/mostOrderedProducts.routes.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Stripe from "stripe";
import OpenAI from "openai";

const app = express();

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Hello
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@shelf-master-cluster.kfdar.mongodb.net/shelf-master?retryWrites=true&w=majority&appName=shelf-master-cluster"`
  )
  .then(console.log("MongoDB connected Succesfully!"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);
app.use("/reviews", reviewRoutes);
app.use("/category", categoryRoutes);
app.use("/payments", paymentRoutes);
app.use("/wishlists", wishlistRoutes);
app.use("/testimonials", testimonialRoutes);
app.use("/adminStats", adminStatsRoutes);
app.use("/orderStats", orderStatsRoutes);
app.use("/mostOrderedProducts", mostOrderedProductRoutes);

app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",

    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});

// AI configuration
let conversationHistory = [
  { role: "system", content: "You are a helpful assistant" },
];


// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Use 465 if you set `secure: true`
  secure: false, // true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// POST route to send emails
app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Send email
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`, // Sender's email
      to: process.env.EMAIL_USER, // Receiver's email
      subject: subject || "No Subject", // Subject
      text: message || "No Message Provided", // Plain text
      html: `<p>${message || "No Message Provided"}</p>`, // HTML version
    });

    console.log("Message sent: %s", info.messageId);

    res.status(200).json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email.",
      error: error.message,
    });
  }
});
