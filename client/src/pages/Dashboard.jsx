import { useState, useEffect, useContext } from "react";
import axios from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import SessionCard from "../components/SessionCard";
import ScheduleModal from "../components/ScheduleModal";
import "./Dashboard.css";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);

  // Initialize with safe default values
  const [dashboardData, setDashboardData] = useState({
    upcomingSessions: [],
    stats: {
      sessionsPlanned: 0,
      focusTime: "0h 0m",
      sitesBlocked: 0,
    },
    thisWeek: {
      focusStreak: 0,
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("/dashboard");
      console.log("Dashboard Data Received:", res.data); // Check this in Console (F12)

      // Merge response with defaults to prevent undefined errors
      setDashboardData((prev) => ({ ...prev, ...res.data }));
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleQuickFocus = async () => {
    try {
      await axios.post("/sessions/quick");
      fetchDashboardData();
    } catch (error) {
      console.error("Failed to create quick session", error);
    }
  };

  if (!auth) {
    return <div>Loading user...</div>;
  }

  // Safe check for sessions existence
  const hasSessions =
    dashboardData.upcomingSessions && dashboardData.upcomingSessions.length > 0;

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
            {hasSessions ? (
              dashboardData.upcomingSessions.map((session) => (
                <SessionCard
                  key={session._id || session.id} // Handle potential ID inconsistencies
                  session={session}
                  onSessionUpdate={fetchDashboardData}
                />
              ))
            ) : (
              /* This ensures something displays even if the list is empty */
              <div
                className="empty-state"
                style={{ padding: "20px", textAlign: "center", color: "#666" }}
              >
                <p>No upcoming sessions. Schedule one to get started!</p>
              </div>
            )}
          </div>
        </div>

        <div className="stats-column">
          <div className="stats-card">
            <h3>Today's Focus</h3>
            <div className="stat-item">
              <span>Sessions planned</span>
              {/* Optional chaining prevents crashes if stats is undefined */}
              <span>{dashboardData.stats?.sessionsPlanned || 0}</span>
            </div>
            <div className="stat-item">
              <span>Focus time</span>
              <span>{dashboardData.stats?.focusTime || "0h 0m"}</span>
            </div>
            <div className="stat-item">
              <span>Sites blocked</span>
              <span>{dashboardData.stats?.sitesBlocked || 0}</span>
            </div>
          </div>
          <div className="stats-card">
            <h3>This Week</h3>
            <p>Focus streak</p>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: "71%" }}></div>
            </div>
            <span>{dashboardData.thisWeek?.focusStreak || 0} days</span>
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
