import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBuilding,
  FaTimes,
} from "react-icons/fa";
import { companyLoginSchema } from "../../validationSchema/companySchema/companyLoginSchema";
import { authContext } from "../../App";
import { loginCompany } from "../../api/company.api";

const Login = () => {
  const { isAuthenticated, setAuthenticated } = useContext(authContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

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
      password: "",
    },

    validationSchema: companyLoginSchema,

    onSubmit: async (values) => {
      try {
        const response = await loginCompany(values);
        setAuthenticated(true);
        navigate("/", { replace: true });
      } catch (error) {
        setLoginError("Invalid Credentials");
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ">
        {loginError && (
          <div className=" mb-5 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            <span>{loginError}</span>

            <button
              type="button"
              onClick={() => setLoginError("")}
              className="ml-4 rounded-full p-1 text-red-500 transition hover:bg-red-100 hover:text-red-700"
              aria-label="Close error"
            >
              <FaTimes size={12} />
            </button>
          </div>
        )}
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <FaBuilding className="text-3xl text-blue-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Company Login</h1>

          <p className="mt-2 text-gray-500">
            Sign in to manage your employees.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <div className="mb-2 flex items-center ">
              <label className="font-medium text-gray-700">
                Company Email
                <span className="ml-1 text-red-500">*</span>
              </label>

              {touched.email && errors.email && (
                <span className="text-xs font-medium text-red-500 mx-5">
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
                  setLoginError("");
                }}
                onBlur={handleBlur}
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center ">
              <label className="font-medium text-gray-700">
                Password
                <span className="ml-1 text-red-500">*</span>
              </label>

              {touched.password && errors.password && (
                <span className="text-xs font-medium text-red-500 mx-5">
                  {errors.password}
                </span>
              )}
            </div>

            <div
              className={`flex items-center rounded-lg border px-3 transition ${
                touched.password && errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100"
              }`}
            >
              <FaLock className="text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={(e) => {
                  handleChange(e);
                  setLoginError("");
                }}
                onBlur={handleBlur}
                className="w-full bg-transparent px-3 py-3 outline-none"
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

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to="/company/forgot-password"
              className="text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing In..." : "Login"}
          </button>
        </form>

        {/* Register */}
        <div className="mt-6 border-t pt-5 text-center">
          <p className="text-gray-600">
            Don't have a company account?{" "}
            <Link
              to="/company/register"
              className="font-semibold text-blue-600 transition hover:underline"
            >
              Register Company
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
