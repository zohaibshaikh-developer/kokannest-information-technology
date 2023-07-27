import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import Particle from "./components/Particle";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        {/* Background Particle */}
        <Particle />

        {/* Content */}
        <div className="relative z-10">
          {/* <Navbar /> */}
          {/* Hero with separate container div */}
          <div className="relative z-20">
            <Hero />
          </div>
          {/* <About />
          <Experience />
          <Tech />
          <Works />
          <Feedbacks />
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div> */}
        </div>
      </div>
    </BrowserRouter>
  );
};
export default App;
