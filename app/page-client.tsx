"use client"

import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Projects from "@/components/projects/projects";
import Skills from "@/components/skills";
import { Route } from "@/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";

// Register plugin globally
gsap.registerPlugin(ScrollTrigger);

export const PageClient = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 selection:bg-cyan-500 selection:text-black">
      {/* Navbar */}
      <Navbar
        currentRoute={currentRoute}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Experience Section */}
        <Experience />
        
        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Projects />

        {/* Contact Section */}
        <Contact />
      </main>
    </div>
  )
}