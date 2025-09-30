import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName] = useState("User"); // You can replace with actual user name from auth

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const dashboardItems = [
    {
      title: "Mood Tracking",
      description: "Monitor your daily emotional wellness journey",
      icon: "📊",
      path: "/mood-tracker",
      color: "#667eea",
      bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      stats: "Track Daily"
    },
    {
      title: "AI Chatbot",
      description: "Get instant support and guidance 24/7",
      icon: "🤖",
      path: "/chat",
      color: "#f093fb",
      bgGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      stats: "Available Now"
    },
    {
      title: "Stress Relief",
      description: "Relaxing activities and mindfulness exercises",
      icon: "🧘",
      path: "/stress-relief",
      color: "#4facfe",
      bgGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      stats: "5+ Activities"
    },
    {
      title: "Therapy Booking",
      description: "Connect with professional therapists",
      icon: "👩‍⚕️",
      path: "/therapy-booking",
      color: "#43e97b",
      bgGradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      stats: "Book Session"
    }
  ];

  const quickStats = [
    { label: "Days Active", value: "12", icon: "📅" },
    { label: "Mood Entries", value: "25", icon: "📝" },
    { label: "Sessions", value: "3", icon: "💬" },
    { label: "Streak", value: "7", icon: "🔥" }
  ];

  return (
    <div className="modern-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1 className="dashboard-greeting">
            {getGreeting()}, <span className="user-name">{userName}!</span>
          </h1>
          <p className="dashboard-subtitle">
            Ready to continue your mental wellness journey?
          </p>
          <div className="current-time">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
        <div className="dashboard-hero-icon">
          <div className="hero-circle">
            <span>🧠</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        {quickStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {dashboardItems.map((item, index) => (
          <Link key={index} to={item.path} className="dashboard-card-link">
            <div className="dashboard-card" style={{ '--card-bg': item.bgGradient }}>
              <div className="card-header">
                <div className="card-icon">{item.icon}</div>
                <div className="card-stats">{item.stats}</div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
              </div>
              <div className="card-footer">
                <span className="card-cta">Get Started →</span>
              </div>
              <div className="card-shine"></div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="recent-activity">
        <div className="section-header">
          <h2>Recent Activity</h2>
          <span className="view-all">View All →</span>
        </div>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📊</div>
            <div className="activity-content">
              <div className="activity-title">Mood logged as "Good"</div>
              <div className="activity-time">2 hours ago</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">🤖</div>
            <div className="activity-content">
              <div className="activity-title">Chat session completed</div>
              <div className="activity-time">Yesterday</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">🧘</div>
            <div className="activity-content">
              <div className="activity-title">Meditation session - 10 minutes</div>
              <div className="activity-time">2 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
