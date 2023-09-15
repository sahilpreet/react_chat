import React, { useContext, useRef } from "react";
import {
  Search,
  Person,
  Chat,
  Notifications,
  BackHand,
} from "@mui/icons-material";
import "../topbar/topbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { colors } from "@mui/material";

function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const BUIF = process.env.REACT_APP_BACKEND_USER_IMAGE_URL;
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { user, dispatch } = useContext(AuthContext);
  const searchItem = useRef();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch({ type: "NOTSEARCHED" });
    console.log(searchItem.current.value);
    try {
      if (searchItem.current.value) {
        const res = await axios.get(
          `${backendUrl}users/search?name=${searchItem.current.value}`
        );
        console.log(res.data);
        dispatch({ type: "SEARCHED", payload: res.data });
        navigate("/search");
        // searchItem.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Uchat</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <form className="searchbar" onSubmit={handleSearch}>
          <Search className="searchIcon" />
          <input
            placeholder="search for friend, post and videos"
            className="searchInput"
            ref={searchItem}
          />
        </form>
      </div>
      <div className="topbarRight">
        <div className="topbarlinks">
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <span className="topbarLink">Timeline</span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person></Person>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat></Chat>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications></Notifications>
            <span className="topbarIconBadge">4</span>
          </div>
        </div>
        <Link to={`/profile/${user?.username}`}>
          <img
            crossOrigin="anonymous"
            src={backendUrl + "users/image/download/" + user._id}
            alt=""
            className="topbarImg"
          />
          {/* <img src={user?.profilePicture
          ?BUIF+user._id
          : `${PF}/persons/dummy.jpeg`} alt="" className="topbarImg" /> */}
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
