// routes.tsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./private";

const AppRoutes = () => {
  const token = localStorage.getItem("@token");
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute isAuthenticated={!!token}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
