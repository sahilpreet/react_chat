import {React,useState,useEffect, useContext} from "react";
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
  const username=useParams().username
  // const {currentUser}=useContext(AuthContext)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username,user._id]);

  return (
    <>
      <Topbar></Topbar>
      <div className="profile">
        <Sidebar></Sidebar>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
            <img className="profileCoverImg" src={user.coverPicture?PF+user.coverPicture: PF+"/posts/dummy.jpeg"} alt="" />
            <img className="profileUserImg" src={user.profilePicture?PF+user.profilePicture:PF+"/persons/dummy.jpeg"} alt="" />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user?.username}</h4>
                <span className="profileInfoDesc"> {user?.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}></Feed>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
