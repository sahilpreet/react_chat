import React, { useState, useEffect, useContext } from "react";
import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { Users } from "../../DummyData";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const BUIF = process.env.REACT_APP_BACKEND_USER_IMAGE_URL;
  const BUF = process.env.REACT_APP_BACKEND_IMAGE_URL;
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${backendUrl}users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      axios.put(backendUrl + "posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (error) {}
    setLike((prevState) => (isLiked ? prevState - 1 : prevState + 1));
    setIsLiked((prevState) => !prevState);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                crossOrigin="anonymous"
                src={
                  user.username
                    ? backendUrl + "users/image/download/" + user._id
                    : PF + `/persons/dummy.jpeg`
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)} mins ago</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img
            className="postImg"
            crossOrigin="anonymous"
            src={backendUrl + "posts/image/download/" + post._id}
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              crossOrigin="anonymous"
              className="likeIcon"
              src={backendUrl + "assets/image/download/like"}
              onClick={likeHandler}
              alt=""
            />
            <img
              crossOrigin="anonymous"
              className="likeIcon"
              src={backendUrl + "assets/image/download/heart"}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
