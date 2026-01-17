import mongoose from "mongoose";

const agencySchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User", required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Agency", agencySchema);
