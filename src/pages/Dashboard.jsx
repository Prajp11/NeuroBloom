import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <p className="dashboard-description">Welcome to your mental health dashboard.</p>

      <div className="dashboard-buttons">
        {/* ✅ Button to go to Mood Tracker */}
        <Link to="/mood-tracker">
          <button className="dashboard-btn">📝 Mood Tracking</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
