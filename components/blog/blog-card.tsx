import { BlogPost } from "@/types/blog";
import Link from "next/link";

export type BlogCardProps = {
  article: BlogPost;
  index: number;
  filter?: string;
}

export const BlogCard = ({article, index, filter}: BlogCardProps) => {
  return (
    <article className={`article-card ${index === 0 && filter === "All" ? "md:col-span-2 lg:col-span-3" : ""}`}>
      <Link
        className={`group cursor-pointer flex flex-col ${index === 0 && filter === "All" ? "lg:flex-row gap-12" : ""}`}
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
            <time dateTime={article.date}>{article.date}</time>
            <span className="w-8 h-[1px] bg-slate-700"></span>
          </div>
          
          <h2 className={`font-display font-bold text-white mb-4 leading-tight group-hover:text-cyan-400 transition-colors ${index === 0 && filter === "All" ? "text-4xl md:text-5xl" : "text-xl md:text-2xl"}`}>
            {article.title}
          </h2>
          
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
    </article>
  )
}