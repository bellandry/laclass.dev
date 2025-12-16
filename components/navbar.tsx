"use client"

import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface NavbarProps {
  currentRoute?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentRoute = 'home' }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(".mobile-link", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: "About", href: "#about" },
    { name: "Stack", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Works", href: "#projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-8 mix-blend-difference text-white">
      <div className="flex justify-between items-center w-full max-w-[1920px] mx-auto">
        
        {/* Logo */}
        <Link href="/#" className="text-2xl font-bold font-display tracking-tighter uppercase z-50 group">
          LACLASS<span className="text-cyan-400 group-hover:animate-pulse">.DEV</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 items-center bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
          {currentRoute === 'home' ? (
            links.map((link) => (
              <Link
                key={link.name} 
                href={link.href} 
                className="text-xs font-bold uppercase tracking-[0.2em] hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </Link>
            ))
          ) : (
             <div className="flex gap-8">
                <Link href='/'
                  className="text-xs font-bold uppercase tracking-[0.2em] hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <span className="text-lg"><ArrowLeft /></span> Home
                </Link>
                {currentRoute === 'blog-post' && (
                    <Link
                      href="/blog"
                      className="text-xs font-bold uppercase tracking-[0.2em] hover:text-cyan-400 transition-colors"
                    >
                      All Posts
                    </Link>
                )}
             </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden z-50 w-10 h-10 flex flex-col justify-center items-end gap-1.5 group"
        >
          <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8'}`}></span>
          <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-5 group-hover:w-8'}`}></span>
          <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-8'}`}></span>
        </button>

        {/* Mobile Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center">
             {currentRoute === 'home' ? links.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="mobile-link text-5xl font-display font-bold uppercase mb-8 hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </Link>
             )) : (
                <Link 
                  href="/"
                  className="mobile-link text-5xl font-display font-bold uppercase mb-8 hover:text-cyan-400 transition-colors"
                >
                  Back Home
                </Link>
             )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;