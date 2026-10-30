
import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import FAQ from "../models/faq.model.js";

const seedFAQs = async () => {
  try {
    await connectDB();

    await FAQ.deleteMany({});

    const faqs = [
      {
        question: "How can I reset my password?",
        answer: "Click Forgot Password on the login page.",
        category: "account",
      },
      {
        question: "How can I contact support?",
        answer: "Email support@example.com for assistance.",
        category: "support",
      },
      {
        question: "Can I cancel my subscription?",
        answer: "Open Account Settings and select Manage Subscription.",
        category: "billing",
      },
      {
        question: "How can I update my email address?",
        answer: "Go to Account Settings and update your email address.",
        category: "account",
      },
      {
        question: "How can I request a refund?",
        answer: "Contact our support team to request a refund.",
        category: "billing",
      },
    ];

    const insertedFAQs = await FAQ.insertMany(faqs);

    console.log(`${insertedFAQs.length} FAQs inserted successfully.`);
  } catch (error) {
    console.error("FAQ seeding failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

seedFAQs();
