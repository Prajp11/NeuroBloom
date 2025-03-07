import React, { useState } from "react";
import { Link } from "react-router-dom";

const BreathingExercise = () => {
  const [breathPhase, setBreathPhase] = useState("Inhale");
  const [count, setCount] = useState(4);

  const startBreathing = () => {
    let phases = ["Inhale", "Hold", "Exhale"];
    let times = [4, 4, 6];
    let i = 0;

    const cycle = setInterval(() => {
      setBreathPhase(phases[i]);
      setCount(times[i]);
      i = (i + 1) % 3;
    }, times[i] * 1000);

    setTimeout(() => clearInterval(cycle), 60000);
  };

  return (
    <div className="game-container">
      <h2>🌬️ Breathing Exercise</h2>
      <p>Follow the breathing cycle to relax.</p>
      <div className="breath-display">{breathPhase} for {count} seconds</div>
      <button onClick={startBreathing} className="game-btn">Start Exercise</button>
      <Link to="/stress-relief/games"><button className="game-btn">Back</button></Link>
    </div>
  );
};

export default BreathingExercise;
