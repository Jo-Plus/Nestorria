import { Webhook } from "svix";
import User from "../models/User.model.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    await webhook.verify(JSON.stringify(req.body), headers);

    const { data, type } = req.body;

    switch (type) {
      case "user.created":
        await User.create({
          _id: data.id,
          email: data.email_addresses[0]?.email_address,
          username: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        });
        break;

      case "user.updated":
        await User.findOneAndUpdate(
          { _id: data.id },
          {
            email: data.email_addresses[0]?.email_address,
            username: `${data.first_name} ${data.last_name}`,
            image: data.image_url,
          },
          { upsert: true, new: true }
        );
        break;

      case "user.deleted":
        await User.findOneAndDelete({ _id: data.id });
        break;

      default:
        console.log(`Unhandled Clerk event: ${type}`);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Clerk Webhook Error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};
