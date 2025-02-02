import OpenAI from "openai";
import dotenv from "dotenv";
import { Product } from "../models/product.model.js";

dotenv.config({ path: "./.env" });

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the base system prompt
const systemPrompt = `
You are Shelfie, a helpful assistant specializing in recommending shelves. 
Users will provide their budget and specific needs for the shelf, such as dimensions, material, intended use, or aesthetic preferences. 
Based on this information, recommend the best shelves available on Shelf Master, an e-commerce website for selling shelves. 

When making a recommendation:
- Ensure the recommendations are concise, clear, and relevant to the user's specific needs.
- Explain why the recommended shelf is the best choice based on the user's criteria (e.g., budget, materials, dimensions, durability, or style).
- Highlight key features of the shelf, such as material, durability, load capacity, design, and functionality.

If a recommendation corresponds to a product on Shelf Master, include the direct link to the product details page in the following format:
"You can view more details [here](http://localhost:${process.env.FRONTEND_PORT}/products/<product_id>)". Always use the exact product ID when generating links.

Be helpful and insightful in your responses, ensuring users fully understand why the recommendation suits their requirements.
`;

export const askAI = async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Format the product data as a list
    const productContext = products
      .map(
        (product) =>
          `- ${product.name}: [http://localhost:${process.env.FRONTEND_PORT}/products/${product._id}]`
      )
      .join("\n");

    // Extend the system prompt with the product list
    const extendedPrompt = `
      ${systemPrompt}

      Here is the list of available products on Shelf Master:
      ${productContext}
    `;

    // Define the conversation history
    const conversationHistory = [
      { role: "system", content: extendedPrompt },
      { role: "user", content: userMessage },
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      messages: conversationHistory,
      model: "gpt-3.5-turbo",
    });

    // Extract the AI response
    const aiResponse = completion.choices[0].message.content;

    // Send the AI response back to the user
    res.status(200).json({ message: aiResponse });
  } catch (error) {
    console.error("Error generating response from OpenAI:", error);
    res.status(500).json({
      message: "Error generating response from OpenAI",
      error: error.message,
    });
  }
};
