import React from "react";
import "./online.css";


function Online({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const backendUrl=process.env.REACT_APP_BACKEND_URL

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src={backendUrl+"users/image/download/"+user.profilePicture}
          alt=""
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}

export default Online;
