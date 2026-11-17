import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../js/data/site';
import { projects } from '../../js/data/project';
import resumeFile from '../../assets/docs/Resume.pdf';
import { ArrowUpRight, FileDown } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import DecryptedText from '../ui/DecryptedText';
import FilmstripCarousel from './FilmstripCarousel';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenVideo }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-meta-badge',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.1 }
      )
      .fromTo('.hero-title-line',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
        "-=0.6"
      )
      .fromTo('.hero-description',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo('.hero-cta-btn',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
        "-=0.5"
      )
      .fromTo('.hero-showcase-container',
        { y: 40, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1 },
        "-=0.7"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden bg-[#070707]"
      aria-label="Introduction and Hero"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FFDE00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Top Editorial Index Bar */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-8 pb-4 border-b border-white/[0.08] gap-4">
          <div className="hero-meta-badge flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFDE00] animate-pulse" />
            <span className="text-white font-bold">{siteConfig.status}</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-zinc-400">
            <span>(01 / EDITORIAL REEL)</span>
            <span>&bull;</span>
            <span>{siteConfig.location}</span>
            <span>&bull;</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="max-w-5xl mx-auto text-center space-y-6 mb-12">
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter leading-[0.95] sm:leading-[0.9] font-display">
            <span className="hero-title-line block text-white">
              DIGITAL MARKETER.
            </span>
            <span className="hero-title-line block text-[#FFDE00] mt-1 sm:mt-2">
              AI CONTENT CREATOR.
            </span>
          </h1>

          <p className="hero-description text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed font-sans">
            I am <strong className="text-white font-semibold">{siteConfig.name}</strong>. Bridging high-velocity generative AI visuals, performance marketing campaigns, and technical SEO architecture.
          </p>

          {/* CTA Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <MagneticButton strength={0.25}>
              <Link
                to="/projects"
                data-cursor="explore"
                className="hero-cta-btn inline-flex items-center gap-2 px-8 py-4 bg-[#FFDE00] hover:bg-[#FFE838] text-black font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 rounded-none shadow-xl shadow-[#FFDE00]/20 group active:scale-95"
              >
                <span>EXPLORE WORK ({projects.length})</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <a
                href={resumeFile}
                download="Faijas_P_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pdf"
                className="hero-cta-btn inline-flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-white/[0.08] text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider border border-white/20 hover:border-[#FFDE00] hover:text-[#FFDE00] transition-all duration-300 active:scale-95"
              >
                <FileDown className="w-4 h-4 text-[#FFDE00]" />
                <span>GET RESUME</span>
              </a>
            </MagneticButton>
          </div>

        </div>

      </div>

      {/* 100% True Edge-to-Edge 35mm Continuous Filmstrip Reel (Spanning full viewport width) */}
      <div className="hero-showcase-container mt-12 sm:mt-16 w-full relative z-20">
        <FilmstripCarousel onOpenVideo={onOpenVideo} />
      </div>

    </section>
  );
}
