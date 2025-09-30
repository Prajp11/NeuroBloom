import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Using the existing App.css for styles
import { FaBrain, FaRobot, FaSmile, FaHandsHelping, FaHeart,FaShieldAlt, FaClock } from 'react-icons/fa'; 
import therapyImg from '../Images/AboutImages/therapy.png'; 
import cbtImg from '../Images/AboutImages/cbt.png'; 
import moodImg from '../Images/AboutImages/mood-tracking.png'; 
import supportImg from '../Images/AboutImages/support-group.png'; 

const About = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Visibility animation effect
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleStartJourney = () => {
    navigate('/signup');
  };

  const handleLearnMore = () => {
    navigate('/contact');
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-brand-intro">
            <div className="about-brand-icon">
              🧠
            </div>
            <h1 className="about-title">
              Welcome to <span className="brand-gradient">NeuroBloom</span>
            </h1>
          </div>
          <p className="about-subtitle">
            Revolutionizing mental health through AI-powered innovation, compassionate care, 
            and evidence-based therapeutic approaches.
          </p>
          <div className="about-mission-highlight">
            <FaHeart className="mission-icon" />
            <span>Empowering minds, one connection at a time</span>
          </div>
        </div>
      </section>

      {/* Platform Capabilities Section */}
      <section className="about-stats">
        <div className="stats-container">
          <div className="stat-card">
            <FaClock className="stat-icon" />
            <div className="stat-number">24/7</div>
            <div className="stat-label">Available Support</div>
          </div>
          <div className="stat-card">
            <FaShieldAlt className="stat-icon" />
            <div className="stat-number">100%</div>
            <div className="stat-label">Privacy Protected</div>
          </div>
          <div className="stat-card">
            <FaBrain className="stat-icon" />
            <div className="stat-number">AI</div>
            <div className="stat-label">Powered Technology</div>
          </div>
          <div className="stat-card">
            <FaHeart className="stat-icon" />
            <div className="stat-number">Free</div>
            <div className="stat-label">Mental Health Support</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <div className="about-container">
          <h2 className="section-title">Our Core Features</h2>
          <p className="section-subtitle">
            Comprehensive mental health solutions powered by cutting-edge AI technology
          </p>
          
          <div className="modern-features-grid">
            {/* AI Therapy Feature */}
            <div className="modern-feature-card" data-delay="100">
              <div className="card-header">
                <div className="card-image-wrapper">
                  <img src={therapyImg} alt="AI Therapy" className="card-image" />
                  <div className="card-icon-overlay">
                    <FaRobot className="card-icon" />
                  </div>
                </div>
                <div className="card-badge primary">24/7 Available</div>
              </div>
              <div className="card-content">
                <h3 className="card-title">AI-Powered Therapy</h3>
                <p className="card-description">
                  Experience personalized therapeutic conversations with our advanced AI companion. 
                  Get instant support, guided exercises, and evidence-based mental health insights anytime, anywhere.
                </p>
                <div className="card-features">
                  <span className="feature-item">
                    <FaRobot className="feature-icon" />
                    Instant Response
                  </span>
                  <span className="feature-item">
                    <FaHeart className="feature-icon" />
                    Personalized Care
                  </span>
                  <span className="feature-item">
                    <FaShieldAlt className="feature-icon" />
                    Privacy Protected
                  </span>
                </div>
              </div>
            </div>

            {/* CBT Feature */}
            <div className="modern-feature-card" data-delay="200">
              <div className="card-header">
                <div className="card-image-wrapper">
                  <img src={cbtImg} alt="Cognitive Behavioral Therapy" className="card-image" />
                  <div className="card-icon-overlay">
                    <FaBrain className="card-icon" />
                  </div>
                </div>
                <div className="card-badge secondary">Evidence-Based</div>
              </div>
              <div className="card-content">
                <h3 className="card-title">Cognitive Behavioral Therapy</h3>
                <p className="card-description">
                  Transform negative thought patterns with proven CBT methodologies. 
                  Our interactive exercises help you build resilience and develop healthy coping strategies.
                </p>
                <div className="card-features">
                  <span className="feature-item">
                    <FaBrain className="feature-icon" />
                    Thought Reframing
                  </span>
                  <span className="feature-item">
                    <FaHeart className="feature-icon" />
                    Behavioral Change
                  </span>
                  <span className="feature-item">
                    <FaClock className="feature-icon" />
                    Progress Tracking
                  </span>
                </div>
              </div>
            </div>

            {/* Mood Tracking Feature */}
            <div className="modern-feature-card" data-delay="300">
              <div className="card-header">
                <div className="card-image-wrapper">
                  <img src={moodImg} alt="Mood Tracking" className="card-image" />
                  <div className="card-icon-overlay">
                    <FaSmile className="card-icon" />
                  </div>
                </div>
                <div className="card-badge tertiary">AI Analytics</div>
              </div>
              <div className="card-content">
                <h3 className="card-title">Smart Mood Tracking</h3>
                <p className="card-description">
                  Monitor your emotional patterns with intelligent tracking. 
                  Gain valuable insights into your mental health journey with detailed analytics and personalized recommendations.
                </p>
                <div className="card-features">
                  <span className="feature-item">
                    <FaSmile className="feature-icon" />
                    Pattern Recognition
                  </span>
                  <span className="feature-item">
                    <FaBrain className="feature-icon" />
                    Trend Analysis
                  </span>
                  <span className="feature-item">
                    <FaHeart className="feature-icon" />
                    Wellness Insights
                  </span>
                </div>
              </div>
            </div>

            {/* Community Support Feature */}
            <div className="modern-feature-card" data-delay="400">
              <div className="card-header">
                <div className="card-image-wrapper">
                  <img src={supportImg} alt="Support Group" className="card-image" />
                  <div className="card-icon-overlay">
                    <FaHandsHelping className="card-icon" />
                  </div>
                </div>
                <div className="card-badge quaternary">Professional Led</div>
              </div>
              <div className="card-content">
                <h3 className="card-title">Community Support</h3>
                <p className="card-description">
                  Join supportive communities and connect with licensed mental health professionals. 
                  Experience the power of shared healing and expert guidance in a safe environment.
                </p>
                <div className="card-features">
                  <span className="feature-item">
                    <FaHandsHelping className="feature-icon" />
                    Peer Support
                  </span>
                  <span className="feature-item">
                    <FaShieldAlt className="feature-icon" />
                    Expert Guidance
                  </span>
                  <span className="feature-item">
                    <FaHeart className="feature-icon" />
                    Safe Space
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="about-mission">
        <div className="mission-container">
          <div className="mission-content">
            <FaShieldAlt className="mission-shield" />
            <h2>Our Mission</h2>
            <p>
              At <strong>NeuroBloom</strong>, we're committed to democratizing mental health care through 
              innovative AI technology and compassionate human connection. We believe everyone deserves 
              access to quality mental health support, regardless of location, time, or circumstances.
            </p>
            <div className="mission-values">
              <div className="value-item">
                <span className="value-icon">🌟</span>
                <span>Excellence in Care</span>
              </div>
              <div className="value-item">
                <span className="value-icon">🔒</span>
                <span>Privacy & Security</span>
              </div>
              <div className="value-item">
                <span className="value-icon">🤝</span>
                <span>Inclusive Community</span>
              </div>
              <div className="value-item">
                <span className="value-icon">📈</span>
                <span>Continuous Innovation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <div className="cta-content">
          <h2>Ready to Begin Your Journey?</h2>
          <p>Join thousands of users who have transformed their mental wellness with NeuroBloom</p>
          <div className="cta-buttons">
            <button className="cta-primary" onClick={handleStartJourney}>Start Your Journey</button>
            <button className="cta-secondary" onClick={handleLearnMore}>Learn More</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
