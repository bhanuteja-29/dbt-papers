import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (user?.role !== "admin") {
    return <Navigate to="/repository" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;