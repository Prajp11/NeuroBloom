import React, { useState } from "react";
import { Link } from "react-router-dom";

const BubblePop = () => {
  const [bubbles, setBubbles] = useState(Array(20).fill("🫧"));

  const popBubble = (index) => {
    setBubbles(bubbles.map((bubble, i) => (i === index ? "💥" : bubble)));
  };

  return (
    <div className="game-container">
      <h2>🫧 Bubble Pop</h2>
      <p>Tap to pop the bubbles!</p>
      <div className="bubble-container">
        {bubbles.map((bubble, index) => (
          <button key={index} className="bubble" onClick={() => popBubble(index)}>
            {bubble}
          </button>
        ))}
      </div>
      <Link to="/stress-relief/games"><button className="game-btn">Back</button></Link>
    </div>
  );
};

export default BubblePop;
