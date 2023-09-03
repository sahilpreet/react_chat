import React, { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Register() {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClik = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value.toLowerCase(),
        password: password.current.value,
      };
      try {
        const res = await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">UChat</h3>
          <span className="loginDesc">
            Connnect with friends around the world
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClik}>
            <input
              ref={username}
              required
              className="loginInput"
              placeholder="Username"
            />
            <input
              type="email"
              ref={email}
              required
              className="loginInput"
              placeholder="Email"
            />
            <input
              type="password"
              required
              minLength="6"
              ref={password}
              className="loginInput"
              placeholder="Password"
            />
            <input
              type="password"
              required
              className="loginInput"
              ref={passwordAgain}
              placeholder="Re-enter Password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">
                Login into account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
