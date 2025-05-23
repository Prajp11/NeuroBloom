// import React from "react";
// import { Link } from "react-router-dom";

// // ✅ Expanded Solution Mapping for All Mood Choices
// const solutionMapping = {
//   happy: {
//     "🎯 Achieving a goal": [
//       "Celebrate your achievement with a small reward. 🎉",
//       "Set a new goal to keep the momentum going. 📈",
//       "Share your success with friends or family to spread positivity. 💬"
//     ],
//     "❤️ Time with loved ones": [
//       "Plan another gathering or call a loved one to continue the connection. 📞",
//       "Express gratitude to the people who made you feel happy. 💖",
//       "Write down this positive experience in a journal to reflect on later. 📖"
//     ],
//     "🎨 Hobbies": [
//       "Schedule more time for your hobbies regularly to sustain happiness. ⏳",
//       "Try learning a new creative skill to expand your interests. 🎭",
//       "Share your hobby with others, like posting artwork or playing music for friends. 🎶"
//     ],
//     "🎁 A surprise": [
//       "Pass on the positivity by surprising someone else. 🎁",
//       "Reflect on what made this surprise meaningful to you. 🤔",
//       "Write a gratitude note about this experience. 💌"
//     ]
//   },
//   neutral: {
//     "😕 Indifferent": [
//       "Try engaging in a new activity to break the routine. 🎨",
//       "Listen to uplifting music to shift your mood. 🎶",
//       "Go outside and get some fresh air to reset your mind. 🌳"
//     ],
//     "☯️ Peaceful": [
//       "Enjoy the moment and practice mindfulness. 🧘",
//       "Share your calmness by helping someone else relax. 🤝",
//       "Reflect on what contributes to this peace and maintain it. 🌿"
//     ],
//     "🌊 Going through day": [
//       "Identify one thing you enjoyed today to appreciate the small moments. 🔍",
//       "Plan a small adventure or fun activity to break the monotony. 🚶",
//       "Reach out to a friend or loved one for casual conversation. 💬"
//     ],
//     "🤔 Unsure": [
//       "Write down your thoughts to understand what you're feeling. ✍️",
//       "Take a break and do something relaxing like meditation. 🧘",
//       "Experiment with a new hobby to see if it sparks interest. 🎭"
//     ]
//   },
//   sad: {
//     "⏳ Just today": [
//       "Take a short break and do something that brings you joy. 🌞",
//       "Talk to a friend or family member about how you feel. 💬",
//       "Engage in light physical activity to improve mood. 🏃"
//     ],
//     "📅 Few days": [
//       "Practice gratitude by listing three positive things daily. ✅",
//       "Engage in a creative outlet like writing, drawing, or music. 🎶",
//       "Try meditation or breathing exercises to relax. 🧘"
//     ],
//     "🕰️ Weeks or longer": [
//       "Monitor your emotions daily to find patterns. 📊",
//       "Consider reaching out to a therapist or counselor. 🏥",
//       "Start small by setting one personal goal to work on. 🎯"
//     ],
//     "😔 Always": [
//       "Long-term sadness may require professional support—don't hesitate to seek help. 🆘",
//       "Find a support group or community to share experiences. 🤝",
//       "Prioritize self-care and set time for personal well-being. 🌿"
//     ]
//   },
//   angry: {
//     "😐 1-3 Mild": [
//       "Take deep breaths—inhale for 4 seconds, hold for 4, exhale for 4. 😌",
//       "Listen to calming sounds or classical music. 🎵",
//       "Engage in a distraction like a puzzle or book. 📚"
//     ],
//     "😤 4-6 Moderate": [
//       "Write down your frustrations and possible solutions. ✍️",
//       "Go for a walk or do light physical activity. 🚶",
//       "Try guided meditation to ease tension. 🧘"
//     ],
//     "😠 7-9 High": [
//       "Use a stress ball or punching bag to release energy. 🥊",
//       "Count to 10 before reacting to avoid impulsive actions. 🔢",
//       "Express anger through art or music. 🎨🎸"
//     ],
//     "🌋 10 Extreme": [
//       "Seek professional guidance if anger feels uncontrollable. 🏥",
//       "Try progressive muscle relaxation to physically release tension. 🏋️",
//       "Create an anger management plan for future situations. 📋"
//     ]
//   },
//   stressed: {
//     "⏳ Today": [
//       "Take a short break to relax and reset. ⏸️",
//       "Write down your stressors and categorize them. 📖",
//       "Listen to relaxing music or nature sounds. 🎶"
//     ],
//     "📅 Few weeks": [
//       "Break tasks into smaller steps to reduce stress. 📋",
//       "Ensure proper sleep and hydration. 💧",
//       "Talk to a trusted friend or mentor. 💬"
//     ],
//     "🕰️ Over a month": [
//       "Incorporate stress-relief habits like exercise or journaling. 🏃",
//       "Consider seeking professional guidance. 🏥",
//       "Reassess priorities and set healthy boundaries. 🚧"
//     ],
//     "⚠️ Ongoing issue": [
//       "Chronic stress can affect health—get professional support. 🆘",
//       "Try relaxation techniques like yoga or deep breathing. 🧘",
//       "Restructure daily routine to reduce stressors. 🕒"
//     ]
//   }
// };


