import React from "react";
import { Route, Routes } from "react-router-dom";
import Website from "../layouts/WebsiteLayout.jsx";
import Home from "../pages/website/Home.jsx";
import RegisterCompany from "../pages/website/Register.jsx";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Website />}>
        <Route path="/" element={<Home />} />
        <Route path="/company/register" element={<RegisterCompany />} />
      </Route>
    </Routes>
  );
};
