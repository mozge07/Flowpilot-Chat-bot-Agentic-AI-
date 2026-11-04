
import mongoose from "mongoose";
import { supportAgent } from "../services/ai.agent.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const chatController = async (req, res) => {
  try {
    const { conversationId, message } = req.body;

    if (!conversationId || !message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        message: "conversationId and message are required.",
      });
    }

    if (!mongoose.isValidObjectId(conversationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation ID.",
      });
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }

    const previousMessages = await Message.find({ conversationId })
      .sort({ createdAt: 1 })
      .lean();

    await Message.create({
      conversationId,
      role: "user",
      content: message,
    });

    const agentMessages = [
      ...previousMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user",
        content: message,
      },
    ];

    const result = await supportAgent.invoke({
      messages: agentMessages,
    });

    const lastMessage = result.messages.at(-1);

    await Message.create({
      conversationId,
      role: "assistant",
      content: lastMessage.content,
    });

    conversation.updatedAt = new Date();
    await conversation.save();

    res.status(200).json({
      success: true,
      reply: lastMessage.content,
    });

  } catch (error) {
    console.error("AI agent error:", error.message);

    res.status(500).json({
      success: false,
      message: "The AI agent could not process your request.",
    });
  }
};
