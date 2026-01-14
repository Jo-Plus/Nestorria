import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => res.send("server is running"));

// connect DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`server is running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("DB connection error:", err));
