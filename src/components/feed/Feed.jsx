import React, { useContext, useEffect, useState } from "react";
import "../feed/feed.css";
import Share from "../share/Share.jsx";
import Post from "../post/Post";
import { Posts } from "../../DummyData";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user} = useContext(AuthContext);
  const [postAdded, setPostAdded] = useState(false);
  const backendUrl=process.env.REACT_APP_BACKEND_URL

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`${backendUrl}posts/profile/` + username)
        : await axios.post(`${backendUrl}posts/timeline/` + user?._id,{"followings":user?.followings});
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2?.createdAt) - new Date(p1?.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user?._id]);

  const PostsFeed = () => {
    return (
      <>
        {username === user?.username && (
          <Share setpostAdded={setPostAdded}></Share>
        )}
        {posts.map((p) => (
          <Post key={p?._id} post={p} />
        ))}
      </>
    );
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        <PostsFeed />
      </div>
    </div>
  );
}

export default Feed;
