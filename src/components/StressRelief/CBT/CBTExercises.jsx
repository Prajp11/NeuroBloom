import React, { useState } from "react";

const CBTJournal = () => {
  const [gratitudes, setGratitudes] = useState([""]);
  const [mood, setMood] = useState("");
  const [time, setTime] = useState("");
  const [trigger, setTrigger] = useState("");
  const [thought, setThought] = useState("");
  const [reframedThought, setReframedThought] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleGratitudeChange = (index, value) => {
    const newGratitudes = [...gratitudes];
    newGratitudes[index] = value;
    setGratitudes(newGratitudes);
  };

  const addGratitude = () => {
    if (gratitudes.length < 5) setGratitudes([...gratitudes, ""]);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const resetJournal = () => {
    setGratitudes([""]);
    setMood("");
    setTime("");
    setTrigger("");
    setThought("");
    setReframedThought("");
    setSubmitted(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial" }}>
      <h2 style={{ color: "#4D96FF" }}>🧠 CBT Journal</h2>

      {!submitted ? (
        <>
          {/* Gratitude Section */}
          <section>
            <h3>🌟 Gratitude Journal</h3>
            {gratitudes.map((item, index) => (
              <input
                key={index}
                type="text"
                value={item}
                onChange={(e) => handleGratitudeChange(index, e.target.value)}
                placeholder={`Gratitude #${index + 1}`}
                style={{ display: "block", width: "100%", margin: "8px 0", padding: "8px" }}
              />
            ))}
            {gratitudes.length < 5 && (
              <button onClick={addGratitude} style={{ marginBottom: "20px" }}>
                + Add More
              </button>
            )}
          </section>

          {/* Mood Diary Section */}
          <section>
            <h3>📔 Mood Diary</h3>
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="Your mood (e.g. Anxious, Calm, Excited)"
              style={{ display: "block", width: "100%", margin: "8px 0", padding: "8px" }}
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{ display: "block", width: "100%", margin: "8px 0", padding: "8px" }}
            />
            <input
              type="text"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              placeholder="What triggered this mood?"
              style={{ display: "block", width: "100%", margin: "8px 0", padding: "8px" }}
            />
          </section>

          {/* Thought Challenge Section */}
          <section>
            <h3>💡 Daily Thought Challenge</h3>
            <textarea
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              placeholder="Write one unhelpful thought..."
              rows={3}
              style={{ width: "100%", margin: "8px 0", padding: "8px" }}
            />
            <textarea
              value={reframedThought}
              onChange={(e) => setReframedThought(e.target.value)}
              placeholder="Now reframe it positively..."
              rows={3}
              style={{ width: "100%", margin: "8px 0", padding: "8px" }}
            />
          </section>

          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              marginTop: "16px",
              borderRadius: "5px",
              fontSize: "16px"
            }}
          >
            Submit Journal
          </button>
        </>
      ) : (
        <div>
          <h3 style={{ color: "#4CAF50" }}>✅ Your Journal Entry</h3>
          <p><strong>Gratitude List:</strong></p>
          <ul>{gratitudes.filter(Boolean).map((g, i) => <li key={i}>{g}</li>)}</ul>
          <p><strong>Mood:</strong> {mood}</p>
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Trigger:</strong> {trigger}</p>
          <p><strong>Unhelpful Thought:</strong> {thought}</p>
          <p><strong>Reframed Thought:</strong> {reframedThought}</p>
          <button onClick={resetJournal} style={{ marginTop: "20px" }}>
            Write Another Entry
          </button>
        </div>
      )}
    </div>
  );
};

export default CBTJournal;