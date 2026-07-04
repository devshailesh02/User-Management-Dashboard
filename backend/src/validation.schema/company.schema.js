import * as yup from "yup";
import { CompanyStatus } from "@prisma/client";

//------------------------------------- registerSchema -----------------------------------------//

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email address")
    .max(254, "Email cannot exceed 254 characters")
    .test(
      "local-part",
      "Email username cannot exceed 64 characters",
      (value) => {
        if (!value) return true;
        const [localPart] = value.split("@");
        return localPart.length <= 64;
      },
    ),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  // .matches(
  //   /[@$!%*?&]/,
  //   "Password must contain at least one special character",
  // ),

  cnf_password: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

//------------------------------------- loginSchema -----------------------------------------//

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email address")
    .max(254, "Email cannot exceed 254 characters"),

  password: yup.string().required("Password is required"),
});

//------------------------------------- updateCompanyStatusSchema -----------------------------------------//
export const updateCompanyStatusSchema = yup.object({
  status: yup.string().oneOf(Object.values(CompanyStatus)).required(),
});

//------------------------------------- deleteManyCompaniesSchema -----------------------------------------//
export const deleteManyCompaniesSchema = yup.object({
  company_ids: yup
    .array()
    .of(yup.string().uuid("Each company ID must be a valid UUID").required())
    .min(1, "At least one company ID is required")
    .test(
      "unique-company-ids",
      "Duplicate company IDs are not allowed",
      (value) => {
        if (!value) return true;
        return new Set(value).size === value.length;
      },
    )
    .required("company_ids is required"),
});
