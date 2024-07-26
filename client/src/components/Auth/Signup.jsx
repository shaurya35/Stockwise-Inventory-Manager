import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/Forms/AuthForm.css";

const Signup = () => {
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2 className="sora">Sign Up</h2>
        <form>
          <input type="text" placeholder="Username" className="outfit" />
          <input type="email" placeholder="Email" className="outfit" />
          <input type="password" placeholder="Password" className="outfit" />
          <button type="submit" className="outfit">
            Sign Up
          </button>
        </form>
        <p className="outfit">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
