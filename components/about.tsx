import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        },
        opacity: 0.2,
        y: 30,
        stagger: 0.1,
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center">
      
      <div className="w-full text-left mb-24">
         <span className="block text-cyan-400 text-sm font-bold tracking-[0.3em] uppercase mb-4">The Narrative</span>
         <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-none">
            Digital <br /> <span className="text-slate-700">Problem Solver</span>
         </h2>
      </div>

      <div className="grid md:grid-cols-12 gap-12 w-full">
         <div className="md:col-span-4 space-y-8">
            <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg hover:border-cyan-500/50 transition-colors duration-300">
                <h3 className="text-4xl font-display font-bold text-cyan-400 mb-2">06+</h3>
                <p className="text-slate-400 text-sm uppercase tracking-wider">Years of Experience</p>
            </div>
             <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg hover:border-cyan-500/50 transition-colors duration-300">
                <h3 className="text-4xl font-display font-bold text-cyan-400 mb-2">Tech Lead</h3>
                <p className="text-slate-400 text-sm uppercase tracking-wider">Leadership Role</p>
            </div>
         </div>

         <div className="md:col-span-8">
            <p className="about-text text-2xl md:text-4xl font-light leading-relaxed text-slate-200">
              I am <span className="text-white font-medium">Landry Bella</span>, also known as <span className="text-cyan-400">Laclass.dev</span>. Based in Cameroon, I build platforms designed for scale, performance, and maintainability.
            </p>
            <p className="about-text text-xl md:text-2xl font-light leading-relaxed text-slate-400 mt-12">
              From building the streaming platform empowering the diaspora at <span className="text-white">CINAF TV</span> to improving knowledge access with <span className="text-white">Quickdo Canada</span>, my journey is driven by one obsession: solving complex problems through technology.
              Leveraging the MERN stack, Next.js, DevOps, and cloud infrastructure, I don&apos;t just code — I orchestrate teams, processes, and systems that scale.
            </p>
         </div>
      </div>

    </section>
  );
};

export default About;