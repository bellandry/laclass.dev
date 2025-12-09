"use client"

import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const outline = cursorOutlineRef.current;

    if (!dot || !outline) return;

    // Center the cursor initially to avoid jump
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(outline, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Immediate movement for the dot
      gsap.to(dot, {
        x: clientX,
        y: clientY,
        duration: 0,
      });

      // Smooth lag for the outline
      gsap.to(outline, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Add hover effects for links and buttons
    const handleMouseEnter = () => {
      gsap.to(outline, {
        scale: 1.5,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0)",
        duration: 0.2
      });
    };

    const handleMouseLeave = () => {
      gsap.to(outline, {
        scale: 1,
        backgroundColor: "transparent",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        duration: 0.2
      });
    };

    // Attach listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup observer (simplified for this demo, ideally use MutationObserver)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            const newElements = document.querySelectorAll('a, button, input, textarea');
            newElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });


    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot fixed top-0 left-0 pointer-events-none z-[9999]" />
      <div ref={cursorOutlineRef} className="cursor-outline fixed top-0 left-0 pointer-events-none z-[9999]" />
    </>
  );
};

export default CustomCursor;