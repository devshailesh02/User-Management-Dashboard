import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaLock, FaArrowLeft, FaHome } from "react-icons/fa";

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const previousPage = location.state?.from;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-10 text-center shadow-lg">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <FaLock className="text-4xl text-red-600" />
        </div>

        <h1 className="text-5xl font-bold text-gray-800">403</h1>

        <h2 className="mt-2 text-2xl font-semibold text-gray-700">
          Access Denied
        </h2>

        <p className="mt-4 text-gray-500">
          You don't have permission to access this page.
        </p>

        {previousPage && (
          <p className="mt-2 text-sm text-gray-400">
            You attempted to access:
            <span className="font-medium"> {previousPage.pathname}</span>
          </p>
        )}

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-lg border px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            <FaArrowLeft />
            Go Back
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <FaHome />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
