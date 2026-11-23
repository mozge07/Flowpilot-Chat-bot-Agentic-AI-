import express from "express";
import { createAgentController } from "../controllers/agent.controller.js";

const router = express.Router();

router.post("/", createAgentController);

export default router;