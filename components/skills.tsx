import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const topRow = ["React", "Next.js", "Vue.js", "Nuxt.js", "TypeScript", "Node.js", "NestJS"];
const bottomRow = ["AdonisJS", "MongoDB", "Express", "GraphQL", "GSAP", "Three.js", "AWS", "Docker", "Ansible"];

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Infinite Marquee Animation
      const animateRow = (selector: string, direction: 1 | -1) => {
        const row = document.querySelector(selector);
        if(!row) return;
        
        const content = row.innerHTML;
        row.innerHTML = content + content + content + content + content; // Duplicate for smooth loop

         // If direction is -1 (scroll to the right), start from the end
        gsap.set(row, { xPercent: direction === -1 ? -460 : 0 });

        gsap.to(row, {
          xPercent: direction * -50,
          ease: "none",
          duration: direction === -1 ? 60 : 25,
          repeat: -1
        });
        
        // Scrub speed on scroll
        gsap.to(row, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            xPercent: direction * -60, // Accelerate on scroll
        });
      };

      animateRow('.marquee-row-1', 1); // Moves Left
      animateRow('.marquee-row-2', 1); // Moves Left
      // animateRow('.marquee-row-2', -1); // Moves Right

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" ref={containerRef} className="py-32 bg-[#050505] overflow-hidden relative border-y border-white/5">
      <div className="absolute inset-0 bg-linear-to-r from-[#050505] via-transparent to-[#050505] z-10 pointer-events-none" />

      <div className="mb-16 px-6 text-center">
         <p className="text-cyan-400 uppercase tracking-widest text-sm font-bold mb-4">The Arsenal</p>
         <h2 className="text-3xl xs:text-4xl md:text-6xl font-display font-bold text-white">Technologies</h2>
      </div>

      <div className="flex flex-col gap-12 -rotate-2 scale-110">
        {/* Row 1 */}
        <div className="marquee-row-1 flex gap-8 w-max whitespace-nowrap">
          {topRow.map((skill, i) => (
             <span key={i} className="text-4xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-linear-to-b from-slate-700 to-slate-900 stroke-text hover:text-white transition-colors duration-500 cursor-default px-4">
                {skill}
             </span>
          ))}
        </div>

        {/* Row 2 */}
        <div className="marquee-row-2 flex gap-8 w-max whitespace-nowrap">
          {bottomRow.map((skill, i) => (
             <span key={i} className="text-5xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-linear-to-b from-slate-700 to-slate-900 stroke-text hover:text-white transition-colors duration-500 cursor-default px-4">
                {skill}
             </span>
          ))}
        </div>
      </div>
      
      <style>{`
        .stroke-text {
            -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }
        .marquee-row-2 span:hover {
             -webkit-text-stroke: 0px;
        }
      `}</style>
    </section>
  );
};

export default Skills;