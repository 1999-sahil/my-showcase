import { UserContext } from "@/context/userContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  allowedRoles: string[];
};

function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (!user) {
    return <Navigate to="/" replace/>;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return (
    <Outlet />
  )
}

export default PrivateRoute