import React, { useEffect, useState } from "react";
import "./closefriend.css"
import axios from "axios";

function CloseFriend({userId}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const BUF=process.env.REACT_APP_BACKEND_IMAGE_URL
  const [userFriend,setUserFriend]=useState({})

  useEffect(()=>{
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${userId}`);
      setUserFriend(res.data);
    };
    fetchUser();
  },[userId])

  console.log(userId)

  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={userFriend.profilePicture?`${BUF}/${userFriend._id}`:PF+"/persons/dummy.jpeg"} alt="" />
      <span className="sidebarFriendName">{userFriend.username}</span>
    </li>
  );
}

export default CloseFriend;
