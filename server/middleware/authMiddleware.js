import User from "../models/User.js";
import { getAuth } from "@clerk/express";

export const authUser = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not found in MongoDB. Use Webhook or add manually.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
