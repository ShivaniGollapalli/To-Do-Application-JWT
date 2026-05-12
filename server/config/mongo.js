import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_STRING);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.log(`❌ MongoDB connection error: ${error}`);
  }
};

export default connectDB;
