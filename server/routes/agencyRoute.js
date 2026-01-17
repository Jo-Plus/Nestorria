import express from "express";
import { registerAgency } from "../controllers/agencyController.js";
import { authUser } from "../middleware/authMiddleware.js";

const agencyRouter = express.Router();

agencyRouter.post("/", authUser, registerAgency);

export default agencyRouter;
