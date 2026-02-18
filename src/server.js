import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectMongoDB } from "./config/mongodb.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

server.use("/api/users", userRoutes);

const startServer = async () => {
  try {
    await connectMongoDB();
    server.listen(process.env.PORT, () => {
      console.log("Server is running on PORT:", process.env.PORT);
    });
  } catch (error) {
    console.log("Error in startServer!:", error);
    process.exit(1);
  }
};

startServer();
