import React, { useContext } from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import "../topbar/topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Topbar() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const {user} =useContext(AuthContext)


  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
        <span className="logo">Uchat</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="search for friend, post and videos"
            className="searchInput"
          />
        </div> 
      </div>
      <div className="topbarRight">
        <div className="topbarlinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
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
        <img src={user?.profilePicture
          ?PF+user?.profilePicture 
          : `${PF}/persons/dummy.jpeg`} alt="" className="topbarImg" />
          </Link>
      </div>
    </div>
  );
}

export default Topbar;
