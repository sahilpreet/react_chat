import React from "react";
import "./searchlist.css";
import { Link } from "react-router-dom";

function SearchList({ searchListItem }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const BUF = process.env.REACT_APP_BACKEND_IMAGE_URL;
  const BUIF = process.env.REACT_APP_BACKEND_USER_IMAGE_URL;

  return (
    <Link to={`/profile/${searchListItem.username}`} style={{ textDecoration: "none", color: "black" }}>
      <li className="searchbarFriend">
        <img
          crossOrigin="anonymous"
          className="searchbarFriendImg"
          src={
            searchListItem.username
              ? `${BUIF}${searchListItem._id}`
              : PF + "/persons/dummy.jpeg"
          }
          alt=""
        />
        <span className="searchbarFriendName">{searchListItem.username}</span>
      </li>
    </Link>
  );
}

export default SearchList;
