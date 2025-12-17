"use client"

import { BlogCard } from '@/components/blog/blog-card';
import { BlogPost } from '@/services/blog';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

interface BlogIndexProps {
  allArticles: BlogPost[]
}

const BlogIndex: React.FC <BlogIndexProps> = ({allArticles}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("All");

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
        <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-12">
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
          <span 
            key={article.id}
            className={`${index === 0 && filter === "All" ? "md:col-span-2 lg:col-span-3 lg:flex-row gap-12 border-b border-white/10 pb-12" : ""}`}  
          >
            <BlogCard index={index} filter={filter} article={article} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogIndex;