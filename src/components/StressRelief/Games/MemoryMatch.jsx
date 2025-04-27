import React, { useState } from "react";

// Emoji symbol pairs for the cards
const symbolPool = [
  "🍎", "🍎", "🐶", "🐶", 
  "🚗", "🚗", "🌈", "🌈",
  "🎈", "🎈", "🎵", "🎵", 
  "🎲", "🎲", "🎯", "🎯"
];

// Shuffle function
const shuffleSymbols = () => {
  return [...symbolPool].sort(() => Math.random() - 0.5);
};

const MemoryMatchGame = () => {
  const [cards, setCards] = useState(
    shuffleSymbols().map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false
    }))
  );
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleCardClick = (id) => {
    if (flippedCards.length < 2 && !cards[id].isFlipped && !cards[id].isMatched) {
      const updatedCards = [...cards];
      updatedCards[id].isFlipped = true;
      setCards(updatedCards);

      const newFlipped = [...flippedCards, id];
      setFlippedCards(newFlipped);

      if (newFlipped.length === 2) {
        const [firstId, secondId] = newFlipped;
        if (cards[firstId].symbol === cards[secondId].symbol) {
          updatedCards[firstId].isMatched = true;
          updatedCards[secondId].isMatched = true;
          setCards(updatedCards);
          setScore((prev) => prev + 1);
          setFlippedCards([]);
        } else {
          setTimeout(() => {
            updatedCards[firstId].isFlipped = false;
            updatedCards[secondId].isFlipped = false;
            setCards(updatedCards);
            setFlippedCards([]);
          }, 800);
        }
      }
    }
  };

  const restartGame = () => {
    setCards(
      shuffleSymbols().map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false
      }))
    );
    setFlippedCards([]);
    setScore(0);
    setGameOver(false);
  };

  if (score === 8 && !gameOver) {
    setGameOver(true);
  }

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2 style={{ color: "#4D96FF" }}>🧠 Memory Match Game</h2>
      <p>Score: {score}/8</p>
      {gameOver && (
        <h3 style={{ color: "#4CAF50" }}>
          🎉 Well Done! You've matched all the symbols!
        </h3>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 80px)", gap: "10px", justifyContent: "center" }}>
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: card.isFlipped || card.isMatched ? "#fff" : "#e0e0e0",
              border: "2px solid #4D96FF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "32px",
              cursor: "pointer",
              borderRadius: "10px",
              transition: "all 0.3s ease"
            }}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped || card.isMatched ? card.symbol : "❓"}
          </div>
        ))}
      </div>

      <button
        onClick={restartGame}
        style={{
          padding: "10px 20px",
          backgroundColor: "#FF4747",
          color: "#fff",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          marginTop: "20px",
          fontSize: "16px"
        }}
      >
        🔁 Restart Game
      </button>
    </div>
  );
};

export default MemoryMatchGame;