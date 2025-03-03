import React, { useEffect, useState } from "react";
import axios from "axios";

const TestAPI = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/test/")
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h2>Backend Response:</h2>
      <p>{message}</p>
    </div>
  );
};

export default TestAPI;
