import React from "react";
import About from "./About";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GrowthSection from "./GrowthSection";

const AboutsPage = () => {
  return (
    <>
      <div className="bg-sl">
        <Navbar />
        <About />
        <GrowthSection />

        <Footer/>
      </div>
    </>
  );
};

export default AboutsPage;
