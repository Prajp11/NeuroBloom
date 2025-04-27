import React from "react";
import { Link } from "react-router-dom";

const Games = () => {
  return (
    <div className="games-container">
      <h2>🎮 Stress Relief Games</h2>
      <p>Engage in fun activities to relax your mind.</p>

      <div className="games-list">
        {/* Corrected the Link path for Balloon Pop Game */}
        <Link to="/stress-relief/games/balloonpop">
          <button className="game-btn">🎈 Balloon Pop</button>
        </Link>
        <Link to="/stress-relief/games/memory">
          <button className="game-btn">🧠 Memory Match</button>
        </Link>
        <Link to="/stress-relief/games/wordflowpuzzle">
          <button className="game-btn">🧩 Word Flow Puzzle</button>
        </Link>
        <Link to="/stress-relief/games/wordscramble">
          <button className="game-btn">🔤 Word Scrambler</button>
        </Link>
        <Link to="/stress-relief/games/doodlecanvas">
          <button className="game-btn">🖌️ Doodle Canvas</button>
        </Link>
        <Link to="/stress-relief/games/bubblepop">
          <button className="game-btn">🫧 Bubble Pop</button>
        </Link>
      </div>
    </div>
  );
};

export default Games;
