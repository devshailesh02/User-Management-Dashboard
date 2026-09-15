import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { loginProfile } from "../api/company.api";
import { refresh } from "../api/auth.api";
import { setAccessToken } from "../utils/token";

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
        const response = await refresh();
        login(response.accessToken);
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    refreshToken();
  }, []);
  const login = (token) => {
    setAuthenticated(true);
    setAccessToken(token);
  };
  const logout = () => {
    setAuthenticated(false);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        ProfileLoading,
        authLoading,
        profile,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
