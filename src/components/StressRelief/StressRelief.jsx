import React from "react";
import { Link } from "react-router-dom";

const StressRelief = () => {
  return (
    <div className="stressrelief-page">
      <div className="stressrelief-container">
        {/* Hero Section */}
        <div className="stress-hero">
          <div className="stress-hero-icon">💆‍♀️</div>
          <h2>Stress Relief & Wellness Center</h2>
          <p>
            Discover powerful activities designed to reduce stress, boost mental clarity, 
            and enhance your overall well-being through evidence-based techniques.
          </p>
          <div className="stress-motivation">
            <span>🌟</span>
            <span>Your journey to inner peace starts here</span>
          </div>
        </div>

        {/* Activity Cards Grid */}
        <div className="activity-grid">
          <Link to="/stress-relief/games" className="activity-card games-card">
            <div className="activity-icon">🎮</div>
            <div className="activity-content">
              <h3>Interactive Games</h3>
              <p>
                Engage your mind with therapeutic games designed to reduce anxiety, 
                improve focus, and provide instant stress relief through fun activities.
              </p>
              <div className="activity-benefits">
                <span className="benefit-tag">Focus Training</span>
                <span className="benefit-tag">Instant Relief</span>
                <span className="benefit-tag">Fun & Engaging</span>
              </div>
              <button className="activity-cta">Start Playing</button>
            </div>
          </Link>

          <Link to="/stress-relief/education" className="activity-card education-card">
            <div className="activity-icon">📚</div>
            <div className="activity-content">
              <h3>Mental Health Education</h3>
              <p>
                Learn evidence-based strategies, understand mental health concepts, 
                and discover expert insights to build lasting wellness habits.
              </p>
              <div className="activity-benefits">
                <span className="benefit-tag">Expert Knowledge</span>
                <span className="benefit-tag">Self-Awareness</span>
                <span className="benefit-tag">Life Skills</span>
              </div>
              <button className="activity-cta">Learn More</button>
            </div>
          </Link>

          <Link to="/stress-relief/cbt" className="activity-card cbt-card">
            <div className="activity-icon">🧘‍♂️</div>
            <div className="activity-content">
              <h3>CBT Exercises</h3>
              <p>
                Practice Cognitive Behavioral Therapy techniques with guided exercises 
                that help reshape thought patterns and build emotional resilience.
              </p>
              <div className="activity-benefits">
                <span className="benefit-tag">Mindfulness</span>
                <span className="benefit-tag">Thought Control</span>
                <span className="benefit-tag">Emotional Balance</span>
              </div>
              <button className="activity-cta">Begin Practice</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StressRelief;
