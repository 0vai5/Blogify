import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  // Initialize state from localStorage (or default values)
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [user, isLoggedIn]);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
