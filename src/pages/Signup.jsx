import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle signup submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Signup Data:", formData); // ✅ Debugging Step

    if (!formData.username) {
      setError("Username is required.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signup/", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      console.error("Signup Error:", error.response);

      if (error.response && error.response.data.error === "Email already registered") {
        setError("This email is already in use. Try logging in.");
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Signup successful! Redirecting...</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>

      <p className="login-text">
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Signup;
