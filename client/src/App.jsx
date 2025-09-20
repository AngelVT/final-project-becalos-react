import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./config/env.config.js";

function App() {
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/ping`)
      .then((response) => {
        setServerMessage(response.data.msg);
      })
      .catch((error) => {
        if (error.response) {
          setServerMessage(error.response.data.msg || "Unknown server error");
        } else if (error.request) {
          setServerMessage("No response from server");
        } else {
          setServerMessage("Error setting up request");
        }
        console.error("Error calling backend:", error);
      });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Frontend ↔ Backend Test</h1>
      <p>Response from server: <strong>{serverMessage}</strong></p>
    </div>
  );
}

export default App;