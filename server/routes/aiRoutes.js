// routes/aiRouter.js
import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
} from "../controllers/aiController.js";

const aiRouter = express.Router();

// Enhance professional summary
aiRouter.post("/enhance-pro-sum", protect, enhanceProfessionalSummary);

// Enhance job description
aiRouter.post("/enhance-job-desc", protect, enhanceJobDescription);

// Upload and parse resume
aiRouter.post("/upload-resume", protect, uploadResume);

export default aiRouter;
