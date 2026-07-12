import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Website from "../layouts/WebsiteLayout.jsx";
import Home from "../pages/website/Home.jsx";
import RegisterCompany from "../pages/website/Register.jsx";
import { authContext } from "../App.jsx";
import { refresh } from "../api/auth.api.js";

export const AppRoutes = () => {
  const { setAuthenticated } = useContext(authContext);
  useEffect(() => {
    const refreshToken = async () => {
      const token = await refresh();
      setAuthenticated(!!token);
    };
    refreshToken();
  }, []);
  return (
    <Routes>
      <Route element={<Website />}>
        <Route path="/" element={<Home />} />
        <Route path="/company/register" element={<RegisterCompany />} />
      </Route>
    </Routes>
  );
};
