import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ScheduleModal.css";

const ScheduleModal = ({ isOpen, onClose, onSessionCreated }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("11:00");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [startHour, startMinute] = startTime.split(":");
    const [endHour, endMinute] = endTime.split(":");

    const startDateTime = new Date(date);
    startDateTime.setHours(startHour, startMinute);

    const endDateTime = new Date(date);
    endDateTime.setHours(endHour, endMinute);

    try {
      await axios.post("/api/sessions", {
        title,
        startTime: startDateTime,
        endTime: endDateTime,
      });
      onSessionCreated(); // Refresh the dashboard data
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to create session", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>Schedule Focus Session</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Session Title</label>
            <input
              type="text"
              placeholder="e.g., Work on Q3 Report, Study for exam"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              className="date-picker-input"
            />
          </div>
          <div className="time-group">
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add to Calendar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;
