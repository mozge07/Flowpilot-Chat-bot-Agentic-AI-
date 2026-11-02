
import { tool } from "langchain";
import { z } from "zod";
import { generateEmbedding } from "../services/embedding.service.js";
import { searchSimilarFaqs } from "../services/vectorSearch.service.js";

export const searchFaq = tool(
  async ({ query }) => {
    try {
      console.log("FAQ Search Query:", query);

      // Generate embedding for the customer's question
      const queryEmbedding = await generateEmbedding(query);

      // Search for similar FAQs using vector search
      const results = await searchSimilarFaqs(queryEmbedding);

      console.log("FAQ Results Found:", results.length);

      if (results.length === 0) {
        return "No matching FAQ found. Tell the customer to contact support.";
      }

      return JSON.stringify(results);
    } catch (error) {
      console.error("FAQ Search Error:", error.message);
      return "An error occurred while searching the FAQ database.";
    }
  },
  {
    name: "search_faq",
    description:
      "Search customer FAQs using semantic similarity for questions about passwords, support, subscriptions, refunds, and account settings.",
    schema: z.object({
      query: z.string().describe("The customer's question to search for."),
    }),
  }
);
