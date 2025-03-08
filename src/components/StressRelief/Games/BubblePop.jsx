import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Trivia questions for fun!
const triviaQuestions = [
  { question: "What is a common way to reduce stress?", answer: "Deep breathing" },
  { question: "How often should you take breaks for mental clarity?", answer: "Every hour" },
  { question: "What is an activity to relieve stress?", answer: "Exercise" },
  { question: "What does CBT stand for?", answer: "Cognitive Behavioral Therapy" },
];

const BubblePop = () => {
  const [bubbles, setBubbles] = useState(Array(20).fill("🫧"));
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [bonusBubbles, setBonusBubbles] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  // Random Bonus Bubbles
  const generateBonusBubbles = () => {
    const bonus = Math.floor(Math.random() * 5) + 1;
    setBonusBubbles(Array(bonus).fill("💎"));
  };

  // Function to pop a bubble
  const popBubble = (index, isBonus) => {
    if (!isGameOver) {
      let points = Math.floor(Math.random() * 10) + 1; // Regular bubbles
      if (isBonus) {
        points *= 2; // Double points for bonus bubbles
      }
      setBubbles(bubbles.map((bubble, i) => (i === index ? "💥" : bubble)));
      setScore(score + points);
      
      // Trivia Question Activity: Ask trivia after popping a bubble
      if (!currentQuestion) {
        const randomQuestion =
          triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
        setCurrentQuestion(randomQuestion);
      }
    }
  };

  // Function to handle trivia answer submission
  const handleTriviaAnswer = (answer) => {
    if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setScore(score + 5); // Correct answer bonus points
      setAnsweredCorrectly(true);
    }
    setCurrentQuestion(null); // Hide question after answering
  };

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

  // Function to restart the game
  const restartGame = () => {
    setBubbles(Array(20).fill("🫧"));
    setBonusBubbles([]);
    setScore(0);
    setTimer(30);
    setIsGameOver(false);
    setCurrentQuestion(null);
    setAnsweredCorrectly(false);
  };

  // Trigger bonus bubbles generation every 10 seconds
  useEffect(() => {
    if (timer % 10 === 0 && timer !== 0 && !isGameOver) {
      generateBonusBubbles();
    }
  }, [timer, isGameOver]);

  return (
    <div className="game-container">
      <h2>🫧 Bubble Pop</h2>
      <p>Tap to pop the bubbles!</p>

      {isGameOver ? (
        <div className="game-over">
          <h3>Game Over!</h3>
          <p>Your final score: {score}</p>
          <button onClick={restartGame} className="game-btn">Play Again</button>
        </div>
      ) : (
        <>
          <div className="bubble-container">
            {bubbles.map((bubble, index) => (
              <button
                key={index}
                className="bubble"
                onClick={() => popBubble(index, bonusBubbles.includes(bubble))}
                disabled={bubble === "💥"}
              >
                {bubble}
              </button>
            ))}
          </div>

          <div className="game-info">
            <p>Time Left: {timer} seconds</p>
            <p>Score: {score}</p>
          </div>

          {/* Show trivia question if available */}
          {currentQuestion && (
            <div className="trivia-question">
              <h3>Trivia Time!</h3>
              <p>{currentQuestion.question}</p>
              <input
                type="text"
                onChange={(e) => handleTriviaAnswer(e.target.value)}
                placeholder="Your answer"
              />
              {answeredCorrectly && <p>Correct! +5 points!</p>}
            </div>
          )}

        </>
      )}

      <Link to="/stress-relief/games">
        <button className="game-btn">Back</button>
      </Link>
    </div>
  );
};

export default BubblePop;
