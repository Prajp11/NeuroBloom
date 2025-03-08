import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const cards = ["🍎", "🍌", "🍒", "🍇", "🍎", "🍌", "🍒", "🍇"];

const shuffleCards = () => {
  return [...cards].sort(() => Math.random() - 0.5);
};

const MemoryMatch = () => {
  const [shuffledCards, setShuffledCards] = useState(shuffleCards());
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);

  // Timer logic
  useEffect(() => {
    if (timer > 0 && !isGameOver) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown); // Cleanup interval on component unmount
    } else if (timer === 0) {
      setIsGameOver(true);
    }
  }, [timer, isGameOver]);

  // Handle card click
  const handleCardClick = (index) => {
    if (selectedCards.length === 1 && selectedCards[0] !== index) {
      if (shuffledCards[selectedCards[0]] === shuffledCards[index]) {
        setMatchedCards([...matchedCards, shuffledCards[selectedCards[0]]]);
        setScore(score + 10); // Add score for correct match
      }
      setTimeout(() => setSelectedCards([]), 1000);
    } else {
      setSelectedCards([index]);
    }
  };

  // Restart the game
  const restartGame = () => {
    setShuffledCards(shuffleCards());
    setSelectedCards([]);
    setMatchedCards([]);
    setScore(0);
    setTimer(30);
    setIsGameOver(false);
  };

  return (
    <div className="game-container">
      <h2>🧠 Memory Match</h2>
      <p>Match the identical pairs before time runs out!</p>

      {/* Timer and Score Display */}
      <div className="game-info">
        <p>Time Left: {timer} seconds</p>
        <p>Score: {score}</p>
      </div>

      {/* Display Grid */}
      <div className="grid">
        {shuffledCards.map((card, index) => (
          <button
            key={index}
            className={`card ${selectedCards.includes(index) || matchedCards.includes(card) ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
            disabled={selectedCards.length === 1 && selectedCards[0] === index}
          >
            {selectedCards.includes(index) || matchedCards.includes(card) ? card : "❓"}
          </button>
        ))}
      </div>

      {/* Game Over Screen */}
      {isGameOver && (
        <div className="game-over">
          <h3>Game Over!</h3>
          <p>Your final score: {score}</p>
          <button onClick={restartGame} className="game-btn">Play Again</button>
        </div>
      )}

      {/* Back Button */}
      <Link to="/stress-relief/games">
        <button className="game-btn">Back</button>
      </Link>
    </div>
  );
};

export default MemoryMatch;
