import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import { Person } from "@mui/icons-material";
import { useContext } from "react";
import Search from "./pages/search/Search";
import "./app.css";
import { io } from "socket.io-client";
// import { createBrowserRouter,RouterProvider } from "react-router-dom";
import {
  BrowserRouter,
  RouterProvider,
  Switch,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

// const router=createBrowserRouter([
//   {path:"/",element:user?<Home/>:<Register/>},
//   {path:"/profile/:username",element:<Profile/>},
//   {path:"/login",element:<Login/>},
//   {path:"/register",element:<Register/>},
// ])

// function App() {

//   return (
//     <RouterProvider router={router} />
//   );
// }

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register />} />
        <Route
          path="/profile/:username"
          element={user ? <Profile /> : <Register />}
        />
        <Route
          path="/messenger"
          element={user ? <Messenger /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace={true} /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace={true} /> : <Register />}
        />
        <Route path="/search" element={user ? <Search /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
