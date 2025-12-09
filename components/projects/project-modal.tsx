"use client"

import { Project } from "@/types";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { RotatingScrollIndicator } from "../rotating-scroll-indicator";

export const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        const ctx = gsap.context(() => {
             gsap.fromTo(modalRef.current, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.5 }
            );
            gsap.fromTo(contentRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 }
            );
        }, modalRef);

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleEsc);
            ctx.revert();
        };
    }, []);

    const handleClose = () => {
        gsap.to(modalRef.current, { opacity: 0, duration: 0.4, onComplete: onClose });
    };

    return createPortal(
        <div ref={modalRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose}></div>
            
            <div ref={contentRef} className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 overflow-y-auto overflow-x-hidden flex flex-col shadow-2xl scrollbar-hide">
                <button onClick={handleClose} className="absolute top-4 right-4 z-20 text-white/50 hover:text-white p-2 bg-black/50 rounded-full transition-colors">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Image Section */}
                <div className="w-full h-auto aspect-video relative">
                    <Image src={project.image} alt={project.title} fill className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="w-full p-6 md:p-12 flex flex-col justify-center">
                  <div className="relative">
                    <span className="text-cyan-400 font-mono text-sm tracking-widest mb-4 uppercase">{project.category} — {project.year}</span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">{project.title}</h2>
                    <RotatingScrollIndicator className="hidden md:block" />               
                  </div>

                    <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">
                        {project.longDescription}
                    </p>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Technologies</h4>
                        <div className="flex flex-wrap gap-3">
                            {project.technologies.map((tech, i) => (
                                <span key={i} className="px-4 py-2 border border-white/20 rounded-full text-slate-400 text-sm hover:border-cyan-400 hover:text-cyan-400 transition-colors">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>,
        document.body
    );
};