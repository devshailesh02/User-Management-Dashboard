import * as Yup from "yup";

export const companyRegisterSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Company name is required")
    .min(3, "Company name must be at least 3 characters")
    .max(100, "Company name cannot exceed 100 characters"),

  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Company email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password cannot exceed 30 characters")
    .matches(
      /^(?=.*[a-z])/,
      "Password must contain at least one lowercase letter",
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter",
    )
    .matches(/^(?=.*\d)/, "Password must contain at least one number")
    .matches(
      /^(?=.*[@$!%*?&])/,
      "Password must contain at least one special character",
    ),

  cnf_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
