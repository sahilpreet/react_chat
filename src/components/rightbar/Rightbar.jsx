import React, { useContext, useEffect, useState } from "react";
import "../rightbar/rightbar.css";
import { Users } from "../../DummyData";
import Online from "../online/Online";
import { Build, Home, Remove } from "@mui/icons-material";
import Profile from "../../pages/profile/Profile";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add } from "@mui/icons-material";

function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const BUIF = process.env.REACT_APP_BACKEND_USER_IMAGE_URL;
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (user?._id){
      setFollowed(currentUser.followings.includes(user?._id));
    }
  }, [user?._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user?._id){
          const friendList = await axios.get(`${backendUrl}users/friends/` + user?._id);
          setFriends(friendList.data);
        }else{
          return
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user?._id]);

  const handleClick = async (e) => {
    try {
      if (followed) {
        await axios.put(backendUrl+"users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(backendUrl+"users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed((prevState) => !prevState);
  };


  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img crossOrigin="anonymous" className="birthdayImg" src={backendUrl + "assets/image/download/gift"} alt="" />
          <span className="birthdayText">
            <b>Rashmika</b> and <b>3 other friends</b>{" "}
            <b>have a birthday today</b>
          </span>
        </div>
        <img crossOrigin="anonymous" className="rightbarAd" src={backendUrl + "assets/image/download/advertisement"} alt="" />
        {/* <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul> */}
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user?.username !== currentUser?.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"} {followed ? <Remove /> : <Add />}
          </button>
        )}
        {/* <h4 className="rightbarTitle">User Information</h4> */}
        {/* <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "marreied"
                : "-"}
            </span>
          </div>
        </div> */}
        <h4 className="rightbarTitle">Followings</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={`/profile/${friend?.username}`}
              style={{ textDecoration: "none" ,"color":"black"}}
            >
              <div className="rightbarFollowing">
                <img
                  crossOrigin="anonymous"
                  className="rightbarFollowingImg"
                  src={
                    friend.profilePicture
                      ? backendUrl+"users/image/download/" + friend._id
                      : `${PF}/persons/1.jpeg`
                  }
                  alt=""
                />
                <span className="rightbarFollowingName">
                  {friend?.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
