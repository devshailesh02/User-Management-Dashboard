import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash, FaBuilding } from "react-icons/fa";
import { resetPasswordSchema } from "../../validationSchema/companySchema/resetPasswordSchema.js";
// import { resetPassword } from "../../api/company.api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      password: "",
      cnf_password: "",
    },

    validationSchema: resetPasswordSchema,

    onSubmit: async (values) => {
      try {
        setServerError("");

        // await resetPassword({
        //   token,
        //   password: values.password,
        // });

        navigate("/company/login", {
          replace: true,
        });
      } catch (error) {
        setServerError(
          error.response?.data?.message ||
            "Reset link is invalid or has expired.",
        );
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

          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>

          <p className="mt-2 text-gray-500">Enter your new password below.</p>
        </div>

        {/* Server Error */}

        {serverError && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Password */}

          <div>
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center">
              <label className="text-sm font-medium text-gray-700">
                New Password
                <span className="text-red-500">*</span>
              </label>

              {errors.password && (
                <span className="text-xs font-medium text-red-500">
                  {errors.password}
                </span>
              )}
            </div>

            <div
              className={`flex items-center rounded-lg border px-3 transition ${
                touched.password && errors.password
                  ? "border-red-500 ring-1 ring-red-100"
                  : "border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100"
              }`}
            >
              <FaLock className="text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter new password"
                className="w-full bg-transparent px-3 py-3 outline-none"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div>
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
                <span className="text-red-500">*</span>
              </label>

              {errors.cnf_password && (
                <span className="text-xs font-medium text-red-500">
                  {errors.cnf_password}
                </span>
              )}
            </div>

            <div
              className={`flex items-center rounded-lg border px-3 transition ${
                touched.cnf_password && errors.cnf_password
                  ? "border-red-500 ring-1 ring-red-100"
                  : "border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100"
              }`}
            >
              <FaLock className="text-gray-400" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="cnf_password"
                placeholder="Confirm new password"
                className="w-full bg-transparent px-3 py-3 outline-none"
                value={values.cnf_password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting ? "Updating..." : "Reset Password"}
          </button>
        </form>

        {/* Login */}

        <div className="mt-6 border-t pt-5 text-center">
          <p className="text-gray-600">
            Remember your password?{" "}
            <Link
              to="/company/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
