import React, { useEffect } from "react";

import About from "../partials/About";
import CustomCard from "../partials/Card";
import Footer from "../partials/Footer";
import Skills from "../partials/Skills";
import data from "../assets/data";
import AOS from "aos";
import "aos/dist/aos.css";
import '../assets/main.css';
export default function AboutUsPage() {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  });
  return (
    <div className="min-h-screen py-10 px-3 sm:px-5 bg-gray-100">
      
      <div data-aos="fade-down" data-aos-duration="800">
        <CustomCard name={data[1].name} title={data[1].title} social={data[1].social} />
      </div>
      

      <div data-aos="fade-down" data-aos-duration="800">
        <CustomCard name={data[2].name} title={data[2].title} social={data[2].social} />
      </div>
     

      <div data-aos="fade-down" data-aos-duration="800">
        <CustomCard name={data[3].name} title={data[3].title} social={data[3].social} />
      </div>
      <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
        <About title={data[3].about.title} description={data[3].about.description} />
        <Skills skills={data[3].skills} />
        <Footer github={data[3].social.github} />
      </div>
      
    </div>
  );
}
