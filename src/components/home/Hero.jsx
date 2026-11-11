import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../js/data/site';
import { projects } from '../../js/data/project';
import resumeFile from '../../assets/docs/Resume.pdf';
import { ArrowUpRight, FileDown, Volume2, VolumeX, Sparkles, Film } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';
import MagneticButton from '../ui/MagneticButton';
import DecryptedText from '../ui/DecryptedText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenVideo }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const showcaseCardRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const showcaseVideo = siteConfig.heroVideo || {
    title: "AI Video Concepts & Promotional Reel",
    description: "Short-form promotional video showcase created using generative AI visual workflows and motion editing.",
    category: "AI Video Direction",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    youtubeId: "LXb3EKWsInQ",
    tools: ["AI Visuals", "CapCut", "Motion Editing", "Prompt Direction"]
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  const handleOpenShowcase = () => {
    if (onOpenVideo) {
      onOpenVideo(showcaseVideo);
    }
  };

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

      // Subtle parallax on the showcase video reel
      if (showcaseCardRef.current) {
        gsap.to('.hero-video-element', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: showcaseCardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#070707]"
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

        {/* Cinematic Video Showcase Reel Frame */}
        <div
          ref={showcaseCardRef}
          className="hero-showcase-container relative p-2 sm:p-3 bg-[#0d0d0d] border border-white/10 hover:border-[#FFDE00]/80 transition-colors duration-500 rounded-sm editorial-card-glow"
        >
          {/* Top Frame Status Bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2 gap-2">
            <div className="flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-[#FFDE00]" />
              <span className="text-white font-bold">{showcaseVideo.title}</span>
            </div>
            
            <div className="hidden md:flex items-center gap-3 text-zinc-400">
              <span className="px-2 py-0.5 bg-black border border-white/10 text-white text-[9px]">
                {showcaseVideo.category}
              </span>
              <span>4K / HIGH DENSITY</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleSound}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-black/80 hover:bg-[#FFDE00] hover:text-black border border-white/15 text-zinc-300 transition-colors text-[10px] font-mono uppercase font-bold"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX className="w-3 h-3 text-zinc-400" /> : <Volume2 className="w-3 h-3 text-[#FFDE00]" />}
                <span>{isMuted ? "MUTED" : "SOUND ON"}</span>
              </button>
            </div>
          </div>

          {/* Interactive Video Box */}
          <div
            onClick={handleOpenShowcase}
            data-cursor="play"
            className="relative aspect-[16/10] sm:aspect-[21/9] overflow-hidden bg-black border border-white/[0.06] group cursor-pointer"
          >
            <video
              ref={videoRef}
              src={showcaseVideo.src}
              poster={projects[0]?.thumbnail}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              crossOrigin="anonymous"
              className="hero-video-element w-full h-[115%] -top-[7.5%] relative object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

            {/* Bottom Expand View Trigger */}
            <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenShowcase();
                }}
                className="px-5 py-2.5 bg-[#FFDE00] hover:bg-[#FFE838] text-black font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-transform group-hover:scale-105 shadow-2xl active:scale-95"
              >
                <span>EXPAND SHOWCASE</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Bottom Left Quick Information */}
            <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:block">
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-300 uppercase bg-black/70 px-3 py-1.5 border border-white/10 backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-[#FFDE00]" />
                <span>CLICK TO STREAM AT MAXIMUM BITRATE</span>
              </div>
            </div>
          </div>

          {/* Bottom Metatags */}
          <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex flex-wrap items-center justify-between text-[10px] font-mono text-zinc-400 gap-2">
            <div className="flex items-center gap-3">
              <span>TOOLS:</span>
              {showcaseVideo.tools?.map((tool, tIdx) => (
                <span key={tIdx} className="text-white bg-zinc-900 px-2 py-0.5 border border-zinc-800">
                  {tool}
                </span>
              ))}
            </div>
            <div className="text-[#FFDE00] font-bold">
              EST. 2026 &bull; SULTHAN BATHERY, WAYANAD
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
