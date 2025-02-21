import React, { useEffect, useState } from "react";

function Timer({ onTimeUp }) {
  const [time, setTime] = useState(10);

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

  return <p>Time Left: {time}s</p>;
}

export default Timer;
