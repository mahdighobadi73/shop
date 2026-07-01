export default function AdminRoute ( { children } ) {
    const { user, isAuthenticated, isLoading } = useAuth();

    if ( isLoading ) return null;

    if ( !isAuthenticated ) {
        return <Navigate to="/login" replace />;
    }

    if ( !user ) return null; // 🔥 مهم

    if ( user.role !== "admin" ) {
        return <Navigate to="/" replace />;
    }

    return children;
}