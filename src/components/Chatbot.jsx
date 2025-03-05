import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../App.css";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  // ✅ Scroll to latest message automatically
  useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessages([...messages, { sender: "AI", text: "⚠️ Please log in to chat." }]);
      return;
    }

    const userMessage = { sender: "You", text: message };
    setMessages([...messages, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/chat/",
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Chatbot API Response:", res.data); // ✅ Debugging

      const aiMessage = {
        sender: "AI",
        text: res.data.response || "🤖 Hmm... I'm not sure. Could you ask differently?",
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Chatbot Error:", error.response || error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "AI", text: "⚠️ Sorry, something went wrong." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <h2>🧠 AI Chatbot</h2>

      {/* ✅ Chat Display */}
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender === "You" ? "user" : "ai"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        <div ref={chatBoxRef} /> {/* ✅ Auto-scroll anchor */}
      </div>

      {/* ✅ Chat Input */}
      <textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={loading}
      />

      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
};

export default Chatbot;
