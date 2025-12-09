"use client"

import Navbar from "@/components/navbar";
import { useState } from "react";

export const PageClient = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  
  const navigateToHome = () => {
    setCurrentRoute('home');
  }

  
  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 selection:bg-cyan-500 selection:text-black">
      <Navbar
        currentRoute={currentRoute} 
        onNavigateHome={navigateToHome}
      />
    </div>
  )
}