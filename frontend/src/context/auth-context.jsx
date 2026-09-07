import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { loginProfile } from "../api/company.api";
import { refresh } from "../api/auth.api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [authLoading, setLoading] = useState(true);

  const {
    data: profile,
    isLoading: ProfileLoading,
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

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, ProfileLoading, authLoading, profile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
