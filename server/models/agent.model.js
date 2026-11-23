import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            required: true,
            enum: ["support", "sales", "faq"]
        },

        status: {
            type: String,
            enum: ["Active", "Draft", "Paused"],
            default: "Draft"
        },

        agentRole: {
            type: String,
            required: true,
            trim: true
        },

        instructions: {
            type: String,
            required: true,
            trim: true          
        },

        selectedFaqs: {
        type: [String],
        default: [],
        },

        selectedDocuments: {
        type: [String],
        default: [],
        },

        avatar: {
        type: String,
        default: "",
        },

        primaryColor: {
        type: String,
        default: "#7546DB",
        },

        welcomeMessage: {
        type: String,
        default: "Hi! How can I help you today?",
        },

        widgetPosition: {
        type: String,
        enum: ["bottom-right", "bottom-left"],
        default: "bottom-right",
        },
    },
     { timestamps: true}
);

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;