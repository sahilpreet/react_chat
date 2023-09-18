import React from "react";
import "./message.css";
import {format} from "timeago.js"

function Message({message,own}) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  return (
    <div className={own?"message own":"message"}>
      <div className="messageTop">
        <img
          crossOrigin="anonymous"
          className="messageImg"
          src={backendUrl+"users/image/download/"+message.sender}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}

export default Message;
