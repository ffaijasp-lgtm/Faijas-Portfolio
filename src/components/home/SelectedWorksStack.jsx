import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../js/data/project';
import defaultFallbackImg from '../../assets/images/ai-video-concept.webp';
import { ArrowUpRight, Play, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';
import DecryptedText from '../ui/DecryptedText';
import MagneticButton from '../ui/MagneticButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWorksStack({ onOpenVideo }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  const featured = projects.filter(p => p.featured);
  const totalCards = featured.length;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !trackRef.current) return;

    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Pinned Horizontal Showcase on desktop & tablet
      mm.add("(min-width: 768px)", () => {
        const getScrollDistance = () => track.scrollWidth - window.innerWidth + 120;

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.2,
            start: "top top",
            end: () => `+=${getScrollDistance() * 1.2}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Update progress bar
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${Math.min(100, Math.max(5, self.progress * 100))}%`;
              }
              // Calculate active index
              const calculatedIndex = Math.min(
                totalCards,
                Math.max(1, Math.round(self.progress * (totalCards - 1)) + 1)
              );
              setCurrentIndex(calculatedIndex);
            }
          }
        });
      });

      // Simple horizontal snap scroll on mobile
      mm.add("(max-width: 767px)", () => {
        // Mobile preserves smooth horizontal swipe with native touch
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [totalCards]);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="w-full min-h-screen py-16 md:py-20 bg-[#070707] text-white relative overflow-hidden flex flex-col justify-between"
      aria-labelledby="selected-works-heading"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FFDE00]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* CENTERED SECTION HEADER */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-4 pt-4 md:pt-6 z-20">
        
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-zinc-950 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#FFDE00] font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <DecryptedText text="02 // SELECTED PRODUCTIONS" speed={30} />
        </div>

        {/* Massive Centered Title */}
        <h2
          id="selected-works-heading"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.95] font-display"
        >
          SELECTED <span className="text-[#FFDE00]">WORKS.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-sans max-w-xl mx-auto font-light leading-relaxed">
          Scroll to explore curated AI-assisted short-form concepts, promotional campaigns, and technical digital marketing projects.
        </p>

        {/* Counter and Link */}
        <div className="flex items-center justify-center gap-6 pt-2 text-xs font-mono">
          <span className="text-zinc-500 font-bold">
            PROJECT <span className="text-[#FFDE00]">{String(currentIndex).padStart(2, '0')}</span> / {String(totalCards).padStart(2, '0')}
          </span>
          <span className="text-zinc-700">&bull;</span>
          <Link
            to="/projects"
            data-cursor="all"
            className="text-white hover:text-[#FFDE00] transition-colors border-b border-white/20 hover:border-[#FFDE00] pb-0.5 inline-flex items-center gap-1 font-bold"
          >
            <span>FULL ARCHIVE ({projects.length})</span>
            <ArrowUpRight className="w-3 h-3 stroke-[3]" />
          </Link>
        </div>

      </div>

      {/* FLUID HORIZONTAL SHOWCASE TRACK */}
      <div
        ref={containerRef}
        className="w-full my-auto py-8 relative z-10 overflow-x-auto md:overflow-x-visible no-scrollbar"
      >
        <div
          ref={trackRef}
          className="flex flex-nowrap items-center gap-6 sm:gap-10 px-6 sm:px-16 md:px-24 w-max"
        >
          {featured.map((project, idx) => {
            const num = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={project.id}
                className="w-[86vw] sm:w-[70vw] md:w-[620px] lg:w-[680px] shrink-0"
              >
                <SpotlightCard
                  spotlightColor="rgba(255, 222, 0, 0.18)"
                  borderColor="rgba(255, 222, 0, 0.6)"
                  className="rounded-none border border-white/10 hover:border-[#FFDE00] transition-all duration-500 group shadow-2xl flex flex-col justify-between"
                >
                  {/* Card Header Bar */}
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span className="text-[#FFDE00] font-bold">[{num}]</span>
                      <span className="text-white font-bold">{project.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.year && <span>{project.year}</span>}
                      {project.projectType && (
                        <span className="text-zinc-500 hidden sm:inline">&bull; {project.projectType}</span>
                      )}
                    </div>
                  </div>

                  {/* Visual Preview / Video Thumbnail */}
                  <div
                    onClick={() => project.youtubeId && onOpenVideo && onOpenVideo(project)}
                    data-cursor={project.youtubeId ? "stream" : "preview"}
                    className={`relative aspect-[16/9] overflow-hidden bg-black border-b border-white/[0.08] ${
                      project.youtubeId ? 'cursor-pointer' : ''
                    }`}
                  >
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      onError={(e) => { e.currentTarget.src = defaultFallbackImg; }}
                      loading="lazy"
                      width="1200"
                      height="675"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Centered Play Button */}
                    {project.youtubeId && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/70 border border-[#FFDE00]/70 backdrop-blur-md flex items-center justify-center text-[#FFDE00] group-hover:scale-110 group-hover:bg-[#FFDE00] group-hover:text-black transition-all duration-300 shadow-2xl">
                          <Play className="w-6 h-6 fill-current translate-x-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Category pill */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/80 border border-white/20 text-[#FFDE00] font-display font-black text-[10px] uppercase backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Stream instruction */}
                    <div className="absolute bottom-3 left-4 hidden sm:block">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest bg-black/60 px-2.5 py-1 backdrop-blur-sm border border-white/10">
                        CLICK TO STREAM IN 4K
                      </span>
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <h3
                      onClick={() => project.youtubeId && onOpenVideo && onOpenVideo(project)}
                      className={`text-xl sm:text-2xl font-black text-white group-hover:text-[#FFDE00] transition-colors uppercase font-display tracking-tight ${
                        project.youtubeId ? 'cursor-pointer' : ''
                      }`}
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tools and Action CTA */}
                    <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tools?.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono uppercase bg-zinc-950 text-zinc-300 border border-zinc-800"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {project.youtubeId && (
                        <MagneticButton
                          strength={0.3}
                          onClick={() => onOpenVideo && onOpenVideo(project)}
                          className="px-4 py-2 bg-[#FFDE00] hover:bg-[#FFE838] text-black font-display font-black text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg active:scale-95"
                        >
                          <span>STREAM CASE</span>
                          <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
                        </MagneticButton>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM PROGRESS BAR & CUES */}
      <div className="max-w-4xl mx-auto w-full px-6 sm:px-8 z-20 pb-4">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
          <span>01 / PREVIEW</span>
          <span className="hidden sm:inline">SCROLL TO ADVANCE SHOWCASE &bull; PINNED FLOW</span>
          <span>0{totalCards} / END</span>
        </div>
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-[#FFDE00] transition-all duration-150"
            style={{ width: `${(1 / totalCards) * 100}%` }}
          />
        </div>
      </div>

    </section>
  );
}
