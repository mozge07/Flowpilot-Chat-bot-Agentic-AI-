
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Generate embedding for any text
export async function generateEmbedding(text) {
  const result = await ai.models.embedContent({
    model: "gemini-embedding-2",
    contents: text,
    config: {
      outputDimensionality: 768,
    },
  });

  return result.embeddings[0].values;
}

// Generate embedding specifically for an FAQ
export async function generateFaqEmbedding(faq) {
  const text = `
    Question: ${faq.question}
    Answer: ${faq.answer}
    Category: ${faq.category}
  `;

  return await generateEmbedding(text);
}
