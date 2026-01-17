import Agency from "../models/Agency.js";
import User from "../models/User.js";

export const registerAgency = async (req, res) => {
  try {
    const { name, email, contact, address, city } = req.body;
    const userId = req.user._id;

    const existingAgency = await Agency.findOne({ userId });
    if (existingAgency) {
      return res
        .status(400)
        .json({ success: false, message: "Agency already registered" });
    }

    const newAgency = new Agency({
      userId,
      name,
      email,
      contact,
      address,
      city,
    });
    await newAgency.save();

    await User.findByIdAndUpdate(userId, { role: "agencyOwner" });

    res
      .status(201)
      .json({ success: true, message: "Agency registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
