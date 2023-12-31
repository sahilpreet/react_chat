import React, { useContext,useEffect,useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import { AuthContext } from "../../context/AuthContext";

function Home() {
  
  return (
    <>
      <Topbar></Topbar>
      <div className="homeContainer">
        <Sidebar></Sidebar>
        <Feed></Feed>
        {/* <Feed searchItems={searchItems}></Feed> */}
        <Rightbar />
      </div>
    </>
  );
}

export default Home;
