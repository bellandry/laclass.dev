import { projects } from '@/constants';
import { Project } from '@/types';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import { ProjectCard } from './project-card';
import { ProjectModal } from './project-modal';

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalWidth = sectionRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      
      // Horizontal Scroll Animation
      gsap.to(sectionRef.current, {
        x: () => -(totalWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });
      
    }, triggerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="works" className="bg-[#050505] overflow-hidden">
        {/* Header (Static before scroll) */}
        <div className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase leading-tight">
              Selected <br /><span className="text-cyan-400 indent-16 md:indent-24 block">Works</span>
          </h2>
        </div>

        {/* Horizontal Scroll Container */}
        <div ref={triggerRef} className="h-screen w-full relative overflow-hidden flex items-center">
          <div ref={sectionRef} className="flex gap-12 px-6 md:px-24 w-max h-full items-center">
              
            {projects.map((project, index) => (
                <div key={index}>
                  <ProjectCard project={project} onSelectedProject={() => setSelectedProject(project)} />
                </div>
            ))}
            
            {/* End Card */}
            <div className="w-[50vw] md:w-[30vw] h-[70vh] flex flex-col justify-center items-center text-center border-l border-white/10">
                <h3 className="text-4xl font-display font-bold mb-8">More in<br/>Archives</h3>
                <a href="#" className="px-8 py-4 border border-white/30 hover:bg-white hover:text-black transition-all duration-300 rounded-full uppercase tracking-widest text-sm">
                    View All
                </a>
            </div>

          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
};

export default Projects;