import React, { useState } from "react";
import { Link } from "react-router-dom";

const cards = ["🍎", "🍌", "🍒", "🍇", "🍎", "🍌", "🍒", "🍇"];

const shuffleCards = () => {
  return [...cards].sort(() => Math.random() - 0.5);
};

const MemoryMatch = () => {
  const [shuffledCards, setShuffledCards] = useState(shuffleCards());
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const handleCardClick = (index) => {
    if (selectedCards.length === 1) {
      if (shuffledCards[selectedCards[0]] === shuffledCards[index]) {
        setMatchedCards([...matchedCards, shuffledCards[index]]);
      }
      setTimeout(() => setSelectedCards([]), 1000);
    } else {
      setSelectedCards([index]);
    }
  };

  return (
    <div className="game-container">
      <h2>🧠 Memory Match</h2>
      <p>Match the identical pairs!</p>
      <div className="grid">
        {shuffledCards.map((card, index) => (
          <button
            key={index}
            className={`card ${selectedCards.includes(index) || matchedCards.includes(card) ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            {selectedCards.includes(index) || matchedCards.includes(card) ? card : "❓"}
          </button>
        ))}
      </div>
      <Link to="/stress-relief/games"><button className="game-btn">Back</button></Link>
    </div>
  );
};

export default MemoryMatch;
