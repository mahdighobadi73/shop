import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage () {
    const navigate = useNavigate();
    const { login, isLoading, error } = useAuth();
    const [ form, setForm ] = useState( { email: "", password: "" } );

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        await login( form );
        navigate( "/" );
    };

    return (
        <div className="page">
            <h1>Login</h1>
            <form onSubmit={ handleSubmit } style={ { display: "grid", gap: 12, maxWidth: 420 } }>
                <input
                    type="email"
                    placeholder="Email"
                    value={ form.email }
                    onChange={ ( e ) => setForm( { ...form, email: e.target.value } ) }
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={ form.password }
                    onChange={ ( e ) => setForm( { ...form, password: e.target.value } ) }
                />
                { error ? <p>{ error }</p> : null }
                <button type="submit" disabled={ isLoading }>
                    { isLoading ? "Signing in..." : "Login" }
                </button>
            </form>
            <p>
                <Link to="/register">Register</Link>
            </p>
        </div>
    );
}
