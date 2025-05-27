  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { useEffect, useRef } from 'react';
  import ProfileCard from '../../cards/profilecard';
  import SkillsCard from '../../cards/skillscard';

  const TransitionManager = () => {
    const skillsSectionRef = useRef(null);
    const contentWrapperRef = useRef(null);

    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);

      const sectionEl = skillsSectionRef.current;
      const contentEl = contentWrapperRef.current;

      if (!sectionEl || !contentEl) return;

      const contentHeight = contentEl.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollableAmount = Math.max(0, contentHeight - viewportHeight);

      const pinTrigger = ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top top',
        end: `+=${scrollableAmount}`,
        pin: true,
        pinSpacing: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top center',
          end: 'bottom top',
          scrub: 1,
        },
      });

      

      return () => {
        tl.kill();
        pinTrigger.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, []);

    return (
      <>
        {/* This section element will now be the snap target and the pinned element */}
        <section id="skills-section" ref={skillsSectionRef} className="snap-section relative bg-gray-900 ">

          
          
          <div ref={contentWrapperRef} className="p-2 sm:p-7 md:p-8 flex flex-col  justify-center items-center sm:items-start  "  style={{ minHeight: '100vh', width: '100%' }}>
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
  };

  export default TransitionManager;

