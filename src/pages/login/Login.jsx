import { React, useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const backendUrl=process.env.REACT_APP_BACKEND_URL


  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current.value.toLowerCase(),
        password: password.current.value,
      },
      dispatch
    );
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
          <form
            className="loginBox"
            onSubmit={handleClick}
            disabled={isFetching}
          >
            <input
              type="Email"
              className="loginInput"
              required
              ref={email}
              placeholder="Email"
            />
            <input
              type="password"
              required
              ref={password}
              minLength="6"
              className="loginInput"
              placeholder="Password"
            />
            <button className="loginButton">
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password</span>
            <Link to="/register">
              <button className="loginRegisterButton">
                {isFetching ? (
                  <CircularProgress color="inherit" size="20px" />
                ) : (
                  "Create a New Account"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