// // ✅ Stress Weights Mapping
// const stressWeights = {
//   "😀 Rarely": 0,
//   "🙂 Sometimes": 0,
//   "☀️ Occasionally": 0,
//   "⏳ Today": 0,
//   "😣 Frequently": 2,
//   "📅 Few weeks": 2,
//   "✅ Yes, too much to handle": 3,
//   "⚠️ Ongoing issue": 4,
//   "🚑 Only in extreme stress": 3,
//   "🆘 Very bad": 5
// };

// // ✅ Updated Function to Calculate Stress Level More Clearly
// // ✅ Function to Calculate Only Score
// const calculateStressScore = (responses) => {
//   let score = 0;

//   Object.values(responses).forEach((answer) => {
//     if (stressWeights.hasOwnProperty(answer)) {
//       score += stressWeights[answer];
//     }
//   });

//   return score;
// };

// // ✅ Separate Function to Calculate Stress Level from Score
// const calculateStressLevel = (score) => {
//   if (score >= 8) {
//     return "severe";
//   } else if (score >= 3) {
//     return "moderate";
//   } else {
//     return "mild";
//   }
// };

// // ✅ Solution Component
// const SolutionRecommendations = ({ mood, responses }) => {
//   if (!mood || !responses || Object.keys(responses).length === 0) return null;

//   const score = calculateStressScore(responses); // First, get numeric score
//   const stressLevel = calculateStressLevel(score); // Then get level mild/moderate/severe

//   return (
//     <div className="solution-section">
//       <h3>Recommended Solutions:</h3>

//       {stressLevel === "severe" ? (
//         <>
//           <p className="solution-text">🚨 Your stress level is high. We recommend professional therapy.</p>
//           <Link to="/therapy-booking">
//             <button className="therapy-btn">Book a Therapy Session</button>
//           </Link>
//         </>
//       ) : (
//         <>
//           <p className="solution-text">✔️ Your stress is at a manageable level. Here are some recommended steps to feel better.</p>
//           {Object.values(responses)
//             .flatMap((answer) => solutionMapping[mood]?.[answer] || [])
//             .sort(() => 0.5 - Math.random())
//             .slice(0, 4)
//             .map((solution, index) => (
//               <p key={index} className="solution-text">🔹 {solution}</p>
//             ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default SolutionRecommendations;







import React from "react";
import { Link } from "react-router-dom";

// ✅ Expanded Solution Mapping for All Mood Choices
  const solutionMapping = {
    happy: [
      "Continue engaging in activities that bring joy, like hobbies or spending time with loved ones.",
      "Maintain a balanced routine to keep the positive energy going.",
      "Practice mindfulness or gratitude to boost well-being even further.",
    ],
    neutral: [
      "Try adding some variety to your daily routine to shake off the neutral mood.",
      "Take small breaks and engage in a relaxing activity, like reading or going for a walk.",
      "Talk to someone you trust about how you feel to lighten your mood.",
    ],
    sad: [
      "Consider reaching out to a friend or loved one to talk about what's bothering you.",
      "Engage in a small act of self-care, like taking a warm bath or listening to soothing music.",
      "Journaling your thoughts can help release some of the sadness you're feeling.",
    ],
    angry: [
      "Take a few deep breaths to calm your mind and reduce anger.",
      "Try a physical activity, like going for a walk or hitting the gym, to release pent-up frustration.",
      "Engage in creative outlets, like drawing or writing, to express and channel your anger productively.",
    ],
    stressed: [
      "Schedule time for relaxation, such as meditation or deep breathing exercises.",
      "Break down your tasks into manageable chunks to avoid feeling overwhelmed.",
      "Consider talking to a professional if stress is becoming overwhelming or long-lasting.",
    ],
  };


