import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; 

function HomePage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!name.trim()) {
      alert("Please enter your name!");
      return;
    }
    localStorage.setItem("userName", name);
    navigate("/quiz");
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>🚀 Welcome to the Quiz</h1>

        <input 
          type="text" 
          className="name-input"
          placeholder="Enter your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />

        <button className="start-btn" onClick={handleStart}>🎯 Start Quiz</button>
      </div>
    </div>
  );
}

export default HomePage;
