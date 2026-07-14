import * as Yup from "yup";

export const companyLoginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Minimum 8 characters")
    .max(30, "Password cannot exceed 30 characters"),
});
