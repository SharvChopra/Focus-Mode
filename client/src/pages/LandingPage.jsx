import React from "react";
import HowItWorks from "../components/HowItWorks";
import FeaturesSection from "../components/FeaturesSection";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import "./LandingPage.css";
import Main from "../components/Main";
// import Aurora from "./Aurora";

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <Main />
      <HowItWorks />
      <FeaturesSection />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;
