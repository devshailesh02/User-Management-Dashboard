import express from "express";
import { validate } from "../middlewares/validate.schema.js";
import { login, register } from "../controllers/company.controller.js";
import {
  loginSchema,
  registerSchema,
} from "../validation.schema/company.schema.js";

const router = express.Router();

router.use(express.json({ limit: "20kb" }));

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
