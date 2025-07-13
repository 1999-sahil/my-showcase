import { Outlet } from "react-router-dom";

interface PrivateRouteProps {
  allowedRoles: string[];
};

function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  return (
    <Outlet />
  )
}

export default PrivateRoute