import express from "express";
import { verifyRefreshToken } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/auth.controller.js";

const router = express.Router();
router.use(express.json({ limit: "20kb" }));

router.post("/refresh", verifyRefreshToken, refreshAccessToken);

export default router;
