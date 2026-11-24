import express from "express";
import { 
    createAgentController, 
    getAllAgentController,
    getAgentByIdController 
} from "../controllers/agent.controller.js";

const router = express.Router();

router.post("/", createAgentController);
router.get("/", getAllAgentController);
router.get("/:agentId", getAgentByIdController);

export default router;