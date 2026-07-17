import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { FaEnvelope, FaBuilding } from "react-icons/fa";
import { forgotPasswordSchema } from "../../validationSchema/companySchema/forgotPasswordSchema";
import { forgotPassword } from "../../api/company.api";
// import { forgotPasswordSchema } from "../../validationSchema/companySchema/forgotPassword.schema";

const ForgotPassword = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: forgotPasswordSchema,

    onSubmit: async (values, { setFieldError }) => {
      try {
        await forgotPassword(values);
      } catch (error) {
        setFieldError("email", error.message);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <FaBuilding className="text-3xl text-blue-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>

          <p className="mt-2 text-gray-500">
            Enter your registered company email. We'll send you a password reset
            link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="font-medium text-gray-700">
                Company Email
                <span className="ml-1 text-red-500">*</span>
              </label>

              {touched.email && errors.email && (
                <span className="text-xs font-medium text-red-500">
                  {errors.email}
                </span>
              )}
            </div>

            <div
              className={`flex items-center rounded-lg border px-3 transition ${
                touched.email && errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100"
              }`}
            >
              <FaEnvelope className="text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="company@example.com"
                value={values.email}
                onChange={(e) => {
                  handleChange(e);

                  if (errors.email === "Invalid email") {
                    setFieldError("email", "");
                  }
                }}
                onBlur={handleBlur}
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 border-t pt-5 text-center">
          <p className="text-gray-600">
            Remember your password?{" "}
            <Link
              to="/company/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
