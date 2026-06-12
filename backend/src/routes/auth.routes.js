import express from "express";
import { login, register } from "../controllers/auth.controllers.js";
import {
  val_login,
  val_Register,
} from "../middlewares/payload.validator/auth.payload.js";
import prisma from "../config/prisma.js";

const router = express.Router();
router.use(express.json({ limit: "20kb" }));

router.post("/register", val_Register, register);
router.post("/login", val_login, login);

export default router;
