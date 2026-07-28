import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Authorize = ({ role = [] }) => {
  const queryClient = useQueryClient();

  // Get cached profile
  const profile = queryClient.getQueryData(["login-profile"]);

  // Profile not available
  if (!profile) {
    return <Navigate to="/company/login" replace />;
  }

  // Role not authorized
  if (!role.includes(profile.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default Authorize;
