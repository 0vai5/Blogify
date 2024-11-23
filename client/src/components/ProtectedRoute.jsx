import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
  const location = useLocation();

  if (isLoggedIn && location.pathname === "/signup") {
    return <Navigate to="/" />;
  }

  if (
    !isLoggedIn &&
    location.pathname !== "/signup" &&
    location.pathname !== "/signin"
  ) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
