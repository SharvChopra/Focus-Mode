import React from "react";
import { motion } from "framer-motion";
import "./CallToAction.css";

function CallToAction() {
  // 2. Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Animate each child one after the other
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="cta-section">
      <div className="cta-background-glow"></div>
      <motion.div
        className="cta-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2 variants={itemVariants}>
          Ready to Reclaim Your Focus?
        </motion.h2>
        <motion.p variants={itemVariants} className="cta-subtitle">
          Stop letting distractions win. Start turning your calendar into your
          greatest productivity asset today.
        </motion.p>
        <motion.div variants={itemVariants}>
          <a href="/api/auth/google" className="google-btn large-btn">
            <span className="google-icon">G</span> Get Started for Free
          </a>
        </motion.div>
        <motion.p variants={itemVariants} className="cta-fine-print">
          Free forever • Set up in under 2 minutes • No spam, ever
        </motion.p>
      </motion.div>
    </section>
  );
}

export default CallToAction;
