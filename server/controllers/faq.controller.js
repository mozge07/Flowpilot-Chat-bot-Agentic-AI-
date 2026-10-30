import mongoose from "mongoose";
import FAQ from "../models/faq.model.js";

// Create FAQ
export const createFaqController = async (req, res) => {
  try {
    const { question, answer, category } = req.body;

    if (!question || !answer || !category) {
      return res.status(400).json({
        success: false,
        message: "Question, answer and category are required",
      });
    }

    const faq = await FAQ.create({
      question,
      answer,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "FAQ created successfully",
      faq,
    });
  } catch (error) {
    console.error("Create FAQ Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create FAQ",
    });
  }
};

// Get all FAQs
export const getAllFaqsController = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: faqs.length,
      faqs,
    });
  } catch (error) {
    console.error("Get FAQs Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch FAQs",
    });
  }
};

// Get FAQ by ID
export const getFaqByIdController = async (req, res) => {
  try {
    const { faqId } = req.params;

    if (!mongoose.isValidObjectId(faqId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid FAQ ID",
      });
    }

    const faq = await FAQ.findById(faqId);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    return res.status(200).json({
      success: true,
      faq,
    });
  } catch (error) {
    console.error("Get FAQ Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch FAQ",
    });
  }
};

export const updateFaqController = async (req, res) => {
  try {
    const { faqId } = req.params;
    const { question, answer, category } = req.body;

    if (!mongoose.isValidObjectId(faqId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid FAQ ID",
      });
    }

    const faq = await FAQ.findByIdAndUpdate(
      faqId,
      { question, answer, category },
      { new: true, runValidators: true }
    );

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "FAQ updated successfully",
      faq,
    });
  } catch (error) {
    console.error("Update FAQ Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update FAQ",
    });
  }
};

export const deleteFaqController = async (req, res) => {
  try {
    const { faqId } = req.params;

    if (!mongoose.isValidObjectId(faqId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid FAQ ID",
      });
    }

    const faq = await FAQ.findByIdAndDelete(faqId);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    console.error("Delete FAQ Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete FAQ",
    });
  }
};