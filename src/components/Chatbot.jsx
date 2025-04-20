import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../App.css";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const token = localStorage.getItem("accessToken");
    const userMessage = { sender: "You", text: message };

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

      const aiMessage = {
        sender: "AI",
        text:
          res.data?.response ||
          "🤖 Hmm... I'm not sure I understand. Could you rephrase that?",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: "⚠️ Something went wrong. Please try again later.",
        },
      ]);
    }

    setLoading(false);
  };

  // ✅ Enter key support
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h2>🧠 AI Chatbot</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender === "You" ? "user" : "ai"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        <div ref={chatBoxRef} />
      </div>

      <textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />

      <button onClick={sendMessage} disabled={loading || !message.trim()}>
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
};

export default Chatbot;
