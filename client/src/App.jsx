import HomeHoc from "./HOC/HomeHoc";
import Google from "./components/auth/Google";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./pages/Home";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "https://todo-7z9f.onrender.com";
  axios.defaults.params = {}; //empty object important without this got error
  // axios.defaults.params["api_key"] = process.env.REACT_APP_API_KEY;

  return (
    <>
      <HomeHoc path="/" exect component={Home} />
      <HomeHoc path="/login" exect component={Login} />
      <HomeHoc path="/signup" exect component={Signup} />
      <HomeHoc path="/google/:token" exect component={Google} />
      <HomeHoc path="/home" exect component={Home} />
    </>
  );
}

export default App;
