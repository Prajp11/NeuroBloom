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
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 50%, #e6dee9 100%)',
      padding: '20px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '30px',
        padding: '30px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            margin: '0 auto 20px',
            boxShadow: '0 15px 35px rgba(161, 140, 209, 0.4)',
            animation: 'memoryIconPulse 2s ease-in-out infinite'
          }}>
            🧠
          </div>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '900',
            color: '#2c3e50',
            margin: '0 0 10px 0',
            background: 'linear-gradient(135deg, #2c3e50 0%, #a18cd1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Memory Master Challenge
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#666',
            margin: '0 0 20px 0',
            lineHeight: '1.6'
          }}>
            Test your memory by matching pairs of symbols. Great for cognitive training!
          </p>
          
          {/* Score Display */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '20px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
            padding: '15px 30px',
            borderRadius: '50px',
            border: '2px solid rgba(161, 140, 209, 0.3)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 25px rgba(161, 140, 209, 0.2)'
          }}>
            <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#2c3e50' }}>
              � Matches: {score} / 8
            </span>
            {gameOver && (
              <span style={{ 
                fontSize: '1.5rem',
                animation: 'memoryVictorySpin 1s ease-in-out infinite'
              }}>
                🏆
              </span>
            )}
          </div>
        </div>

        {/* Game Area */}
        <div style={{
          padding: '30px',
          background: 'linear-gradient(135deg, rgba(161, 140, 209, 0.05) 0%, rgba(251, 194, 235, 0.05) 100%)',
          borderRadius: '20px',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)',
          marginBottom: '20px'
        }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(4, 1fr)", 
            gap: "15px", 
            maxWidth: '480px',
            margin: '0 auto'
          }}>
            {cards.map((card) => (
              <div
                key={card.id}
                style={{
                  aspectRatio: '1',
                  backgroundColor: card.isFlipped || card.isMatched 
                    ? 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)' 
                    : 'linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)',
                  background: card.isFlipped || card.isMatched 
                    ? 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)' 
                    : 'linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)',
                  border: card.isMatched 
                    ? "3px solid #4CAF50" 
                    : card.isFlipped 
                    ? "3px solid #a18cd1" 
                    : "3px solid #dee2e6",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "2.5rem",
                  cursor: card.isMatched ? "default" : "pointer",
                  borderRadius: "15px",
                  transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  transform: card.isFlipped || card.isMatched ? "rotateY(0deg)" : "rotateY(0deg)",
                  boxShadow: card.isMatched 
                    ? "0 8px 25px rgba(76, 175, 80, 0.3), inset 0 0 20px rgba(76, 175, 80, 0.1)" 
                    : card.isFlipped 
                    ? "0 8px 25px rgba(161, 140, 209, 0.3)" 
                    : "0 4px 15px rgba(0, 0, 0, 0.1)",
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => handleCardClick(card.id)}
                onMouseEnter={(e) => {
                  if (!card.isMatched && !card.isFlipped) {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 6px 20px rgba(161, 140, 209, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!card.isMatched && !card.isFlipped) {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                  }
                }}
              >
                {card.isFlipped || card.isMatched ? card.symbol : "❓"}
                
                {card.isMatched && (
                  <div style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    fontSize: '1rem',
                    color: '#4CAF50'
                  }}>
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Game Complete Message */}
        {gameOver && (
          <div style={{
            textAlign: 'center',
            background: 'rgba(76, 175, 80, 0.1)',
            padding: '30px',
            borderRadius: '20px',
            border: '2px solid rgba(76, 175, 80, 0.3)',
            marginBottom: '20px',
            animation: 'memoryVictoryBounce 0.8s ease-out'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎉</div>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: '800',
              color: '#4CAF50',
              margin: '0 0 10px 0'
            }}>
              Memory Master!
            </h3>
            <p style={{ 
              fontSize: '1.1rem',
              color: '#666',
              margin: '0'
            }}>
              Excellent work! You matched all 8 pairs! Your memory skills are impressive! 🧠✨
            </p>
          </div>
        )}

        {/* Restart Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={restartGame}
            style={{
              padding: "15px 30px",
              background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
              color: "#fff",
              borderRadius: "25px",
              border: "none",
              cursor: "pointer",
              fontSize: "1.1rem",
              fontWeight: "700",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              boxShadow: "0 8px 25px rgba(255, 107, 107, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 35px rgba(255, 107, 107, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.3)';
            }}
          >
            🔄 New Game
          </button>
        </div>

        {/* Instructions */}
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          padding: '15px',
          background: 'rgba(161, 140, 209, 0.1)',
          borderRadius: '15px',
          border: '1px solid rgba(161, 140, 209, 0.2)'
        }}>
          <p style={{ 
            fontSize: '1rem',
            color: '#666',
            margin: '0',
            fontWeight: '500'
          }}>
            � <strong>Memory Tip:</strong> Focus on the positions and create mental associations to improve your recall!
          </p>
        </div>
      </div>

      <style>{`
        @keyframes memoryIconPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 15px 35px rgba(161, 140, 209, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 20px 45px rgba(161, 140, 209, 0.5);
          }
        }
        
        @keyframes memoryVictorySpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes memoryVictoryBounce {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default MemoryMatchGame;