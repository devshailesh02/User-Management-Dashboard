import express from "express";
import { verifyRefreshToken } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/auth.controller.js";
import { logoutCompanyController } from "../controllers/company.controller.js";

const router = express.Router();
router.use(express.json({ limit: "20kb" }));

router.post("/refresh", verifyRefreshToken, refreshAccessToken);
router.post("/logout", logoutCompanyController);

export default router;
