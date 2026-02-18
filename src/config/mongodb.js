import { connect } from "mongoose";

const mongo_uri = process.env.MONGODB_URI

export const connectMongoDB = async () => {
  try {
    await connect(mongo_uri);
    console.log("MongoDB Connection Succeeded!");
  } catch (error) {
    console.log("MongoDB Connection Error!:", error);
    process.exit(1);
  }
};
