import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import SessionCard from "../components/SessionCard";
import ScheduleModal from "../components/ScheduleModal";
import "./Dashboard.css";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState({
    upcomingSessions: [],
    stats: {},
    thisWeek: {},
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("/api/dashboard");
      setDashboardData(res.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleQuickFocus = async () => {
    try {
      await axios.post("/api/sessions/quick");
      fetchDashboardData(); 
    } catch (error) {
      console.error("Failed to create quick session", error);
    }
  };

  if (!auth) {
    return <div>Loading user...</div>;
  }

  return (
    <div className="dashboard-container">
      <Header user={auth} />
      <main className="dashboard-main">
        <div className="sessions-column">
          <div className="actions-bar">
            <button
              className="btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              + Schedule Focus Time
            </button>
            <button className="btn-secondary" onClick={handleQuickFocus}>
              Quick 30min Focus
            </button>
          </div>
          <h2>Upcoming Sessions</h2>
          <div className="sessions-list">
            {dashboardData.upcomingSessions.map((session) => (
              <SessionCard key={session._id} session={session} />
            ))}
          </div>
        </div>
        <div className="stats-column">
          <div className="stats-card">
            <h3>Today's Focus</h3>
            <div className="stat-item">
              <span>Sessions planned</span>
              <span>{dashboardData.stats.sessionsPlanned || 1}</span>
            </div>
            <div className="stat-item">
              <span>Focus time</span>
              <span>{dashboardData.stats.focusTime || "2h 30m"}</span>
            </div>
            <div className="stat-item">
              <span>Sites blocked</span>
              <span>{dashboardData.stats.sitesBlocked || 8}</span>
            </div>
          </div>
          <div className="stats-card">
            <h3>This Week</h3>
            <p>Focus streak</p>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: "71%" }}></div>
            </div>
            <span>{dashboardData.thisWeek.focusStreak || 5} days</span>
          </div>
        </div>
      </main>
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSessionCreated={fetchDashboardData}
      />
    </div>
  );
};

export default Dashboard;
