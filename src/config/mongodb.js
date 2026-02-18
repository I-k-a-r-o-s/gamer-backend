import { connect } from "mongoose";

export const connectMongoDB = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    console.log("MongoDB Connection Succeeded!");
  } catch (error) {
    console.log("MongoDB Connection Error!:", error);
    process.exit(1);
  }
};
