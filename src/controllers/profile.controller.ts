import { Response } from "express";
import { Request } from "express";
import { User } from "../models/user.model";

export const getProfile = async (req: Request, res: Response) => {
  try {
    // Get user from decoded JWT
    const userId = req.jwtDecoded?.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.jwtDecoded?.userId;
    const { fullName, phoneNumber, avatar } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user fields
    if (fullName) user.fullName = fullName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (avatar) user.avatar = avatar;

    await user.save();

    // Return updated user without password
    const updatedUser = await User.findById(userId).select("-password");

    return res.status(200).json({
      success: true,
      data: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
