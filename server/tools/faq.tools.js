import { tool } from "langchain";
import { z } from "zod";

const faqs = [
  {
    question: "How can I reset my password?",
    answer: "Click Forgot Password on the login page."
  },
  {
    question: "How can I contact support?",
    answer: "Email support@example.com for assistance."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Open Account Settings and select Manage Subscription."
  }
];

export const searchFaq = tool(
  async ({ query }) => {
    const words = query.toLowerCase().split(" ").filter((w) => w.length > 3);

const results = faqs.filter((faq) =>
  words.some((word) =>
    `${faq.question} ${faq.answer}`.toLowerCase().includes(word)
  )
);

    if (results.length === 0) {
      return "No matching FAQ found. Tell the customer to contact support.";
    }

    return JSON.stringify(results);
  },
  {
    name: "search_faq",
    description:
      "Search the customer support FAQ for answers about passwords, support contact, and subscriptions.",
    schema: z.object({
      query: z.string().describe("The customer's question or search terms")
    })
  }
);