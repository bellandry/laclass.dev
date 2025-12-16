"use client"

import { BlogPost, getPost, getRelatedPosts } from '@/services/blog';
import gsap from 'gsap';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { parseMarkdown } from './components/markdown-parser';

interface BlogPageProps {
  postId: string | null;
}

const BlogPage: React.FC<BlogPageProps & { onNavigateToPost?: (id: string) => void }> = ({ postId, onNavigateToPost }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to top when post changes
    window.scrollTo(0, 0);

    if (postId) {
        const data = getPost(postId);
        setPost(data);
        if (data) {
             setRelatedPosts(getRelatedPosts(postId));
        }
    }
  }, [postId]);

  useEffect(() => {
    if (!post) return;
    
    // Refresh Prism
    if ((window as any).Prism) {
        setTimeout(() => (window as any).Prism.highlightAll(), 100);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' } 
    );

    const headers = document.querySelectorAll('h2, h3');
    headers.forEach((h) => observer.observe(h));

    gsap.fromTo(".blog-hero-text", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });

    return () => observer.disconnect();
  }, [post]);

  if (!post) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Loading...</div>;

  const { elements, toc } = parseMarkdown(post.content);

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
          <div className="flex gap-4 mb-6">
               <span className="px-3 py-1 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest rounded-full">{post.tag}</span>
               <span className="px-3 py-1 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest rounded-full">Read Article</span>
          </div>
          <h1 className="blog-hero-text text-5xl md:text-8xl font-display font-bold text-white leading-[0.9] mb-8 max-w-5xl">
              {post.title}
          </h1>
          <div className="flex items-center gap-4 border-t border-white/10 pt-8 mt-8">
              <div className="w-12 h-12 bg-slate-800 rounded-full overflow-hidden">
                 <div className="w-full h-full bg-cyan-900 flex items-center justify-center text-cyan-400 font-bold">LB</div>
              </div>
              <div>
                  <div className="text-white font-bold uppercase tracking-widest text-sm">Landry Bella</div>
                  <div className="text-slate-500 text-xs uppercase tracking-widest">{post.date}</div>
              </div>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12">
          
          {/* Sidebar (TOC) */}
          <aside className="hidden md:block md:col-span-3">
             <div className="sticky top-40">
                 <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-2">Contents</h4>
                 <ul className="space-y-4 border-l border-white/10">
                     {toc.map((section) => (
                         <li key={section.id} className={`pl-4 transition-all duration-300 ${section.level === 3 ? 'ml-4' : ''}`}>
                             <a 
                                href={`#${section.id}`}
                                className={`text-sm hover:text-cyan-400 transition-colors block ${activeSection === section.id ? 'text-cyan-400 font-bold translate-x-2' : 'text-slate-500'}`}
                             >
                                 {section.title}
                             </a>
                         </li>
                     ))}
                 </ul>

                 <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-xs text-slate-400 mb-4">Have questions?</p>
                    <a href="#contact" className="text-cyan-400 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">Contact Me →</a>
                 </div>
             </div>
          </aside>

          {/* Main Content */}
          <article ref={contentRef} className="md:col-span-8 md:col-start-5">
             {elements}
             
             {/* Article Footer */}
             <div className="mt-24 pt-12 border-t border-white/10">
                 <h3 className="text-2xl font-display font-bold text-white mb-8">Share this article</h3>
                 <div className="flex gap-4">
                     {['Twitter', 'LinkedIn', 'Facebook'].map(social => (
                         <button key={social} className="px-6 py-3 border border-white/20 rounded-full text-slate-400 hover:bg-white hover:text-black hover:border-white transition-all text-sm uppercase tracking-widest">
                             {social}
                         </button>
                     ))}
                 </div>
             </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <div className="mt-24">
                     <h3 className="text-4xl font-display font-bold text-white mb-12">Read <span className="text-cyan-400">Next</span></h3>
                     <div className="grid md:grid-cols-2 gap-8">
                        {relatedPosts.map(related => (
                            <Link 
                                key={related.id} 
                                href={`/blog/${related.id}`}
                                className="group cursor-pointer bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors p-6 rounded-lg"
                            >
                                <div className="mb-4 overflow-hidden h-48 rounded-sm">
                                    <img src={related.image} alt={related.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 block">{related.tag}</span>
                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{related.title}</h4>
                                <p className="text-slate-400 text-sm line-clamp-2">{related.excerpt}</p>
                            </Link>
                        ))}
                     </div>
                </div>
            )}
          </article>

      </div>
    </div>
  );
};

export default BlogPage;