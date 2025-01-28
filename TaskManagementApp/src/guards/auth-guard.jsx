import { Navigate, useLocation } from "react-router-dom";

// Moke the authentication status

// Custom hook to check if the user is authenticated
const useAuth = () => {
  const location = useLocation();
  console.log("location", location);
  return location.state?.isAuthenticated === true;
};

// Guard to check if the user is authenticated
const AuthGuard = ({ children }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthGuard;
