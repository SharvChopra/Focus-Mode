import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("/api/current_user");
        setAuth(res.data);
      } catch (error) {
        setAuth(null);
      }
    };
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
