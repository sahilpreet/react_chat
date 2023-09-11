import React, { useEffect, useState } from "react";
import "./closefriend.css";
import axios from "axios";
import { Link } from "react-router-dom";

function CloseFriend({ userId }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const BUF = process.env.REACT_APP_BACKEND_IMAGE_URL;
  const BUIF = process.env.REACT_APP_BACKEND_USER_IMAGE_URL;
  const [userFriend, setUserFriend] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${userId}`);
      setUserFriend(res.data);
    };
    fetchUser();
  }, [userId]);


  return (
    <Link to={`/profile/${userFriend.username}`} style={{"textDecoration":"none","color":"black"}}>
      <li className="sidebarFriend">
        <img
        crossOrigin="anonymous"
          className="sidebarFriendImg"
          src={
            userFriend.profilePicture
              ? `${BUIF}${userFriend._id}`
              : PF + "/persons/dummy.jpeg"
          }
          alt=""
        />
        <span className="sidebarFriendName">{userFriend.username}</span>
      </li>
    </Link>
  );
}

export default CloseFriend;
