import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Layouts
import Website from "../layouts/WebsiteLayout.jsx";
import SuperAdminLayout from "../components/layout/SuperAdminLayout.jsx";

// Context
import { useAuth } from "../context/auth-context.jsx";

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
  const { isAuthenticated, ProfileLoading, authLoading, profile } = useAuth();

  if (authLoading || ProfileLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* ==================== WEBSITE ==================== */}

        <Route element={<Website />}>
          <Route index element={<Home />} />

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
