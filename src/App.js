import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";
import { useState } from "react";
import Home from "./pages/Home";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <NavBar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} />} // pass setToken to update on login
        />
        <Route path="/me" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}