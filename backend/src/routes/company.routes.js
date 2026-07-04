import express from "express";
import { validate } from "../middlewares/validate.schema.js";
import {
  deleteCompanyController,
  deleteManyCompanyController,
  getAllCompaniesController,
  getCompanyByIdController,
  login,
  register,
  updateCompanyStatusController,
} from "../controllers/company.controller.js";
import {
  deleteManyCompaniesSchema,
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
router.get(
  "/:company_id",
  authorize("superadmin", "admin"),
  loadCompany,
  getCompanyByIdController,
);
router.patch(
  "/:company_id/status",
  authorize("superadmin"),
  loadCompany,
  validate(updateCompanyStatusSchema),
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
  validate(deleteManyCompaniesSchema),
  deleteManyCompanyController,
);

export default router;
