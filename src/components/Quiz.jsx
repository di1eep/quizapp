import React, { useState, useEffect } from "react";
import Question from "./Question.jsx";
import Timer from "./Timer.jsx";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const quizData = [
  { id: 1, question: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], answer: "Mercury" },
  { id: 2, question: "Which data structure follows FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue" },
  { id: 3, question: "Which is used for structuring web pages?", options: ["Python", "Java", "HTML", "C++"], answer: "HTML" },
  { id: 4, question: "What is the symbol for Gold?", options: ["Au", "Gd", "Ag", "Pt"], answer: "Au" },
  { id: 5, question: "Which process is not in petroleum refining?", options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"], answer: "Filtration" },
];

function Quiz({ setScore, setAttempts }) {
  const storedUserName = localStorage.getItem("userName");
  const userName = storedUserName && storedUserName.trim() !== "" ? storedUserName : "Guest";

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState([]);
  const [userScore, setUserScore] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    localforage.getItem("quizAttempts").then((data) => {
      if (data) setQuizAttempts(data);
    });
  }, []);

  const handleAnswer = (answer) => {
    const isCorrect = answer === quizData[currentQuestion].answer;
    setSelectedAnswer(isCorrect ? "✅ Correct!" : "❌ Wrong!");

    setUserScore((prev) => (isCorrect ? prev + 1 : prev));

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
        saveAttempt(userScore + (isCorrect ? 1 : 0));
      }
    }, 1000);
  };

  const saveAttempt = (finalScore) => {
    const attempt = { user: userName, score: finalScore, date: new Date().toLocaleString() };

    setQuizAttempts((prevAttempts) => {
      const updatedAttempts = [...prevAttempts, attempt];
      const uniqueAttempts = updatedAttempts.filter(
        (attempt, index, self) => index === self.findIndex((a) => a.date === attempt.date)
      );
      uniqueAttempts.sort((a, b) => new Date(b.date) - new Date(a.date));
      localforage.setItem("quizAttempts", uniqueAttempts);
      return uniqueAttempts;
    });

    setAttempts((prevAttempts) => {
      if (!prevAttempts.some((a) => a.date === attempt.date)) {
        return [...prevAttempts, attempt];
      }
      return prevAttempts;
    });
  };

  const handleTimeUp = () => {
    setSelectedAnswer("⏳ Time's up!");

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
        saveAttempt(userScore);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setUserScore(0);
    setScore(0);
    navigate("/");
  };

  const handleClearHistory = () => {
    setQuizAttempts([]);
    setAttempts([]);
    localforage.removeItem("quizAttempts");
  };

  const handleOptionFocus = () => {
    setSelectedAnswer(null);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        {quizCompleted ? (
          <div className="quiz-result">
            <h2>🎉 Quiz Completed!</h2>
            <p>
              <strong>{userName}</strong>, your final score: <strong>{userScore} / {quizData.length}</strong>
            </p>
            <button className="btn restart" onClick={handleRestart}>🔄 Restart Quiz</button>
            <button className="btn clear" onClick={handleClearHistory}>🗑 Clear History</button>

            {quizAttempts.length > 0 && (
              <div className="attempts">
                <h3>🔝 Latest Attempt</h3>
                <p>
                  <strong>{quizAttempts[0].user}</strong> - {quizAttempts[0].score}/{quizData.length} - {quizAttempts[0].date}
                </p>

                {quizAttempts.length > 1 && (
                  <>
                    <h3>📜 Previous Attempts</h3>
                    <ul className="attempt-list">
                      {quizAttempts.slice(1).map((attempt, index) => (
                        <li key={index}>
                          <strong>{attempt.user}</strong> - {attempt.score}/{quizData.length} - {attempt.date}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <>
            <h3>❓ Question {currentQuestion + 1}</h3>
            <Timer onTimeUp={handleTimeUp} />
            <Question data={quizData[currentQuestion]} onAnswer={handleAnswer} onOptionFocus={handleOptionFocus} />
            <p className="feedback">{selectedAnswer}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
