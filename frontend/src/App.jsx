import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import "./App.css";
import { AppRoutes } from "./routes/appRoutes";

export const authContext = createContext();
const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <authContext.Provider value={{ isAuthenticated, setAuthenticated }}>
        <AppRoutes />
      </authContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
