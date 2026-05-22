import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongodbURI = process.env.MONGODB_URI;
    const projectName = "AI-resume-studio";

    if (!mongodbURI) {
      throw new Error("MONGODB_URI environment variable not set");
    }

    const uri = mongodbURI.endsWith("/")
      ? `${mongodbURI}${projectName}`
      : `${mongodbURI}/${projectName}`;

    await mongoose.connect(uri);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectDB;
