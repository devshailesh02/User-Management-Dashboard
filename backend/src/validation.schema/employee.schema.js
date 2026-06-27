import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email address")
    .max(254, "Email cannot exceed 254 characters"),

  password: yup.string().required("Password is required"),

  company_id: yup
    .string()
    .trim()
    .uuid("Invalid company ID")
    .required("Company ID is required"),
});
