import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    console.log("Login Data:", formData); // ✅ Debugging Step

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Login Response:", response.data); // ✅ Debugging Step

      if (response.status === 200 && response.data.access) {
        // ✅ Store tokens
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        console.log("Access Token Saved:", localStorage.getItem("accessToken"));

        // ✅ Delay to ensure localStorage is updated
        setTimeout(() => {
          console.log("Redirecting to Dashboard...");
          navigate("/dashboard");
        }, 1000);  // 1-second delay to ensure storage updates
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error.response);

      if (error.response && error.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
