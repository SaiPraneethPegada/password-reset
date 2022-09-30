import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Activate from "./components/Activate";
import Forgot from "./components/Forgot";
import Reset from "./components/Reset";
export const url = "https://password--reset--backend.herokuapp.com";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/activate/:activation_token"
                        element={<Activate />}
                    />
                    <Route path="/forgot_password" element={<Forgot />} />
                    <Route path="/reset_password/:token" element={<Reset />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
