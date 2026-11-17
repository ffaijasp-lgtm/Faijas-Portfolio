import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../js/data/project';
import defaultFallbackImg from '../../assets/images/ai-video-concept.webp';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';
import MagneticButton from '../ui/MagneticButton';
import DecryptedText from '../ui/DecryptedText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWorksStack({ onOpenVideo }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const progressBarRef = useRef(null);
  const triggerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const activeIndexRef = useRef(0);
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

  // Direct card transition controller
  const goToCard = useCallback((targetIndex, direction = 1, syncScroll = true) => {
    if (targetIndex < 0 || targetIndex >= totalCards) return;
    if (isAnimatingRef.current && targetIndex === activeIndexRef.current) return;

    isAnimatingRef.current = true;
    const prevIndex = activeIndexRef.current;
    activeIndexRef.current = targetIndex;
    setActiveCardIndex(targetIndex);

    const prevCard = cardRefs.current[prevIndex];
    const targetCard = cardRefs.current[targetIndex];

    // Animate previous card exit
    if (prevCard && prevIndex !== targetIndex) {
      gsap.to(prevCard, {
        y: direction > 0 ? -60 : 60,
        opacity: 0,
        scale: 0.94,
        duration: 0.45,
        ease: "power2.inOut",
        pointerEvents: "none"
      });
    }

    // Animate target card entrance
    if (targetCard) {
      gsap.fromTo(targetCard,
        {
          y: direction > 0 ? 60 : -60,
          opacity: 0,
          scale: 0.94,
          zIndex: 20
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "power2.inOut",
          pointerEvents: "auto",
          onComplete: () => {
            setTimeout(() => {
              isAnimatingRef.current = false;
            }, 80);
          }
        }
      );
    } else {
      isAnimatingRef.current = false;
    }

    // Update bottom progress line
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${((targetIndex + 1) / totalCards) * 100}%`,
        duration: 0.35,
        ease: "power2.out"
      });
    }

    // Sync window scroll offset with the pinned timeline
    if (syncScroll && triggerRef.current && totalCards > 1) {
      const scrollDistance = (totalCards - 1) * 400;
      const targetScroll = triggerRef.current.start + (targetIndex / (totalCards - 1)) * scrollDistance;
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth"
      });
    }
  }, [totalCards]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    // Initial setup: Card 0 visible, remaining cards hidden below
    cards.forEach((card, i) => {
      if (i === 0) {
        gsap.set(card, { y: 0, opacity: 1, scale: 1, zIndex: 10, pointerEvents: 'auto' });
      } else {
        gsap.set(card, { y: 60, opacity: 0, scale: 0.94, zIndex: 10 + i, pointerEvents: 'none' });
      }
    });

    const scrollDistance = (totalCards - 1) * 400;

    // Create ScrollTrigger pin for the section
    const st = ScrollTrigger.create({
      trigger: section,
      pin: true,
      start: "top top",
      end: () => `+=${scrollDistance}`,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Smoothly synchronize if user scrolls via scrollbar
        if (!isAnimatingRef.current && totalCards > 1) {
          const step = Math.min(
            totalCards - 1,
            Math.round(self.progress * (totalCards - 1))
          );
          if (step !== activeIndexRef.current) {
            goToCard(step, step > activeIndexRef.current ? 1 : -1, false);
          }
        }
      }
    });
    triggerRef.current = st;

    // Wheel listener: ONE SCROLL = ONE PROJECT CHANGE
    const handleWheel = (e) => {
      if (!st || !st.isActive) return;

      const isDown = e.deltaY > 0;
      const isUp = e.deltaY < 0;

      // Intercept scroll down if not on last card
      if (isDown && activeIndexRef.current < totalCards - 1) {
        e.preventDefault();
        if (!isAnimatingRef.current && Math.abs(e.deltaY) > 10) {
          goToCard(activeIndexRef.current + 1, 1, true);
        }
      } 
      // Intercept scroll up if not on first card
      else if (isUp && activeIndexRef.current > 0) {
        e.preventDefault();
        if (!isAnimatingRef.current && Math.abs(e.deltaY) > 10) {
          goToCard(activeIndexRef.current - 1, -1, true);
        }
      }
      // On boundary cards (last card scrolling down, or first card scrolling up),
      // natural scroll passes through freely to the next/prev section.
    };

    // Touch swipe listener for mobile/tablet
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      if (!st || !st.isActive) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) < 35) return;

      if (diff > 0 && activeIndexRef.current < totalCards - 1) {
        goToCard(activeIndexRef.current + 1, 1, true);
      } else if (diff < 0 && activeIndexRef.current > 0) {
        goToCard(activeIndexRef.current - 1, -1, true);
      }
    };

    // Keyboard navigation (Arrow keys)
    const handleKeyDown = (e) => {
      if (!st || !st.isActive) return;
      if (e.key === "ArrowDown" && activeIndexRef.current < totalCards - 1) {
        e.preventDefault();
        goToCard(activeIndexRef.current + 1, 1, true);
      } else if (e.key === "ArrowUp" && activeIndexRef.current > 0) {
        e.preventDefault();
        goToCard(activeIndexRef.current - 1, -1, true);
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      section.removeEventListener('wheel', handleWheel);
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      st.kill();
    };
  }, [totalCards, goToCard]);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="w-full min-h-screen md:h-screen md:max-h-screen pt-16 pb-3 md:pt-16 md:pb-4 bg-[#070707] text-white relative flex flex-col justify-between overflow-hidden"
      aria-labelledby="selected-works-heading"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FFDE00]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* 1. SECTION HEADER TEXT & ARCHIVE LINK */}
      <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 text-center z-20 shrink-0 pt-2 sm:pt-3">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-zinc-950 border border-white/10 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#FFDE00] font-bold mb-1">
          <Sparkles className="w-3 h-3" />
          <DecryptedText text="02 // CURATED PRODUCTIONS" speed={30} />
        </div>

        <h2
          id="selected-works-heading"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight font-display text-white"
        >
          SELECTED <span className="text-[#FFDE00]">WORKS.</span>
        </h2>

        {/* Compact Status & Archive Link */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-mono uppercase tracking-widest mt-1.5">
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
                  idx === 0 ? 'relative' : 'absolute top-0 left-0 right-0'
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
                    className={`relative aspect-[16/9] max-h-[32vh] sm:max-h-[35vh] md:max-h-[38vh] w-full overflow-hidden bg-black border-b border-white/[0.08] group ${
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
                        <div className="w-13 h-13 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-black/70 border border-[#FFDE00]/70 backdrop-blur-md flex items-center justify-center text-[#FFDE00] group-hover:scale-110 group-hover:bg-[#FFDE00] group-hover:text-black transition-all duration-300 shadow-2xl">
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
                  <div className="p-4 sm:p-5 md:p-6 space-y-2 sm:space-y-2.5">
                    <h3
                      onClick={() => project.youtubeId && onOpenVideo && onOpenVideo(project)}
                      className={`text-base sm:text-lg md:text-xl lg:text-2xl font-black text-white hover:text-[#FFDE00] transition-colors uppercase font-display tracking-tight leading-snug line-clamp-1 sm:line-clamp-2 ${
                        project.youtubeId ? 'cursor-pointer' : ''
                      }`}
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed font-light line-clamp-2">
                      {project.description}
                    </p>

                    <div className="pt-2.5 sm:pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFDE00] font-bold">
                          {project.category}
                        </span>
                        {project.projectType && (
                          <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                            &bull; {project.projectType}
                          </span>
                        )}
                      </div>

                      {project.youtubeId && (
                        <MagneticButton
                          strength={0.3}
                          onClick={() => onOpenVideo && onOpenVideo(project)}
                          className="px-4 py-1.5 sm:px-5 sm:py-2 bg-[#FFDE00] hover:bg-[#FFE838] text-black font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl active:scale-95"
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
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
          {/* Clickable Quick Navigation Numbers */}
          <div className="flex items-center gap-1.5">
            {featured.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToCard(i, i > activeCardIndex ? 1 : -1, true)}
                className={`px-2 py-0.5 text-[9px] sm:text-[10px] transition-colors font-bold ${
                  i === activeCardIndex
                    ? 'bg-[#FFDE00] text-black'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
                aria-label={`Jump to case 0${i + 1}`}
              >
                0{i + 1}
              </button>
            ))}
          </div>

          <span className="hidden sm:inline text-zinc-400">
            SCROLL TO ADVANCE &bull; LOCKED STAGE VIEW
          </span>

          <span className="text-zinc-400 font-bold">
            CASE 0{activeCardIndex + 1} / 0{totalCards}
          </span>
        </div>

        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-[#FFDE00] transition-all duration-300"
            style={{ width: `${((activeCardIndex + 1) / totalCards) * 100}%` }}
          />
        </div>
      </div>

    </section>
  );
}
