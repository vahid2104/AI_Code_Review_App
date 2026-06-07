import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const generateToken = (userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is missing in .env file");
  }

  return jwt.sign({ id: userId }, jwtSecret, {
    expiresIn: "7d",
  });
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id.toString());

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        codeStoragePreference: user.codeStoragePreference,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error during registration",
      error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id.toString());

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        codeStoragePreference: user.codeStoragePreference,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error during login",
      error,
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching user",
      error,
    });
  }
};

export const updateUserSettings = async (req: Request, res: Response) => {
  try {
    const { codeStoragePreference } = req.body;

    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    if (
      codeStoragePreference &&
      !["none", "summary", "full"].includes(codeStoragePreference)
    ) {
      return res.status(400).json({
        message: "Invalid code storage preference",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        codeStoragePreference,
      },
      {
        new: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Settings updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        codeStoragePreference: user.codeStoragePreference,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while updating settings",
      error,
    });
  }
};