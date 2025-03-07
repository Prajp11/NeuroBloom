import React from "react";
import { Link } from "react-router-dom";

const Games = () => {
  return (
    <div className="games-container">
      <h2>🎮 Stress Relief Games</h2>
      <p>Engage in fun activities to relax your mind.</p>

      <div className="games-list">
        <Link to="/stress-relief/games/breathing">
          <button className="game-btn">🌬️ Breathing Exercise</button>
        </Link>
        <Link to="/stress-relief/games/memory">
          <button className="game-btn">🧠 Memory Match</button>
        </Link>
        <Link to="/stress-relief/games/bubblepop">
          <button className="game-btn">🫧 Bubble Pop</button>
        </Link>
      </div>
    </div>
  );
};

export default Games;
