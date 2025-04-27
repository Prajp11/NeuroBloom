import React, { useState } from "react";

const wordPool = [
  "Joy", "Love", "Hope", "Peace", "Shine", "Smile", "Trust", "Brave", "Happy", "Dream",
  "Laugh", "Kind", "Funny", "Glory", "Grace", "Faith", "Warm", "Pure", "Life", "Glow",
  "Calm", "Free", "Bold", "Sweet", "Bright", "Clear", "Proud", "Gentle", "Smart",
  "Wise", "Fresh", "Lively", "Strong", "Peaceful", "Clean", "Courage",
  "Healed", "Unique", "Serene", "Excited", "Delight", "Chill", "Serenity", "Jolly", "Balance",
  "Sincere", "Hopeful", "Grateful", "Blessed", "Worthy", "Cheer", "Motivated",
  "Creative", "Joyful", "Healthy", "Radiant", "Positive", "Focused", "Mindful", "Vibrant",
  "Charming", "Luminous", "Harmonious", "Compassion", "Support", "Tender"
];

const getRandomWord = () => wordPool[Math.floor(Math.random() * wordPool.length)];
const shuffleWord = (word) => word.split("").sort(() => Math.random() - 0.5).join("");

// 🎈 Colorful Balloon Display
const Balloons = () => (
  <div style={{ fontSize: "48px", margin: "20px 0", animation: "float 2s ease-in-out infinite" }}>
    🎈💛💚💙❤️🎈💜🧡🎉
  </div>
);

// 💥 Balloon Blasting into Pieces
const BalloonBlast = () => (
  <div style={{ fontSize: "38px", margin: "15px 0", transition: "all 0.5s ease-in-out" }}>
    💥💫✨🧨🎊🌟💣🔥💥
  </div>
);

const WordScrambleGame = () => {
  const [word, setWord] = useState(getRandomWord());
  const [scrambledWord, setScrambledWord] = useState(shuffleWord(word));
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [showBlast, setShowBlast] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const checkAnswer = () => {
    if (userInput.toLowerCase() === word.toLowerCase()) {
      setScore(score + 1);
      setMessage("Correct! 🎉 Balloon Blasted!");
      setShowBlast(true);
      setTimeout(() => {
        const nextWord = getRandomWord();
        setWord(nextWord);
        setScrambledWord(shuffleWord(nextWord));
        setUserInput("");
        setShowBlast(false);
        setMessage("");
      }, 1800); // Delay to show blast effect
    } else {
      setMessage("Oops! Try again!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkAnswer();
  };

  const stopGame = () => {
    setGameOver(true);
  };

  const getSuggestions = (score) => {
    if (score <= 25) return "Suggestion: Try practicing with simpler words!";
    if (score <= 50) return "Suggestion: Keep going! You're getting better!";
    if (score <= 75) return "Suggestion: Great job! Try more challenging words!";
    return "Suggestion: Excellent work! You're a word master!";
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <Balloons />
      <h2 style={{ color: "#4D96FF" }}>🧩 Word Scramble</h2>
      <p>Score: {score}</p>

      {message && <p style={{ color: "#6BCB77", fontWeight: "bold" }}>{message}</p>}
      {showBlast && <BalloonBlast />}

      {!gameOver ? (
        <div style={{ marginBottom: 20 }}>
          <h3>Unscramble this word:</h3>
          <h2 style={{ color: "#F48C42", fontWeight: "bold" }}>{scrambledWord}</h2>
        </div>
      ) : (
        <div>
          <h3>🎊 Game Over! Your Final Score: {score}</h3>
          <p>{getSuggestions(score)}</p>
          <div style={{ fontSize: "48px", marginTop: "10px" }}>
            🎉🎈🎉🎈🎉🎈🎉
          </div>
        </div>
      )}

      {!gameOver && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Your guess"
            style={{
              padding: "8px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "2px solid #F48C42",
              marginBottom: "10px"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              backgroundColor: "#4D96FF",
              color: "#fff",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              marginLeft: "10px",
              fontSize: "16px"
            }}
          >
            Submit
          </button>
        </form>
      )}

      {!gameOver && (
        <button
          onClick={stopGame}
          style={{
            padding: "8px 16px",
            backgroundColor: "#FF4747",
            color: "#fff",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            marginTop: "20px",
            fontSize: "16px"
          }}
        >
          Stop Game
        </button>
      )}
    </div>
  );
};

export default WordScrambleGame;