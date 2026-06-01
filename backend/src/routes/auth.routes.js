import express from "express";
import { login, register } from "../controllers/auth.controllers.js";
import {
  val_login,
  val_Register,
} from "../middlewares/payload.validator/auth.payload.js";
import prisma from "../config/prisma.js";
import { hashPassword } from "../utils/hash.js";

const router = express.Router();
router.use(express.json({ limit: "20kb" }));

router.post("/register", val_Register, register);
router.post("/login", val_login, login);
router.post("/admin", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    return res
      .status(201)
      .json({ message: "admin created successfully.", user });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Internal server error",
    });
  }
});

export default router;
