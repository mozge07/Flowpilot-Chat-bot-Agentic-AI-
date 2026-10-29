import express from "express";
import { supportAgent } from "../services/ai.agent.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid message."
      });
    }

    const result = await supportAgent.invoke({
      messages: [{ role: "user", content: message }]
    });

    const lastMessage = result.messages.at(-1);

    res.json({
      success: true,
      reply: lastMessage.content
    });
  } catch (error) {
    console.error("AI agent error:", error.message);

    res.status(500).json({
      success: false,
      message: "The AI agent could not process your request."
    });
  }
});

export default router;