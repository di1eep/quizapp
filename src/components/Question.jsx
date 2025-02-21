import React from "react";

function Question({ data, onAnswer, onOptionFocus }) {
  return (
    <div className="question-container">
      <h4>{data.question}</h4>
      <div className="options">
        {data.options.map((option, index) => (
          <button
            key={index}
            className="option-btn"
            onClick={() => onAnswer(option)}
            onFocus={onOptionFocus}  
            onMouseEnter={onOptionFocus} 
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
