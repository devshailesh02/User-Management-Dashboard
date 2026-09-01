import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Layouts
import Website from "../layouts/WebsiteLayout.jsx";
import SuperAdminLayout from "../components/layout/SuperAdminLayout.jsx";

// Context
import { useAuth } from "../context/auth-context.jsx";

// APIs
import { refresh } from "../api/auth.api.js";
import { loginProfile } from "../api/company.api.js";

// Common components
import Loader from "../components/common/loader.jsx";
import PrivateRoute from "../components/common/private-route.jsx";
import Authorize from "../components/common/Authorize.jsx";
import Unauthorized from "../components/common/Unauthorized.jsx";

// Lazy loaded pages

// Website
const Home = lazy(() => import("../pages/website/Home.jsx"));
const RegisterCompany = lazy(() => import("../pages/website/Register.jsx"));
const LoginCompany = lazy(() => import("../pages/website/Login.jsx"));
const ForgotPassword = lazy(
  () => import("../pages/website/ForgotPassword.jsx"),
);
const ResetPassword = lazy(() => import("../pages/website/ResetPassword.jsx"));

// Super Admin
const Dashboard = lazy(() => import("../pages/superadmin/Dashboard.jsx"));
const Companies = lazy(() => import("../pages/superadmin/Companies.jsx"));
const ProfileSettings = lazy(
  () => import("../pages/superadmin/ProfileSettings.jsx"),
);

export const AppRoutes = () => {
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, setAuthenticated } = useAuth();

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["login-profile"],
    queryFn: loginProfile,
    enabled: isAuthenticated,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const token = await refresh();

        setAuthenticated(!!token);
      } catch (error) {
        console.log(error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    refreshToken();
  }, [setAuthenticated]);

  if (loading || isLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* ==================== WEBSITE ==================== */}

        <Route element={<Website />}>
          <Route path="/" element={<Home />} />

          <Route path="/company/register" element={<RegisterCompany />} />

          <Route path="/company/login" element={<LoginCompany />} />

          <Route path="/company/forgot-password" element={<ForgotPassword />} />

          <Route path="/company/reset-password" element={<ResetPassword />} />
        </Route>

        {/* ==================== PRIVATE ROUTES ==================== */}

        <Route element={<PrivateRoute />}>
          <Route element={<Authorize role={["superadmin"]} />}>
            <Route path="/super-admin" element={<SuperAdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="companies" element={<Companies />} />

              <Route path="settings/profile" element={<ProfileSettings />} />
            </Route>
          </Route>
        </Route>

        {/* ==================== UNAUTHORIZED ==================== */}

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Suspense>
  );
};
