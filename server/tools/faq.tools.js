
import { tool } from "langchain";
import { z } from "zod";
import FAQ from "../models/faq.model.js";

export const searchFaq = tool(
  async ({ query }) => {
    try {
      console.log("FAQ Search Query:", query);

      // Split the query into individual words
      const searchTerms = query
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      // Escape special regex characters
      const searchConditions = searchTerms.map((term) => {
        const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        return {
          $or: [
            { question: { $regex: safeTerm, $options: "i" } },
            { answer: { $regex: safeTerm, $options: "i" } },
            { category: { $regex: safeTerm, $options: "i" } },
          ],
        };
      });

      // Every search term must match at least one field
      const results = await FAQ.find({
        $and: searchConditions,
      })
        .limit(5)
        .lean();

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
      "Search customer FAQs using keywords from questions about passwords, support, subscriptions, refunds, and account settings.",
    schema: z.object({
      query: z.string().describe("Keywords to search in the FAQ database."),
    }),
  }
);
