import React from "react";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Faq from "../components/Faq.jsx";
import Testimonial from "../components/Testimonial.jsx";
import FeaturedProperites from "../components/FeaturedProperites.jsx";
import Cta from "../components/Cta.jsx";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-[#fffbee] to-white">
      <Hero />
      <About />
      <FeaturedProperites />
      <Faq />
      <Cta />
      <Testimonial />
    </div>
  );
};

export default Home;
