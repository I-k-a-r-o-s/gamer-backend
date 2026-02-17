import { hash } from "bcrypt";
import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All Fields!",
      });
    }

    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
      return res.status(409).json({
        success: false,
        message: "User Already Exists!",
      });
    }

    const passwordHash = await hash(password, 10);
    await User.create({
      name,
      email,
      password: passwordHash,
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully!",
    });
  } catch (error) {
    console.log("Error in registerUser:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
