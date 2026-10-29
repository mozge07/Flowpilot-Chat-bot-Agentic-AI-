import "dotenv/config";
import express from "express";
import cors from "cors";
import aiRouter from "./routes/ai.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Ai First response
app.use('/api/ai', aiRouter);

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Flowpilot api is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server in running on port ${PORT}!`)
});