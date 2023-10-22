import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import React from "react"

interface ProtectedRouteProps {
    children: React.ReactNode;
}

function ProtectedRoute({children} : ProtectedRouteProps) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/signup" />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;