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
        fontSize: popped ? '3rem' : '4.5rem',
        color: color,
        cursor: popped ? 'default' : 'pointer',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        transform: popped ? 'scale(1.5) rotate(15deg)' : 'scale(1) hover:scale(1.1)',
        opacity: popped ? 0 : 1,
        pointerEvents: popped ? 'none' : 'auto',
        userSelect: 'none',
        filter: popped ? 'brightness(1.5)' : 'brightness(1)',
        textShadow: popped ? '0 0 20px rgba(255, 255, 255, 0.8)' : `0 4px 8px ${color}33`,
        animation: !popped ? 'balloonFloat 3s ease-in-out infinite' : 'balloonPop 0.5s ease-out',
        zIndex: popped ? 10 : 1
      }}
    >
      {popped ? '💥✨🎊' : '🎈'}
      
      <style>{`
        @keyframes balloonFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-15px) rotate(3deg);
          }
        }
        
        @keyframes balloonPop {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.8) rotate(15deg);
          }
          100% {
            transform: scale(1.5) rotate(15deg);
            opacity: 0;
          }
        }
      `}</style>
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
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffecd2 100%)',
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
            background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            margin: '0 auto 20px',
            boxShadow: '0 15px 35px rgba(255, 154, 158, 0.4)',
            animation: 'balloonIconBounce 2s ease-in-out infinite'
          }}>
            🎈
          </div>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '900',
            color: '#2c3e50',
            margin: '0 0 10px 0',
            background: 'linear-gradient(135deg, #2c3e50 0%, #ff6b6b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Balloon Pop Adventure
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#666',
            margin: '0 0 20px 0',
            lineHeight: '1.6'
          }}>
            Pop all the colorful balloons to release stress and have fun!
          </p>
          
          {/* Score Display */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '20px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
            padding: '15px 30px',
            borderRadius: '50px',
            border: '2px solid rgba(255, 107, 107, 0.3)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 25px rgba(255, 107, 107, 0.2)'
          }}>
            <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#2c3e50' }}>
              🎯 Score: {score} / {maxBalloons}
            </span>
            {score === maxBalloons && (
              <span style={{ 
                fontSize: '1.5rem',
                animation: 'celebrationSpin 1s ease-in-out infinite'
              }}>
                🎉
              </span>
            )}
          </div>
        </div>

        {/* Game Area */}
        <div style={{
          position: 'relative',
          height: '500px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          {balloons.map((balloon) => (
            <Balloon key={balloon.id} id={balloon.id} onPop={handlePop} />
          ))}
          
          {/* Game Complete Message */}
          {score === maxBalloons && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              animation: 'victoryPopIn 0.8s ease-out'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '15px' }}>🎉</div>
              <h3 style={{ 
                fontSize: '2rem', 
                fontWeight: '800',
                color: '#4CAF50',
                margin: '0 0 10px 0'
              }}>
                Congratulations!
              </h3>
              <p style={{ 
                fontSize: '1.1rem',
                color: '#666',
                margin: '0'
              }}>
                You popped all {maxBalloons} balloons! Great stress relief! 🌟
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          padding: '15px',
          background: 'rgba(255, 107, 107, 0.1)',
          borderRadius: '15px',
          border: '1px solid rgba(255, 107, 107, 0.2)'
        }}>
          <p style={{ 
            fontSize: '1rem',
            color: '#666',
            margin: '0',
            fontWeight: '500'
          }}>
            � <strong>Tip:</strong> Click on the colorful balloons as they appear to pop them and earn points!
          </p>
        </div>
      </div>

      <style>{`
        @keyframes balloonIconBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes celebrationSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes victoryPopIn {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default BalloonPopGame;