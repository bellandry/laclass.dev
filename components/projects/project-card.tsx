import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onSelectedProject: () => void
}

export const ProjectCard = ({ project, onSelectedProject }: ProjectCardProps) => {
  return (
    <div 
        onClick={() => onSelectedProject()}
        className="w-[85vw] md:w-[60vw] h-[70vh] relative group overflow-hidden border border-white/10 bg-slate-900/50 cursor-pointer"
    >
        {/* Image */}
        <div className="absolute inset-0 overflow-hidden">
            <img 
                src={project.image[0]} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-linear-to-t from-black/90 to-transparent translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex justify-between items-end border-b border-white/20 pb-6 mb-6">
                <div>
                    <span className="text-cyan-400 font-mono text-sm mb-2 block">{project.category} — {project.year}</span>
                    <h3 className="text-4xl md:text-6xl font-display font-bold text-white uppercase">{project.title}</h3>
                </div>
                <div className="hidden md:block">
                    <button className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-cyan-400 group-hover:border-cyan-400 group-hover:text-black transition-all duration-300">
                        <svg className="w-6 h-6 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
            <p className="text-slate-300 max-w-xl text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {project.description}
            </p>
        </div>
    </div>
  )
}