// ✅ Stress Weights Mapping
const stressWeights = {
  happy: {
    "🎯 Achieving a goal (happy)": 0,
    "❤️ Time with loved ones (happy)": 0,
    "🎨 Hobbies (happy)": 0,
    // "🎨 Hobbies (happy - creative)": 1, 
    "🎁 A surprise (happy)": 0,
    "⏳ Just now (happy)": 0,
    "🕰️ Few hours (happy)": 0,
    "🌞 All day (happy)": 0,
    "🎉 A happy phase (happy)": 0,
    "👨‍👩‍👧‍👦 Yes (happy)": 0,
    "🤔 Somewhat (happy)": 1,
    "😔 No (happy)": 2,
    "😌 Prefer solitude (happy)": 3,
    "📈 Personal success (happy)": 0,
    "👥 Social interactions (happy)": 0,
    "🎁 Random event (happy)": 1,
    "😊 Just feel happy (happy)": 1,
    "🎭 Yes (happy)": 0,
    "🎮 A little (happy)": 1,
    "⏳ Plan to later (happy)": 1,
    "😌 Not really (happy)": 2,
    "⚡ High (happy)": 0,
    "😊 Balanced (happy)": 0,
    "🛌 Low (happy)": 1,
    "😴 Tired but happy (happy)": 2,
    "🗣️ Great conversations (happy)": 0,
    "💬 Somewhat (happy)": 1,
    "🤷 Not really (happy)": 2,
    "😞 No, felt distant (happy)": 3,
    "⏳ Temporary (happy)": 0,
    "😊 All day (happy)": 0,
    "😊 Feeling good for a while (happy)": 1,
    "🎉 Generally happy (happy)": 0,
    "🎨 Hobbies (happy - relaxed)": 0, 
    "💌 Stay connected (happy)": 0,
    "⚖️ Work-life balance (happy)": 0,
    "😊 Not sure (happy)": 2,
    "❤️ Be kind (happy)": 0,
    "💬 Share positivity (happy)": 0,
    "🤗 Encourage someone (happy)": 0,
    "😊 Keep it to myself (happy)": 1,
  },
  neutral: {
    "😕 Indifferent (neutral)": 1,
    "☯️ Peaceful (neutral)": 0,
    "🌊 Going through day (neutral)": 0,
    "🤔 Unsure (neutral)": 1,
    "🎨 Fun activity (neutral)": 0,
    "🗣️ Talk to someone (neutral)": 0,
    "🛀 Relax (neutral)": 0,
    "🤷 Nothing specific (neutral)": 1,
    "🌅 Just today (neutral)": 0,
    "📅 Few days (neutral)": 1,
    "⏳ Long time (neutral)": 2,
    "🤔 Can't tell (neutral)": 2,
    "🌟 Engaged (neutral)": 0,
    "😐 Somewhat (neutral)": 0,
    "🚶 Disconnected (neutral)": 1,
    "🏝️ Emotionally detached (neutral)": 2,
    "🔄 Regular day (neutral)": 0,
    "✅ Finished a task (neutral)": 0,
    "⚖️ Emotional balance (neutral)": 1,
    "🤷 No idea (neutral)": 1,
    "⚡ Yes! (neutral)": 0,
    "🤔 Maybe (neutral)": 1,
    "🛀 No, I’m fine (neutral)": 0,
    "😴 Prefer low energy (neutral)": 1,
    "💪 Yes (neutral)": 0,
    "😩 Mentally okay, physically tired (neutral)": 0,
    "🤯 Physically fine, mentally drained (neutral)": 1,
    "🤷 Just neutral (neutral)": 0,
    "🎉 Yes! (neutral)": 0,
    "🤔 Maybe (neutral - normal)": 0,
    "🌊 Going with flow (neutral)": 0,
    "😞 Nothing (neutral)": 1,
    "🛀 Relaxation(neutral)": 0,
    "🚀 Motivation (neutral)": 0,
    "⚖️ Balance (neutral)": 0,
    "🤷 Not sure (neutral)": 1,
    "☕ A break (neutral)": 0,
    "🎶 Music (neutral)": 0,
    "💬 A chat (neutral)": 0,
    "🌅 Nothing (neutral)": 0,
  },
  sad: {
    "😞 Yes (sad)": 1,
    "🤔 Vague idea (sad)": 1,
    "🌧️ No reason (sad)": 1,
    "🚫 Don't want to think (sad)": 1,
    "⏳ Just today (sad)": 0,
    "📅 Few days (sad)": 1,
    "🕰️ Weeks or longer (sad)": 2,
    "😔 Always (sad)": 3,
    "🎭 Comes and goes (sad)": 0,
    "⚖️ Sometimes eases (sad)": 0,
    "🌊 Feels constant (sad)": 2,
    "🤷 Hard to tell (sad)": 2,
    "💬 Yes, helped (sad)": 0,
    "😞 Yes, no difference (sad)": 1,
    "🤔 No, but should (sad)": 0,
    "🤐 No, prefer alone (sad)": 1,
    "📰 Recent event (sad)": 0,
    "🔄 Ongoing issue (sad)": 1,
    "🤷 No reason (sad)": 1,
    "🤔 Not sure (sad)": 1,
    "😴 Sleep issues (sad)": 1,
    "🍽️ Appetite change (sad)": 0,
    "🔄 Both (sad)": 2,
    "✅ Normal (sad)": 0,
    "😕 Hard but try (sad)": 1,
    "😞 No interest (sad)": 1,
    "⚖️ Sometimes (sad)": 0,
    "😔 Forcing myself (sad)": 1,
    "📉 Struggle with tasks (sad)": 1,
    "🏃 Push through (sad)": 1,
    "✅ Function normally (sad)": 0,
    "🤷 Not noticed (sad)": 0,
    "🔄 Yes, similar (sad)": 0,
    "😞 Feels worse (sad)": 1,
    "🆕 New for me (sad)": 0,
    "🤔 Can't recall (sad)": 0,
    "🙏 Yes (sad)": 0,
    "🤷 Maybe (sad)": 1,
    "🚫 No (sad)": 1,
    "😞 Just want better (sad)": 0,
  },
  angry: {
    "😡 Conflict (angry)": 1,
    "🚦 Situation (angry)": 0,
    "🤦 Personal mistakes (angry)": 0,
    "🤷 No idea (angry)": 1,
    "🔥 Almost daily (angry)": 2,
    "⏳ Sometimes (angry)": 0,
    "🧘 Rarely (angry)": 0,
    "🆕 First time (angry)": 0,
    "😐 1-3 (angry)": 0,
    "😤 4-6 (angry)": 1,
    "😠 7-9 (angry)": 2,
    "🌋 10 - Extreme (angry)": 2,
    "🎮 Distractions (angry)": 0,
    "💬 Venting (angry)": 1,
    "😶 Suppress (angry)": 0,
    "💥 Impulsive (angry)": 1,
    "👥 Someone (angry)": 0,
    "🌍 Situation (angry)": 1,
    "🤦 Myself (angry)": 0,
    "😠 Not sure (angry)": 1,
    "🌿 Yes, helped (angry)": 0,
    "😕 No effect (angry)": 2,
    "🏞️ Open to try (angry)": 0,
    "❌ Doesn't work (angry)": 2,
    "🚨 Can't focus (angry)": 1,
    "💼 Push through (angry)": 1,
    "✅ Normal (angry)": 0,
    "🤷 Not noticed (angry)": 0,
    "💬 Yes (angry)": 0,
    "🤐 Prefer alone (angry)": 1,
    "🤔 Maybe later (angry)": 0,
    "🚨 Immediate help (angry)": 0,
    "🔄 Yes (angry)": 1,
    "🤷 Maybe (angry)": 0,
    "📅 Only today (angry)": 0,
    "🔗 Feel stuck (angry)": 2,
    "📘 Yes (angry)": 0,
    "🤔 Maybe (angry)": 0,
    "⏳ Just wait (angry)": 1,
    "🛠️ Have my own (angry)": 1,
  },
  stressed: {
    "🏫 Work (stressed)": 0,
    "💰 Finances (stressed)": 0,
    "💬 Relationships (stressed)": 0,
    "🤯 Uncertainty (stressed)": 1,
    "⏳ Just today (stressed)": 0,
    "📅 Few weeks (stressed)": 1,
    "🕰️ Over a month (stressed)": 2,
    "⚠️ Ongoing (stressed)": 3,
    "✅ Yes, too much to handle (stressed)": 1,
    "⚖️ Sometimes (stressed)": 0,
    "🔄 Only in high-pressure situations (stressed)": 0,
    "❌ No, I feel in control (stressed)": 0,
    "😣 Frequently (stressed)": 1,
    "😞 Occasionally (stressed)": 0,
    "🚑 Only in extreme stress (stressed)": 0,
    "👍 No symptoms (stressed)": 0,
    "🧘 Yes, meditation (stressed)": 0,
    "🚶 Short break (stressed)": 0,
    "📵 No, but I want to (stressed)": 1,
    "🔄 No, too busy (stressed)": 2,
    "😴 Well (stressed)": 0,
    "😐 Okay, but tired (stressed)": 0,
    "😵 Poorly (stressed)": 1,
    "💀 Feeling drained (stressed)": 2,
    "💖 Yes(stressed)": 0,
    "😕 Somewhat(stressed)": 0,
    "🤐 No (stressed)": 1,
    "🤷 Haven’t reached out(stressed)": 1,
    "🎉Yes, hobbies(stressed)": 0,
    "🕰️ Sometimes(stressed)": 0,
    "⏳ Rarely (stressed)": 1,
    "❌ Never (stressed)": 1,
    "✅ Yes (stressed)": 0,
    "📋 Maybe (stressed)": 0,
    "🕰️ Not really (stressed)": 1,
    "❌ No change (stressed)": 2,
    "🧠 Yes (stressed)": 0,
    "⏳ Maybe (stressed)": 0,
    "🤷 Not sure (stressed)": 1,
    "❌ No (stressed)": 1,
  }
};

// ✅ Function to calculate score based on mood and response
const calculateStressScore = (responses, mood) => {
  let score = 0;
  const moodWeights = stressWeights[mood];

  Object.values(responses).forEach((answer) => {
    const key = `${answer.trim()} (${mood})`;  // ✅ Fixing format

    if (moodWeights.hasOwnProperty(key)) {
      score += moodWeights[key];
    } else {
      console.warn(`⚠️ No match found for: "${key}"`);
    }
  });

  return score;
};


// ✅ Function to calculate stress level
const calculateStressLevel = (score) => {
  if (score >= 8) return "severe";
  else if (score >= 4) return "moderate";
  else if (score > 0) return "mild";
  else return "normal";
};



// ✅ Main SolutionRecommendations component
const SolutionRecommendations = ({ mood, responses }) => {
  if (!mood || !responses || Object.keys(responses).length === 0) return null;

  const score = calculateStressScore(responses, mood);
  const stressLevel = calculateStressLevel(score);

  return (
    <div className="solution-section">
      <h3>Recommended Solutions:</h3>

      {stressLevel === "severe" && (
        <>
          <p className="solution-text">🚨 Your stress level is high. We recommend professional therapy.</p>
          <Link to="/therapy-booking">
            <button className="therapy-btn">Book a Therapy Session</button>
          </Link>
        </>
      )}

      {stressLevel === "moderate" || stressLevel === "mild" ? (
        <>
          <p className="solution-text">✔️ Your stress level is at a manageable level. Try the following:</p>
          {Object.values(responses)
            .flatMap((answer) => solutionMapping[mood]?.[answer] || [])
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map((solution, index) => (
              <p key={index} className="solution-text">🔹 {solution}</p>
            ))}
        </>
      ) : null}

      {stressLevel === "normal" && (
        <>
          <p className="solution-text">🎉 You’re doing well! Keep nurturing your well-being.</p>
          {Object.values(responses)
            .flatMap((answer) => solutionMapping[mood]?.[answer] || [])
            .slice(0, 3)
            .map((solution, index) => (
              <p key={index} className="solution-text">🔹 {solution}</p>
            ))}
        </>
      )}
    </div>
  );
};

export default SolutionRecommendations;