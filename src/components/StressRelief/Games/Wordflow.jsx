import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const rootWords = [
  "Happy", "Smile", "Kind", "Love", "Brave", "Peace", "Light", "Calm", "Hope", "Shine",
  "Joy", "Safe", "Free", "Help", "Fun", "Grow", "Sweet", "Bright", "Trust", "Warm",
  "Hug", "Play", "Dream", "Nice", "Clear", "Laugh", "Cool", "Glow", "Soft", "Strong",
  "Truth", "Move", "Glow", "Rise", "Feel", "Star", "Sun", "Rain", "Bird", "Tree",
  "Heart", "Mind", "Think", "Sing", "Walk", "Rest", "Jump", "Wave", "Sky", "Flow"
];

const affirmationsTemplates = [
  (words) => `You are full of ${words.join(", ")}. Keep going and stay bright ☀️`,
  (words) => `Let the feeling of ${words.join(", ")} help you grow every day 🌱`,
  (words) => `You carry ${words.join(", ")} inside you. That makes you strong 💪`,
  (words) => `With ${words.join(", ")}, you can find peace and happiness 🌈`,
  (words) => `These words—${words.join(", ")}—show how amazing you are ⭐`,
  (words) => `You shine with ${words.join(", ")}. Never forget that ✨`,
  (words) => `From ${words.join(", ")}, you become the best version of yourself 🌸`,
  (words) => `Your heart is full of ${words.join(", ")}. That makes life better 💖`,
  (words) => `Let ${words.join(", ")} lead your way with joy and calm 🌟`,
  (words) => `You are made of ${words.join(", ")}. That’s your power 🌼`
];

const isValidWord = (word) => {
  return word && word.length > 1 && /^[a-zA-Z]+$/.test(word);
};

const generateAffirmation = (words) => {
  const cleanedWords = words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .filter(word => word !== "");
  const chosenTemplate = affirmationsTemplates[Math.floor(Math.random() * affirmationsTemplates.length)];
  return chosenTemplate(cleanedWords);
};

const WordFlowPuzzle = () => {
  const [rootWord, setRootWord] = useState(rootWords[Math.floor(Math.random() * rootWords.length)]);
  const [wordChain, setWordChain] = useState([]);
  const [inputWord, setInputWord] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (timer > 0 && !isGameOver) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsGameOver(true);
      setMessage("⏰ Time’s up! Great thoughts shared.");
    }
  }, [timer, isGameOver]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidWord(inputWord)) {
      setMessage("❌ Please enter a valid word.");
      return;
    }

    if (wordChain.includes(inputWord.toLowerCase())) {
      setMessage("⚠️ Word already used!");
      return;
    }

    setWordChain([...wordChain, inputWord.toLowerCase()]);
    setScore((prev) => prev + 10);
    setMessage("✅ Nice flow!");
    setInputWord("");
  };

  const restartGame = () => {
    setRootWord(rootWords[Math.floor(Math.random() * rootWords.length)]);
    setWordChain([]);
    setInputWord("");
    setMessage("🔁 Game restarted. Let your thoughts flow!");
    setTimer(60);
    setScore(0);
    setIsGameOver(false);
  };

  const allWords = [rootWord, ...wordChain];

  return (
    <div style={{
      textAlign: "center",
      padding: "20px",
      fontFamily: "sans-serif",
      background: "linear-gradient(135deg, #e0f7fa, #fce4ec)",
      borderRadius: "12px",
      maxWidth: "500px",
      margin: "auto"
    }}>
      <h2 style={{ color: "#00796b" }}>🧘‍♀️ Word Flow Puzzle</h2>
      <p style={{ fontSize: "16px" }}>
        Start from the root word and let your thoughts flow 🌊 One word at a time...
      </p>

      <div style={{ marginBottom: "15px" }}>
        <p><strong>🌱 Root Word:</strong> <span style={{ fontWeight: "bold", color: "#004d40" }}>{rootWord}</span></p>
        <p><strong>⏳ Time Left:</strong> {timer}s</p>
        <p><strong>💯 Score:</strong> {score}</p>
        {message && <p style={{ fontWeight: "bold", color: "#6a1b9a" }}>{message}</p>}
      </div>

      {!isGameOver && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Your next word..."
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
            style={{ padding: "10px", borderRadius: "8px", width: "70%" }}
          />
          <button type="submit" style={{
            padding: "10px 15px",
            marginLeft: "10px",
            backgroundColor: "#80cbc4",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>
            ➕ Add
          </button>
        </form>
      )}

      <div style={{ textAlign: "left", padding: "10px" }}>
        <h3>🧠 Your Thought Flow:</h3>
        <ul style={{ listStyle: "none", paddingLeft: "0" }}>
          {allWords.map((word, index) => (
            <li key={index} style={{ backgroundColor: "#f0f4c3", padding: "5px", margin: "4px 0", borderRadius: "6px" }}>
              {word}
            </li>
          ))}
        </ul>
      </div>

      {isGameOver && (
        <div style={{ marginTop: "20px", backgroundColor: "#ffe0b2", padding: "15px", borderRadius: "10px" }}>
          <h3>🎮 Game Over</h3>
          <p><strong>Final Score:</strong> {score}</p>
          <p style={{ fontStyle: "italic", color: "#3e2723" }}>{generateAffirmation(allWords)}</p>
          <button onClick={restartGame} style={{ padding: "10px 20px", marginTop: "10px", borderRadius: "8px" }}>
            🔁 Play Again
          </button>
        </div>
      )}

      <Link to="/stress-relief/games">
        <button style={{
          marginTop: "20px",
          padding: "8px 16px",
          backgroundColor: "#cfd8dc",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          🔙 Back
        </button>
      </Link>
    </div>
  );
};

export default WordFlowPuzzle;