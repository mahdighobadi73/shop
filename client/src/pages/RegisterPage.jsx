import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RegisterPage () {
    const navigate = useNavigate();
    const { register, isLoading, error } = useAuth();
    const [ form, setForm ] = useState( {
        name: "",
        email: "",
        password: "",
    } );

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        await register( form );
        navigate( "/" );
    };

    return (
        <div className="page">
            <h1>Register</h1>
            <form onSubmit={ handleSubmit } style={ { display: "grid", gap: 12, maxWidth: 420 } }>
                <input
                    type="text"
                    placeholder="Name"
                    value={ form.name }
                    onChange={ ( e ) => setForm( { ...form, name: e.target.value } ) }
                />
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
                    { isLoading ? "Creating..." : "Register" }
                </button>
            </form>
            <p>
                <Link to="/login">Login</Link>
            </p>
        </div>
    );
}
