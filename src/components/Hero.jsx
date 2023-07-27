import React, {useState,useEffect} from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import EarthCanvas from "./canvas/EarthTop";

const Hero = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");
  
    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);
  
    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
  
    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);
  
    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  
  return (
    <section className="relative w-full h-screen mx-auto">
      {/* <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
 
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915eff]">Zohaib Shaikh</span>
          </h1>
          <p
            className={`${styles.sectionSubText} mt-2 text-white-100 font-medium `}
          >
            I develop web applications <br className="sm:block hidden" /> and
            mobile applications
          </p>
        </div>
      </div> */}
      <EarthCanvas />

      <div className="absolute xs:bottom-0 sm:bottom-[13%] xl:bottom-[11%] bottom-[20%]   w-full flex justify-center items-center flex-col">
        <h1 className={`${isMobile} ? text-[380%] text-white : sm:text-[625%]  text-white`}>
          <span className="Blanka">Kokannest</span>
        </h1>
        <p className={`${isMobile} ?  text-[180%] text-white : sm:text-[260%]  Blinker-ExtraBold text-white font-semibold`}>Information Technology</p>
        <h1 className={`${isMobile} ? absolute text-[230%]  top-[140%] text-white font-medium : absolute sm:text-[360%] lg:top-[102%] sm:top-[110%] top-[100%] text-white`}>
          <span className="JuliusSansOne-Regular">Coming Soon</span>
        </h1>
      </div>
    </section>
  );
};

export default Hero;
