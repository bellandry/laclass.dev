"use client"

import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 max-w-7xl mx-auto text-center">
      <h2 className="text-5xl md:text-8xl font-display font-bold mb-8">Let's <span className="text-cyan-400">Connect</span></h2>
      <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
        Have a project in mind? Looking for a Tech Lead who cares about scalability and user experience? Let's build something extraordinary together.
      </p>
      
      <a href="mailto:contact@laclass.dev" className="inline-block relative group">
        <span className="text-2xl md:text-4xl font-bold border-b-2 border-slate-600 pb-2 group-hover:text-cyan-400 group-hover:border-cyan-400 transition-all duration-300">contact@laclass.dev</span>
      </a>

      <div className="flex justify-center gap-8 mt-16">
        {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((social) => (
            <a key={social} href="#" className="text-slate-500 hover:text-white transition-colors uppercase tracking-widest text-sm">
                {social}
            </a>
        ))}
      </div>

      <footer className="mt-32 text-slate-600 text-sm">
        &copy; {new Date().getFullYear()} Laclass.dev. All Rights Reserved.
      </footer>
    </section>
  );
};

export default Contact;