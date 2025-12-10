import { jobs } from '@/constants';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
    
      const items = gsap.utils.toArray('.experience-item');
      
      items.forEach((item: any) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
          },
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={containerRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-20">
        <span className="text-cyan-400 uppercase tracking-widest text-sm font-bold mb-4 block">The Journey</span>
        <h2 className="text-4xl md:text-7xl font-display font-bold text-white">Experience</h2>
      </div>

      <div className="relative border-l border-white/10 ml-4 md:ml-12 space-y-16">
        {jobs.map((job, index) => (
          <div key={index} className="experience-item relative pl-8 md:pl-16 group">
            {/* Dot */}
            <div className="absolute left-[-5px] top-3 w-2.5 h-2.5 bg-cyan-500 rounded-full group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
            
            <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-4">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white group-hover:text-cyan-400 transition-colors">
                {job.company}
              </h3>
              <span className="text-slate-400 font-mono text-sm border border-slate-700 rounded-full px-3 py-1">
                {job.period}
              </span>
            </div>
            
            <h4 className="text-xl text-slate-200 font-light mb-6">{job.role}</h4>
            
            <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mb-6">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {job.tags.map(tag => (
                <span key={tag} className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-cyan-300 transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;