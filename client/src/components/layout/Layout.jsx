import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout () {
    return (
        <div className="app-shell">
            <header className="app-header">
                <div className="brand">Store</div>
                <Navbar />
            </header>
            <main className="app-main">
                <Outlet />
            </main>
        </div>
    );
}
