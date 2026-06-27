import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

export default function Navbar () {
    const { user, isAuthenticated, logout } = useAuth();
    const { getTotalItems } = useCart();

    return (
        <nav className="nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/cart">Cart ({ getTotalItems() })</NavLink>
            { isAuthenticated ? (
                <>
                    <NavLink to="/orders">Orders</NavLink>
                    { user?.role === "admin" ? <NavLink to="/admin">Admin</NavLink> : null }
                    <button onClick={ logout }>Logout</button>
                </>
            ) : (
                <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                </>
            ) }
        </nav>
    );
}
