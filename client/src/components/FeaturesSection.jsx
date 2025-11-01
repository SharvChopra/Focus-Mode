// FeaturesSection.jsx
import React from "react";
import { motion } from "framer-motion";
import WavyDivider from "./WavyDivider";
import "./FeaturesSection.css";

function FeaturesSection() {
  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <section className="features-section">
        <motion.h2
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        >
          Why Choose Focus Mode?
        </motion.h2>

        <motion.p
          className="subtitle"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        >
          Powerful features designed to maximize your productivity
        </motion.p>

        <motion.div
          className="features-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Feature Item 1 */}
          <motion.div className="feature-item" variants={itemVariants}>
            {/* NEW: Outer div for the gradient icon background */}
            <div className="icon-background">
              <div className="icon">🗓️</div>
            </div>
            <h3>Seamless Google Calendar Integration</h3>
            <p>
              Work with the tools you already use. No need to learn a new
              scheduling app. If it's on your calendar, it's a focus session.
            </p>
          </motion.div>

          {/* Feature Item 2 */}
          <motion.div className="feature-item" variants={itemVariants}>
            <div className="icon-background">
              <div className="icon">⏱️</div>
            </div>
            <h3>Automatic Blocking & Unblocking</h3>
            <p>
              Set it and forget it. The app acts as your digital willpower,
              removing the temptation to get sidetracked without you having to
              do anything.
            </p>
          </motion.div>

          {/* Feature Item 3 */}
          <motion.div className="feature-item" variants={itemVariants}>
            <div className="icon-background">
              <div className="icon">🔗</div>
            </div>
            <h3>Fully Customizable Blocklist</h3>
            <p>
              You are in control. Your distractions are unique. Block social
              media, news sites, shopping—whatever pulls you away from deep
              work.
            </p>
          </motion.div>
        </motion.div>

        <div className="section-divider"></div>
      </section>
    </>
  );
}

export default FeaturesSection;
