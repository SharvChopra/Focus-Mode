import React from "react";
import CountdownTimer from "./CountDownTimer.jsx"; // Make sure this path is correct
import "./SessionCard.css";

const formatDate = (dateString, options) => {
  return new Date(dateString)
    .toLocaleTimeString("en-US", options)
    .replace(" ", "");
};

const SessionCard = ({ session }) => {
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

  // Check if the session is currently active or in the past
  const isStarted = new Date() >= new Date(session.startTime);

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
          <span className="badge-active">Active Now</span>
        ) : (
          <div className="timer-wrapper">
            <span className="timer-label">Starts in:</span>
            {/* Pass the startTime to your CountdownTimer */}
            <CountdownTimer targetDate={session.startTime} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionCard;
