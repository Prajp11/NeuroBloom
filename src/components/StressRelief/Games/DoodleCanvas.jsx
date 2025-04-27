import React, { useRef, useState, useEffect } from "react";

const colorMoodMap = {
  "#FF0000": "Energetic ⚡ / Passionate ❤️",
  "#0000FF": "Calm 🌊 / Trustworthy 🤝",
  "#FFFF00": "Happy ☀️ / Optimistic 🌼",
  "#00FF00": "Peaceful 🌿 / Growth 🍀",
  "#FFC0CB": "Loving 💖 / Gentle 🌸",
  "#FFA500": "Creative 🎨 / Cheerful 😊",
  "#800080": "Imaginative ✨ / Spiritual 🔮",
  "#000000": "Focused 🧠 / Balanced ⚖️",
  "#FFFFFF": "Open 🕊️ / Minimalist ✏️"
};

const shapes = ["circle", "square", "triangle"];

const DoodleCanvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [usedColors, setUsedColors] = useState({});
  const [shape, setShape] = useState("none");
  const [affirmation, setAffirmation] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 700;
    canvas.height = 450;
    canvas.style.border = "3px dashed #ccc";
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctxRef.current = ctx;
  }, [color]);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color;
      ctxRef.current.fillStyle = color;
    }
  }, [color]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (shape !== "none") {
      drawShape(offsetX, offsetY);
      trackColorUsage();
      return;
    }
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    trackColorUsage();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || shape !== "none") return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setUsedColors({});
    setAffirmation("");
  };

  const trackColorUsage = () => {
    setUsedColors((prev) => ({
      ...prev,
      [color]: (prev[color] || 0) + 1,
    }));
  };

  const drawShape = (x, y) => {
    const ctx = ctxRef.current;
    switch (shape) {
      case "circle":
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fill();
        break;
      case "square":
        ctx.fillRect(x - 20, y - 20, 40, 40);
        break;
      case "triangle":
        ctx.beginPath();
        ctx.moveTo(x, y - 20);
        ctx.lineTo(x - 20, y + 20);
        ctx.lineTo(x + 20, y + 20);
        ctx.closePath();
        ctx.fill();
        break;
      default:
        break;
    }
  };

  const getDominantMood = () => {
    if (Object.keys(usedColors).length === 0) return "Start expressing yourself!";
    const [dominantColor] = Object.entries(usedColors).sort((a, b) => b[1] - a[1])[0];
    return colorMoodMap[dominantColor] || "Creative Vibes 💫";
  };

  const generateAffirmation = () => {
    if (Object.keys(usedColors).length === 0) {
      setAffirmation("Let's paint some feelings first! 🎨");
      return;
    }
    const moods = Object.keys(usedColors)
      .map((clr) => colorMoodMap[clr])
      .filter(Boolean);
    const uniqueMoods = [...new Set(moods)];
    const affirm = `Today, you are: ${uniqueMoods.join(", ")}. Keep embracing your colors! 🌈`;
    setAffirmation(affirm);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "my_doodle.png";
    link.href = image;
    link.click();
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "'Segoe UI', sans-serif" }}>
      <h2 style={{ color: "#6A5ACD", marginBottom: "10px" }}>🖌️ Doodle & Expression Zone</h2>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
        style={{ cursor: shape !== "none" ? "pointer" : "crosshair", background: "#fff" }}
      />
      <div style={{ marginTop: 10 }}>
        <label style={{ marginRight: 15 }}>
          🎨 Pick a color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ marginLeft: 10 }}
          />
        </label>
        <label style={{ marginRight: 15 }}>
          🔷 Choose shape:
          <select
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            style={{ marginLeft: 10 }}
          >
            <option value="none">None (Doodle)</option>
            {shapes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <button
          onClick={clearCanvas}
          style={{
            padding: "5px 15px",
            background: "#FF6347",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: "bold",
            marginRight: 10
          }}
        >
          🧼 Clear Canvas
        </button>
        <button
          onClick={downloadCanvas}
          style={{
            padding: "5px 15px",
            background: "#32CD32",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: "bold",
            marginRight: 10
          }}
        >
          💾 Save Art
        </button>
        <button
          onClick={generateAffirmation}
          style={{
            padding: "5px 15px",
            background: "#6A5ACD",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          🌈 Get Affirmation
        </button>
      </div>
      <p style={{ marginTop: 20, fontStyle: "italic", fontSize: "16px" }}>
        🧠 Feeling Meter: <strong>{getDominantMood()}</strong>
      </p>
      {affirmation && (
        <p style={{ marginTop: 10, fontSize: "16px", color: "#444" }}>
          💬 Affirmation: <strong>{affirmation}</strong>
        </p>
      )}
    </div>
  );
};

export default DoodleCanvas;