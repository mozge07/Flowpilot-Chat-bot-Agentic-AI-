import express from "express";
import { 
    createAgentController, 
    getAllAgentController,
    getAgentByIdController,
    updateAgentController,
    deleteAgentController
} from "../controllers/agent.controller.js";

const router = express.Router();

router.post("/", createAgentController);
router.get("/", getAllAgentController);
router.get("/:agentId", getAgentByIdController);
router.put("/:agentId", updateAgentController);
router.delete("/:agentId", deleteAgentController);

export default router;