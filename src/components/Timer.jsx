import React, { useEffect, useState } from "react";

function Timer({ onTimeUp }) {
  const [time, setTime] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <p className="timer">⏳ Time Left: {time}s</p>;
}

export default Timer;
