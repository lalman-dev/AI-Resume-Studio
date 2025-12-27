import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  createResume,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  updateResume,
} from "../controllers/resumeController.js";
import upload from "../configs/multer.js";

const resumeRouter = express.Router();

// Create a new resume
resumeRouter.post("/create", protect, createResume);

// Update an existing resume (protect first, then multer)
resumeRouter.put("/update", protect, upload.single("image"), updateResume);

// Delete a resume
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);

// Get a resume by ID (protected)
resumeRouter.get("/get/:resumeId", protect, getResumeById);

// Get a public resume by ID
resumeRouter.get("/public/:resumeId", getPublicResumeById);

export default resumeRouter;
