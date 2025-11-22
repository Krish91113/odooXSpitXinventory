import React from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../lib/auth"; // from your exported authClient

const ProtectedRoute = ({ children }) => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="text-center mt-10 text-white">
        Checking authentication...
      </div>
    );
  }

  // If no session → redirect to login
  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
