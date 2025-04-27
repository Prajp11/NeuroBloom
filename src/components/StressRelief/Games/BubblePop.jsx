import React, { useEffect, useState } from 'react';

// Helper to create a random number in range
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Bubble Component (Updated to actual bubble styles)
const Bubble = ({ id, onPop }) => {
  const [popped, setPopped] = useState(false);
  const left = random(5, 90); // Horizontal position
  const top = random(10, 70); // Vertical position
  const size = random(80, 150); // Random size of bubble
  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#C084FC', '#FF9CEE', '#AFF8DB'];
  const color = colors[random(0, colors.length - 1)];

  const handleClick = () => {
    if (!popped) {
      setPopped(true);
      setTimeout(() => onPop(id), 500); // Delay to show blast effect
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'absolute',
        top: `${top}%`,
        left: `${left}%`,
        width: popped ? '0' : `${size}px`,
        height: popped ? '0' : `${size}px`,
        backgroundColor: popped ? 'transparent' : color,
        borderRadius: '50%',  // This gives the actual bubble shape
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        color: '#fff',
        cursor: 'pointer',
        transition: 'all 0.3s ease-out',
        transform: popped ? 'scale(2)' : 'scale(1)',
        opacity: popped ? 0 : 1,
        pointerEvents: popped ? 'none' : 'auto',
        boxShadow: popped ? 'none' : `0 5px 15px rgba(0, 0, 0, 0.3)`,
        zIndex: 2,
      }}
    >
      {popped ? '💥💨✨' : '🫧'}
    </div>
  );
};

// Main Game Component
const BubbleBlastGame = () => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);

  // Initialize all bubbles at once
  useEffect(() => {
    const bubbleCount = random(10, 15); // Number of bubbles
    const initialBubbles = Array.from({ length: bubbleCount }, (_, i) => ({
      id: Date.now() + i + Math.random(),
    }));
    setBubbles(initialBubbles);
  }, []);

  // Handle bubble pop
  const handlePop = (id) => {
    setScore((prev) => prev + 1);
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div style={{
      position: 'relative',
      height: '600px',
      background: 'linear-gradient(to top, #E1F7FF, #B3E5FC)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 5px 25px rgba(0,0,0,0.2)',
      margin: '30px auto',
      maxWidth: '700px',
      padding: '20px'
    }}>
      <h2 style={{ textAlign: 'center', color: '#00BCD4' }}>🫧 Bubble Blast Game</h2>
      <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>Score: {score}</p>

      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} id={bubble.id} onPop={handlePop} />
      ))}

      {bubbles.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '20px', color: '#8BC34A' }}>
          🎉 All bubbles popped! Great job!
        </div>
      )}

      <div style={{ position: 'absolute', bottom: 10, left: 20, fontSize: '14px', color: '#555' }}>
        💬 Click each bubble to pop it!
      </div>
    </div>
  );
};

export default BubbleBlastGame;