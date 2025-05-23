import React from "react";
import LoadingText from "./Loadingtext";
import { useEffect } from "react";

function LoadingPage() {
    // Add this to your loading page or app initialization
useEffect(() => {
  new Image().src = "https://prod.spline.design/X66OjbKavXxrRMqr/scene.splinecode";
}, []);
  return (
    <div className="w-full  bg-black text-white text-7xl flex justify-center items-center h-screen ">
      <div className=" ">
        {" "}
        <LoadingText />
        
      </div>
    </div>
  );
}

export default LoadingPage;
