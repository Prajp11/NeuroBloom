import React, { useEffect, useState } from "react";
import axios from "axios";

const MoodHistory = () => {
  const [moods, setMoods] = useState([]);
  const token = localStorage.getItem("accessToken");

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
        setMoods(response.data);
      } catch (error) {
        console.error("Error fetching mood history:", error.response);
      }
    };

    fetchMoodHistory();
  }, [token]);

  return (
    <div>
      <h2>Mood History</h2>
      <ul>
        {moods.length > 0 ? (
          moods.map((mood, index) => (
            <li key={index}>
              {mood.date} - {mood.mood} - {mood.note}
            </li>
          ))
        ) : (
          <p>No moods logged yet.</p>
        )}
      </ul>
    </div>
  );
};

export default MoodHistory;
