import { io } from "socket.io-client";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following != action.payload
          ),
        },
      };
    case "SEARCHED":
      return {
        ...state,
        searchItems: action.payload,
      };
    case "NOTSEARCHED":
      return {
        ...state,
        searchItems: [],
      };
    case "SOCKET_START":
      return {
        ...state,
        socket: io(action.payload),
      };

    default:
      return state;
  }
};

export default AuthReducer;
