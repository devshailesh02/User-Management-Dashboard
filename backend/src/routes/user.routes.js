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
router.use(express.json({ limit: "20kb" }));
router.use(authenticate);

router.put(
  "/status",
  // authenticate,
  authorize("admin"),
  validateStatusUpdate,
  updateStatus,
);
router.get("/me", myProfile);
router.get("/alluser", authorize("admin"), getUserList);

export default router;
