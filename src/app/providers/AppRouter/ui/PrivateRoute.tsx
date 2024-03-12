import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RouterPath } from "src/app/config/routerConfig";
import { getUserId } from "src/entities/User";

interface PrivateRouteProps {
  children: React.ReactNode;
}
// @ts-ignore
const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const id = useSelector(getUserId);

  return id ? children : <Navigate to={RouterPath.signIn} />;
};

export default PrivateRoute;
