import { React, useState, useEffect, useContext } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const BUIF = process.env.REACT_APP_BACKEND_USER_IMAGE_URL;
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  // const {currentUser}=useContext(AuthContext)
  const {
    user: currentUser,
    postShared,
    dispatch,
    error,
  } = useContext(AuthContext);
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(backendUrl + `users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username, user._id]);

  // console.log(postShared)

  return (
    <>
      <Topbar></Topbar>
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                crossOrigin="anonymous"
                className="profileCoverImg"
                src={
                  user.username
                    ? backendUrl + "users/image/download/" + user._id
                    : PF + "/posts/dummy.jpeg"
                }
                alt=""
              />
              <img
                crossOrigin="anonymous"
                className="profileUserImg"
                src={
                  user.username
                    ? backendUrl + "users/image/download/" + user._id
                    : PF + "/persons/dummy.jpeg"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.username}</h4>
              <span className="profileInfoDesc"> {user?.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Sidebar></Sidebar>
            <Feed username={username}></Feed>
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
