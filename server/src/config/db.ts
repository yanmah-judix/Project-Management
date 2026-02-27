import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    const err = error as Error;
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;