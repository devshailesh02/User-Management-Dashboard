import { createContext, useState } from "react";

const context = createContext();

const AuthContext = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(fase);

  return (
    <context.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </context.Provider>
  );
};

const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useState(fase);
  return { isAuthenticated, setAuthenticated };
};
