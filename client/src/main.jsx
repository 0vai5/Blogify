import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserContextProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    </UserContextProvider>
  </StrictMode>
);
