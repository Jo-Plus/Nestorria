import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await wh.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = JSON.parse(req.body);

    switch (type) {
      case "user.created": {
        const newUser = new User({
          _id: data.id,
          email: data.email_addresses[0].email_address,
          username: `${data.first_name} ${data.last_name || ""}`,
          image: data.image_url,
        });
        await newUser.save();
        console.log("New user saved to DB");
        break;
      }
      case "user.updated": {
        await User.findByIdAndUpdate(data.id, {
          email: data.email_addresses[0].email_address,
          username: `${data.first_name} ${data.last_name || ""}`,
          image: data.image_url,
        });
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
