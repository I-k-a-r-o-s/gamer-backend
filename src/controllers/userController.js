import { compare, hash } from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const node_env = process.env.NODE_ENV;
const jwt_secret = process.env.JWT_SECRET;
const oneDay = 24 * 60 * 60 * 1000;

const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: node_env === "production",
    sameSite: "strict",
    maxAge: oneDay,
  });
};

const generateToken = (res, payload) => {
  const token = jwt.sign(payload, jwt_secret, { expiresIn: "1d" });
  setCookie(res, token);
  //return token;
};

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

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All Fields!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    generateToken(res, { id: user._id });

    const userInfo = {
      name: user.name,
      email: user.email,
      favorites: user.favorites || [],
    };

    return res.status(200).json({
      success: true,
      message: "User Logged In Successfully!",
      user: userInfo,
    });
  } catch (error) {
    console.log("Error in loginUser:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
