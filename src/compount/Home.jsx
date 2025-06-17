import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import HowReferraWorks from "./HowReferraWorks";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import WhatYouCanShare from "./WhatYouCanShare";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HowReferraWorks />
      <Testimonials />
      <WhatYouCanShare />
      <Footer />
    </>
  );
};

export default Home;
