import React, { useRef, useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { PermMedia } from "@mui/icons-material";

function Register() {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const [file,setFile]=useState(null)
  const backendUrl=process.env.REACT_APP_BACKEND_URL

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
      if(file){
        const data=new FormData()
        const filename = Date.now() + file.name
        data.append("file",file)
        data.append("name",filename)
        data.append("username", username.current.value,)
        data.append("email",email.current.value.toLowerCase())
        data.append("password",password.current.value)
        try {
          const res = await axios.post(backendUrl+"auth/register", data);
          navigate("/login");
        } catch (error) {
          console.log(error);
        }
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
            <label htmlFor="file" className="shareOption">
              <input required style={{"zIndex":"-1"}} type="file" id="file" accept=".png,jpg,.jpeg" onChange={(e)=>{setFile(e.target.files[0])}}/>
              <PermMedia htmlColor="green" className="shareIcon" />
              <span className="shareOptionText"> Upload Profile Picture</span>
              {/* <input style={{display:"none"}} type="file" id="file" accept=".png,jpg,.jpeg" onChange={(e)=>{setFile(e.target.files[0])}}/> */}
            </label>
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
