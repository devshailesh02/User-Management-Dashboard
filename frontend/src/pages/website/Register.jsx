import React, { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { companyRegisterSchema } from "../../validationSchema/companySchema/register.schema";

const Register = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: companyRegisterSchema,
    onSubmit: async (values, { resetForm }) => {},
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Register Company</h1>

          <p className="mt-2 text-gray-500">Create your company account.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Company Name */}
          <div>
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center ">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Company Name <span className="text-red-500">*</span>
              </label>

              {touched.name && errors.name && (
                <span className="text-xs font-medium text-red-500">
                  {errors.name}
                </span>
              )}
            </div>

            <div
              className={`flex items-center rounded-lg border px-3 transition ${
                touched.name && errors.name
                  ? "border-red-500 ring-1 ring-red-100"
                  : "border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100"
              }`}
            >
              <FaBuilding className="text-gray-400" />

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter company name"
                className="w-full bg-transparent px-3 py-3 outline-none"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Company Email */}
          <div>
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center ">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Company Email <span className="text-red-500">*</span>
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
                  ? "border-red-500 ring-1 ring-red-100"
                  : "border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100"
              }`}
            >
              <FaEnvelope className="text-gray-400" />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="company@example.com"
                className="w-full bg-transparent px-3 py-3 outline-none"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center ">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </label>

              {touched.password && errors.password && (
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
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                className="w-full bg-transparent px-3 py-3 outline-none"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-gray-500 transition hover:text-blue-600"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center ">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>

              {touched.confirmPassword && errors.confirmPassword && (
                <span className="text-xs font-medium text-red-500">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <div
              className={`flex items-center rounded-lg border px-3 transition ${
                touched.confirmPassword && errors.confirmPassword
                  ? "border-red-500 ring-1 ring-red-100"
                  : "border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100"
              }`}
            >
              <FaLock className="text-gray-400" />

              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                className="w-full bg-transparent px-3 py-3 outline-none"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="text-gray-500 transition hover:text-blue-600"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700"
          >
            {isSubmitting ? "Registering..." : " Register Company"}
          </button>
        </form>

        {/* Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/company/login"
              className="font-semibold text-blue-600 transition hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
