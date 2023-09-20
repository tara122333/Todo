import HomeHoc from "./HOC/HomeHoc";
import Temp from "./pages/Temp";

function App() {
  return (
    <>
      <HomeHoc path="/" exect component={Temp} />
      <HomeHoc path="/login" exect component={Temp} />
      <HomeHoc path="/signup" exect component={Temp} />
    </>
  );
}

export default App;
