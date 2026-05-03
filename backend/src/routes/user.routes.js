import express from "express";
import { authenticate } from "../middlewares/authenticate.user.js";
import { authorize } from "../middlewares/authorize.user.js";
import {
  getUserList,
  myProfile,
  updateStatus,
} from "../controllers/user.controller.js";
import { validateStatusUpdate } from "../middlewares/payload.validator/user.payload.js";

const router = express.Router();

router.put(
  "/status",
  authenticate,
  authorize("admin"),
  validateStatusUpdate,
  updateStatus,
);
router.get("/me", authenticate, myProfile);
router.get("/alluser", authenticate, authorize("admin"), getUserList);
export default router;
