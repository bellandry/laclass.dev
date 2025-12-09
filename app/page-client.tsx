"use client"

import About from "@/components/about";
import CustomCursor from "@/components/custom-cursor";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Projects from "@/components/projects/projects";
import Skills from "@/components/skills";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";

// Register plugin globally
gsap.registerPlugin(ScrollTrigger);

export const PageClient = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('home');

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 selection:bg-cyan-500 selection:text-black">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navbar */}
      <Navbar
        currentRoute={currentRoute} 
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />
        
        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Projects />
      </main>
    </div>
  )
}