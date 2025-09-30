import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 && response.data.access) {
        // ✅ Store tokens
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);

        // ✅ Navigate immediately to dashboard
        navigate("/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      console.error("Error Response:", error.response);
      console.error("Error Request:", error.request);
      console.error("Error Message:", error.message);

      if (error.response) {
        // Server responded with error status
        if (error.response.status === 401) {
          setError("Invalid email or password.");
        } else {
          setError(`Server error: ${error.response.status} - ${error.response.statusText}`);
        }
      } else if (error.request) {
        // Request was made but no response received
        setError("Cannot connect to server. Please check if the backend server is running on http://127.0.0.1:8000");
      } else {
        // Something else happened
        setError(`Network error: ${error.message}`);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-brand">
            <div className="auth-brand-icon">🧠</div>
            <div className="auth-brand-text">MindCare</div>
          </div>
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to continue your mental wellness journey</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email address" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="auth-input-group">
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit">Sign In</button>
        </form>

        <div className="auth-footer">
          <p className="signup-text">
            Don't have an account? <Link to="/signup">Create one here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
