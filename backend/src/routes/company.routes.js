import express from "express";
import { validate } from "../middlewares/validate.schema.js";
import {
  getAllCompaniesController,
  login,
  register,
  updateCompanyStatusController,
} from "../controllers/company.controller.js";
import {
  loginSchema,
  registerSchema,
  updateCompanyStatusSchema,
} from "../validation.schema/company.schema.js";
import authenticate from "../middlewares/authenticate.company.js";
import authorize from "../middlewares/authorize.company.js";
import { loadCompany } from "../middlewares/loadCompany.js";

const router = express.Router();

router.use(express.json({ limit: "20kb" }));

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

//-------------------------------------- authenticated routes---------------------------------------------//
router.use(authenticate);
router.get("/", authorize("superadmin"), getAllCompaniesController);
router.patch(
  "/:company_id/status",
  authorize("superadmin"),
  loadCompany,
  validate(updateCompanyStatusSchema),
  updateCompanyStatusController,
);

export default router;
