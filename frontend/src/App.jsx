import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { AppRoutes } from "./routes/appRoutes";
import { AuthProvider } from "./context/auth-context.jsx";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
