import React, { useState } from "react";
import "./SignIn.css";
import { useAPI } from "./Context.js";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const handleChange = (e) => {
    setLogin((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };
  const { signUpUser } = useAPI();
  const UserLogin = () => {
    signUpUser(login);
  };
  return (
    <div className="login-page">
      <h1>Logo</h1>
      <p>Create new account</p>
      <div className="login-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={(e) => handleChange(e)}
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
          />
          <input
            onChange={(e) => handleChange(e)}
            type="password"
            name="password"
            className="password"
            placeholder="Password"
          />
          <input
            onChange={(e) => handleChange(e)}
            type="password"
            name="confirm_password"
            className="password"
            placeholder="Confirm Password"
          />
          <div className="signUpbtnContainer">
            <button className="signup GuruSignup" onClick={UserLogin}>
              Sign Up
            </button>
            <button className="signup signinGuru" onClick={() => navigate("/")}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
