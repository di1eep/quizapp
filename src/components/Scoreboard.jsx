import React from "react";

function Scoreboard({ score, attempts }) {
  return (
    <div>
      <h2>Scoreboard</h2>
      <p>Your Score: {score}</p>
    </div>
  );
}

export default Scoreboard;
