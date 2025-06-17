import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
}
