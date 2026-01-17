import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "agencyOwner"],
      default: "user",
    },
    recentSearchedCities: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true, _id: false }
);

export default mongoose.model("User", userSchema);
