import React, { useState, useEffect } from "react";
import axios from "axios";
import SolutionRecommendations from "../components/SolutionRecommendations"; 
import { useNavigate } from "react-router-dom";

const primaryQuestions = [
  {
    id: 1,
    question: "What is your age group?",
    options: ["👶 Below 18", "🧑 18 - 25", "👨‍💼 26 - 40", "👴 Above 40"],
  },
  {
    id: 2,
    question: "What is your gender?",
    options: ["🚹 Male", "🚺 Female", "⚧ Non-binary / Other", "❓ Prefer not to say"],
  },
  {
    id: 3,
    question: "What is your current working status?",
    options: ["🎓 Student", "💼 Employed (Full-time/Part-time)", "🏠 Self-employed / Freelancer", "🔍 Not currently working"],
  },
  {
    id: 4,
    question: "How do you usually cope with stress?",
    options: ["🏋️ Exercise", "🎵 Music/Movies", "🗣️ Talking to someone", "🤷 Don't know"],
  },
  {
    id: 5,
    question: "What is your main reason for using this app?",
    options: ["😟 Manage stress", "🧘 Improve mental health", "🎯 Track emotions", "🤖 Explore AI support"],
  },
];


const moodQuestions = {
  happy: [
    { id: 1, question: "What made you feel happy today?", options: ["🎯 Achieving a goal", "❤️ Time with loved ones", "🎨 Hobbies", "🎁 A surprise"] },
    { id: 2, question: "How long have you been feeling happy?", options: ["⏳ Just now", "🕰️ Few hours", "🌞 All day", "🎉 A happy phase"] },
    { id: 3, question: "Do you feel socially connected today?", options: ["👨‍👩‍👧‍👦 Yes", "🤔 Somewhat", "😔 No", "😌 Prefer solitude"] },
    { id: 4, question: "Is this happiness related to personal achievements or external factors?", options: ["📈 Personal success", "👥 Social interactions", "🎁 Random event", "😊 Just feel happy"] },
    { id: 5, question: "Have you engaged in any hobbies today?", options: ["🎭 Yes", "🎮 A little", "⏳ Plan to later", "😌 Not really"] },
    { id: 6, question: "How would you describe your energy levels?", options: ["⚡ High", "😊 Balanced", "🛌 Low", "😴 Tired but happy"] },
    { id: 7, question: "Did you have positive interactions today?", options: ["🗣️ Great conversations", "💬 Somewhat", "🤷 Not really", "😞 No, felt distant"] },
    { id: 8, question: "Would you say this happiness is temporary or long-term?", options: ["⏳ Temporary", "🌞 All day", "😊 Feeling good for a while", "🎉 Generally happy"] },
    { id: 9, question: "Are there things you can do to sustain this happiness?", options: ["🎨 Hobbies", "💌 Stay connected", "⚖️ Work-life balance", "😊 Not sure"] },
    { id: 10, question: "How can you spread this happiness to others?", options: ["❤️ Be kind", "💬 Share positivity", "🤗 Encourage someone", "😊 Keep it to myself"] }
  ],
  neutral: [
    { id: 1, question: "Do you feel indifferent or just at peace today?", options: ["😕 Indifferent", "☯️ Peaceful", "🌊 Going through day", "🤔 Unsure"] },
    { id: 2, question: "Is there anything that could improve your mood?", options: ["🎨 Fun activity", "🗣️ Talk to someone", "🛀 Relax", "🤷 Nothing specific"] },
    { id: 3, question: "Have you felt this way consistently or is it temporary?", options: ["🌅 Just today", "📅 Few days", "⏳ Long time", "🤔 Can't tell"] },
    { id: 4, question: "Do you feel engaged or disconnected?", options: ["🌟 Engaged", "😐 Somewhat", "🚶 Disconnected", "🏝️ Emotionally detached"] },
    { id: 5, question: "Did anything specific lead to this neutral mood?", options: ["🔄 Regular day", "✅ Finished a task", "⚖️ Emotional balance", "🤷 No idea"] },
    { id: 6, question: "Would you like to feel more excited or energetic?", options: ["⚡ Yes!", "🤔 Maybe", "🛀 No, I’m fine", "😴 Prefer low energy"] },
    { id: 7, question: "Do you feel mentally and physically well?", options: ["💪 Yes", "😩 Mentally okay, physically tired", "🤯 Physically fine, mentally drained", "🤷 Just neutral"] },
    { id: 8, question: "Are you looking forward to anything soon?", options: ["🎉 Yes!", "🤔 Maybe", "🌊 Going with flow", "😞 Nothing"] },
    { id: 9, question: "Would relaxation or motivation help?", options: ["🛀 Relaxation", "🚀 Motivation", "⚖️ Balance", "🤷 Not sure"] },
    { id: 10, question: "What small thing could make today better?", options: ["☕ A break", "🎶 Music", "💬 A chat", "🌅 Nothing"] }
  ],
  sad: [
    { id: 1, question: "Can you identify what is making you feel sad?", options: ["😞 Yes", "🤔 Vague idea", "🌧️ No reason", "🚫 Don't want to think"] },
    { id: 2, question: "How long have you been feeling this way?", options: ["⏳ Just today", "📅 Few days", "🕰️ Weeks or longer", "😔 Always"] },
    { id: 3, question: "Does this sadness come and go, or is it persistent?", options: ["🎭 Comes and goes", "⚖️ Sometimes eases", "🌊 Feels constant", "🤷 Hard to tell"] },
    { id: 4, question: "Have you talked to someone about how you feel?", options: ["💬 Yes, helped", "😞 Yes, no difference", "🤔 No, but should", "🤐 No, prefer alone"] },
    { id: 5, question: "Did something specific trigger this feeling?", options: ["📰 Recent event", "🔄 Ongoing issue", "🤷 No reason", "🤔 Not sure"] },
    { id: 6, question: "Are you struggling with sleep or appetite changes?", options: ["😴 Sleep issues", "🍽️ Appetite change", "🔄 Both", "✅ Normal"] },
    { id: 7, question: "Do you feel like engaging in activities?", options: ["😕 Hard but try", "😞 No interest", "⚖️ Sometimes", "😔 Forcing myself"] },
    { id: 8, question: "Is this sadness affecting daily life?", options: ["📉 Struggle with tasks", "🏃 Push through", "✅ Function normally", "🤷 Not noticed"] },
    { id: 9, question: "Have you felt this level of sadness before?", options: ["🔄 Yes, similar", "😞 Feels worse", "🆕 New for me", "🤔 Can't recall"] },
    { id: 10, question: "Would you like help to feel better?", options: ["🙏 Yes", "🤷 Maybe", "🚫 No", "😞 Just want better"] }
  ],
  angry: [
    { id: 1, question: "What triggered your anger today?", options: ["😡 Conflict", "🚦 Situation", "🤦 Personal mistakes", "🤷 No idea"] },
    { id: 2, question: "Have you experienced anger frequently lately?", options: ["🔥 Almost daily", "⏳ Sometimes", "🧘 Rarely", "🆕 First time"] },
    { id: 3, question: "How intense is your anger?", options: ["😐 1-3", "😤 4-6", "😠 7-9", "🌋 10 - Extreme"] },
    { id: 4, question: "How do you usually cope?", options: ["🎮 Distractions", "💬 Venting", "😶 Suppress", "💥 Impulsive"] },
    { id: 5, question: "Is this anger directed at something?", options: ["👥 Someone", "🌍 Situation", "🤦 Myself", "😠 Not sure"] },
    { id: 6, question: "Have you tried calming techniques?", options: ["🌿 Yes, helped", "😕 No effect", "🏞️ Open to try", "❌ Doesn't work"] },
    { id: 7, question: "Is this affecting focus?", options: ["🚨 Can't focus", "💼 Push through", "✅ Normal", "🤷 Not noticed"] },
    { id: 8, question: "Would you like to talk about it?", options: ["💬 Yes", "🤐 Prefer alone", "🤔 Maybe later", "🚨 Immediate help"] },
    { id: 9, question: "Do past events influence this?", options: ["🔄 Yes", "🤷 Maybe", "📅 Only today", "🔗 Feel stuck"] },
    { id: 10, question: "Want to learn anger management?", options: ["📘 Yes", "🤔 Maybe", "⏳ Just wait", "🛠️ Have my own"] }
  ],
  stressed: [
    { id: 1, question: "What is the biggest source of stress for you right now?", options: ["🏫 Work", "💰 Finances", "💬 Relationships", "🤯 Uncertainty"] },
    { id: 2, question: "How long have you been feeling this way?", options: ["⏳ Just today", "📅 Few weeks", "🕰️ Over a month", "⚠️ Ongoing"] },
    { id: 3, question: "Do you feel overwhelmed with tasks and responsibilities?", options: ["✅ Yes, too much to handle", "⚖️ Sometimes", "🔄 Only in high-pressure situations", "❌ No, I feel in control"] },
    { id: 4, question: "Are you experiencing physical symptoms (headache, fatigue, tension)?", options: ["😣 Frequently", "😞 Occasionally", "🚑 Only in extreme stress", "👍 No symptoms"] },
    { id: 5, question: "Have you taken a break or practiced relaxation techniques today?", options: ["🧘 Yes, meditation", "🚶 Short break", "📵 No, but I want to", "🔄 No, too busy"] },
    { id: 6, question: "How well are you sleeping lately?", options: ["😴 Well", "😐 Okay, but tired", "😵 Poorly", "🆘 Very bad"] },
    { id: 7, question: "Do you feel supported by family, friends, or colleagues?", options: ["💖 Yes", "😕 Somewhat", "🤐 No", "🤷 Haven’t reached out"] },
    { id: 8, question: "Have you had time for yourself outside of work/studies?", options: ["🎉 Yes, hobbies", "🕰️ Sometimes", "⏳ Rarely", "❌ Never"] },
    { id: 9, question: "Would breaking tasks into smaller steps help you?", options: ["✅ Yes", "📋 Maybe", "🕰️ Not really", "❌ No change"] },
    { id: 10, question: "Do you need guidance on managing workload?", options: ["🧠 Yes", "⏳ Maybe", "🤷 Not sure", "❌ No"] },
  ],
};

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [responses, setResponses] = useState({});
  const [stressScore, setStressScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [primaryResponses, setPrimaryResponses] = useState({});
  const [primaryCompleted, setPrimaryCompleted] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchMoodHistory = async () => {
      if (!token) return;
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/mood/history/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMoodHistory(response.data);
      } catch (error) {
        console.error("Error fetching mood history:", error.response);
      }
    };
    fetchMoodHistory();
  }, [token]);

  const handlePrimaryResponse = (questionId, option) => {
    setPrimaryResponses((prev) => ({ ...prev, [questionId]: option }));
  };

  const completePrimaryQuestions = () => {
    if (Object.keys(primaryResponses).length === primaryQuestions.length) {
      setPrimaryCompleted(true);
    } else {
      alert("Please answer all questions before proceeding.");
    }
  };

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
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
      if (response.status === 201) {
        setMessage("Mood logged successfully! Please answer a few questions.");
        setMoodHistory([response.data, ...moodHistory]);
        setShowQuestions(true);
      }
    } catch (error) {
      setMessage("Failed to log mood. Please try again.");
    }
  };

  const handleResponse = (questionId, option) => {
    setResponses((prev) => ({ ...prev, [questionId]: option }));
  };

  const calculateStressScore = () => {
    let score = 0;
    Object.values(responses).forEach((option) => {
      score += option.includes("Yes") ? 2 : 1;
    });
    setStressScore(score);
    setShowResults(true);
  };

  return (
    <div className="mood-container">
      <h2>Mood Tracker</h2>

      {!primaryCompleted ? (
  <div className="primary-section">
    <h3>Tell us a bit about yourself</h3>
    {primaryQuestions.map(({ id, question, options }) => (
      <div key={id} className="primary-question-box"> {/* ✅ Updated Class Name */}
        <h4>{question}</h4>
        {options.map((option) => (
          <button
            key={option}
            className={`primary-option-btn ${primaryResponses[id] === option ? "selected" : ""}`} 
            onClick={() => handlePrimaryResponse(id, option)}
          >
            {option}
          </button>
        ))}
      </div>
    ))}
    <button className="continue-btn" onClick={completePrimaryQuestions}>Continue</button> {/* ✅ Styled Continue Button */}
  </div>
) : (
        <>
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

<textarea 
  value={note} 
  onChange={(e) => setNote(e.target.value)} 
  placeholder="Add a note (optional)" 
/>

<button className="submit-btn" onClick={handleSubmit}>Log Mood</button>
<p className="status-message">{message}</p>


          {showQuestions && selectedMood && (
            <div className="question-section">
              {moodQuestions[selectedMood]?.map(({ id, question, options }) => (
                <div key={id} className="question-box">
                  <h4>{question}</h4>
                  {options.map((option) => (
                    <button key={option} onClick={() => handleResponse(id, option)}>
                      {option}
                    </button>
                  ))}
                </div>
              ))}
              <button onClick={calculateStressScore}>Submit Answers</button>
            </div>
          )}

          {showResults && (
            <div className="result-section">
              <h3>Your Stress Score: {stressScore}</h3>
              {stressScore > 8 ? (
                <div>
                  <p>Your stress level is high. We recommend booking a therapy session.</p>
                  <button className="therapy-btn" onClick={() => navigate("/therapy-booking")}>Book a Therapy Session</button>
                </div>
              ) : (
                <SolutionRecommendations mood={selectedMood} responses={responses} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MoodTracker;