import express from "express";
import { login, register } from "../controllers/auth.controllers.js";
import prisma from "../config/prisma.js";
import { validate } from "../middlewares/validate.schema.js";
import { loginSchema } from "../validation.schema/loginSchema.js";
import { registerSchema } from "../validation.schema/registerSchema.js";

const router = express.Router();
router.use(express.json({ limit: "20kb" }));

router.post("/register-company", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
