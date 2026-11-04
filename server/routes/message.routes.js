import express from "express";

import {
  createMessageController,
  getConversationMessagesController,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", createMessageController);
router.get("/:conversationId", getConversationMessagesController);

export default router;
