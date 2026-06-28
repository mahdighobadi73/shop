import { FiMail, FiUser, FiShield, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

import "../assets/styles/profile.css";

export default function ProfilePage () {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate( "/login" );
    };

    return (
        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-header">

                    <div className="profile-avatar">
                        { user?.name?.charAt( 0 ).toUpperCase() }
                    </div>

                    <h2>{ user?.name }</h2>

                    <span>
                        { user?.role === "admin"
                            ? "مدیر سیستم"
                            : "کاربر" }
                    </span>

                </div>

                <div className="profile-info">

                    <div className="profile-item">
                        <FiUser />
                        <div>
                            <small>نام</small>
                            <strong>{ user?.name }</strong>
                        </div>
                    </div>

                    <div className="profile-item">
                        <FiMail />
                        <div>
                            <small>ایمیل</small>
                            <strong>{ user?.email }</strong>
                        </div>
                    </div>

                    <div className="profile-item">
                        <FiShield />
                        <div>
                            <small>سطح دسترسی</small>
                            <strong>{ user?.role }</strong>
                        </div>
                    </div>

                </div>

                <div className="profile-stats">

                    <div className="stat-card">
                        <h3>0</h3>
                        <span>سفارش‌ها</span>
                    </div>

                    <div className="stat-card">
                        <h3>0</h3>
                        <span>در انتظار</span>
                    </div>

                    <div className="stat-card">
                        <h3>0</h3>
                        <span>تحویل شده</span>
                    </div>

                </div>

                <Button
                    variant="danger"
                    fullWidth
                    onClick={ handleLogout }
                >
                    <FiLogOut />

                    خروج از حساب
                </Button>

            </div>

        </div>
    );
}