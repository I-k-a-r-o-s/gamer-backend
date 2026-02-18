import { Router } from "express";
import { registerUser,loginUser,logoutUser } from "../controllers/userController.js";

const userRoutes=Router()

userRoutes.post("/register",registerUser)
userRoutes.post("/login",loginUser)
userRoutes.post("/logout",logoutUser)

export default userRoutes