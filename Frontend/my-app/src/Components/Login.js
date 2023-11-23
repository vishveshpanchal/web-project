import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../Styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(email);
      console.log(password);
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials for cross-origin requests
        body: JSON.stringify({ email, password }),
      });

      console.log("response== ", response);

      if (response.ok) {
        console.log("Login successful");
        // Redirect or perform actions for successful login
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        // Handle the error, show a message, etc.
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      // Handle unexpected errors
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLogin(e);
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="login-container">
        <div className="login-container-body">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <p className="loginName">LOGIN</p>
            </div>
            <div className="form-floating mb-3 is-invalid login-container-1">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3 login-container-2">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating mb-3 login-container-3">
              <button
                type="submit"
                className="btn btn-success login-container-3-submit-btn"
              >
                Login
              </button>
            </div>
            <div className="form-floating mb-3 login-container-4">
              <p className="texts">Not a user ?</p>
              <button
                type="button"
                className="btn btn-primary login-container-4-register-btn"
                onClick={navigateToRegister}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
