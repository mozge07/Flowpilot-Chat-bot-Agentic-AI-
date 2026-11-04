
import Conversation from "../models/conversation.model.js";

// Create a new conversation
export const createConversationController = async (req, res) => {
  try {
    const conversation = await Conversation.create({});

    res.status(201).json({
      success: true,
      message: "Conversation created successfully",
      conversation,
    });
  } catch (error) {
    console.error("Create Conversation Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create conversation",
    });
  }
};

// Get all conversations
export const getAllConversationsController = async (req, res) => {
  try {
    const conversations = await Conversation.find()
      .sort({ updatedAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: conversations.length,
      conversations,
    });
  } catch (error) {
    console.error("Get Conversations Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve conversations",
    });
  }
};
