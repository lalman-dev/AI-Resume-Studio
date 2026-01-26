// routes/userRouter.js
import express from "express";
import {
  getUserById,
  getUserResumes,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// Register a new user
userRouter.post("/register", registerUser);

// Login user
userRouter.post("/login", loginUser);

// Get user data (protected)
userRouter.get("/data", protect, getUserById);

// Get all resumes for a user (protected)
userRouter.get("/resumes", protect, getUserResumes);

export default userRouter;
