import React from "react";
import "./Header.css";

const Header = ({ user }) => {
  return (
    <header className="header">
      <div className="header-logo">
        <div className="logo-icon"></div>
        <span>Focus Mode</span>
      </div>
      <nav className="header-nav">
        <a href="/settings">Settings</a>
        <div className="user-info">
          <div className="user-avatar">{user.displayName.charAt(0)}</div>
          <span>{user.displayName}</span>
        </div>
        <a href="/api/logout" className="sign-out-link">
          Sign Out
        </a>
      </nav>
    </header>
  );
};

export default Header;
