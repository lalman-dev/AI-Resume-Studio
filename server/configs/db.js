import mongoose from "mongoose";

const connectDB = async () => {
  const mongodbURI = process.env.MONGODB_URI;
  const projectName = "AI-resume-studio";

  if (!mongodbURI) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  const base = mongodbURI.endsWith("/") ? mongodbURI.slice(0, -1) : mongodbURI;

  await mongoose.connect(`${base}/${projectName}`);
  console.log("Database connected successfully");
};

export default connectDB;
