import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  // user: {
  //   _id: "64e958825e795bb2db1448ad",
  //   username: "sahil1",
  //   email: "sahil1@gmail.com",
  //   coverPicture: "",
  //   profilePicture: "/persons/5.jpeg",
  //   followers: ["64e9a503b4b2929ae3895ef6"],
  //   isAdmin: false,
  //   desc: "pass changed",
  //   followings: ["64e9a503b4b2929ae3895ef6"],
  //   city: "new york",
  //   from: "toronto",
  //   relationship: "single",
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
        searchItems:state.searchItems,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
