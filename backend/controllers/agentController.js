import Agent from "../models/agentModel.js";
import { asyncHandler } from "../utils/asynchandler.js";

export const createAgent = asyncHandler(async (req, res) => {
  try {
    const agent = new Agent({
      ...req.body,
      user: req.user.id,
    });

    await agent.save();

    res.status(401).json(agent);
  } catch (error) {
    res.status(400).json(error);
  }
});

export const allAgents = async (req, res) => {
  const agents = await Agent.find({});

  res.status(201).json({ count: agents.length, agents });
};
