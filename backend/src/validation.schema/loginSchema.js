import * as yup from "yup";

export const loginSchema = yup.object({
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
});
