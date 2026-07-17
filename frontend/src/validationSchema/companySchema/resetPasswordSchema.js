import * as Yup from "yup";

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "One uppercase letter is required")
    .matches(/[a-z]/, "One lowercase letter is required")
    .matches(/[0-9]/, "One number is required")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "One special character is required"),

  cnf_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
