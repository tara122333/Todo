import HomeHoc from "./HOC/HomeHoc";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./pages/Home";
import Temp from "./pages/Temp";

function App() {
  return (
    <>
      <HomeHoc path="/" exect component={Temp} />
      <HomeHoc path="/login" exect component={Login} />
      <HomeHoc path="/signup" exect component={Signup} />
      <HomeHoc path="/home/:_id" exect component={Home} />
    </>
  );
}

export default App;
