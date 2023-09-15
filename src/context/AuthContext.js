import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  // user: {
  //   _id: "64fe628541cbea59d38181f5",
  //   username: "Sahil",
  //   email: "sahil1@gmail.com",
  //   password: "Sahil99155",
  //   coverPicture: "",
  //   followers: ["64fe8f23084dc0ab30d5489c"],
  //   followings: ["64fe8f23084dc0ab30d5489c"],
  //   isAdmin: false,
  //   createdAt: "2023-09-11T00:42:45.572Z",
  //   updatedAt: "2023-09-14T00:19:18.490Z",
  //   __v: 0,
  // },
  isFetching: false,
  error: false,
  searchItems: [],
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
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
