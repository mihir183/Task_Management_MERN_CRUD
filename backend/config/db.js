import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/task1");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Error:", error);
    process.exit(1);
  }
};

export default connectDB;
