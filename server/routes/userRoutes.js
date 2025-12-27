// routes/userRouter.js
import express from "express";
import {
  getUserId,
  getUserResume,
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
userRouter.get("/data", protect, getUserId);

// Get all resumes for a user (protected)
userRouter.get("/resumes", protect, getUserResume);

export default userRouter;
