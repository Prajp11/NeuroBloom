// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import "../App.css";

// const Chatbot = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const chatBoxRef = useRef(null);

//   useEffect(() => {
//     chatBoxRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!message.trim()) return;

//     const token = localStorage.getItem("accessToken");
//     const userMessage = { sender: "You", text: message };

//     setMessages((prev) => [...prev, userMessage]);
//     setMessage("");
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/api/chat/",
//         { message },
//         {
//           headers: {
//             Authorization: token ? `Bearer ${token}` : "",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const aiMessage = {
//         sender: "AI",
//         text:
//           res.data?.response ||
//           "🤖 Hmm... I'm not sure I understand. Could you rephrase that?",
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.error("Chatbot Error:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "AI",
//           text: "⚠️ Something went wrong. Please try again later.",
//         },
//       ]);
//     }

//     setLoading(false);
//   };

//   // ✅ Enter key support
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <div className="chat-container">
//       <h2>🧠 AI Chatbot</h2>

//       <div className="chat-box">
//         {messages.map((msg, index) => (
//           <div key={index} className={`chat-message ${msg.sender === "You" ? "user" : "ai"}`}>
//             <strong>{msg.sender}:</strong> {msg.text}
//           </div>
//         ))}
//         <div ref={chatBoxRef} />
//       </div>

//       <textarea
//         placeholder="Type your message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyDown={handleKeyDown}
//         disabled={loading}
//       />

//       <button onClick={sendMessage} disabled={loading || !message.trim()}>
//         {loading ? "Thinking..." : "Send"}
//       </button>
//     </div>
//   );
// };

// export default Chatbot;




import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../App.css";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastBotResponse, setLastBotResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatBoxRef = useRef(null);

  // Track speech synthesis state
  useEffect(() => {
    const handleSpeechEnd = () => setIsSpeaking(false);
    speechSynthesis.addEventListener?.('end', handleSpeechEnd);
    return () => speechSynthesis.removeEventListener?.('end', handleSpeechEnd);
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const token = localStorage.getItem("accessToken");
    const userMessage = { sender: "You", text: message, timestamp: new Date() };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/chat/",
        { message },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      const botReply =
        res.data?.response ||
        "Hmm... I'm not sure I understand. Could you rephrase that?";

      const aiMessage = { sender: "AI", text: botReply, timestamp: new Date() };

      setMessages((prev) => [...prev, aiMessage]);
      setLastBotResponse(botReply);
    } catch (error) {
      console.error("Chatbot Error:", error);
      const errorMsg = "Something went wrong. Please try again later.";
      setMessages((prev) => [...prev, { sender: "AI", text: errorMsg, timestamp: new Date() }]);
      setLastBotResponse(errorMsg);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setIsListening(false);
    };
  };

  const handleReadAloud = () => {
    if (lastBotResponse) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(lastBotResponse);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const handleStopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-wrapper">
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-content">
            <div className="chatbot-avatar">
              <span className="avatar-icon">🧠</span>
              <span className={`status-indicator ${loading ? 'thinking' : 'online'}`}></span>
            </div>
            <div className="chatbot-header-info">
              <h1>MindCare AI Assistant</h1>
              <p className="chatbot-status">
                {loading ? (
                  <span className="typing-indicator">
                    <span></span><span></span><span></span> Thinking...
                  </span>
                ) : (
                  "Online • Here to support you"
                )}
              </p>
            </div>
          </div>
          <div className="chatbot-header-actions">
            <button 
              className={`header-action-btn ${isSpeaking ? 'active' : ''}`}
              onClick={isSpeaking ? handleStopSpeaking : handleReadAloud}
              disabled={!lastBotResponse}
              title={isSpeaking ? "Stop speaking" : "Read last response"}
            >
              {isSpeaking ? '🔇' : '🔊'}
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chatbot-messages">
          {messages.length === 0 && (
            <div className="chat-welcome">
              <div className="welcome-icon">💭</div>
              <h3>Welcome to MindCare AI</h3>
              <p>I'm here to listen and support you. Feel free to share what's on your mind.</p>
              <div className="quick-prompts">
                <button onClick={() => setMessage("I'm feeling stressed today")}>
                  😰 Feeling stressed
                </button>
                <button onClick={() => setMessage("I need some motivation")}>
                  💪 Need motivation
                </button>
                <button onClick={() => setMessage("Help me relax")}>
                  🧘 Help me relax
                </button>
              </div>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-wrapper ${msg.sender === "You" ? "user" : "ai"}`}
            >
              {msg.sender === "AI" && (
                <div className="message-avatar ai-avatar">🤖</div>
              )}
              <div className={`message-bubble ${msg.sender === "You" ? "user-bubble" : "ai-bubble"}`}>
                <p className="message-text">{msg.text}</p>
                <span className="message-time">{formatTime(msg.timestamp)}</span>
              </div>
              {msg.sender === "You" && (
                <div className="message-avatar user-avatar">👤</div>
              )}
            </div>
          ))}
          
          {loading && (
            <div className="message-wrapper ai">
              <div className="message-avatar ai-avatar">🤖</div>
              <div className="message-bubble ai-bubble typing">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="chatbot-input-area">
          <div className="input-container">
            <button 
              className={`voice-btn ${isListening ? 'listening' : ''}`}
              onClick={handleVoiceInput}
              disabled={loading}
              title="Voice input"
            >
              {isListening ? (
                <span className="pulse-ring">🎙️</span>
              ) : (
                '🎤'
              )}
            </button>
            <textarea
              placeholder={isListening ? "Listening..." : "Type your message..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading || isListening}
              rows={1}
            />
            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              title="Send message"
            >
              {loading ? (
                <span className="send-loading"></span>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              )}
            </button>
          </div>
          <p className="input-hint">Press Enter to send • Shift + Enter for new line</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
