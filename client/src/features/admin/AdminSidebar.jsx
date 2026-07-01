import { NavLink } from "react-router-dom";

export default function AdminSidebar () {
    return (
        <aside className="admin-sidebar">

            <h2>Admin</h2>

            <nav>

                <NavLink to="/admin">
                    داشبورد
                </NavLink>

                <NavLink to="/admin/products">
                    محصولات
                </NavLink>

                <NavLink to="/admin/orders">
                    سفارشات
                </NavLink>

                <NavLink to="/admin/users">
                    کاربران
                </NavLink>

            </nav>

        </aside>
    );
}
