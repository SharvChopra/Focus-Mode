import React from "react";
import "./Footer.css"; // Styling for this component

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col brand-info">
        <div className="footer-logo">
          <a href="https://fontmeme.com/netflix-font/">
            <img
              src="https://fontmeme.com/permalink/251016/bd9e2ad8a6c46b55e29789982262f354.png"
              alt="netflix-font"
              border="0"
              className="footer-logo-img"
            />
          </a>
        </div>
        <p>
          Turn your calendar into your shield against digital distractions.
          Reclaim your focus, one session at a time.
        </p>
      </div>
      <div className="footer-col">
        <h4>Legal</h4>
        <ul>
          <li>
            <a href="/privacy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms">Terms of Service</a>
          </li>
          <li>
            <a href="/cookie">Cookie Policy</a>
          </li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Connect</h4>
        <ul>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a
              href="https://github.com/yourusername/focus-mode"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </li>
          <li>
            <a
              href="https://yourportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
