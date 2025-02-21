import React from "react";

function Question({ data, onAnswer }) {
  return (
    <div>
      <h4>{data.question}</h4>
      {data.options.map((option, index) => (
        <button key={index} onClick={() => onAnswer(option)}>{option}</button>
      ))}
    </div>
  );
}

export default Question;
