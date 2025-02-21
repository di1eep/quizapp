import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import QuizPage from "./pages/QuizPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
    </Routes>
  );
}

export default App;
