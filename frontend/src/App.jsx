import { createContext, useEffect, useState } from "react";
import "./App.css";
import { AppRoutes } from "./routes/appRoutes";

export const authContext = createContext();

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <authContext.Provider value={{ authenticated, setAuthenticated }}>
      <AppRoutes />
    </authContext.Provider>
  );
}

export default App;
