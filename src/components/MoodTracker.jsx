import React, { useState, useEffect } from "react";
import axios from "axios";
import SolutionRecommendations from "./SolutionsSuggestions"; 
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


// const moodQuestions = {
//   happy: [
//     { id: 1, question: "What made you feel happy today?", options: ["🎯 Achieving a goal (happy)", "❤️ Time with loved ones (happy)", "🎨 Hobbies (happy)", "🎁 A surprise (happy)"] },
//     { id: 2, question: "How long have you been feeling happy?", options: ["⏳ Just now (happy)", "🕰️ Few hours (happy)", "🌞 All day (happy)", "🎉 A happy phase (happy)"] },
//     { id: 3, question: "Do you feel socially connected today?", options: ["👨‍👩‍👧‍👦 Yes (happy)", "🤔 Somewhat (happy)", "😔 No (happy)", "😌 Prefer solitude (happy)"] },
//     { id: 4, question: "Is this happiness related to personal achievements or external factors?", options: ["📈 Personal success (happy)", "👥 Social interactions (happy)", "🎁 Random event (happy)", "😊 Just feel happy (happy)"] },
//     { id: 5, question: "Have you engaged in any hobbies today?", options: ["🎭 Yes (happy)", "🎮 A little (happy)", "⏳ Plan to later (happy)", "😌 Not really (happy)"] },
//     { id: 6, question: "How would you describe your energy levels?", options: ["⚡ High (happy)", "😊 Balanced (happy)", "🛌 Low (happy)", "😴 Tired but happy (happy)"] },
//     { id: 7, question: "Did you have positive interactions today?", options: ["🗣️ Great conversations (happy)", "💬 Somewhat (happy)", "🤷 Not really (happy)", "😞 No, felt distant (happy)"] },
//     { id: 8, question: "Would you say this happiness is temporary or long-term?", options: ["⏳ Temporary (happy)", "🌞 All day (happy)", "😊 Feeling good for a while (happy)", "🎉 Generally happy (happy)"] },
//     { id: 9, question: "Are there things you can do to sustain this happiness?", options: ["🎨 Hobbies (happy)", "💌 Stay connected (happy)", "⚖️ Work-life balance (happy)", "😊 Not sure (happy)"] },
//     { id: 10, question: "How can you spread this happiness to others?", options: ["❤️ Be kind (happy)", "💬 Share positivity (happy)", "🤗 Encourage someone (happy)", "😊 Keep it to myself (happy)"] }
//   ],
//   neutral: [
//     { id: 1, question: "Do you feel indifferent or just at peace today?", options: ["😕 Indifferent (neutral)", "☯️ Peaceful (neutral)", "🌊 Going through day (neutral)", "🤔 Unsure (neutral)"] },
//     { id: 2, question: "Is there anything that could improve your mood?", options: ["🎨 Fun activity (neutral)", "🗣️ Talk to someone (neutral)", "🛀 Relax (neutral)", "🤷 Nothing specific (neutral)"] },
//     { id: 3, question: "Have you felt this way consistently or is it temporary?", options: ["🌅 Just today (neutral)", "📅 Few days (neutral)", "⏳ Long time (neutral)", "🤔 Can't tell (neutral)"] },
//     { id: 4, question: "Do you feel engaged or disconnected?", options: ["🌟 Engaged (neutral)", "😐 Somewhat (neutral)", "🚶 Disconnected (neutral)", "🏝️ Emotionally detached (neutral)"] },
//     { id: 5, question: "Did anything specific lead to this neutral mood?", options: ["🔄 Regular day (neutral)", "✅ Finished a task (neutral)", "⚖️ Emotional balance (neutral)", "🤷 No idea (neutral)"] },
//     { id: 6, question: "Would you like to feel more excited or energetic?", options: ["⚡ Yes! (neutral)", "🤔 Maybe (neutral)", "🛀 No, I’m fine (neutral)", "😴 Prefer low energy (neutral)"] },
//     { id: 7, question: "Do you feel mentally and physically well?", options: ["💪 Yes (neutral)", "😩 Mentally okay, physically tired (neutral)", "🤯 Physically fine, mentally drained (neutral)", "🤷 Just neutral (neutral)"] },
//     { id: 8, question: "Are you looking forward to anything soon?", options: ["🎉 Yes! (neutral)", "🤔 Maybe (neutral)", "🌊 Going with flow (neutral)", "😞 Nothing (neutral)"] },
//     { id: 9, question: "Would relaxation or motivation help?", options: ["🛀 Relaxation (neutral)", "🚀 Motivation (neutral)", "⚖️ Balance (neutral)", "🤷 Not sure (neutral)"] },
//     { id: 10, question: "What small thing could make today better?", options: ["☕ A break (neutral)", "🎶 Music (neutral)", "💬 A chat (neutral)", "🌅 Nothing (neutral)"] }
//   ],
//   sad: [
//     { id: 1, question: "Can you identify what is making you feel sad?", options: ["😞 Yes (sad)", "🤔 Vague idea (sad)", "🌧️ No reason (sad)", "🚫 Don't want to think (sad)"] },
//     { id: 2, question: "How long have you been feeling this way?", options: ["⏳ Just today (sad)", "📅 Few days (sad)", "🕰️ Weeks or longer (sad)", "😔 Always (sad)"] },
//     { id: 3, question: "Does this sadness come and go, or is it persistent?", options: ["🎭 Comes and goes (sad)", "⚖️ Sometimes eases (sad)", "🌊 Feels constant (sad)", "🤷 Hard to tell (sad)"] },
//     { id: 4, question: "Have you talked to someone about how you feel?", options: ["💬 Yes, helped (sad)", "😞 Yes, no difference (sad)", "🤔 No, but should (sad)", "🤐 No, prefer alone (sad)"] },
//     { id: 5, question: "Did something specific trigger this feeling?", options: ["📰 Recent event (sad)", "🔄 Ongoing issue (sad)", "🤷 No reason (sad)", "🤔 Not sure (sad)"] },
//     { id: 6, question: "Are you struggling with sleep or appetite changes?", options: ["😴 Sleep issues (sad)", "🍽️ Appetite change (sad)", "🔄 Both (sad)", "✅ Normal (sad)"] },
//     { id: 7, question: "Do you feel like engaging in activities?", options: ["😕 Hard but try (sad)", "😞 No interest (sad)", "⚖️ Sometimes (sad)", "😔 Forcing myself (sad)"] },
//     { id: 8, question: "Is this sadness affecting daily life?", options: ["📉 Struggle with tasks (sad)", "🏃 Push through (sad)", "✅ Function normally (sad)", "🤷 Not noticed (sad)"] },
//     { id: 9, question: "Have you felt this level of sadness before?", options: ["🔄 Yes, similar (sad)", "😞 Feels worse (sad)", "🆕 New for me (sad)", "🤔 Can't recall (sad)"] },
//     { id: 10, question: "Would you like help to feel better?", options: ["🙏 Yes (sad)", "🤷 Maybe (sad)", "🚫 No (sad)", "😞 Just want better (sad)"] }
//   ],
//   angry: [
//     { id: 1, question: "What triggered your anger today?", options: ["😡 Conflict (angry)", "🚦 Situation (angry)", "🤦 Personal mistakes (angry)", "🤷 No idea (angry)"] },
//     { id: 2, question: "Have you experienced anger frequently lately?", options: ["🔥 Almost daily (angry)", "⏳ Sometimes (angry)", "🧘 Rarely (angry)", "🆕 First time (angry)"] },
//     { id: 3, question: "How intense is your anger?", options: ["😐 1-3 (angry)", "😤 4-6 (angry)", "😠 7-9 (angry)", "🌋 10 - Extreme (angry)"] },
//     { id: 4, question: "How do you usually cope?", options: ["🎮 Distractions (angry)", "💬 Venting (angry)", "😶 Suppress (angry)", "💥 Impulsive (angry)"] },
//     { id: 5, question: "Is this anger directed at something?", options: ["👥 Someone (angry)", "🌍 Situation (angry)", "🤦 Myself (angry)", "😠 Not sure (angry)"] },
//     { id: 6, question: "Have you tried calming techniques?", options: ["🌿 Yes, helped (angry)", "😕 No effect (angry)", "🏞️ Open to try (angry)", "❌ Doesn't work (angry)"] },
//     { id: 7, question: "Is this affecting focus?", options: ["🚨 Can't focus (angry)", "💼 Push through (angry)", "✅ Normal (angry)", "🤷 Not noticed (angry)"] },
//     { id: 8, question: "Would you like to talk about it?", options: ["💬 Yes (angry)", "🤐 Prefer alone (angry)", "🤔 Maybe later (angry)", "🚨 Immediate help (angry)"] },
//     { id: 9, question: "Do past events influence this?", options: ["🔄 Yes (angry)", "🤷 Maybe (angry)", "📅 Only today (angry)", "🔗 Feel stuck (angry)"] },
//     { id: 10, question: "Want to learn anger management?", options: ["📘 Yes (angry)", "🤔 Maybe (angry)", "⏳ Just wait (angry)", "🛠️ Have my own (angry)"] }
//   ],
//   stressed: [
//     { id: 1, question: "What is the biggest source of stress for you right now?", options: ["🏫 Work (stressed)", "💰 Finances (stressed)", "💬 Relationships (stressed)", "🤯 Uncertainty (stressed)"] },
//     { id: 2, question: "How long have you been feeling this way?", options: ["⏳ Just today (stressed)", "📅 Few weeks (stressed)", "🕰️ Over a month (stressed)", "⚠️ Ongoing (stressed)"] },
//     { id: 3, question: "Do you feel overwhelmed with tasks and responsibilities?", options: ["✅ Yes, too much to handle (stressed)", "⚖️ Sometimes (stressed)", "🔄 Only in high-pressure situations (stressed)", "❌ No, I feel in control (stressed)"] },
//     { id: 4, question: "Are you experiencing physical symptoms (headache, fatigue, tension)?", options: ["😣 Frequently (stressed)", "😞 Occasionally (stressed)", "🚑 Only in extreme stress (stressed)", "👍 No symptoms (stressed)"] },
//     { id: 5, question: "Have you taken a break or practiced relaxation techniques today?", options: ["🧘 Yes, meditation (stressed)", "🚶 Short break (stressed)", "📵 No, but I want to (stressed)", "🔄 No, too busy (stressed)"] },
//     { id: 6, question: "How well are you sleeping lately?", options: ["😴 Well (stressed)", "😐 Okay, but tired (stressed)", "😵 Poorly (stressed)", "🆘 Very bad (stressed)"] },
//     { id: 7, question: "Do you feel supported by family, friends, or colleagues?", options: ["💖 Yes (stressed)", "😕 Somewhat (stressed)", "🤐 No (stressed)", "🤷 Haven’t reached out (stressed)"] },
//     { id: 8, question: "Have you had time for yourself outside of work/studies?", options: ["🎉 Yes, hobbies (stressed)", "🕰️ Sometimes (stressed)", "⏳ Rarely (stressed)", "❌ Never (stressed)"] },
//     { id: 9, question: "Would breaking tasks into smaller steps help you?", options: ["✅ Yes (stressed)", "📋 Maybe (stressed)", "🕰️ Not really (stressed)", "❌ No change (stressed)"] },
//     { id: 10, question: "Do you need guidance on managing workload?", options: ["🧠 Yes (stressed)", "⏳ Maybe (stressed)", "🤷 Not sure (stressed)", "❌ No (stressed)"] },
//   ],
// };

