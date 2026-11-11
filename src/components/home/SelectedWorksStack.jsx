import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../js/data/project';
import defaultFallbackImg from '../../assets/images/ai-video-concept.webp';
import { ArrowUpRight, Play, Sparkles, Layers } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';
import DecryptedText from '../ui/DecryptedText';
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
            gsap.set(card, { y: 0, opacity: 1, scale: 1, zIndex: 10 });
          } else {
            gsap.set(card, { y: 120, opacity: 0, scale: 0.95, zIndex: 10 + i });
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

        // Chain vertical transitions for each card
        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            const nextCard = cards[i + 1];

            // Current card moves slightly up, fades and scales down
            tl.to(card, {
              y: -80,
              opacity: 0,
              scale: 0.92,
              duration: 1,
              ease: "power2.inOut",
            })
            // Next card ascends smoothly from below into the center
            .to(nextCard, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power2.inOut",
            }, "<+=0.15");
          }
        });
      });

      // Mobile linear flow
      mm.add("(max-width: 767px)", () => {
        cards.forEach((card) => {
          gsap.set(card, { y: 0, opacity: 1, scale: 1 });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [totalCards]);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="w-full min-h-screen py-16 md:py-24 bg-[#070707] text-white relative flex flex-col justify-between overflow-hidden"
      aria-labelledby="selected-works-heading"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FFDE00]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* 1. CENTERED SECTION HEADER */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-3 z-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-zinc-950 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#FFDE00] font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <DecryptedText text="02 // CURATED PRODUCTIONS" speed={30} />
        </div>

        <h2
          id="selected-works-heading"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.95] font-display"
        >
          SELECTED <span className="text-[#FFDE00]">WORKS.</span>
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-sans max-w-xl mx-auto font-light leading-relaxed">
          Screen locked in focus. Scroll vertically to transition through each promotional campaign and generative AI case study in the center.
        </p>

        {/* Dynamic Project Index Counter & Full Archive Link */}
        <div className="flex items-center justify-center gap-6 pt-1 text-xs font-mono">
          <span className="text-zinc-500 font-bold">
            CASE <span className="text-[#FFDE00]">0{activeCardIndex + 1}</span> / 0{totalCards}
          </span>
          <span className="text-zinc-700">&bull;</span>
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
        className="w-full max-w-4xl mx-auto px-5 sm:px-8 my-auto relative z-10 min-h-[520px] sm:min-h-[580px] md:min-h-[620px] flex items-center justify-center"
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
                  spotlightColor="rgba(255, 222, 0, 0.2)"
                  borderColor="rgba(255, 222, 0, 0.6)"
                  className="rounded-none border border-white/10 hover:border-[#FFDE00] transition-colors duration-500 shadow-2xl flex flex-col justify-between w-full bg-[#0d0d0d]"
                >
                  {/* Card Header Status Bar */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] text-[10px] font-mono uppercase tracking-widest text-zinc-400">
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
                    className={`relative aspect-[16/9] w-full overflow-hidden bg-black border-b border-white/[0.08] ${
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

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    {/* Centered Play Button */}
                    {project.youtubeId && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/70 border border-[#FFDE00]/70 backdrop-blur-md flex items-center justify-center text-[#FFDE00] group-hover:scale-110 group-hover:bg-[#FFDE00] group-hover:text-black transition-all duration-300 shadow-2xl">
                          <Play className="w-7 h-7 fill-current translate-x-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Top Floating Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/80 border border-white/20 text-[#FFDE00] font-display font-black text-[10px] uppercase backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Bottom Bitrate Hint */}
                    <div className="absolute bottom-3 left-4 hidden sm:block">
                      <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest bg-black/75 px-3 py-1 backdrop-blur-sm border border-white/10">
                        DIRECT 4K REEL STREAM
                      </span>
                    </div>
                  </div>

                  {/* Card Information & Action Bar */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                      <h3
                        onClick={() => project.youtubeId && onOpenVideo && onOpenVideo(project)}
                        className={`text-xl sm:text-2xl md:text-3xl font-black text-white group-hover:text-[#FFDE00] transition-colors uppercase font-display tracking-tight ${
                          project.youtubeId ? 'cursor-pointer' : ''
                        }`}
                      >
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed font-light">
                      {project.description}
                    </p>

                    <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tools?.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 text-[10px] font-mono uppercase bg-zinc-950 text-zinc-300 border border-zinc-800"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {project.youtubeId && (
                        <MagneticButton
                          strength={0.3}
                          onClick={() => onOpenVideo && onOpenVideo(project)}
                          className="px-5 py-2.5 bg-[#FFDE00] hover:bg-[#FFE838] text-black font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl active:scale-95"
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
      <div className="max-w-4xl mx-auto w-full px-5 sm:px-8 z-20 pt-4">
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
