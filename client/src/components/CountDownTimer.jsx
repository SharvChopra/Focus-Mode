import React, { useState, useEffect } from "react";
import "./CountdownTimer.css";

const CountdownTimer = ({ targetDate, onComplete }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, completed: true };
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      completed: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.completed && onComplete) {
        onComplete();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const format = (num) => num.toString().padStart(2, "0");

  return (
    <div className="countdown-container">
      <div className="timer-box">
        <span className="time-value">{format(timeLeft.hours)}</span>
        <span className="time-label">Hr</span>
      </div>
      <div className="separator">:</div>
      <div className="timer-box">
        <span className="time-value">{format(timeLeft.minutes)}</span>
        <span className="time-label">Min</span>
      </div>
      <div className="separator">:</div>
      <div className="timer-box">
        <span className="time-value">{format(timeLeft.seconds)}</span>
        <span className="time-label">Sec</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
