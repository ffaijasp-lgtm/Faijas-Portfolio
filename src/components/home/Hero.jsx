import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../js/data/site';
import { projects } from '../../js/data/product';
import { ArrowUpRight, Play, MapPin, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export default function Hero({ onOpenVideo }) {
  const containerRef = useRef(null);
  const featuredVideoProject = projects[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-badge', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
      gsap.fromTo('.hero-headline-line', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.1 }
      );
      gsap.fromTo('.hero-subtext', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo('.hero-cta-group', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.4 }
      );
      gsap.fromTo('.hero-visual-card', 
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-black"
      aria-label="Introduction and Hero"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        
        <div className="text-center max-w-5xl mx-auto space-y-6 mb-12">
          
          <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1 bg-zinc-900 border border-zinc-800 text-[11px] font-mono uppercase tracking-widest text-[#FFDE00]">
            <span className="w-2 h-2 bg-[#FFDE00] animate-pulse" />
            <span>{siteConfig.status}</span>
          </div>

          <h1 className="hero-headline-line text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[1.02] sm:leading-[0.95] font-display break-words">
            <span className="block text-white">
              DIGITAL MARKETING.
            </span>
            <span className="block text-[#FFDE00] mt-2">
              AI CONTENT CREATOR.
            </span>
          </h1>

          <p className="hero-subtext text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed font-sans">
            I am <strong className="text-white font-bold">{siteConfig.name}</strong>, combining performance marketing, SEO, and cinematic generative AI workflows to create standout promotional campaigns.
          </p>

          <div className="hero-cta-group flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#FFDE00] hover:bg-[#FFE838] text-black font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-xl shadow-[#FFDE00]/20 group"
            >
              <span>EXPLORE WORK ({projects.length})</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-white/[0.08] text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-white/20 hover:border-[#FFDE00] hover:text-[#FFDE00] transition-all duration-200 active:scale-95"
            >
              <span>DIRECT INQUIRY</span>
            </a>
          </div>

        </div>

        <div className="hero-visual-card relative rounded-none p-2 sm:p-4 bg-zinc-950 border-2 border-zinc-800">
          
          <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-3 gap-2">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-white font-bold">AI VIDEO</span>
            </div>
            <div className="hidden sm:block truncate text-center">CAPCUT &bull; PROMPTING &bull; CAMPAIGN</div>
            <div className="text-[#FFDE00] font-bold shrink-0">CLICK TO STREAM</div>
          </div>

          <div 
            onClick={() => onOpenVideo && onOpenVideo(featuredVideoProject)}
            className="relative aspect-[16/10] sm:aspect-[21/9] overflow-hidden bg-zinc-900 border border-zinc-800 group cursor-pointer"
          >
            <img
              src={featuredVideoProject.thumbnail}
              alt="AI Video Concepts & Digital Marketing Direction Preview"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="eager"
              width="1200"
              height="800"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="space-y-0.5 max-w-md">
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#FFDE00] uppercase font-bold block">
                  PROMOTIONAL CASE 01
                </span>
                <h3 className="text-white font-display font-black text-sm sm:text-xl md:text-2xl uppercase tracking-tight line-clamp-2 sm:line-clamp-none">
                  {featuredVideoProject.title}
                </h3>
              </div>
              
              <button 
                type="button"
                className="self-start sm:self-auto px-3.5 py-2 sm:px-4 sm:py-2 bg-[#FFDE00] hover:bg-[#FFE838] text-black font-display font-black text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 transition-transform group-hover:scale-105 shadow-xl shrink-0"
              >
                <span>STREAM REEL</span>
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-zinc-400 gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#FFDE00] shrink-0" />
              <span>{siteConfig.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FFDE00] shrink-0" />
              <span>AI Video &amp; Image Creation</span>
            </div>
            <div className="text-white font-bold">
              <span>META ADS &bull; GOOGLE ADS &bull; SEO</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
