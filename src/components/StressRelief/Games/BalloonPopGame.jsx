import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BalloonPopGame = () => {
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Game duration (in seconds)
  
  // Generate balloons at random positions
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        setBalloons((prevBalloons) => [
          ...prevBalloons,
          { id: Date.now(), left: Math.random() * 80 + "%", top: Math.random() * 80 + "%" },
        ]);
      }
    }, 1000); // A new balloon every second

    return () => clearInterval(interval);
  }, [gameOver]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // Decrease the time every second

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true); // End game when timer reaches 0
    }
  }, [timeLeft, gameOver]);

  // Handle balloon pop
  const popBalloon = (id) => {
    setScore(score + 1);
    setBalloons(balloons.filter((balloon) => balloon.id !== id));
  };

  // Handle game over
  const endGame = () => {
    setGameOver(true);
  };

  return (
    <div className="balloon-pop-game">
      <h2>🎈 Balloon Pop Game</h2>
      <p>Click on the balloons to pop them!</p>

      {/* Display score and timer */}
      <div className="score-timer">
        <p>Score: {score}</p>
        <p>Time Left: {timeLeft}s</p>
      </div>

      {/* Game Over Screen */}
      {gameOver ? (
        <div className="game-over">
          <h3>Game Over!</h3>
          <p>Your final score is: {score}</p>
          <p>Time's up!</p>
          <Link to="/stress-relief/games">
            <button onClick={() => window.location.reload()}>Play Again</button>
          </Link>
        </div>
      ) : (
        <>
          <div className="balloon-area">
            {balloons.map((balloon) => (
              <div
                key={balloon.id}
                className="balloon"
                style={{ left: balloon.left, top: balloon.top }}
                onClick={() => popBalloon(balloon.id)}
              >
                🎈
              </div>
            ))}
          </div>

          <button className="end-game-btn" onClick={endGame}>
            End Game
          </button>
        </>
      )}
    </div>
  );
};

export default BalloonPopGame;
