import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { io } from "socket.io-client";

const INITIAL_STATE = {
  user: null,
  // user: {
  //   _id: "6505111c534393043829dc2c",
  //   username: "sahil",
  //   email: "sahil1@gmail.com",
  //   password: "Sahil99155",
  //   coverPicture: "",
  //   followers: [
  //     "6505133d15e3cef7adfbd099"
  //     ],
  //   followings: [
  //     "6505133d15e3cef7adfbd099",
  //     "650631986ad76d669eeaab99"
  //     ],
  //   isAdmin: false,
  //   createdAt: "2023-09-11T00:42:45.572Z",
  //   updatedAt: "2023-09-14T00:19:18.490Z",
  //   __v: 0,
  // },
  isFetching: false,
  error: false,
  searchItems: [],
  socket:null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        searchItems: state.searchItems,
        socket:state.socket,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
