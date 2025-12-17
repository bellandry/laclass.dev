"use client"

import { Project } from "@/types";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RotatingScrollIndicator } from "../rotating-scroll-indicator";

export const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    // Normalize images to always be an array
    const images = Array.isArray(project.image) ? project.image : [project.image];
    const hasMultipleImages = images.length > 1;

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
            if (e.key === 'Escape') {
                if (isPreviewOpen) {
                    setIsPreviewOpen(false);
                } else {
                    handleClose();
                }
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleEsc);
            ctx.revert();
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isPreviewOpen]);

    // Auto-play carousel
    useEffect(() => {
        if (hasMultipleImages && !isPreviewOpen) {
            autoPlayRef.current = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, 3000);

            return () => {
                if (autoPlayRef.current) {
                    clearInterval(autoPlayRef.current);
                }
            };
        }
    }, [hasMultipleImages, images.length, isPreviewOpen]);

    const handleClose = () => {
        gsap.to(modalRef.current, { opacity: 0, duration: 0.4, onComplete: onClose });
    };

    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return createPortal(
        <div ref={modalRef} className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose}></div>
            
            <div ref={contentRef} className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 overflow-y-auto overflow-x-hidden flex flex-col shadow-2xl scrollbar-hide">
                <button onClick={handleClose} className="absolute top-4 right-4 z-20 text-white/50 hover:text-white p-2 bg-black/50 rounded-full transition-colors">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Image Carousel Section */}
                <div className="w-full h-auto aspect-video relative group">
                    <Image 
                        src={images[currentImageIndex]} 
                        alt={`${project.title} - Image ${currentImageIndex + 1}`} 
                        fill 
                        className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] to-transparent"></div>

                    {/* Navigation Arrows (only show if multiple images) */}
                    {hasMultipleImages && (
                        <>
                            <button 
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button 
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Dots Navigation (only show if multiple images) */}
                    {hasMultipleImages && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToImage(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        index === currentImageIndex 
                                            ? 'bg-cyan-400 w-8' 
                                            : 'bg-white/50 hover:bg-white/80'
                                    }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
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

                    {/* Links Section */}
                    {(project.gitUrl || project.appUrl) && (
                        <div className="mt-8 flex flex-wrap gap-4">
                            {project.gitUrl && (
                                <Link
                                    href={project.gitUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-cyan-400 text-white hover:text-cyan-400 rounded-lg transition-all group"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-medium">View code</span>
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </Link>
                            )}
                            {project.appUrl && (
                                <a 
                                    href={project.appUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/50 hover:border-cyan-400 text-cyan-400 rounded-lg transition-all group"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                    <span className="font-medium">Visit app</span>
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    )}
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