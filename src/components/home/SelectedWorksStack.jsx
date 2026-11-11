import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../js/data/project';
import defaultFallbackImg from '../../assets/images/ai-video-concept.webp';
import { ArrowUpRight, Play } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';
import MagneticButton from '../ui/MagneticButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWorksStack({ onOpenVideo }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const progressBarRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const featured = projects.filter(p => p.featured);
  const totalCards = featured.length;

  const getProjectImage = (project) => {
    if (project.thumbnail && typeof project.thumbnail === 'string' && !project.thumbnail.includes('Woman_character')) {
      return project.thumbnail;
    }
    if (typeof project.thumbnail === 'object' && project.thumbnail) {
      return project.thumbnail;
    }
    if (project.youtubeId) {
      return `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`;
    }
    return defaultFallbackImg;
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Pinned Vertical Progression on desktop & tablet
      mm.add("(min-width: 768px)", () => {
        // Initial setup: Card 0 visible in center, subsequent cards positioned below
        cards.forEach((card, i) => {
          if (i === 0) {
            gsap.set(card, { y: 0, opacity: 1, scale: 1, zIndex: 10, pointerEvents: 'auto' });
          } else {
            gsap.set(card, { y: 100, opacity: 0, scale: 0.95, zIndex: 10 + i, pointerEvents: 'none' });
          }
        });

        // Master Timeline pinned to viewport center
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${cards.length * 900}`,
            scrub: 1.2,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Update progress bar
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${Math.min(100, Math.max(8, self.progress * 100))}%`;
              }
              // Update active index
              const step = Math.min(
                cards.length - 1,
                Math.floor(self.progress * cards.length)
              );
              setActiveCardIndex(step);
            }
          }
        });

        // Chain vertical transitions for each card with hold pauses
        cards.forEach((card, i) => {
          // Hold phase for viewing the current project
          tl.to({}, { duration: 0.6 });

          if (i < cards.length - 1) {
            const nextCard = cards[i + 1];

            // Current card moves slightly up, fades and scales down
            tl.to(card, {
              y: -80,
              opacity: 0,
              scale: 0.92,
              duration: 0.8,
              ease: "power2.inOut",
              pointerEvents: 'none'
            })
            // Next card ascends smoothly from below into the center
            .to(nextCard, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.inOut",
              pointerEvents: 'auto'
            }, "<+=0.1");
          }
        });

        // Final hold for the last card so it stays centered before unpinning
        tl.to({}, { duration: 0.6 });
      });

      // Mobile linear flow
      mm.add("(max-width: 767px)", () => {
        cards.forEach((card) => {
          gsap.set(card, { y: 0, opacity: 1, scale: 1, pointerEvents: 'auto' });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [totalCards]);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="w-full min-h-screen md:h-screen md:max-h-screen pt-20 pb-4 md:pt-20 md:pb-5 bg-[#070707] text-white relative flex flex-col justify-between overflow-hidden"
      aria-labelledby="selected-works-heading"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FFDE00]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* 1. COMPACT TOP STATUS / ARCHIVE BAR */}
      <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 text-center z-20 shrink-0">
        <h2 id="selected-works-heading" className="sr-only">Selected Works</h2>
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs font-mono uppercase tracking-widest">
          <span className="text-zinc-400">
            CASE <span className="text-[#FFDE00] font-bold">0{activeCardIndex + 1}</span> / 0{totalCards}
          </span>
          <span className="text-zinc-600">&bull;</span>
          <Link
            to="/projects"
            data-cursor="all"
            className="text-white hover:text-[#FFDE00] transition-colors border-b border-white/20 hover:border-[#FFDE00] pb-0.5 inline-flex items-center gap-1 font-bold"
          >
            <span>VIEW ALL PROJECTS ({projects.length})</span>
            <ArrowUpRight className="w-3 h-3 stroke-[3]" />
          </Link>
        </div>
      </div>

      {/* 2. CENTERED VERTICAL PROJECT STAGE */}
      <div
        ref={stageRef}
        className="w-full max-w-4xl mx-auto px-4 sm:px-8 my-auto relative z-10 flex items-center justify-center"
      >
        <div className="relative w-full">
          {featured.map((project, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            const imgSrc = getProjectImage(project);

            return (
              <div
                key={project.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`w-full ${
                  idx === 0 ? 'relative' : 'md:absolute md:top-0 md:left-0 md:right-0 mt-8 md:mt-0'
                }`}
              >
                <SpotlightCard
                  spotlightColor="rgba(255, 222, 0, 0.15)"
                  borderColor="rgba(255, 222, 0, 0.6)"
                  className="rounded-none border border-white/10 hover:border-[#FFDE00] transition-colors duration-500 shadow-2xl flex flex-col justify-between w-full bg-[#0d0d0d]"
                >
                  {/* Card Header Status Bar */}
                  <div className="flex items-center justify-between px-5 py-2.5 sm:py-3 border-b border-white/[0.08] text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span className="text-[#FFDE00] font-bold">[{num}]</span>
                      <span className="text-white font-bold">{project.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {project.year && <span>{project.year}</span>}
                      {project.projectType && (
                        <span className="text-zinc-500 hidden sm:inline">&bull; {project.projectType}</span>
                      )}
                    </div>
                  </div>

                  {/* High-Resolution Visual / Video Showcase Frame */}
                  <div
                    onClick={() => project.youtubeId && onOpenVideo && onOpenVideo(project)}
                    data-cursor={project.youtubeId ? "stream" : "case"}
                    className={`relative aspect-[16/9] max-h-[35vh] sm:max-h-[38vh] md:max-h-[40vh] w-full overflow-hidden bg-black border-b border-white/[0.08] group ${
                      project.youtubeId ? 'cursor-pointer' : ''
                    }`}
                  >
                    <img
                      src={imgSrc}
                      alt={project.title}
                      onError={(e) => {
                        e.currentTarget.src = project.youtubeId 
                          ? `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`
                          : defaultFallbackImg;
                      }}
                      loading="lazy"
                      width="1200"
                      height="675"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                    {/* Centered Play Button */}
                    {project.youtubeId && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-black/70 border border-[#FFDE00]/70 backdrop-blur-md flex items-center justify-center text-[#FFDE00] group-hover:scale-110 group-hover:bg-[#FFDE00] group-hover:text-black transition-all duration-300 shadow-2xl">
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Top Floating Badge */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-black/80 border border-white/20 text-[#FFDE00] font-display font-black text-[9px] sm:text-[10px] uppercase tracking-wider backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Bottom Bitrate Hint */}
                    <div className="absolute bottom-2.5 left-3 sm:bottom-3 sm:left-4">
                      <span className="text-[9px] sm:text-[10px] font-mono text-zinc-300 uppercase tracking-widest bg-black/75 px-2.5 py-0.5 sm:px-3 sm:py-1 backdrop-blur-sm border border-white/10">
                        DIRECT 4K REEL STREAM
                      </span>
                    </div>
                  </div>

                  {/* Card Information & Action Bar */}
                  <div className="p-4 sm:p-5 md:p-6 space-y-2.5 sm:space-y-3">
                    <h3
                      onClick={() => project.youtubeId && onOpenVideo && onOpenVideo(project)}
                      className={`text-base sm:text-lg md:text-xl lg:text-2xl font-black text-white hover:text-[#FFDE00] transition-colors uppercase font-display tracking-tight leading-snug line-clamp-2 ${
                        project.youtubeId ? 'cursor-pointer' : ''
                      }`}
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed font-light line-clamp-2">
                      {project.description}
                    </p>

                    <div className="pt-3 sm:pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tools?.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-mono uppercase bg-zinc-950 text-zinc-300 border border-zinc-800"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {project.youtubeId && (
                        <MagneticButton
                          strength={0.3}
                          onClick={() => onOpenVideo && onOpenVideo(project)}
                          className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#FFDE00] hover:bg-[#FFE838] text-black font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl active:scale-95"
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

      {/* 3. CENTERED PROGRESS BAR & CUES */}
      <div className="max-w-4xl mx-auto w-full px-5 sm:px-8 z-20 pb-2 shrink-0">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
          <span>01 / CASE 01</span>
          <span className="hidden sm:inline">SCROLL VERTICALLY &bull; LOCKED STAGE VIEW</span>
          <span>0{totalCards} / CASE 0{totalCards}</span>
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
