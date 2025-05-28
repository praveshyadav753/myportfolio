import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef,forwardRef } from "react";
import ProfileCard from "../../cards/profilecard";
import SkillsCard from "../../cards/skillscard";

const TransitionManager = forwardRef((props, ref) => {

  const contentWrapperRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const innerContent = contentWrapperRef.current;
    const section = ref.current;

    if (!innerContent || !section) {
      console.warn("Refs not available, skipping ScrollTrigger setup.");
      return;
    }

    const innerContentTotalHeight = innerContent.scrollHeight;

    const sectionVisibleHeight = section.clientHeight; 

    
    const animationTravelDistance = innerContentTotalHeight - sectionVisibleHeight+ 48;
    
    if (animationTravelDistance <= 0) {
      console.log("Content fits within the section, no scrolling animation needed.");
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top", 
        end: `+=${animationTravelDistance}`, 
        pin: true,
        markers: false, 
        scrub: 1,
        
        onRefresh: () => {
         
        },
      },
    });


    tl.to(innerContent, {
      y: -animationTravelDistance, 
      ease: "none", 
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf(innerContent);
    };
  }, []);


  return (
    <>
      {/* This section element will now be the snap target and the pinned element */}
      <section
        id="skills-section"
        ref={ref}
        className=" section2 p-4 relative h-[100vh] bg-gray-900 overflow-hidden"
      > 
        <div
          ref={contentWrapperRef}
          className="relative p-2 mt-12 sm:p-7 md:p-8 flex flex-col justify-center items-center sm:ml-3  sm:items-start  "
          // style={{ minHeight: "100vh", width: "100%" }}
        >
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>
          <ProfileCard />
          <SkillsCard />

        </div>
      </section>
    </>
  );
});

export default TransitionManager;
