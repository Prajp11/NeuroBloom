import React, { useState } from "react";

const CBTExercise = () => {
  const [thought, setThought] = useState("");
  const [challengedThought, setChallengedThought] = useState("");
  const [thoughtRating, setThoughtRating] = useState(5); // 1 to 10 scale for thought intensity
  const [isCompleted, setIsCompleted] = useState(false);
  const [reflections, setReflections] = useState("");
  const [thoughtHistory, setThoughtHistory] = useState([]);

  const handleSubmit = () => {
    // Process the thought
    setIsCompleted(true);
    // Save the thought and reflection in the history
    const newEntry = {
      originalThought: thought,
      challengedThought,
      thoughtRating,
      reflection: reflections,
    };
    setThoughtHistory([...thoughtHistory, newEntry]);
  };

  return (
    <div className="cbt-container">
      <h2>🧠 Cognitive Behavioral Therapy (CBT) Exercise</h2>
      <p>Identify and challenge a negative thought.</p>

      {!isCompleted ? (
        <div className="exercise">
          <div className="input-group">
            <label>What is your negative thought?</label>
            <input
              type="text"
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              placeholder="Write your negative thought here"
            />
          </div>

          <div className="input-group">
            <label>Rate the intensity of the thought (1-10):</label>
            <input
              type="number"
              value={thoughtRating}
              onChange={(e) => setThoughtRating(e.target.value)}
              min="1"
              max="10"
            />
          </div>

          <div className="input-group">
            <label>Challenge the thought:</label>
            <textarea
              value={challengedThought}
              onChange={(e) => setChallengedThought(e.target.value)}
              placeholder="What evidence challenges this thought?"
            />
          </div>

          <div className="input-group">
            <label>How do you feel after challenging the thought?</label>
            <textarea
              value={reflections}
              onChange={(e) => setReflections(e.target.value)}
              placeholder="Write your reflection here"
            />
          </div>

          <button onClick={handleSubmit} className="cbt-btn">Submit</button>
        </div>
      ) : (
        <div className="completed">
          <p>Good job! You challenged your negative thought.</p>
          <p><strong>Original Thought:</strong> {thought}</p>
          <p><strong>Challenged Thought:</strong> {challengedThought}</p>
          <p><strong>Intensity Rating:</strong> {thoughtRating}</p>
          <p><strong>Reflection:</strong> {reflections}</p>
          <button onClick={() => setIsCompleted(false)} className="cbt-btn">Try Another</button>
        </div>
      )}

      {/* History Section */}
      <div className="history">
        <h3>Your Thought History</h3>
        <ul>
          {thoughtHistory.map((entry, index) => (
            <li key={index}>
              <p><strong>Original Thought:</strong> {entry.originalThought}</p>
              <p><strong>Challenged Thought:</strong> {entry.challengedThought}</p>
              <p><strong>Intensity:</strong> {entry.thoughtRating}</p>
              <p><strong>Reflection:</strong> {entry.reflection}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CBTExercise;
