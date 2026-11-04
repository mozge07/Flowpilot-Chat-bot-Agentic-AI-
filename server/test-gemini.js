import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: process.env.GEMINI_MODEL,
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.2,
});

async function testGemini() {
  try {
    const start = Date.now();

    const response = await model.invoke(
      "Explain what an AI agent is in two sentences."
    );

    console.log("Gemini response:", response.content);
    console.log("Execution time:", Date.now() - start, "ms");
  } catch (error) {
    console.error("Gemini error:", error.message);
  }
}

testGemini();