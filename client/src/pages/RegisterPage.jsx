import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaEnvelope,
    FaEye,
    FaEyeSlash,
    FaLock,
    FaUser,
} from "react-icons/fa";

import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import "../assets/styles/auth.css";

export default function RegisterPage () {
    const navigate = useNavigate();

    const { register, isLoading, error } = useAuth();

    const [ showPassword, setShowPassword ] = useState( false );
    const [ showConfirm, setShowConfirm ] = useState( false );

    const [ form, setForm ] = useState( {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    } );

    const [ errors, setErrors ] = useState( {} );

    const validate = () => {
        const e = {};

        if ( !form.name.trim() )
            e.name = "نام را وارد کنید.";

        if ( !form.email.trim() )
            e.email = "ایمیل را وارد کنید.";
        else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( form.email )
        )
            e.email = "ایمیل معتبر نیست.";

        if ( form.password.length < 6 )
            e.password = "رمز عبور حداقل ۶ کاراکتر باشد.";

        if ( form.confirmPassword !== form.password )
            e.confirmPassword = "رمزها یکسان نیستند.";

        setErrors( e );

        return Object.keys( e ).length === 0;
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        if ( !validate() ) return;

        try {
            await register( {
                name: form.name,
                email: form.email,
                password: form.password,
            } );

            navigate( "/" );
        } catch ( _ ) { }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-logo">
                    👤
                </div>

                <h1>ایجاد حساب کاربری</h1>

                <p>
                    ثبت نام کنید و خریدتان را آغاز کنید.
                </p>

                <form onSubmit={ handleSubmit }>

                    <div className="input-group">
                        <label>نام</label>

                        <div className="auth-input">
                            <FaUser />

                            <input
                                value={ form.name }
                                placeholder="نام شما"
                                onChange={ ( e ) =>
                                    setForm( {
                                        ...form,
                                        name: e.target.value,
                                    } )
                                }
                            />
                        </div>

                        { errors.name && <small>{ errors.name }</small> }
                    </div>

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

                        { errors.email && <small>{ errors.email }</small> }
                    </div>

                    <div className="input-group">

                        <label>رمز عبور</label>

                        <div className="auth-input">

                            <FaLock />

                            <input
                                type={ showPassword ? "text" : "password" }
                                placeholder="******"
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
                                { showPassword ? <FaEyeSlash /> : <FaEye /> }
                            </button>

                        </div>

                        { errors.password && (
                            <small>{ errors.password }</small>
                        ) }
                    </div>

                    <div className="input-group">

                        <label>تکرار رمز عبور</label>

                        <div className="auth-input">

                            <FaLock />

                            <input
                                type={ showConfirm ? "text" : "password" }
                                placeholder="******"
                                value={ form.confirmPassword }
                                onChange={ ( e ) =>
                                    setForm( {
                                        ...form,
                                        confirmPassword: e.target.value,
                                    } )
                                }
                            />

                            <button
                                type="button"
                                className="eye-btn"
                                onClick={ () =>
                                    setShowConfirm( !showConfirm )
                                }
                            >
                                { showConfirm ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                ) }
                            </button>

                        </div>

                        { errors.confirmPassword && (
                            <small>{ errors.confirmPassword }</small>
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
                        ثبت نام
                    </Button>

                </form>

                <div className="auth-footer">

                    قبلاً ثبت نام کرده‌اید؟

                    <Link to="/login">
                        ورود
                    </Link>

                </div>

            </div>
        </div>
    );
}