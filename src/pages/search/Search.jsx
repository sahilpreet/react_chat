import React, { useContext } from "react";
import "./search.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import SearchList from "../../components/searchlist/SearchList";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Search() {
  const { user, searchItems } = useContext(AuthContext);
  
  console.log(searchItems);

  return (
    <>
      <Topbar />
      <div className="searchContainer">
        <Sidebar />
        <div className="searchItemsDisplay">
          <ul className="sidebarFriendList">
            {searchItems.map((searchListItem) => (
              <SearchList searchListItem={searchListItem} />
            ))}
          </ul>
        </div>
        {/* <div className="searchItemsDisplay">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                crossOrigin="anonymous"
                src={
                  user.profilePicture
                    ? BUIF + user._id
                    : PF + `/persons/dummy.jpeg`
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
          </div>
        </div>
        </div> */}
        <Rightbar />
      </div>
    </>
  );
}

export default Search;
