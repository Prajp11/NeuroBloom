import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBrain, FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import "./Signup.css";
import "../../styles/saas-shared.css";

const easeOut = [0.22, 1, 0.36, 1];

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

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
      setError("Password must be at least 6 characters.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const signupData = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      };

      const response = await axios.post("http://127.0.0.1:8000/api/signup/", signupData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error("Signup Error:", err);

      if (err.response) {
        const data = err.response.data;
        if (data?.error === "Email already registered") {
          setError("This email is already in use. Try signing in.");
        } else if (data?.email) {
          setError(`Email: ${data.email[0]}`);
        } else if (data?.username) {
          setError(`Username: ${data.username[0]}`);
        } else if (data?.password) {
          setError(`Password: ${data.password[0]}`);
        } else {
          setError(`Server error: ${err.response.status} - ${err.response.statusText}`);
        }
      } else if (err.request) {
        setError("Cannot connect to server. Ensure the API is running at http://127.0.0.1:8000");
      } else {
        setError(`Network error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page nb-noise">
      <motion.div
        className="auth-container auth-container--wide nb-glass"
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
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">
            Join NeuroBloom to log moods, explore tools, and book support — private by design.
          </p>
        </div>

        {error ? <div className="error-message" role="alert">{error}</div> : null}
        {success ? (
          <div className="success-message" role="status">
            Account created. Redirecting to sign in…
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="auth-field">
            <label htmlFor="signup-email" className="auth-label">
              <FaEnvelope className="auth-label-icon" aria-hidden />
              Email
            </label>
            <input
              id="signup-email"
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
            <label htmlFor="signup-username" className="auth-label">
              <FaUser className="auth-label-icon" aria-hidden />
              Username
            </label>
            <input
              id="signup-username"
              type="text"
              name="username"
              placeholder="At least 3 characters"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
              className="auth-input"
              minLength={3}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="signup-password" className="auth-label">
              <FaLock className="auth-label-icon" aria-hidden />
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              name="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="auth-input"
              minLength={6}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="signup-confirm" className="auth-label">
              <FaLock className="auth-label-icon" aria-hidden />
              Confirm password
            </label>
            <input
              id="signup-confirm"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="auth-input"
            />
          </div>
          <button type="submit" className="auth-submit" disabled={isLoading || success}>
            {isLoading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <div className="auth-footer">
          <p className="login-text">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
          <p className="auth-trust">
            We never sell your health data. Read our approach on the{" "}
            <Link to="/about">About</Link> page.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
