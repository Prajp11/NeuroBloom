import React, { useEffect, useState } from 'react';

// Helper to create a random number in range
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Individual Balloon Component
const Balloon = ({ id, onPop }) => {
  const [popped, setPopped] = useState(false);
  const top = random(10, 80);
  const left = random(5, 90);
  const colors = [
    '#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#C084FC',
    '#FF9F1C', '#FF5D8F', '#00BBF9', '#9B5DE5', '#F15BB5'
  ];
  const color = colors[random(0, colors.length - 1)];

  const handlePop = () => {
    if (!popped) {
      setPopped(true);
      setTimeout(() => onPop(id), 500);
    }
  };

  return (
    <div
      onClick={handlePop}
      style={{
        position: 'absolute',
        top: `${top}%`,
        left: `${left}%`,
        fontSize: '4rem',
        color: color,
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        transform: popped ? 'scale(1.8)' : 'scale(1)',
        opacity: popped ? 0 : 1,
        pointerEvents: popped ? 'none' : 'auto',
        userSelect: 'none'
      }}
    >
      {popped ? '💥💫✨' : '🎈'}
    </div>
  );
};

// Main Game Component
const BalloonPopGame = () => {
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [maxBalloons] = useState(random(5, 10)); // Set random limit once
  const [spawnedCount, setSpawnedCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (spawnedCount < maxBalloons) {
        const newBalloon = { id: Date.now() + Math.random() };
        setBalloons((prev) => [...prev, newBalloon]);
        setSpawnedCount((count) => count + 1);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [spawnedCount, maxBalloons]);

  const handlePop = (id) => {
    setScore((prev) => prev + 1);
    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  useEffect(() => {
    if (score > 0 && score % 5 === 0) {
      setTimeout(() => {
        alert("💡 You're doing great! Keep breathing and smiling 😊");
      }, 300);
    }
  }, [score]);

  return (
    <div style={{
      position: 'relative',
      height: '550px',
      background: 'linear-gradient(to top right, #d1f3ff, #ffffff)',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
      margin: '30px auto',
      maxWidth: '620px',
      padding: '10px'
    }}>
      <h2 style={{ textAlign: 'center', color: '#4D96FF', fontSize: '1.8rem' }}>🎯 Balloon Pop Game</h2>
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
        Score: {score} / {maxBalloons}
      </p>

      {balloons.map((balloon) => (
        <Balloon key={balloon.id} id={balloon.id} onPop={handlePop} />
      ))}

      <div style={{ position: 'absolute', bottom: 10, left: 10, fontSize: '14px', color: '#999' }}>
        💬 Click the balloons before they float away!
      </div>
    </div>
  );
};

export default BalloonPopGame;