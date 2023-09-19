import React, { useContext, useEffect, useRef, useState } from "react";
import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

function Messenger() {
  const [conversations, setConversations] = useState([]);
  const { user, socket } = useContext(AuthContext);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  // const socket = useRef();

  useEffect(() => {
    // socket.current = io("ws://localhost:8900");
    // socket.current?.on("getMessage", (data) => {
    socket?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [user]);

  useEffect(() => {
    if (user?._id) {
      // socket.current?.emit("addUser", user?._id);
      socket?.emit("addUser", user?._id);
      console.log(socket)
      // socket.current?.on("getUsers", (users) => {
      socket?.on("getUsers", (users) => {
        console.log(users);
        setOnlineUsers(
          user.followings.filter((f) => users.some((u) => u.userId === f))
        );
      });
    }
  }, [user]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.member.includes(arrivalMessage.sender) &&
      setMessages((prevState) => [...prevState, arrivalMessage]);
  }, [arrivalMessage]);

  // useEffect(() => {
  //   const getConversations = async () => {
  //     try {
  //       const res = await axios.get(backendUrl + "conversations/" + user._id);
  //       setConversations(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getConversations();
  // }, [user?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          backendUrl + "messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage) {
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
      };
      const receiverId = currentChat.member.find(
        (member) => member !== user._id
      );
      // socket.current?.emit("sendMessage", {
      socket?.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
      });
      try {
        const res = await axios.post(backendUrl + "messages", message);
        setMessages((prevState) => [...prevState, res.data]);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCurrentChat = async (userFollowing) => {
    const resConversationpost=await axios.post(backendUrl+"conversations",{
      receiverId:userFollowing,
      senderId:user._id
  })
    // const res = await axios.get(
    //   `${backendUrl}conversations/find/${userFollowing}/${user._id}`
    // );
    setCurrentChat(resConversationpost.data);
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="search for friends" className="chatMenuInput" />
            <div className="chatMenuFollowings">Followings</div>
            {user.followings.map((u) => (
              <div key={u} onClick={() => handleCurrentChat(u)}>
                <Conversation key={u} currentUser={user} friendId={u} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div key={m._id} ref={scrollRef}>
                      <Message
                        key={m._id}
                        message={m}
                        own={m.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="chatMessageInput"
                    placeholder="write something..."
                    value={newMessage}
                  ></textarea>
                  <button onClick={handleSubmit} className="chatSubmitButton">
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <div className="chatMenuFollowings">Online</div>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
