import Agent from "../models/agent.model.js";
import mongoose from "mongoose";

// Create a New AI Agent
export const createAgentController = async (req, res) => {
    try{

        if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
            return res.status(400).json({
                success: false,
                message: "Invalid request body"
            });
        }

        const {
            name,
            description,
            type,
            agentRole,
            instructions,
            selectedFaqs,
            selectedDocuments,
            avatar,
            primaryColor,
            welcomeMessage,
            widgetPosition,
        } = req.body;

        if (
            typeof name !== "string" || !name.trim() ||
            typeof description !== "string" || !description.trim() ||
            typeof agentRole !== "string" || !agentRole.trim() ||
            typeof instructions !== "string" || !instructions.trim()
        ) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Please provide all required agent fields"
                }
            );
        }

        const allowedTypes = ["support", "sales", "faq"];

        if (!allowedTypes.includes(type)){
            return res.status(400).json({
                success: false,
                message: "Invalid Agent type"
            });
        }

        if (
            !Array.isArray(selectedFaqs) ||
            !Array.isArray(selectedDocuments)
        ) {
            return res.status(400).json({
                success: false,
                message: "FAQ and document selections must be arrays"
            });
        }

        if (selectedFaqs.length === 0 && selectedDocuments.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Select atleast one FAQ or Document"
            });
        }

        const hasInvalidSelection = [...selectedFaqs, ...selectedDocuments].some(
            (id) => typeof id !=="string" || !id.trim()
        );

        if (hasInvalidSelection) {
            return res.status(400).json({
                success: false,
                message: "Invalid FAQ or document selection"
            });
        }

        const allowedAvatars = ["🤖", "💬", "🎧", "✨"];

        const allowedColors = [
            "#7546DB",
            "#16A34A",
            "#2563EB",
            "#DB2777",
            "#EA580C",
        ];

        const allowedPositions = ["bottom-right", "bottom-left"];

        if (avatar !== undefined && 
            (typeof avatar !== "string" || (avatar && !allowedAvatars.includes(avatar)))
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid avatar selection"
            });
        }

        if ( 
            primaryColor !== undefined && 
            (typeof primaryColor !== "string" || !allowedColors.includes(primaryColor))
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid primary color"
            });
        }

        if (
            widgetPosition !== undefined && 
            (typeof widgetPosition !== "string" || !allowedPositions.includes(widgetPosition))
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid widget position"
            });
        }

        if (
            welcomeMessage !== undefined && 
            typeof welcomeMessage !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Welcome message must be a string"
            });
        }

        const agent = await Agent.create({
            name,
            description,
            type,
            agentRole,
            instructions,
            selectedFaqs,
            selectedDocuments,
            avatar,
            primaryColor,
            welcomeMessage,
            widgetPosition
        });

        return res.status(201).json({
            success: true,
            message: "Agent Created Successfully",
            agent
        });

    } catch (error) {
        console.error("Create Agent Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to create Agent"
        });
    }
};

// Get all AI Agent

export const getAllAgentController = async (req, res) => {
    try {
        const agents = await Agent.find();

        return res.status(200).json({
            success: true,
            message: "Agent Fetched Successfully",
            agents
        });
    } catch(error){
        console.error("Get all Agents Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch Agents"
        });
    }
}

// Use: Get Agent by id:
// Method : GET
// /api/agents/:agentId

export const getAgentByIdController = async (req, res) => {
    try {
        const { agentId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(agentId)) {
            return res.status(400).json({
                success: false,
                message: "Ivalid Agent ID"
            });
        }

        const agent = await Agent.findById(agentId);

        if (!agent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Agent Fetch Successfully",
            agent
        });

    } catch(error) {
        console.error("Get Agent By ID error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch Agent"
        });
    }
};

// Use: to update agent 
// Method: PUT
// /api/agents/:agentId
export const updateAgentController = async (req, res) => {
    try {
        const { agentId } = req.params;
        const updateData = req.body;

        if (!mongoose.Types.ObjectId.isValid(agentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Agent ID"
            });
        }

        if (
            !updateData || 
            typeof updateData !== "object" ||
            Array.isArray(updateData) ||
            Object.keys(updateData).length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid update data"
            });
        }

        const allowedFields = [
            "name",
            "type",
            "description",      
            "agentRole",
            "instructions",
            "selectedFaqs",
            "selectedDocuments",
            "avatar",
            "primaryColor",
            "welcomeMessage",
            "widgetPosition"
            
        ];

        const inValidFields = Object.keys(updateData).filter(
            (field) => !allowedFields.includes(field)
        );

        if (inValidFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid update fields"
            });
        }

        if (
            updateData.type !== undefined && 
            !["support", "sales", "faq"].includes(updateData.type)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid Agent type"
            });
        }

        if (
            updateData.type !== undefined &&
            !["support", "sales", "faq"].includes(updateData.type)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid agent type"
            });
        }

        const stringFields = [
            "name",
            "description",
            "agentRole",
            "instructions",
            "avatar",
            "primaryColor",
            "welcomeMessage",
            "widgetPosition"
        ];

        for (const field of stringFields) {
            if (
                updateData[field] !== undefined &&
                typeof updateData[field] !== "string"
            ) {
                return res.status(400).json({
                    success: false,
                    message: `${field} must be a string`
                });
            }
        }

    } catch(error) {

    }
}