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
    learnMore: {
      heading: "AI-Powered Chatbot",
      details: "Our AI-powered chatbot offers 24/7 support, helping you manage stress, anxiety, and other mental health challenges. It uses advanced natural language processing to provide empathetic responses, mood tracking, and actionable self-care tips. All conversations are private and secure.",
    },
  },
  {
    title: "Personalized Therapy Modules",
    info: "Offers AI-generated Cognitive Behavioral Therapy (CBT) exercises tailored to individual needs.",
    color: "#4CAF50",
    image: therapyImg,
    learnMore: {
      heading: "Personalized Therapy Modules",
      details: "Access a library of AI-generated CBT exercises and therapy modules designed to address your unique needs. Our platform adapts to your progress, offering new exercises and feedback to help you build resilience and develop healthy coping strategies.",
    },
  },
  {
    title: "Daily Mood Tracking",
    info: "Helps users monitor their mental state over time with interactive mood logs and trend analysis.",
    color: "#FF4500",
    image: moodtrackImg,
    learnMore: {
      heading: "Daily Mood Tracking",
      details: "Track your mood daily with our intuitive mood logs. Visualize trends, identify triggers, and receive personalized insights to help you understand and improve your mental well-being over time.",
    },
  },
  {
    title: "24/7 Multi-Mode Counseling",
    info: "Connect with professionals via chat, call, or video sessions while maintaining privacy and security.",
    color: "#3498db",
    image: dashboardImg,
    learnMore: {
      heading: "24/7 Multi-Mode Counseling",
      details: "Connect instantly with licensed mental health professionals through chat, voice, or video calls. Our counselors are available around the clock to provide confidential support, guidance, and crisis intervention whenever you need it.",
    },
  },
  {
    title: "AI-Driven Assessments",
    info: "Guided mental health evaluations with intelligent feedback and personalized action plans.",
    color: "#9B59B6",
    image: assessmentImg,
    learnMore: {
      heading: "AI-Driven Assessments",
      details: "Take comprehensive mental health assessments powered by AI. Receive instant, personalized feedback and actionable plans to help you take the next steps in your wellness journey.",
    },
  },
];

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [featureModal, setFeatureModal] = useState({ open: false, feature: null });

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="brand-intro">
            <div className="brand-icon">🧠</div>
            <span className="brand-name">NeuroBloom</span>
          </div>
          <h1 className="hero-title">
            Your Trusted 
            <span className="highlight-text"> Mental Health</span>
            <span className="gradient-text"> Companion</span>
          </h1>
          <p className="hero-description">
            Empowering mental well-being through AI-driven therapy, personalized
            support, and intelligent analytics for a healthier, happier you.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-icon">🕒</div>
              <div className="stat-content">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support Available</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🤖</div>
              <div className="stat-content">
                <span className="stat-number">AI-Powered</span>
                <span className="stat-label">Smart Therapy</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🌟</div>
              <div className="stat-content">
                <span className="stat-number">Trusted</span>
                <span className="stat-label">By Thousands</span>
              </div>
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
                  <button
                    className="learn-more clickable"
                    onClick={() => setFeatureModal({ open: true, feature })}
                  >
                    Learn More →
                  </button>
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

      {/* Modal for Feature Learn More */}
      {featureModal.open && featureModal.feature && (
        <div className="modal-overlay" onClick={() => setFeatureModal({ open: false, feature: null })}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{featureModal.feature.learnMore.heading}</h2>
            <p>{featureModal.feature.learnMore.details}</p>
            <button className="close-btn" onClick={() => setFeatureModal({ open: false, feature: null })}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
