import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../js/data/product';
import { ArrowUpRight, Sparkles, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjects({ onOpenVideo }) {
  const sectionRef = useRef(null);
  const featured = projects.filter(p => p.featured).slice(0, 4);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.featured-card', 
        { y: 35, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 sm:py-32 border-t border-zinc-800 bg-black relative"
      aria-labelledby="featured-work-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FFDE00] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CURATED ARCHIVE</span>
            </div>
            <h2 id="featured-work-heading" className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter font-display leading-tight">
              SELECTED WORK &amp; CAMPAIGNS
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
              High-impact digital marketing campaigns, AI video productions, and performance optimization projects.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider font-display text-[#FFDE00] hover:text-[#FFE838] transition-colors group self-start md:self-end border-b border-[#FFDE00]/40 pb-1"
          >
            <span>VIEW ALL PROJECTS ({projects.length})</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((project) => (
            <article 
              key={project.id}
              className="featured-card group bg-zinc-950 border border-zinc-800 hover:border-[#FFDE00] transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div 
                  onClick={() => project.youtubeId && onOpenVideo && onOpenVideo(project)}
                  className={`relative aspect-[16/10] overflow-hidden bg-zinc-900 border-b border-zinc-800 ${
                    project.youtubeId ? 'cursor-pointer' : ''
                  }`}
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width="1200"
                    height="800"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[11px] font-black uppercase font-display bg-[#FFDE00] text-black">
                      {project.category}
                    </span>
                  </div>

                  {project.year && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 text-xs font-mono text-white bg-black/80 backdrop-blur-md border border-white/10">
                        {project.year}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <h3 
                    onClick={() => project.youtubeId && onOpenVideo && onOpenVideo(project)}
                    className={`text-xl sm:text-2xl font-black text-white group-hover:text-[#FFDE00] transition-colors font-display uppercase tracking-tight ${
                      project.youtubeId ? 'cursor-pointer' : ''
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm text-zinc-300 leading-relaxed line-clamp-3 font-sans">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 border-t border-zinc-900 mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool, tIdx) => (
                    <span 
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 bg-zinc-900 text-zinc-400 border border-zinc-800 uppercase"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {project.youtubeId ? (
                  <button
                    type="button"
                    onClick={() => onOpenVideo && onOpenVideo(project)}
                    className="px-3.5 py-1.5 bg-[#FFDE00] hover:bg-[#FFE838] text-black font-display font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0 ml-3"
                  >
                    <span>WATCH</span>
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                ) : (
                  <Link
                    to="/projects"
                    className="p-2.5 bg-zinc-900 text-zinc-300 group-hover:bg-[#FFDE00] group-hover:text-black transition-colors shrink-0 ml-4"
                    aria-label={`View details for ${project.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-950 hover:bg-[#FFDE00] text-white hover:text-black font-display font-black text-xs uppercase tracking-wider border border-zinc-800 hover:border-[#FFDE00] transition-all"
          >
            <span>EXPLORE FULL ARCHIVE &bull; FILTER BY DISCIPLINE</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
