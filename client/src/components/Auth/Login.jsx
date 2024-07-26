import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/Forms/AuthForm.css';

const Login = () => {
    return (
        <div className="auth-page">
            <div className="auth-form">
                <h2 className="sora">Login</h2>
                <form>
                    <input type="email" placeholder="Email" className="outfit" />
                    <input type="password" placeholder="Password" className="outfit" />
                    <button type="submit" className="outfit">Login</button>
                </form>
                <p className="outfit">Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;
