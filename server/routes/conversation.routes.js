
import express from "express";

import {
  createConversationController,
  getAllConversationsController,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.post("/", createConversationController);
router.get("/", getAllConversationsController);

export default router;
