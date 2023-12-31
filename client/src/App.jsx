import HomeHoc from "./HOC/HomeHoc";
import Google from "./components/auth/Google";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./pages/Home";

function App() {
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
