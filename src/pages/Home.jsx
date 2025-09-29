import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import chatbotImg from "../Images/Home/ai-chatbot.png";
import therapyImg from "../Images/Home/ptherapy.png";
import moodtrackImg from "../Images/Home/moodtrack.png";
import dashboardImg from "../Images/Home/f-dashboard.png";
import assessmentImg from "../Images/Home/assesment.png";

const features = [
  {
    title: "AI-Powered Chatbot",
    info: "Provides real-time emotional support, actionable insights, and mental health guidance using AI-driven conversations.",
    color: "#FFD700",
    image: chatbotImg,
  },
  {
    title: "Personalized Therapy Modules",
    info: "Offers AI-generated Cognitive Behavioral Therapy (CBT) exercises tailored to individual needs.",
    color: "#4CAF50",
    image: therapyImg,
  },
  {
    title: "Daily Mood Tracking",
    info: "Helps users monitor their mental state over time with interactive mood logs and trend analysis.",
    color: "#FF4500",
    image: moodtrackImg,
  },
  {
    title: "24/7 Multi-Mode Counseling",
    info: "Connect with professionals via chat, call, or video sessions while maintaining privacy and security.",
    color: "#3498db",
    image: dashboardImg,
  },
  {
    title: "AI-Driven Assessments",
    info: "Guided mental health evaluations with intelligent feedback and personalized action plans.",
    color: "#9B59B6",
    image: assessmentImg,
  },
];

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to Your 
            <span className="highlight-text"> Mental Health</span>
            <span className="gradient-text"> Companion</span>
          </h1>
          <p className="hero-description">
            Empowering mental well-being with AI-driven therapy, personalized
            support, and insightful analytics for a healthier, happier you.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Users Helped</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">AI-Powered</span>
              <span className="stat-label">Smart Therapy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section-home">
        <div className="section-header">
          <h2 className="section-title">Comprehensive Mental Health Solutions</h2>
          <p className="section-subtitle">Discover our suite of professional-grade tools designed to support your mental wellness journey</p>
        </div>
        <div className="card-container">
          {features.map((feature, index) => (
            <div key={index} className="feature-card modern-card" data-index={index}>
              <div className="card-header" style={{ backgroundColor: feature.color }}>
                <img src={feature.image} alt={feature.title} className="feature-image" />
              </div>
              <div className="card-body">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-info">{feature.info}</p>
                <div className="card-footer">
                  <span className="learn-more">Learn More →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Wellness Journey?</h2>
          <p className="cta-description">Join thousands of users who have transformed their mental health with our platform</p>
          <button className="login-button modern-btn" onClick={() => setShowModal(true)}>
            <span>Get Started Today</span>
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal for Login/Signup Options */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Get Started</h2>
            <p>Choose an option to proceed</p>
            <div className="modal-buttons">
              <Link to="/login" className="modal-btn login-btn">
                Login
              </Link>
              <Link to="/signup" className="modal-btn signup-btn">
                Signup
              </Link>
            </div>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
