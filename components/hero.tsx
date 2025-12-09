import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Cinematic Intro
      tl.to('.hero-line', {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
      })
      .from('.hero-sub', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out"
      }, "-=1")
      .from('.scroll-indicator', {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.5");

      // Parallax text on scroll
      gsap.to(titleWrapperRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        },
        y: 200,
        opacity: 0.5
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-[#050505]">
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#050505]"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Main Content */}
      <div ref={titleWrapperRef} className="z-10 text-center flex flex-col items-center justify-center px-4 w-full">
        
        {/* Line 1 */}
        <div className="overflow-hidden">
          <h1 className="hero-line transform translate-y-[100%] opacity-0 text-[10vw] leading-[0.85] font-bold font-display uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 mix-blend-difference">
            Landry
          </h1>
        </div>

        {/* Line 2 with Accent */}
        <div className="overflow-hidden flex items-center justify-center gap-4 md:gap-8">
            <div className="hero-line w-[8vw] h-[1vh] bg-cyan-400 transform translate-y-[100%] opacity-0 hidden md:block"></div>
            <h1 className="hero-line transform translate-y-[100%] opacity-0 text-[10vw] leading-[0.85] font-bold font-display uppercase tracking-tighter text-white">
                Bella
            </h1>
            <div className="hero-line w-[8vw] h-[1vh] bg-cyan-400 transform translate-y-[100%] opacity-0 hidden md:block"></div>
        </div>
        
        <p className="hero-sub mt-12 text-slate-400 text-lg md:text-xl font-light tracking-[0.2em] uppercase max-w-xl mx-auto">
          Senior Software Engineer • Based in <span className="text-cyan-400 font-semibold">Cameroon</span>
        </p>

      </div>

      {/* Rotating Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-12 right-8 md:right-12 z-20">
         <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text fill="white" fontSize="12" fontWeight="bold" letterSpacing="2">
                    <textPath href="#circlePath" startOffset="0%">SCROLL • TO • EXPLORE •</textPath>
                </text>
            </svg>
            <div className="absolute w-2 h-2 bg-cyan-400 rounded-full"></div>
         </div>
      </div>
    </section>
  );
};

export default Hero;