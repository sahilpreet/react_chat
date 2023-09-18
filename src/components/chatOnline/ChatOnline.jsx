import React, { useEffect, useState } from "react";
import "./chatonline.css";
import axios from "axios";

function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(backendUrl + "users/friends/" + currentId);
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [onlineUsers,friends]);

  const handleClick=async(onlineUser)=>{
    try {
      const res=await axios.get(`${backendUrl}conversations/find/${currentId}/${onlineUser._id}`)
      setCurrentChat(res.data)   
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div key={o._id} className="chatOnlineFriend" onClick={()=>handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              crossOrigin="anonymous"
              src={backendUrl+"users/image/download/"+o._id}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.username}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;


// {conversations.map((c) => (
//   <div key={c._id} onClick={() => setCurrentChat(c)}>
//     <Conversation key={c._id} conversation={c} currentUser={user} />
//   </div>
// ))}
