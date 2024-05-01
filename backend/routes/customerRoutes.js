import express from "express";
import {
  AllCustomers,
  customerCreate,
} from "../controllers/customerController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for creating a new agent
router.post("/create", protect, customerCreate);
router.get("/", AllCustomers);

// router.get("/", "");

export default router;
