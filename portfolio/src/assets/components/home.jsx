import React from "react";
import Particle from "./background/ilustrationspline";
import ThreeJSBackground from "./background/backgroundglow";
import Navbar from "./navbar/navbar";

const Home= ({ children }) => {
  return (
     <div className=" main-page animation abosolute top-0  min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-full min-h-screen ">
        <ThreeJSBackground />
      </div>
      

      {/* Main Content */}
      <div className=" main-content relative z-10 min-h-screen">
        
        <Navbar/>
        {children}
      </div>
    </div>
  );
};
export default Home;
