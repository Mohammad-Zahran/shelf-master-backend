import OpenAI from "openai";
import dotenv from "dotenv";
import { Product } from "../models/product.model.js";

dotenv.config({ path: "./.env" });

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define conversation history
let conversationHistory = [
  {
    role: "system",
    content:
      "You are Shelfie, a helpful assistant specializing in recommending shelves. Users will provide their budget and specific needs for the shelf, such as dimensions, material, or intended use. Based on this information, suggest the best shelves available on Shelf Master, an e-commerce website for selling shelves. Ensure the recommendations are concise, clear, and relevant.",
  },
];

// Controller for interacting with OpenAI
export const askAI = async (req, res) => {
  const userMessage = req.body.message;

  // Update conversation history
  conversationHistory.push({ role: "user", content: userMessage });

  try {
    const completion = await openai.chat.completions.create({
      messages: conversationHistory,
      model: "gpt-3.5-turbo",
    });

    // Extract and send the response
    const aiResponse = completion.choices[0].message.content;
    res.status(200).json({ message: aiResponse });
  } catch (error) {
    res.status(500).json({
      message: "Error generating response from OpenAI",
      error: error.message,
    });
  }
};
