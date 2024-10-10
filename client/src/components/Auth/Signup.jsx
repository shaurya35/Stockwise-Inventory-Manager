import React, { useState} from "react";
import { Link } from "react-router-dom";
import "../../styles/components/Forms/AuthForm.css";
import { useSignup } from '../../hooks/useSignup'
import LoginButton from "../LoginButton";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(username, email, password)
  }

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2 className="sora">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="outfit"
          />
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
          <LoginButton 
            title="Sign up" 
            isLoading={isLoading}
            disabled={isLoading}
            type="submit" 
          />
          {error && <div>{error}</div>}
        </form>
        <p className="outfit">
          Already have an account? <Link to="/auth/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
