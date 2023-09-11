// PrivateWrapper.tsx

import { Navigate } from "react-router-dom";

interface PrivateRouterProps {
  isAuthenticated: boolean;
  fallbackPath?: string;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouterProps> = ({
  isAuthenticated,
  fallbackPath = "/",
  children,
}) => {
  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <Navigate to={fallbackPath} replace />;
};

export default PrivateRoute;
