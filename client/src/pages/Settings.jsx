import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axiosConfig";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import "./Settings.css";

const Settings = () => {
  const { auth } = useContext(AuthContext);
  const [blockedSites, setBlockedSites] = useState([]);
  const [newSite, setNewSite] = useState("");

  useEffect(() => {
    const fetchBlockedSites = async () => {
      try {
        const res = await axios.get("/settings/blocked-sites");
        setBlockedSites(res.data || []);
      } catch (error) {
        console.error("Failed to fetch blocked sites", error);
      }
    };

    if (auth) {
      fetchBlockedSites();
    }
  }, [auth]);

  const handleUpdateBlockedSites = async (updatedList) => {
    try {
      await axios.post("/settings/blocked-sites", {
        blockedSites: updatedList,
      });
      setBlockedSites(updatedList);
    } catch (error) {
      console.error("Failed to update blocked sites", error);
    }
  };

  const handleAddSite = (e) => {
    e.preventDefault();
    if (newSite) {
      // Clean the URL: remove protocol, www, and path. Just get domain.
      const cleanSite = newSite.replace(/^https?:\/\//, "").replace(/^www\./, "").split('/')[0].trim();

      if (cleanSite && !blockedSites.includes(cleanSite)) {
        const updatedList = [...blockedSites, cleanSite];
        handleUpdateBlockedSites(updatedList);
        setNewSite(""); // Clear the input field
      }
    }
  };

  const handleRemoveSite = (siteToRemove) => {
    const updatedList = blockedSites.filter((site) => site !== siteToRemove);
    handleUpdateBlockedSites(updatedList);
  };

  if (!auth) {
    return <div>Loading...</div>; // Or redirect to login
  }

  return (
    <div className="settings-container">
      <Header user={auth} />
      <div className="settings-header">
        <Link to="/dashboard" className="back-link">
          &lt; Back to Dashboard
        </Link>
        <h1>Settings</h1>
      </div>
      <main className="settings-content">
        {/* Account Card */}
        <div className="settings-card">
          <h2>Account</h2>
          <div className="account-info">
            <div className="user-avatar-large">
              {auth.displayName.charAt(0)}
            </div>
            <div className="user-details">
              <h3>{auth.displayName}</h3>
              <p>Connected with GitHub</p>
            </div>
            <div className="status-badge connected">Connected</div>
          </div>
        </div>

        {/* Blocked Websites Card */}
        <div className="settings-card">
          <h2>Blocked Websites</h2>
          <p className="card-subtitle">
            Add websites you want to block during focus sessions. Don't include
            "http://" or "www." - just the domain name.
          </p>
          <form className="add-site-form" onSubmit={handleAddSite}>
            <input
              type="text"
              value={newSite}
              onChange={(e) => setNewSite(e.target.value)}
              placeholder="e.g., twitter.com, facebook.com"
            />
            <button type="submit" className="btn-primary">
              Add Site
            </button>
          </form>
          <h3 className="currently-blocked-title">
            Currently Blocked ({blockedSites.length})
          </h3>
          <ul className="blocked-sites-list">
            {blockedSites.map((site) => (
              <li key={site}>
                <div className="site-info">
                  <span className="block-icon">🚫</span>
                  {site}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveSite(site)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="settings-card">
          <h2>Chrome Extension</h2>
          <div className="extension-status-item">
            <div>
              <h3>Extension Status</h3>
              <p>The Chrome extension is required to block websites</p>
            </div>
            <div className="status-badge installed">Installed</div>
          </div>
          <div className="info-box">
            <p>
              <strong>
                Extension automatically activates during scheduled focus
                sessions.
              </strong>
            </p>
            <p>
              No need to manually start or stop - just schedule your sessions
              and the extension handles the rest.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
