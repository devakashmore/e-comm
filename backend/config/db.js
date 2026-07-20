import mongoose from "mongoose";

const connectDB = async () => {
  try {
 const connection =await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MONGODB is connected successfully`);
  } catch (error) {
    console.error(`mongodb connection field`, error.message);
    process.exit(1);
  }
};

export { connectDB };
