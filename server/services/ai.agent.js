import "dotenv/config";
import { createAgent } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { searchFaq } from "../tools/faq.tools.js";

const model = new ChatGoogleGenerativeAI({
  model: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.2
});

export const supportAgent = createAgent({
  model,
  tools: [searchFaq],
  systemPrompt: `
    You are FlowPilot, a customer support agent.
    Use the search_faq tool when the customer asks about account
    support, passwords, or subscriptions.
    Answer clearly using the tool results.
    Never invent company policies or FAQ answers.
    If no answer is found, direct the customer to contact support.
  `
});