import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';

export default function ProjectCard({ project, onOpenVideo }) {
  const [imgError, setImgError] = useState(false);

  const handleClick = (e) => {
    if (project.youtubeId) {
      e.preventDefault();
      onOpenVideo(project);
    }
  };

  return (
    <article className="project-item group bg-zinc-950 border border-zinc-800 hover:border-[#FFDE00] transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <div>
        <div 
          onClick={handleClick}
          className={`relative aspect-[16/10] overflow-hidden bg-zinc-900 border-b border-zinc-800 ${
            project.youtubeId ? 'cursor-pointer' : ''
          }`}
        >
          {!imgError ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              width="1200"
              height="800"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-500 text-xs font-mono">
              [PREVIEW CASE]
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 text-[10px] font-black uppercase font-display bg-[#FFDE00] text-black">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-black text-[#FFDE00] border border-[#FFDE00]/40 font-bold">
                FEATURED
              </span>
            )}
          </div>

          {project.year && (
            <div className="absolute top-4 right-4">
              <span className="px-2 py-0.5 text-[10px] font-mono text-white bg-black/80 backdrop-blur-md border border-white/10">
                {project.year}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-7 space-y-3">
          <div className="space-y-1">
            {project.projectType && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block font-bold">
                {project.projectType}
              </span>
            )}
            <h3 
              onClick={handleClick}
              className={`text-xl font-black text-white group-hover:text-[#FFDE00] transition-colors leading-snug font-display uppercase tracking-tight ${
                project.youtubeId ? 'cursor-pointer' : ''
              }`}
            >
              {project.title}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-7 pt-0 border-t border-zinc-900 mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.tools?.map((tool, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 bg-zinc-900 text-zinc-400 border border-zinc-800 uppercase"
            >
              {tool}
            </span>
          ))}
        </div>

        {project.youtubeId ? (
          <button
            type="button"
            onClick={() => onOpenVideo(project)}
            className="px-3.5 py-1.5 bg-[#FFDE00] hover:bg-[#FFE838] text-black font-display font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0 ml-3"
          >
            <span>WATCH</span>
            <Play className="w-3 h-3 fill-current" />
          </button>
        ) : project.projectUrl ? (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[#FFDE00] text-black hover:bg-[#FFE838] transition-colors shrink-0 ml-3"
            aria-label={`View external project: ${project.title}`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <div className="text-[10px] font-mono text-zinc-500 uppercase shrink-0 ml-3 font-bold">
            CASE STUDY
          </div>
        )}
      </div>
    </article>
  );
}
