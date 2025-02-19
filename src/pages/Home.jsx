import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const features = [
  {
    title: 'AI-Powered Chatbot',
    info: 'Provides real-time emotional support, actionable insights, and mental health guidance using AI-driven conversations.',
    color: '#FFD700', // Gold
  },
  {
    title: 'Personalized Therapy Modules',
    info: 'Offers AI-generated Cognitive Behavioral Therapy (CBT) exercises tailored to individual needs.',
    color: '#4CAF50', // Green
  },
  {
    title: 'Daily Mood Tracking',
    info: 'Helps users monitor their mental state over time with interactive mood logs and trend analysis.',
    color: '#FF4500', // Orange-Red
  },
  {
    title: '24/7 Multi-Mode Counseling',
    info: 'Connect with professionals via chat, call, or video sessions while maintaining privacy and security.',
    color: '#3498db', // Blue
  },
  {
    title: 'AI-Driven Assessments',
    info: 'Guided mental health evaluations with intelligent feedback and personalized action plans.',
    color: '#9B59B6', // Purple
  },
  {
    title: 'Progress Analytics & Insights',
    info: 'Tracks therapy progress, offers AI-generated reports, and suggests continuous improvement strategies.',
    color: '#E67E22', // Dark Orange
  },
];

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Your Mental Health Companion</h1>
      <p>
        Empowering mental well-being with AI-driven therapy, personalized support, and insightful analytics.
      </p>

      {/* Features Section */}
      <section className="card-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card" style={{ backgroundColor: feature.color }}>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-info">{feature.info}</p>
          </div>
        ))}
      </section>

      {/* Call-to-Action Button */}
      <Link to="/login">
        <button className="login-button">Login to Explore</button>
      </Link>
    </div>
  );
};

export default Home;
