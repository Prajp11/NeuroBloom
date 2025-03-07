import React from "react";
import { Link } from "react-router-dom";

// ✅ Expanded Solution Mapping for All Mood Choices
const solutionMapping = {
  happy: {
    "🎯 Achieving a goal": [
      "Celebrate your achievement with a small reward. 🎉",
      "Set a new goal to keep the momentum going. 📈",
      "Share your success with friends or family to spread positivity. 💬"
    ],
    "❤️ Time with loved ones": [
      "Plan another gathering or call a loved one to continue the connection. 📞",
      "Express gratitude to the people who made you feel happy. 💖",
      "Write down this positive experience in a journal to reflect on later. 📖"
    ],
    "🎨 Hobbies": [
      "Schedule more time for your hobbies regularly to sustain happiness. ⏳",
      "Try learning a new creative skill to expand your interests. 🎭",
      "Share your hobby with others, like posting artwork or playing music for friends. 🎶"
    ],
    "🎁 A surprise": [
      "Pass on the positivity by surprising someone else. 🎁",
      "Reflect on what made this surprise meaningful to you. 🤔",
      "Write a gratitude note about this experience. 💌"
    ]
  },
  neutral: {
    "😕 Indifferent": [
      "Try engaging in a new activity to break the routine. 🎨",
      "Listen to uplifting music to shift your mood. 🎶",
      "Go outside and get some fresh air to reset your mind. 🌳"
    ],
    "☯️ Peaceful": [
      "Enjoy the moment and practice mindfulness. 🧘",
      "Share your calmness by helping someone else relax. 🤝",
      "Reflect on what contributes to this peace and maintain it. 🌿"
    ],
    "🌊 Going through day": [
      "Identify one thing you enjoyed today to appreciate the small moments. 🔍",
      "Plan a small adventure or fun activity to break the monotony. 🚶",
      "Reach out to a friend or loved one for casual conversation. 💬"
    ],
    "🤔 Unsure": [
      "Write down your thoughts to understand what you're feeling. ✍️",
      "Take a break and do something relaxing like meditation. 🧘",
      "Experiment with a new hobby to see if it sparks interest. 🎭"
    ]
  },
  sad: {
    "⏳ Just today": [
      "Take a short break and do something that brings you joy. 🌞",
      "Talk to a friend or family member about how you feel. 💬",
      "Engage in light physical activity to improve mood. 🏃"
    ],
    "📅 Few days": [
      "Practice gratitude by listing three positive things daily. ✅",
      "Engage in a creative outlet like writing, drawing, or music. 🎶",
      "Try meditation or breathing exercises to relax. 🧘"
    ],
    "🕰️ Weeks or longer": [
      "Monitor your emotions daily to find patterns. 📊",
      "Consider reaching out to a therapist or counselor. 🏥",
      "Start small by setting one personal goal to work on. 🎯"
    ],
    "😔 Always": [
      "Long-term sadness may require professional support—don't hesitate to seek help. 🆘",
      "Find a support group or community to share experiences. 🤝",
      "Prioritize self-care and set time for personal well-being. 🌿"
    ]
  },
  angry: {
    "😐 1-3 Mild": [
      "Take deep breaths—inhale for 4 seconds, hold for 4, exhale for 4. 😌",
      "Listen to calming sounds or classical music. 🎵",
      "Engage in a distraction like a puzzle or book. 📚"
    ],
    "😤 4-6 Moderate": [
      "Write down your frustrations and possible solutions. ✍️",
      "Go for a walk or do light physical activity. 🚶",
      "Try guided meditation to ease tension. 🧘"
    ],
    "😠 7-9 High": [
      "Use a stress ball or punching bag to release energy. 🥊",
      "Count to 10 before reacting to avoid impulsive actions. 🔢",
      "Express anger through art or music. 🎨🎸"
    ],
    "🌋 10 Extreme": [
      "Seek professional guidance if anger feels uncontrollable. 🏥",
      "Try progressive muscle relaxation to physically release tension. 🏋️",
      "Create an anger management plan for future situations. 📋"
    ]
  },
  stressed: {
    "⏳ Today": [
      "Take a short break to relax and reset. ⏸️",
      "Write down your stressors and categorize them. 📖",
      "Listen to relaxing music or nature sounds. 🎶"
    ],
    "📅 Few weeks": [
      "Break tasks into smaller steps to reduce stress. 📋",
      "Ensure proper sleep and hydration. 💧",
      "Talk to a trusted friend or mentor. 💬"
    ],
    "🕰️ Over a month": [
      "Incorporate stress-relief habits like exercise or journaling. 🏃",
      "Consider seeking professional guidance. 🏥",
      "Reassess priorities and set healthy boundaries. 🚧"
    ],
    "⚠️ Ongoing issue": [
      "Chronic stress can affect health—get professional support. 🆘",
      "Try relaxation techniques like yoga or deep breathing. 🧘",
      "Restructure daily routine to reduce stressors. 🕒"
    ]
  }
};

// ✅ Solution Component
// ✅ Function to Calculate Stress Score
const calculateStressScore = (mood, responses) => {
    let score = 0;
  
    Object.values(responses).forEach((answer) => {
      if (["⏳ Today", "✅ Yes, too much to handle", "😣 Frequently", "📅 Few weeks"].includes(answer)) {
        score += 1; // Low impact
      } else if (["⚠️ Ongoing issue", "🚑 Only in extreme stress", "🆘 Very bad"].includes(answer)) {
        score += 3; // High impact
      } else {
        score += 2; // Moderate impact
      }
    });
  
    if (mood === "stressed" && score >= 8) return "severe";
    if (score >= 4) return "moderate";
    return "mild";
  };
  
  // ✅ Solution Component
  const SolutionRecommendations = ({ mood, responses }) => {
    if (!mood || !responses || Object.keys(responses).length === 0) return null;
  
    const stressLevel = calculateStressScore(mood, responses);
  
    return (
      <div className="solution-section">
        <h3>Recommended Solutions:</h3>
  
        {stressLevel === "severe" ? (
          <>
            <p className="solution-text">🚨 Your stress level is **high**. We recommend professional therapy.</p>
            <Link to="/therapy-booking">
              <button className="therapy-btn">Book a Therapy Session</button>
            </Link>
          </>
        ) : (
          <>
            <p className="solution-text">✔️ Your stress is at a manageable level. Here are some recommended steps to feel better.</p>
            {Object.values(responses)
              .flatMap((answer) => solutionMapping[mood]?.[answer] || [])
              .sort(() => 0.5 - Math.random())
              .slice(0, 4)
              .map((solution, index) => (
                <p key={index} className="solution-text">🔹 {solution}</p>
              ))}
          </>
        )}
      </div>
    );
  };
  
  export default SolutionRecommendations;