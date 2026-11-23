import Agent from "../models/agent.model.js";

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

