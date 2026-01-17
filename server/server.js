import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";
import { clerkWebhooks } from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoute.js";
import agencyRouter from "./routes/agencyRoute.js";
import propertyRouter from "./routes/propertyRoute.js";
import bookingRouter from "./routes/bookingRoute.js";

dotenv.config();
const app = express();

connectDB();
connectCloudinary();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nestorria-tau.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/user", userRouter);
app.use("/api/agencies", agencyRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/bookings", bookingRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Nestorria API");
});

// Listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
