import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectMongoDB } from "./config/mongodb.js";

const server = express();

server.use(express.json());

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectMongoDB();
    server.listen(PORT, () => {
      console.log("Server is running on PORT:", PORT);
    });
  } catch (error) {
    console.log("Error in startServer!:", error);
    process.exit(1);
  }
};

startServer();
