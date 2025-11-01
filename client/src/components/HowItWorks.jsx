import React from "react";
import { motion } from "framer-motion"; 
import "./HowItWorks.css";

function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="how-it-works-section">
      <motion.h2
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        How It Works
      </motion.h2>
      <motion.p
        className="subtitle"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }} // Trigger when 80% of the element is in view
      >
        Get started in 3 simple steps
      </motion.p>

      <motion.div
        className="steps-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of the container is visible
      >
        {/* Card 1 */}
        <motion.div className="step-card" variants={cardVariants}>
          <div className="icon blue">🔗</div>
          <h3>Connect Your Calendar</h3>
          <p>
            Sign in securely with your Google account. No new calendars or
            schedules to manage.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div className="step-card" variants={cardVariants}>
          <div className="icon green">⚙️</div>
          <h3>Set Your Blocklist</h3>
          <p>
            Go to your settings and create a personal list of websites that
            distract you the most.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div className="step-card" variants={cardVariants}>
          <div className="icon purple">🛡️</div>
          <h3>Enjoy Uninterrupted Work</h3>
          <p>
            When your scheduled event starts, we automatically block the sites
            for you. When it ends, everything goes back to normal.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HowItWorks;
