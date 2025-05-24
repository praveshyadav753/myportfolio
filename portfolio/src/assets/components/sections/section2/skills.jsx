  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { useEffect, useRef } from 'react';
  import ProfileCard from '../../cards/profilecard';
  import SkillsCard from '../../cards/skilsscard';

  const TransitionManager = () => {
    const characterRef = useRef(null);
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

      tl.to(characterRef.current, {
        x: window.innerWidth * 0.4,
        y: 100,
        scale: 0.7,
        duration: 1,
      });

      return () => {
        tl.kill();
        pinTrigger.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, []);

    return (
      <>
        <div ref={characterRef} className="fixed z-50"></div>

        {/* This section element will now be the snap target and the pinned element */}
        <section id="skills-section" ref={skillsSectionRef} className="snap-section ">
          <div ref={contentWrapperRef} className="p-2 sm:p-7 md:p-8 flex flex-col  justify-center items-center sm:items-start" style={{ minHeight: '100vh', width: '100%' }}>
            <ProfileCard />
            <SkillsCard />
            
          </div>
        </section>
      </>
    );
  };

  export default TransitionManager;