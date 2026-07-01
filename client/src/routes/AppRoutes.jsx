import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import OrdersPage from "../pages/OrdersPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import AdminLayout from "../features/admin/AdminLayout"
import Dashboard from "../features/admin/Dashboard"
import AdminProducts from "../features/admin/AdminProducts"
import AdminOrders from "../features/admin/AdminOrders"
import AdminUsers from "../features/admin/AdminUsers"


export default function AppRoutes () {
    return (
        <Routes>
            <Route element={ <Layout /> }>
                <Route index element={ <HomePage /> } />
                <Route path="products" element={ <ProductsPage /> } />
                <Route path="products/:id" element={ <ProductDetailsPage /> } />
                <Route path="cart" element={ <CartPage /> } />
                <Route
                    path="checkout"
                    element={
                        <ProtectedRoute>
                            <CheckoutPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="login" element={ <LoginPage /> } />
                <Route path="register" element={ <RegisterPage /> } />
                <Route
                    path="profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="orders"
                    element={
                        <ProtectedRoute>
                            <OrdersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="admin"
                    element={
                        <AdminRoute>
                            <AdminLayout />
                        </AdminRoute>
                    }
                >
                    <Route index element={ <Dashboard /> } />
                    <Route path="products" element={ <AdminProducts /> } />
                    <Route path="orders" element={ <AdminOrders /> } />
                    <Route path="users" element={ <AdminUsers /> } />
                </Route>
                <Route path="*" element={ <NotFoundPage /> } />
            </Route>
        </Routes>
    );
}
