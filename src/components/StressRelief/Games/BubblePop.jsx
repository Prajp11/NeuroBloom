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
        background: popped ? 'transparent' : `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), ${color}99, ${color})`,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: popped ? '3rem' : '2.5rem',
        color: popped ? '#667eea' : 'rgba(255, 255, 255, 0.9)',
        cursor: popped ? 'default' : 'pointer',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        transform: popped ? 'scale(1.8) rotate(30deg)' : 'scale(1)',
        opacity: popped ? 0 : 0.85,
        pointerEvents: popped ? 'none' : 'auto',
        boxShadow: popped ? 'none' : `0 8px 25px rgba(0, 0, 0, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.3)`,
        zIndex: popped ? 10 : 2,
        border: popped ? 'none' : '2px solid rgba(255, 255, 255, 0.4)',
        animation: !popped ? 'bubbleGentleFloat 4s ease-in-out infinite' : 'bubblePopBurst 0.5s ease-out',
        backdropFilter: popped ? 'none' : 'blur(1px)'
      }}
    >
      {popped ? '�✨🌟' : ''}
      
      {/* Bubble Highlight Effect */}
      {!popped && (
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '25%',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />
      )}
      
      <style>{`
        @keyframes bubbleGentleFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-8px) rotate(2deg) scale(1.02);
          }
          75% {
            transform: translateY(5px) rotate(-1deg) scale(0.98);
          }
        }
        
        @keyframes bubblePopBurst {
          0% {
            transform: scale(1);
            opacity: 0.85;
          }
          50% {
            transform: scale(2.2) rotate(30deg);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.8) rotate(30deg);
            opacity: 0;
          }
        }
      `}</style>
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
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #c2e9fb 0%, #a1c4fd 50%, #667eea 100%)',
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
            background: 'linear-gradient(135deg, #c2e9fb 0%, #a1c4fd 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            margin: '0 auto 20px',
            boxShadow: '0 15px 35px rgba(194, 233, 251, 0.4)',
            animation: 'bubbleIconFloat 3s ease-in-out infinite'
          }}>
            🫧
          </div>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '900',
            color: '#2c3e50',
            margin: '0 0 10px 0',
            background: 'linear-gradient(135deg, #2c3e50 0%, #667eea 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Bubble Bliss
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#666',
            margin: '0 0 20px 0',
            lineHeight: '1.6'
          }}>
            Pop all the magical bubbles and watch them burst with joy!
          </p>
          
          {/* Score Display */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '20px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
            padding: '15px 30px',
            borderRadius: '50px',
            border: '2px solid rgba(102, 126, 234, 0.3)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)'
          }}>
            <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#2c3e50' }}>
              🎯 Popped: {score}
            </span>
            <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#667eea' }}>
              Remaining: {bubbles.length}
            </span>
          </div>
        </div>

        {/* Game Area */}
        <div style={{
          position: 'relative',
          height: '500px',
          background: 'linear-gradient(135deg, rgba(194, 233, 251, 0.1) 0%, rgba(161, 196, 253, 0.05) 100%)',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          {bubbles.map((bubble) => (
            <Bubble key={bubble.id} id={bubble.id} onPop={handlePop} />
          ))}
          
          {/* Game Complete Message */}
          {bubbles.length === 0 && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '40px',
              borderRadius: '25px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              animation: 'bubbleVictoryBounce 1s ease-out'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '15px' }}>🎉</div>
              <h3 style={{ 
                fontSize: '2.2rem', 
                fontWeight: '800',
                color: '#4CAF50',
                margin: '0 0 15px 0'
              }}>
                Bubble Master!
              </h3>
              <p style={{ 
                fontSize: '1.2rem',
                color: '#666',
                margin: '0 0 15px 0'
              }}>
                Amazing! You popped all {score} bubbles! 🫧✨
              </p>
              <div style={{ fontSize: '2rem' }}>🌟🎊🌟</div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          padding: '15px',
          background: 'rgba(102, 126, 234, 0.1)',
          borderRadius: '15px',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          <p style={{ 
            fontSize: '1rem',
            color: '#666',
            margin: '0',
            fontWeight: '500'
          }}>
            � <strong>Relaxation Tip:</strong> Take deep breaths as you pop each bubble for maximum stress relief!
          </p>
        </div>
      </div>

      <style>{`
        @keyframes bubbleIconFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-12px) rotate(5deg);
          }
        }
        
        @keyframes bubbleVictoryBounce {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.1);
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

export default BubbleBlastGame;