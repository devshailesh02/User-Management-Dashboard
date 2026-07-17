import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Website from "../layouts/WebsiteLayout.jsx";
import Home from "../pages/website/Home.jsx";
import RegisterCompany from "../pages/website/Register.jsx";
import { authContext } from "../App.jsx";
import { refresh } from "../api/auth.api.js";
import Loader from "../components/common/loader.jsx";
import { loginProfile } from "../api/company.api.js";
import LoginCompany from "../pages/website/Login.jsx";
import ForgotPassword from "../pages/website/ForgotPassword.jsx";
import ResetPassword from "../pages/website/ResetPassword.jsx";

export const AppRoutes = () => {
  const [loading, setloading] = useState(true);
  const { isAuthenticated, setAuthenticated } = useContext(authContext);
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
      const token = await refresh();
      setAuthenticated(!!token);
      setloading(false);
    };
    refreshToken();
  }, []);

  console.log("isAuthenticated", isAuthenticated);
  if (loading || isLoading) {
    return <Loader />;
  }
  return (
    <Routes>
      <Route element={<Website />}>
        <Route path="/" element={<Home />} />
        <Route path="/company/register" element={<RegisterCompany />} />
        <Route path="/company/login" element={<LoginCompany />} />
        <Route path="/company/forgot-password" element={<ForgotPassword />} />
        <Route path="/company/reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
};
