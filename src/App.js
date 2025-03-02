import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import MoodTracker from "./components/MoodTracker";
import { refreshToken } from "./auth";  // ✅ Import token refresh function

// Import pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// ✅ Function to check authentication properly
const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return token !== null && token !== "undefined";
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  // ✅ Refresh Token on App Load
  useEffect(() => {
    const refreshUserToken = async () => {
      const newToken = await refreshToken();
      if (newToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    };
    refreshUserToken();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Sidebar stays the same */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<><Home /><Carousel /></>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* ✅ Protected Routes */}
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/mood-tracker" element={isLoggedIn ? <MoodTracker /> : <Navigate to="/login" />} />

            {/* Redirect unknown routes to Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          {/* Footer Component */}
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
