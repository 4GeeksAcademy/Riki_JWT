import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  // :círculo_verde_grande: Si no hay token, redirigir a login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // :círculo_verde_grande: Si hay token, mostrar la ruta protegida
  return children;
};
