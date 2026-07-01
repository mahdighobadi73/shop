import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

export default function AdminRoute ( { children } ) {
    const { user, isAuthenticated, isLoading } = useAuth();

    if ( isLoading ) return null;

    if ( !isAuthenticated ) {
        return <Navigate to="/login" replace />;
    }

    if ( user?.role !== "admin" ) {
        return <Navigate to="/" replace />;
    }

    return children;
}