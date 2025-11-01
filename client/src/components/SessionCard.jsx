import React from "react";
import "./SessionCard.css";

const formatDate = (dateString, options) => {
  return new Date(dateString)
    .toLocaleTimeString("en-US", options)
    .replace(" ", "");
};

const SessionCard = ({ session }) => {
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

  return (
    <div className="session-card">
      <div className="session-icon">⚡️</div>
      <div className="session-details">
        <h4>{session.title}</h4>
        <p>
          Today • {formatDate(session.startTime, timeOptions)} -{" "}
          {formatDate(session.endTime, timeOptions)}
        </p>
      </div>
      <div className="session-status">Scheduled</div>
    </div>
  );
};

export default SessionCard;
