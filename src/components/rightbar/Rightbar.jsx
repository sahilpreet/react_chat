import React, { useContext, useEffect, useState } from "react";
import "../rightbar/rightbar.css";
import { Users } from "../../DummyData";
import Online from "../online/Online";
import { Home, Remove } from "@mui/icons-material";
import Profile from "../../pages/profile/Profile";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add } from "@mui/icons-material";

function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [user?._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user?._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user?._id]);

  const handleClick = async (e) => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
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
          <img className="birthdayImg" src={`${PF}/gift.jpg`} alt="" />
          <span className="birthdayText">
            <b>Rashmika</b> and <b>3 other friends</b>{" "}
            <b>have a birthday today</b>
          </span>
        </div>
        <img className="rightbarAd" src={`${PF}/advertisement.jpg`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
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
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
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
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={`/profile/${friend?.username}`}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  className="rightbarFollowingImg"
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
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
