import express from "express";
import { allAgents, createAgent } from "../controllers/agentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for creating a new agent
router.post("/create", protect, createAgent);
router.get("/", allAgents);

export default router;
