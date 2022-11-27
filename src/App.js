import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Activate from "./components/Activate";
import Forgot from "./components/Forgot";
import Reset from "./components/Reset";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
export const url = "https://password-reset-api.onrender.com";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/activate/:activation_token"
          element={<Activate />}
        ></Route>
        <Route path="/forgot_password" element={<Forgot />}></Route>
        <Route path="/reset_password/:token" element={<Reset />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="*" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
