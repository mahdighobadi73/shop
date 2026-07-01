import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useAuth } from "../features/auth/useAuth";
import Button from "../components/ui/Button";

import "./LoginPage.css";


export default function LoginPage () {
    const navigate = useNavigate();

    const { login, isLoading, error } = useAuth();

    const [ showPassword, setShowPassword ] = useState( false );

    const [ form, setForm ] = useState( {
        email: "",
        password: "",
    } );

    const [ errors, setErrors ] = useState( {} );

    const validate = () => {
        const e = {};

        if ( !form.email.trim() )
            e.email = "ایمیل را وارد کنید.";

        else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( form.email )
        )
            e.email = "ایمیل معتبر نیست.";

        if ( !form.password )
            e.password = "رمز عبور را وارد کنید.";

        else if ( form.password.length < 6 )
            e.password = "حداقل ۶ کاراکتر.";

        setErrors( e );

        return Object.keys( e ).length === 0;
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        if ( !validate() ) return;

        try {
            await login( form );
            navigate( "/" );
        } catch ( _ ) { }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    🛒
                </div>

                <h1>خوش آمدید</h1>

                <p>
                    برای ادامه وارد حساب کاربری خود شوید.
                </p>

                <form onSubmit={ handleSubmit }>

                    <div className="input-group">

                        <label>ایمیل</label>

                        <div className="auth-input">

                            <FaEnvelope />

                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                value={ form.email }
                                onChange={ ( e ) =>
                                    setForm( {
                                        ...form,
                                        email: e.target.value,
                                    } )
                                }
                            />

                        </div>

                        { errors.email && (
                            <small>{ errors.email }</small>
                        ) }

                    </div>

                    <div className="input-group">

                        <label>رمز عبور</label>

                        <div className="auth-input">

                            <FaLock />

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="********"
                                value={ form.password }
                                onChange={ ( e ) =>
                                    setForm( {
                                        ...form,
                                        password: e.target.value,
                                    } )
                                }
                            />

                            <button
                                type="button"
                                className="eye-btn"
                                onClick={ () =>
                                    setShowPassword( !showPassword )
                                }
                            >
                                { showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                ) }
                            </button>

                        </div>

                        { errors.password && (
                            <small>{ errors.password }</small>
                        ) }

                    </div>

                    { error && (
                        <div className="auth-error">
                            { error }
                        </div>
                    ) }

                    <Button
                        type="submit"
                        loading={ isLoading }
                        fullWidth
                    >
                        ورود
                    </Button>

                </form>

                <div className="auth-footer">

                    حساب ندارید؟

                    <Link to="/register">
                        ثبت نام
                    </Link>

                </div>

            </div>

        </div>
    );
}