import dotenv from "dotenv";
import mongoose from "mongoose";
import { generateEmbedding } from "./services/embedding.service.js";
import { searchSimilarFaqs } from "./services/vectorSearch.service.js";

dotenv.config();

async function testVectorSearch() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const question = "How can I change my email address?";

    const queryEmbedding = await generateEmbedding(question);

    const results = await searchSimilarFaqs(queryEmbedding);

    console.log("Search results:", results);
  } catch (error) {
    console.error("Vector search error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

testVectorSearch();
