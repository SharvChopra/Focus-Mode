import React from "react";
import CountdownTimer from "./CountDownTimer.jsx";
import axios from "../api/axiosConfig"; // Import axios
import "./SessionCard.css";

const formatDate = (dateString, options) => {
  return new Date(dateString)
    .toLocaleTimeString("en-US", options)
    .replace(" ", "");
};

const SessionCard = ({ session, onSessionUpdate }) => {
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
  const isStarted = new Date() >= new Date(session.startTime);

  const handleEndSession = async () => {
    try {
      await axios.post(`/sessions/${session._id}/end`);
      if (onSessionUpdate) {
        onSessionUpdate();
      }
    } catch (error) {
      console.error("Failed to end session", error);
    }
  };

  return (
    <div className="session-card">
      <div className="session-icon">⚡️</div>

      <div className="session-details">
        <h4>{session.title || "Focus Session"}</h4>
        <p>
          Today • {formatDate(session.startTime, timeOptions)} -{" "}
          {formatDate(session.endTime, timeOptions)}
        </p>
      </div>

      <div className="session-status">
        {isStarted ? (
          <div className="active-controls">
            <span className="badge-active">Active Now</span>
            <button className="btn-end-session" onClick={handleEndSession}>
              End Session
            </button>
          </div>
        ) : (
          <div className="timer-wrapper">
            <span className="timer-label">Starts in:</span>
            <CountdownTimer
              targetDate={session.startTime}
              onComplete={onSessionUpdate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionCard;
