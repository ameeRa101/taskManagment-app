import { Navigate } from "react-router-dom";

// Moke the authentication status
// Guard to check if the user is authenticated
const AuthGuard = ({ children }) => {
  const isAuthenticated = localStorage.getItem("user") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthGuard;
