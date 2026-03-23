import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBrain, FaEnvelope, FaLock } from "react-icons/fa";
import "./Login.css";
import "../../styles/saas-shared.css";

const easeOut = [0.22, 1, 0.36, 1];

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 && response.data.access) {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        navigate("/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);

      if (err.response) {
        if (err.response.status === 401) {
          setError("Invalid email or password.");
        } else {
          setError(`Server error: ${err.response.status} - ${err.response.statusText}`);
        }
      } else if (err.request) {
        setError("Cannot connect to server. Ensure the API is running at http://127.0.0.1:8000");
      } else {
        setError(`Network error: ${err.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page nb-noise">
      <motion.div
        className="auth-container nb-glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <div className="auth-header">
          <Link to="/" className="auth-brand" aria-label="NeuroBloom home">
            <span className="auth-brand-icon" aria-hidden>
              <FaBrain />
            </span>
            <span className="auth-brand-text">NeuroBloom</span>
          </Link>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">
            Sign in to continue your mental wellness journey. Your data is encrypted in transit.
          </p>
        </div>

        {error ? <div className="error-message" role="alert">{error}</div> : null}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="auth-field">
            <label htmlFor="login-email" className="auth-label">
              <FaEnvelope className="auth-label-icon" aria-hidden />
              Email
            </label>
            <input
              id="login-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="auth-input"
            />
          </div>
          <div className="auth-field">
            <label htmlFor="login-password" className="auth-label">
              <FaLock className="auth-label-icon" aria-hidden />
              Password
            </label>
            <input
              id="login-password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="auth-input"
            />
          </div>
          <button type="submit" className="auth-submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="auth-footer">
          <p className="signup-text">
            Don&apos;t have an account? <Link to="/signup">Create one</Link>
          </p>
          <p className="auth-trust">
            By continuing you agree to respectful use of this space. Need help?{" "}
            <Link to="/contact">Contact us</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
