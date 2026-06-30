import { Outlet, Link } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import { useCart } from "../../hooks/useCart";
import "./Layout.css"

export default function Layout () {
    const { getTotalItems } = useCart();
    const cartCount = getTotalItems();

    return (
        <div className="app-shell" dir="rtl">
            <header className="app-header">
                <div className="app-header__top">
                    <Link to="/" className="brand">
                        <span className="brand__mark">S</span>
                        <span className="brand__text">Store</span>
                    </Link>

                    <Link to="/cart" className="header-cart" aria-label="سبد خرید">
                        <FiShoppingCart />
                        { cartCount > 0 ? (
                            <span className="header-cart__badge">{ cartCount }</span>
                        ) : null }
                    </Link>
                </div>

                <div className="search-box">
                    <FiSearch />
                    <input
                        type="search"
                        placeholder="جستجو در محصولات..."
                        aria-label="جستجو در محصولات"
                    />
                </div>

                <Navbar />
            </header>

            <main className="app-main">
                <Outlet />
            </main>

            <BottomNav />
        </div>
    );
}
