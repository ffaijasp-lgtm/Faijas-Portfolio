import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../js/data/project';
import defaultFallbackImg from '../../assets/images/ai-video-concept.webp';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWorksStack({ onOpenVideo }) {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);

  // Take the primary featured works for the storytelling stack
  const featured = projects.filter(p => p.featured);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Setup stacking animation only for desktop/larger screens (>=1024px)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray('.editorial-stack-card');

        cards.forEach((card, index) => {
          if (index === cards.length - 1) return; // Don't scale last card

          gsap.to(card, {
            scale: 0.92,
            opacity: 0.45,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 12%",
              endTrigger: cards[index + 1],
              end: "top 18%",
              scrub: true,
            }
          });
        });
      });

      // Section header entrance
      gsap.fromTo('.stack-header-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="w-full px-5 sm:px-8 py-24 md:py-36 border-t border-white/10 bg-[#070707] text-white relative"
      aria-labelledby="selected-works-heading"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between relative gap-12 lg:gap-16">
        
        {/* Sticky Left Column: Title & Metadata */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-28 z-20 pb-8 lg:pb-0 space-y-6">
          <div className="stack-header-reveal flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FFDE00] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>(02 / CURATED WORKS)</span>
          </div>

          <h2
            id="selected-works-heading"
            className="stack-header-reveal text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none font-display"
          >
            SELECTED <br />
            <span className="text-[#FFDE00]">WORKS.</span>
          </h2>

          <p className="stack-header-reveal text-sm text-zinc-400 font-sans leading-relaxed max-w-sm">
            A curated progression of AI-assisted short-form video concepts, social ad campaigns, brand imagery, and technical on-page SEO optimization.
          </p>

          <div className="stack-header-reveal pt-4">
            <Link
              to="/projects"
              data-cursor="all"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FFDE00] hover:text-[#FFE838] border-b border-[#FFDE00]/40 pb-1 font-bold group"
            >
              <span>VIEW FULL CATALOGUE ({projects.length})</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>

        {/* Right Column: Stacked Cards Container */}
        <div
          ref={cardsContainerRef}
          className="w-full lg:w-2/3 flex flex-col relative z-10 space-y-12 lg:space-y-24"
        >
          {featured.map((project, idx) => {
            const num = String(idx + 1).padStart(2, '0');

            return (
              <article
                key={project.id}
                style={{ top: `${80 + idx * 24}px` }}
                className="editorial-stack-card lg:sticky w-full rounded-none overflow-hidden bg-[#0d0d0d] border border-white/10 hover:border-[#FFDE00] transition-colors duration-500 shadow-2xl flex flex-col justify-between group"
              >
                {/* Card Top Metadata Bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="text-[#FFDE00] font-bold">[{num}]</span>
                    <span className="text-white font-bold">{project.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {project.year && <span>{project.year}</span>}
                    {project.projectType && (
                      <span className="hidden sm:inline-block text-zinc-500">&bull; {project.projectType}</span>
                    )}
                  </div>
                </div>

                {/* Card Visual / Video Thumbnail */}
                <div
                  onClick={() => project.youtubeId && onOpenVideo && onOpenVideo(project)}
                  data-cursor={project.youtubeId ? "stream" : "preview"}
                  className={`relative aspect-[16/10] overflow-hidden bg-black border-b border-white/[0.08] ${
                    project.youtubeId ? 'cursor-pointer' : ''
                  }`}
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    onError={(e) => { e.currentTarget.src = defaultFallbackImg; }}
                    loading="lazy"
                    width="1200"
                    height="750"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300" />

                  {/* Play stream badge */}
                  {project.youtubeId && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 border border-[#FFDE00]/60 backdrop-blur-md flex items-center justify-center text-[#FFDE00] group-hover:scale-110 group-hover:bg-[#FFDE00] group-hover:text-black transition-all duration-300 shadow-2xl">
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Floating category tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/80 border border-white/20 text-[#FFDE00] font-display font-black text-[10px] uppercase backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Content & Narrative */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                    <h3
                      onClick={() => project.youtubeId && onOpenVideo && onOpenVideo(project)}
                      className={`text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-[#FFDE00] transition-colors uppercase font-display tracking-tight ${
                        project.youtubeId ? 'cursor-pointer' : ''
                      }`}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tools?.map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 text-[10px] font-mono uppercase bg-zinc-900 text-zinc-300 border border-zinc-800"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {project.youtubeId && (
                      <button
                        type="button"
                        onClick={() => onOpenVideo && onOpenVideo(project)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FFDE00] text-black font-display font-black text-[11px] uppercase tracking-wider hover:bg-[#FFE838] transition-all shadow-lg active:scale-95"
                      >
                        <span>STREAM CASE</span>
                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    )}
                  </div>
                </div>

              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
