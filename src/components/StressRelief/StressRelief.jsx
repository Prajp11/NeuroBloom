import React from "react";
import { Link } from "react-router-dom";

const StressRelief = () => {
  return (
    <div className="stressrelief-container">
      <h2>💆 Stress Relief Activities</h2>
      <p>Choose an activity to help you relax.</p>

      <div className="activity-list">
        <Link to="/stress-relief/games">
          <button className="activity-btn">🎮 Play Games</button>
        </Link>
        <Link to="/stress-relief/education">
          <button className="activity-btn">📚 Mental Health Education</button>
        </Link>
        <Link to="/stress-relief/cbt">
          <button className="activity-btn">🧘 CBT Exercises</button>
        </Link>
      </div>
    </div>
  );
};

export default StressRelief;
