import React, { useContext, useEffect, useRef, useState } from "react";
import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { loginCall } from "../../apiCalls";
import { useNavigate } from "react-router";

function Share({setpostAdded}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const BUIF = process.env.REACT_APP_BACKEND_USER_IMAGE_URL;
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { user,dispatch } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const navigate=useNavigate()


  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(file);
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("file", file);
      data.append("name", filename);
      data.append("userId", user._id);
      data.append("desc", desc.current.value);
      try {
        const res = await axios.post(backendUrl+"posts/image/upload", data);
        console.log(res.data);
        if (res.data){
          desc.current.value=""
          setFile(null)
          navigate("/")
        }
        // window.location.reload();
        // desc.current.value=""
        // setFile(null)
        // setpostAdded(true)
      } catch (error) {
        console.log(error);
      }
    } else {
      const post = {
        userId: user._id,
        desc: desc.current.value,
      };
      try {
        const res = await axios.post(backendUrl+"posts/image/upload", post);
        console.log(res.data);

        // window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            crossOrigin="anonymous"
            className="shareProfileImg"
            src={
              user.username ? backendUrl+"users/image/download/" + user._id : `${PF}/persons/dummy.jpeg`
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel
              className="shareCancelImg"
              onClick={() => setFile(null)}
            ></Cancel>
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption" id="fileShare">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or video</span>
              <input
                required
                type="file"
                id="file"
                accept=".png,jpg,.jpeg"
                style={{ zIndex: -1 }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
