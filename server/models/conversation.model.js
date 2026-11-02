import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "New Conversation",
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
