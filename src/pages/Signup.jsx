import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ 
    email: "", 
    username: "", 
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validate form
  const validateForm = () => {
    if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      setError("All fields are required.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return false;
    }

    return true;
  };

  // ✅ Handle signup submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Don't send confirmPassword to backend
      const signupData = {
        email: formData.email,
        username: formData.username,
        password: formData.password
      };

      const response = await axios.post("http://127.0.0.1:8000/api/signup/", signupData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      console.error("Error Response:", error.response);
      console.error("Error Request:", error.request);
      console.error("Error Message:", error.message);

      if (error.response) {
        // Server responded with error status
        if (error.response.data && error.response.data.error === "Email already registered") {
          setError("This email is already in use. Try logging in.");
        } else if (error.response.data && error.response.data.email) {
          setError("Email: " + error.response.data.email[0]);
        } else if (error.response.data && error.response.data.username) {
          setError("Username: " + error.response.data.username[0]);
        } else if (error.response.data && error.response.data.password) {
          setError("Password: " + error.response.data.password[0]);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Signup successful! Redirecting...</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="username" 
          placeholder="Username (min 3 characters)" 
          value={formData.username}
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password (min 6 characters)" 
          value={formData.password}
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          value={formData.confirmPassword}
          onChange={handleChange} 
          required 
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <p className="login-text">
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Signup;
