import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";

const PrivateRoute = () => {
  const isToken = useAuth();
  return isToken ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoute;
