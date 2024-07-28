import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/Forms/AuthForm.css";
import { useLogin } from '../../hooks/useLogin' 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2 className="sora">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="outfit"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="outfit"
          />
          <button type="submit" disabled={isLoading} className="outfit">
            Login
          </button>
          {error && <div> {error}</div>}
        </form>
        <p className="outfit">
          Don't have an account? <Link to="/auth/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
