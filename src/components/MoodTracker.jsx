import React, { useState, useEffect } from "react";
import axios from "axios";

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const token = localStorage.getItem("accessToken");

  // ✅ Fetch mood history when component loads
  useEffect(() => {
    const fetchMoodHistory = async () => {
      if (!token) {
        console.error("No access token found, user is not logged in.");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/mood/history/", {
          headers: { "Authorization": `Bearer ${token}` },
        });
        setMoodHistory(response.data);
      } catch (error) {
        console.error("Error fetching mood history:", error.response);
      }
    };

    fetchMoodHistory();
  }, [token]);

  // ✅ Handle mood submission
  const handleSubmit = async () => {
    if (!selectedMood) {
      setMessage("Please select a mood before submitting!");
      return;
    }

    if (!token) {
      setMessage("You must be logged in to log mood.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/mood/log/",
        { mood: selectedMood, note },
        { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        setMessage("Mood logged successfully!");
        setMoodHistory([response.data, ...moodHistory]); // ✅ Add new mood to history
        setSelectedMood(null);
        setNote("");
      }
    } catch (error) {
      console.error("Error logging mood:", error.response);
      setMessage("Failed to log mood. Please try again.");
    }
  };

  return (
    <div className="mood-container">
      <h2>Mood Tracker</h2>

      {/* ✅ Animated Mood Selection */}
      <div className="mood-selection">
        {["happy", "neutral", "sad", "angry", "stressed"].map((mood) => (
          <button
            key={mood}
            className={`mood-btn ${selectedMood === mood ? "selected" : ""}`}
            onClick={() => setSelectedMood(mood)}
          >
            {mood === "happy" && "😊"}
            {mood === "neutral" && "😐"}
            {mood === "sad" && "😢"}
            {mood === "angry" && "😠"}
            {mood === "stressed" && "😟"}
          </button>
        ))}
      </div>

      {/* ✅ Note Input */}
      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note (optional)" />

      {/* ✅ Submit Button */}
      <button className="submit-btn" onClick={handleSubmit}>Log Mood</button>
      <p className="status-message">{message}</p>

      {/* ✅ Mood History */}
      <h3>My Mood History</h3>
      <ul className="mood-history">
        {moodHistory.length > 0 ? (
          moodHistory.map((mood, index) => (
            <li key={index} className="mood-item">
              {mood.date} - <span className="mood-text">{mood.mood}</span> - {mood.note}
            </li>
          ))
        ) : (
          <p>No moods logged yet.</p>
        )}
      </ul>
    </div>
  );
};

export default MoodTracker;