const moodQuestions = {
  happy: [
    { id: 1, question: "What made you feel happy today?", options: ["🎯 Achieving a goal (happy)", "❤️ Time with loved ones (happy)", "🎨 Hobbies (happy)", "🎁 A surprise (happy)"] },
    { id: 2, question: "How long have you been feeling happy?", options: ["⏳ Just now (happy)", "🕰️ Few hours (happy)", "🌞 All day (happy)", "🎉 A happy phase (happy)"] },
    { id: 3, question: "Do you feel socially connected today?", options: ["👨‍👩‍👧‍👦 Yes (happy)", "🤔 Somewhat (happy)", "😔 No (happy)", "😌 Prefer solitude (happy)"] },
    { id: 4, question: "Is this happiness related to personal achievements or external factors?", options: ["📈 Personal success (happy)", "👥 Social interactions (happy)", "🎁 Random event (happy)", "😊 Just feel happy (happy)"] },
    { id: 5, question: "Have you engaged in any hobbies today?", options: ["🎭 Yes (happy)", "🎮 A little (happy)", "⏳ Plan to later (happy)", "😌 Not really (happy)"] },
    { id: 6, question: "How would you describe your energy levels?", options: ["⚡ High (happy)", "😊 Balanced (happy)", "🛌 Low (happy)", "😴 Tired but happy (happy)"] },
    { id: 7, question: "Did you have positive interactions today?", options: ["🗣️ Great conversations (happy)", "💬 Somewhat (happy)", "🤷 Not really (happy)", "😞 No, felt distant (happy)"] },
    { id: 8, question: "Would you say this happiness is temporary or long-term?", options: ["⏳ Temporary (happy)", "🌞 All day (happy)", "😊 Feeling good for a while (happy)", "🎉 Generally happy (happy)"] },
    { id: 9, question: "Are there things you can do to sustain this happiness?", options: ["🎨 Hobbies (happy)", "💌 Stay connected (happy)", "⚖️ Work-life balance (happy)", "😊 Not sure (happy)"] },
    { id: 10, question: "How can you spread this happiness to others?", options: ["❤️ Be kind (happy)", "💬 Share positivity (happy)", "🤗 Encourage someone (happy)", "😊 Keep it to myself (happy)"] }
  ],
  neutral: [
    { id: 1, question: "Do you feel indifferent or just at peace today?", options: ["😕 Indifferent (neutral)", "☯️ Peaceful (neutral)", "🌊 Going through day (neutral)", "🤔 Unsure (neutral)"] },
    { id: 2, question: "Is there anything that could improve your mood?", options: ["🎨 Fun activity (neutral)", "🗣️ Talk to someone (neutral)", "🛀 Relax (neutral)", "🤷 Nothing specific (neutral)"] },
    { id: 3, question: "Have you felt this way consistently or is it temporary?", options: ["🌅 Just today (neutral)", "📅 Few days (neutral)", "⏳ Long time (neutral)", "🤔 Can't tell (neutral)"] },
    { id: 4, question: "Do you feel engaged or disconnected?", options: ["🌟 Engaged (neutral)", "😐 Somewhat (neutral)", "🚶 Disconnected (neutral)", "🏝️ Emotionally detached (neutral)"] },
    { id: 5, question: "Did anything specific lead to this neutral mood?", options: ["🔄 Regular day (neutral)", "✅ Finished a task (neutral)", "⚖️ Emotional balance (neutral)", "🤷 No idea (neutral)"] },
    { id: 6, question: "Would you like to feel more excited or energetic?", options: ["⚡ Yes! (neutral)", "🤔 Maybe (neutral)", "🛀 No, I’m fine (neutral)", "😴 Prefer low energy (neutral)"] },
    { id: 7, question: "Do you feel mentally and physically well?", options: ["💪 Yes (neutral)", "😩 Mentally okay, physically tired (neutral)", "🤯 Physically fine, mentally drained (neutral)", "🤷 Just neutral (neutral)"] },
    { id: 8, question: "Are you looking forward to anything soon?", options: ["🎉 Yes! (neutral)", "🤔 Maybe (neutral)", "🌊 Going with flow (neutral)", "😞 Nothing (neutral)"] },
    { id: 9, question: "Would relaxation or motivation help?", options: ["🛀 Relaxation (neutral)", "🚀 Motivation (neutral)", "⚖️ Balance (neutral)", "🤷 Not sure (neutral)"] },
    { id: 10, question: "What small thing could make today better?", options: ["☕ A break (neutral)", "🎶 Music (neutral)", "💬 A chat (neutral)", "🌅 Nothing (neutral)"] }
  ],
  sad: [
    { id: 1, question: "Can you identify what is making you feel sad?", options: ["😞 Yes (sad)", "🤔 Vague idea (sad)", "🌧️ No reason (sad)", "🚫 Don't want to think (sad)"] },
    { id: 2, question: "How long have you been feeling this way?", options: ["⏳ Just today (sad)", "📅 Few days (sad)", "🕰️ Weeks or longer (sad)", "😔 Always (sad)"] },
    { id: 3, question: "Does this sadness come and go, or is it persistent?", options: ["🎭 Comes and goes (sad)", "⚖️ Sometimes eases (sad)", "🌊 Feels constant (sad)", "🤷 Hard to tell (sad)"] },
    { id: 4, question: "Have you talked to someone about how you feel?", options: ["💬 Yes, helped (sad)", "😞 Yes, no difference (sad)", "🤔 No, but should (sad)", "🤐 No, prefer alone (sad)"] },
    { id: 5, question: "Did something specific trigger this feeling?", options: ["📰 Recent event (sad)", "🔄 Ongoing issue (sad)", "🤷 Not sure about it (sad)", "🤔 Not sure (sad)"] },
    { id: 6, question: "Are you struggling with sleep or appetite changes?", options: ["😴 Sleep issues (sad)", "🍽️ Appetite change (sad)", "🔄 Both (sad)", "✅ Normal (sad)"] },
    { id: 7, question: "Do you feel like engaging in activities?", options: ["😕 Hard but try (sad)", "😞 No interest (sad)", "⚖️ Sometimes (sad)", "😔 Forcing myself (sad)"] },
    { id: 8, question: "Is this sadness affecting daily life?", options: ["📉 Struggle with tasks (sad)", "🏃 Push through (sad)", "✅ Function normally (sad)", "🤷 Not noticed (sad)"] },
    { id: 9, question: "Have you felt this level of sadness before?", options: ["🔄 Yes, similar (sad)", "😞 Feels worse (sad)", "🆕 New for me (sad)", "🤔 Can't recall (sad)"] },
    { id: 10, question: "Would you like help to feel better?", options: ["🙏 Yes Sure (sad)", "🤷 Maybe (sad)", "🚫 No (sad)", "😞 Just want better (sad)"] }
  ],
  angry: [
    { id: 1, question: "What triggered your anger today?", options: ["😡 Conflict (angry)", "🚦 Situation (angry)", "🤦 Personal mistakes (angry)", "🤷 No idea (angry)"] },
    { id: 2, question: "Have you experienced anger frequently lately?", options: ["🔥 Almost daily (angry)", "⏳ Sometimes (angry)", "🧘 Rarely (angry)", "🆕 First time (angry)"] },
    { id: 3, question: "How intense is your anger?", options: ["😐 1-3 (angry)", "😤 4-6 (angry)", "😠 7-9 (angry)", "🌋 10 - Extreme (angry)"] },
    { id: 4, question: "How do you usually cope?", options: ["🎮 Distractions (angry)", "💬 Venting (angry)", "😶 Suppress (angry)", "💥 Impulsive (angry)"] },
    { id: 5, question: "Is this anger directed at something?", options: ["👥 Someone (angry)", "🌍 Situation (angry)", "🤦 Myself (angry)", "😠 Not sure (angry)"] },
    { id: 6, question: "Have you tried calming techniques?", options: ["🌿 Yes, helped (angry)", "😕 No effect (angry)", "🏞️ Open to try (angry)", "❌ Doesn't work (angry)"] },
    { id: 7, question: "Is this affecting focus?", options: ["🚨 Can't focus (angry)", "💼 Push through (angry)", "✅ Normal (angry)", "🤷 Not noticed (angry)"] },
    { id: 8, question: "Would you like to talk about it?", options: ["💬 Yes (angry)", "🤐 Prefer alone (angry)", "🤔 Maybe later (angry)", "🚨 Immediate help (angry)"] },
    { id: 9, question: "Do past events influence this?", options: ["🔄 Yes (angry)", "🤷 Maybe (angry)", "📅 Only today (angry)", "🔗 Feel stuck (angry)"] },
    { id: 10, question: "Want to learn anger management?", options: ["📘 Yes (angry)", "🤔 Maybe (angry)", "⏳ Just wait (angry)", "🛠️ Have my own (angry)"] }
  ],
  stressed: [
    { id: 1, question: "What is the biggest source of stress for you right now?", options: ["🏫 Work (stressed)", "💰 Finances (stressed)", "💬 Relationships (stressed)", "🤯 Uncertainty (stressed)"] },
    { id: 2, question: "How long have you been feeling this way?", options: ["⏳ Just today (stressed)", "📅 Few weeks (stressed)", "🕰️ Over a month (stressed)", "⚠️ Ongoing (stressed)"] },
    { id: 3, question: "Do you feel overwhelmed with tasks and responsibilities?", options: ["✅ Yes, too much to handle (stressed)", "⚖️ Sometimes (stressed)", "🔄 Only in high-pressure situations (stressed)", "❌ No, I feel in control (stressed)"] },
    { id: 4, question: "Are you experiencing physical symptoms (headache, fatigue, tension)?", options: ["😣 Frequently (stressed)", "😞 Occasionally (stressed)", "🚑 Only in extreme stress (stressed)", "👍 No symptoms (stressed)"] },
    { id: 5, question: "Have you taken a break or practiced relaxation techniques today?", options: ["🧘 Yes, meditation (stressed)", "🚶 Short break (stressed)", "📵 No, but I want to (stressed)", "🔄 No, too busy (stressed)"] },
    { id: 6, question: "How well are you sleeping lately?", options: ["😴 Well (stressed)", "😐 Okay, but tired (stressed)", "😵 Poorly (stressed)", "🆘 Very bad (stressed)"] },
    { id: 7, question: "Do you feel supported by family, friends, or colleagues?", options: ["💖 Yes (stressed)", "😕 Somewhat (stressed)", "🤐 No (stressed)", "🤷 Haven’t reached out (stressed)"] },
    { id: 8, question: "Have you had time for yourself outside of work/studies?", options: ["🎉 Yes, hobbies (stressed)", "🕰️ Sometimes (stressed)", "⏳ Rarely (stressed)", "❌ Never (stressed)"] },
    { id: 9, question: "Would breaking tasks into smaller steps help you?", options: ["✅ Yes (stressed)", "📋 Maybe (stressed)", "🕰️ Not really (stressed)", "❌ No change (stressed)"] },
    { id: 10, question: "Do you need guidance on managing workload?", options: ["🧠 Yes (stressed)", "⏳ Maybe (stressed)", "🤷 Not sure (stressed)", "❌ No (stressed)"] }
  ]
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
            <h3>Answer a few questions about your mood</h3>
            {moodQuestions[selectedMood]?.map(({ id, question, options }) => (
              <div key={id} className="question-box">
                <h4>{question}</h4>
                {options.map((option) => (
                  <button
                    key={option}
                    className={`option-btn ${responses[id] === option ? "selected" : ""}`}
                    onClick={() => handleResponse(id, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ))}
            <button className="submit-btn" onClick={calculateStressScore}>Submit Answers</button>
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