import express from "express";
import {
  validateBody,
  validateQuery,
  validateParams,
} from "../middlewares/validate.schema.js";
import {
  companyGrowthController,
  companyStaticsController,
  deleteCompanyController,
  deleteManyCompanyController,
  forgotPasswordController,
  getAllCompaniesController,
  getCompanyByIdController,
  getLoginProfileController,
  login,
  register,
  updateCompanyStatusController,
} from "../controllers/company.controller.js";
import {
  deleteManyCompaniesSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  updateCompanyStatusSchema,
} from "../validation.schema/company.schema.js";
import authenticate from "../middlewares/authenticate.company.js";
import authorize from "../middlewares/authorize.company.js";
import { loadCompany } from "../middlewares/loadCompany.js";

const router = express.Router();

router.use(express.json({ limit: "20kb" }));

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.post(
  "/forgot-passward",
  validateBody(forgotPasswordSchema),
  forgotPasswordController,
);
//-------------------------------------- authenticated routes---------------------------------------------//
router.use(authenticate);

//---------------------------------- Dashboard api -----------------------------------//

router.get("/statics", authorize("superadmin"), companyStaticsController);
router.get("/growth", authorize("superadmin"), companyGrowthController);
router.get("/me", getLoginProfileController);
router.get("/", authorize("superadmin"), getAllCompaniesController);
router.get(
  "/:company_id",
  authorize("superadmin"),
  loadCompany,
  getCompanyByIdController,
);
router.patch(
  "/:company_id/status",
  authorize("superadmin"),
  loadCompany,
  validateBody(updateCompanyStatusSchema),
  updateCompanyStatusController,
);
router.delete(
  "/:company_id",
  authorize("superadmin"),
  loadCompany,
  deleteCompanyController,
);
router.delete(
  "/",
  authorize("superadmin"),
  validateBody(deleteManyCompaniesSchema),
  deleteManyCompanyController,
);

export default router;
