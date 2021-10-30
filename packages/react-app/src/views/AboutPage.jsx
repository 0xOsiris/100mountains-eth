import React, { useEffect } from "react";

import About from "../partials/About";
import CustomCard from "../partials/Card";
import Footer from "../partials/Footer";
import Skills from "../partials/Skills";
import data from "../assets/data";
import AOS from "aos";
import "aos/dist/aos.css";
import StackGrid from "react-stack-grid";
import '../assets/main.css';
import { useMediaQuery } from "react-responsive";
const BigDesktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1501 })
  return isDesktop ? children : null
}
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992, maxWidth: 1500 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

export default function AboutUsPage() {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  });
  return (
    <div>
    <BigDesktop>
      
        <div className="min-h-screen py-10 px-3 sm:px-5 bg-white-100">
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
            <About title={"BigDesktop"} description={data[3].about.description} />
            <Skills skills={data[3].skills} />
            <Footer github={data[3].social.github} />
          </div>
        
          <div>
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
            <About title={data[2].about.title} description="" />
            
          </div>
            <StackGrid
                          columnWidth='33%'
                          marginTop={20}
                      >
            
            <div data-aos="fade-down" data-aos-duration="800">
              <CustomCard name={data[1].name} title={data[1].title} social={data[1].social} />
            </div>
            

            <div data-aos="fade-down" data-aos-duration="800">
              <CustomCard name={data[2].name} title={data[2].title} social={data[2].social} />
            </div>
          

            <div data-aos="fade-down" data-aos-duration="800">
              <CustomCard name={data[3].name} title={data[3].title} social={data[3].social} />
            </div>
            
            </StackGrid>
            </div>
          
          </div>
        
      </BigDesktop>

      <Desktop>
    
        <div className="min-h-screen py-10 px-3 sm:px-5 bg-white-100">
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
            <About title={"Desktop"}  description={data[3].about.description} />
            <Skills skills={data[3].skills} />
            <Footer github={data[3].social.github} />
          </div>
        
          <div>
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
            <About title={data[2].about.title} description="" />
            
          </div>
            <StackGrid
                          columnWidth='33%'
                          marginTop={20}
                      >
            
            <div data-aos="fade-down" data-aos-duration="800">
              <CustomCard name={data[1].name} title={data[1].title} social={data[1].social} />
            </div>
            

            <div data-aos="fade-down" data-aos-duration="800">
              <CustomCard name={data[2].name} title={data[2].title} social={data[2].social} />
            </div>
          

            <div data-aos="fade-down" data-aos-duration="800">
              <CustomCard name={data[3].name} title={data[3].title} social={data[3].social} />
            </div>
            
            </StackGrid>
            </div>
          
          </div>
        
      </Desktop>
      <Tablet>
    
        <div className="min-h-screen py-10 px-3 sm:px-5 bg-white-100">
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
            <About title={"Tablet"}  description={data[3].about.description} />
            <Skills skills={data[3].skills} />
            <Footer github={data[3].social.github} />
          </div>
        
          <div>
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
            <About title={data[2].about.title} description="" />
            
          </div>
            <StackGrid
                          columnWidth='33%'
                          marginTop={20}
                      >
            
            <div data-aos="fade-down" data-aos-duration="800">
              <CustomCard name={data[1].name} title={data[1].title} social={data[1].social} />
            </div>
            

            <div data-aos="fade-down" data-aos-duration="800">
              <CustomCard name={data[2].name} title={data[2].title} social={data[2].social} />
            </div>
          

            <div data-aos="fade-down" data-aos-duration="800">
              <CustomCard name={data[3].name} title={data[3].title} social={data[3].social} />
            </div>
            
            </StackGrid>
            </div>
          
          </div>
        
      </Tablet>
      <Mobile>
    
        <div className="min-h-screen py-10 px-3 sm:px-5 bg-white-100">
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
            <About title={"Mobile"}  description={data[3].about.description} />
            <Skills skills={data[3].skills} />
            <Footer github={data[3].social.github} />
          </div>
        
          <div>
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
            <About title={data[2].about.title} description="" />
            
          </div>
            <StackGrid
                          columnWidth='33%'
                          marginTop={20}
                      >
            
            <div data-aos="fade-down" data-aos-duration="800">
              <CustomCard name={data[1].name} title={data[1].title} social={data[1].social} />
            </div>
            

            <div data-aos="fade-down" data-aos-duration="800">
              <CustomCard name={data[2].name} title={data[2].title} social={data[2].social} />
            </div>
          

            <div data-aos="fade-down" data-aos-duration="800">
              <CustomCard name={data[3].name} title={data[3].title} social={data[3].social} />
            </div>
            
            </StackGrid>
            </div>
          
          </div>
        
      </Mobile>
      </div>
  );
}
