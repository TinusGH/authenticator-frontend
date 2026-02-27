import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./Home.css";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // not logged in

    const fetchUser = async () => {
      try {
        const response = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        // Optional: remove invalid token
        localStorage.removeItem("token");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="home-container">
      {user ? (
        <>
          <h1>Welcome back, {user.firstName}!</h1>
          <p>Go to your user details to see your info.</p>
          <div className="home-buttons">
            <Link to="/me" className="home-btn">User Details</Link>
          </div>
        </>
      ) : (
        <>
          <h1>Welcome!</h1>
          <p>Please log in or register to continue.</p>
          <div className="home-buttons">
            <Link to="/login" className="home-btn">Login</Link>
            <Link to="/register" className="home-btn">Register</Link>
          </div>
        </>
      )}
    </div>
  );
}