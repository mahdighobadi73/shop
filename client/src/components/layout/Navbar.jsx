import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import "./Navbar.css"

export default function Navbar () {
    const { user, isAuthenticated, logout } = useAuth();
    const { getTotalItems } = useCart();

    return (
        <nav className="nav">
            <NavLink to="/" end>خانه</NavLink>
            <NavLink to="/products">محصولات</NavLink>
            <NavLink to="/cart">سبد خرید ({ getTotalItems() })</NavLink>

            { isAuthenticated ? (
                <>
                    <NavLink to="/orders">سفارش‌ها</NavLink>
                    <NavLink to="/profile">پروفایل</NavLink>

                    { user?.role === "admin" ? (
                        <NavLink to="/admin">ادمین</NavLink>
                    ) : null }

                    <button type="button" onClick={ logout } className="nav__logout">
                        <FiLogOut />
                        خروج
                    </button>
                </>
            ) : (
                <>
                    <NavLink to="/login">ورود</NavLink>
                    <NavLink to="/register">ثبت‌نام</NavLink>
                </>
            ) }
        </nav>
    );
}
