import { NavLink } from "react-router-dom";
import {
    FiHome,
    FiGrid,
    FiShoppingCart,
    FiPackage,
    FiUser,
    FiLogIn,
} from "react-icons/fi";
import { useAuth } from "../../features/auth/useAuth";
import { useCart } from "../../features/cart/useCart";
import "./BottomNav.css"

export default function BottomNav () {
    const { isAuthenticated } = useAuth();
    const { getTotalItems } = useCart();
    const cartCount = getTotalItems();

    return (
        <nav className="bottom-nav" aria-label="Mobile navigation">
            <NavLink to="/" end className="bottom-nav__link">
                <FiHome />
                <span>خانه</span>
            </NavLink>

            <NavLink to="/products" className="bottom-nav__link">
                <FiGrid />
                <span>محصولات</span>
            </NavLink>

            <NavLink to="/cart" className="bottom-nav__link bottom-nav__cart">
                <span className="bottom-nav__icon-wrap">
                    <FiShoppingCart />
                    { cartCount > 0 ? (
                        <span className="bottom-nav__badge">{ cartCount }</span>
                    ) : null }
                </span>
                <span>سبد</span>
            </NavLink>

            { isAuthenticated ? (
                <>
                    <NavLink to="/orders" className="bottom-nav__link">
                        <FiPackage />
                        <span>سفارش‌ها</span>
                    </NavLink>

                    <NavLink to="/profile" className="bottom-nav__link">
                        <FiUser />
                        <span>پروفایل</span>
                    </NavLink>
                </>
            ) : (
                <NavLink to="/profile" className="bottom-nav__link">
                    <span className="bottom-nav__icon-wrap">
                        <FiUser />
                    </span>

                    <span>
                        { isAuthenticated ? "حساب" : "ورود" }
                    </span>
                </NavLink>
            ) }
        </nav>
    );
}
