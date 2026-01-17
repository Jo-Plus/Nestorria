import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  try {
    const { role, recentSearchedCities, username, email, image } = req.user;

    res.json({
      success: true,
      role,
      username,
      email,
      image,
      recentSearchedCities,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addRecentSearchCity = async (req, res) => {
  try {
    const { city } = req.body;
    const user = req.user;

    if (!city)
      return res.json({ success: false, message: "City name required" });

    if (!user.recentSearchedCities.includes(city)) {
      if (user.recentSearchedCities.length >= 3)
        user.recentSearchedCities.shift();
      user.recentSearchedCities.push(city);
      await user.save();
    }

    res.json({
      success: true,
      recentSearchedCities: user.recentSearchedCities,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
