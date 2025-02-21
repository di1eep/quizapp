import React, { useState } from "react";
import Quiz from "../components/Quiz.jsx";

function QuizPage() {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState([]);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Quiz</h2>
      <Quiz setScore={setScore} setAttempts={setAttempts} />
    </div>
  );
}

export default QuizPage;
