
import "dotenv/config";
import express from "express";
import cors from "cors";

import aiRouter from "./routes/ai.routes.js";
import faqRouter from "./routes/faq.routes.js";
import connectDB from "./config/db.js";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/ai", aiRouter);
app.use("/api/faqs", faqRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "FlowPilot API is running",
  });
});

// Server configuration
const PORT = process.env.PORT || 5000;

// Start server after MongoDB connects
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
