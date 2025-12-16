"use client"

import { getAllPosts } from '@/services/blog';
import gsap from 'gsap';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const BlogIndex: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("All");

  const allArticles = getAllPosts();
  const categories = ["All", ...Array.from(new Set(allArticles.map(a => a.tag)))];

  const filteredArticles = filter === "All" 
    ? allArticles 
    : allArticles.filter(a => a.tag === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".article-card", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [filter]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 md:px-12">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-20">
        <span className="text-cyan-400 uppercase tracking-widest text-sm font-bold mb-4 block">The Archives</span>
        <h1 className="text-6xl md:text-9xl font-display font-bold text-white mb-12">
          Insights <span className="text-slate-700">&</span> <br /> Writings
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 border-b border-white/10 pb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 border ${
                filter === cat 
                ? "bg-cyan-500 text-black border-cyan-500" 
                : "bg-transparent text-slate-400 border-white/20 hover:border-white hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {filteredArticles.map((article, index) => (
          <Link
            key={article.id} 
            className={`article-card group cursor-pointer flex flex-col ${index === 0 && filter === "All" ? "md:col-span-2 lg:col-span-3 lg:flex-row gap-12 mb-12 border-b border-white/10 pb-12" : ""}`}
            href={`/blog/${article.id}`}
          >
            {/* Image */}
            <div className={`relative overflow-hidden border border-white/10 rounded-sm mb-6 ${index === 0 && filter === "All" ? "w-full lg:w-2/3 aspect-video" : "aspect-[4/3]"}`}>
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-1 text-xs font-bold uppercase tracking-widest border border-white/10 text-cyan-400">
                {article.tag}
              </div>
            </div>

            {/* Content */}
            <div className={`flex flex-col justify-center ${index === 0 && filter === "All" ? "lg:w-1/3" : ""}`}>
              <div className="flex items-center gap-4 mb-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
                <span>{article.date}</span>
                <span className="w-8 h-[1px] bg-slate-700"></span>
              </div>
              
              <h3 className={`font-display font-bold text-white mb-4 leading-tight group-hover:text-cyan-400 transition-colors ${index === 0 && filter === "All" ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
                {article.title}
              </h3>
              
              <p className="text-slate-400 text-lg leading-relaxed mb-6 font-light line-clamp-3">
                {article.excerpt}
              </p>
              
              <div className="mt-auto">
                 <span className="inline-block text-white uppercase tracking-widest text-xs font-bold border-b border-cyan-500 pb-1 group-hover:border-white transition-colors">
                  Read Article
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogIndex;