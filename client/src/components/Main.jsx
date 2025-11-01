// Main.jsx - Updated Code
import React from "react";
import "./Main.css";
import { motion } from "framer-motion";
import WavyDivider from "./WavyDivider";

const Main = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // Start 20px below and invisible
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <div className="aurora-background">
        <div className="aurora-container"></div>

        <div className="content-on-top">
          <header className="landing-header">
            <div className="landing-logo">
              <a href="https://fontmeme.com/netflix-font/">
                <img
                  src="https://fontmeme.com/permalink/251016/bd9e2ad8a6c46b55e29789982262f354.png"
                  alt="netflix-font"
                  border="0"
                  className="logo-img"
                />
              </a>
            </div>
            <nav>
              <a
                href="http://localhost:5000/auth/github"
                className="google-btn"
              >
                <span className="google-icon">G</span> Sign in with Github
              </a>
            </nav>
          </header>

          <motion.section className="hero-section">
            <motion.div
              className="hero-content"
              variants={containerVariants}
              initial="hidden" // Start in the "hidden" state
              whileInView="visible" // Animate to "visible" when it enters the viewport
              viewport={{ once: true }} // Only animate once
            >
              <motion.h1
                variants={itemVariants}
                className="hero-content-title"
                whileHover={{
                  color: "#ffc107",
                  transition: { duration: 0.3 }, // Smooth transition
                }}
                drag // Enable dragging
                dragConstraints={{ left: -20, right: 20, top: -10, bottom: 10 }} // Constrain movement
                dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }} // Make it snappy
                style={{ cursor: "grab" }} // Change cursor to indicate it's draggable
              >
                Turn your Calendar into your focus zone
              </motion.h1>
              <motion.p variants={itemVariants}>
                Focus Mode syncs with your Google Calendar to automatically
                block distracting websites during your scheduled work periods.
              </motion.p>
              <motion.a
                href="http://localhost:5000/auth/github"
                className="google-btn large-btn"
                variants={itemVariants}
              >
                <span className="google-icon">G</span> Get Started with Github
              </motion.a>
              <motion.p variants={itemVariants} className="hero-fine-print">
                Free forever • No credit card required • 2-minute setup
              </motion.p>
            </motion.div>
          </motion.section>
        </div>
      </div>
      <WavyDivider />
    </>
  );
};

export default Main;
