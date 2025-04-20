import React, { useState, useEffect } from "react";

const BubblePopGame = () => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showQuestion, setShowQuestion] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [clickedBubble, setClickedBubble] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    generateBubbles();
  }, []);

  const generateBubbles = () => {
    const newBubbles = Array.from({ length: 25 }, (_, index) => ({
      id: index,
      popped: false,
    }));
    setBubbles(newBubbles);
  };

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = ["+", "-"][Math.floor(Math.random() * 2)];
    const correctAnswer = operation === "+" ? num1 + num2 : num1 - num2;
    setQuestion({ text: `${num1} ${operation} ${num2}`, answer: correctAnswer });
    setShowQuestion(true);
  };

  const handleBubbleClick = (id) => {
    if (showQuestion) return; // prevent popping while answering
    setClickedBubble(id);
    generateQuestion();
  };

  const handleAnswerSubmit = () => {
    if (!question) return;
  
    let isCorrect = parseInt(userAnswer) === question.answer;
  
    if (isCorrect) {
      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble) =>
          bubble.id === clickedBubble ? { ...bubble, popped: true } : bubble
        )
      );
      setScore((prevScore) => prevScore + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect! Try another bubble.");
    }
  
    // Keep feedback visible and reset other states
    setShowQuestion(false);
    setUserAnswer("");
    setClickedBubble(null);
  
    // Hide feedback after 1.5 seconds
    setTimeout(() => {
      setFeedback("");
    }, 1500);
  
    // End game condition
    if (score + (isCorrect ? 1 : 0) === 25) {
      setTimeout(() => setGameOver(true), 1500); // Delay game over until after feedback
    }
  };
  

  const resetGame = () => {
    generateBubbles();
    setScore(0);
    setGameOver(false);
    setFeedback("");
    setUserAnswer("");
    setShowQuestion(false);
    setClickedBubble(null);
  };

  return (
    <div className="game-container">
      <h1>Bubble Wrap Pop Game</h1>
      
      {!gameOver ? (
        <>
          <div className="bubble-container">
            {bubbles.map((bubble) => (
              <button
                key={bubble.id}
                className="bubble"
                disabled={bubble.popped || showQuestion}
                onClick={() => handleBubbleClick(bubble.id)}
              >
                {bubble.popped ? "✓" : "🫧"}
              </button>
            ))}
          </div>

          <div className="game-info">
            <p>Score: {score} / 25</p>
          </div>

          {showQuestion && (
            <div className="trivia-question">
              <p>Solve: {question.text}</p>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
              />
              <br />
              <button className="submit-btn" onClick={handleAnswerSubmit}>
                Submit
              </button>
            </div>
          )}

          {feedback && (
            <div className={feedback === "Correct!" ? "correct-answer" : "incorrect-answer"}>
              {feedback}
            </div>
          )}
        </>
      ) : (
        <div className="game-over">
          <p>Congratulations! You popped all the bubbles!</p>
          <button className="game-btn" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default BubblePopGame;
