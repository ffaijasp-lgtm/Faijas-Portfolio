import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../js/data/site';
import { projects } from '../../js/data/project';
import resumeFile from '../../assets/docs/Resume.pdf';
import { ArrowUpRight, FileDown, MapPin, Sparkles, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';

export default function Hero({ onOpenVideo }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const featuredVideoProject = projects[0];
  const [isMuted, setIsMuted] = useState(true);

  // High quality sample public MP4 showcase reel
  // To use your local video, place it in src/assets/video/ and import it or point to it here
  const videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    } else {
      setIsMuted(!isMuted);
    }
  };

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
              DIGITAL MARKETER.
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
              href={resumeFile}
              download="Faijas_P_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-white/[0.08] text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-white/20 hover:border-[#FFDE00] hover:text-[#FFDE00] transition-all duration-200 active:scale-95"
            >
              <FileDown className="w-4 h-4 text-[#FFDE00]" />
              <span>GET RESUME</span>
            </a>
          </div>

        </div>

        <div className="hero-visual-card relative rounded-none p-2 sm:p-4 bg-zinc-950 border-2 border-zinc-800">
          
          <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-3 gap-2">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-white font-bold">FEATURED WORK SHOWCASE</span>
            </div>
            <div className="hidden sm:block truncate text-center">AI VISUALS &bull; MOTION DIRECTION &bull; CAMPAIGN</div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={toggleSound}
                className="flex items-center gap-1 text-zinc-300 hover:text-[#FFDE00] transition-colors"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#FFDE00]" />}
                <span className="text-[10px] font-mono">{isMuted ? "MUTED" : "SOUND ON"}</span>
              </button>
            </div>
          </div>

          <div 
            onClick={() => onOpenVideo && onOpenVideo(featuredVideoProject)}
            className="relative aspect-[16/10] sm:aspect-[21/9] overflow-hidden bg-black border border-zinc-800 group cursor-pointer"
          >
            {/* HTML5 Native Video Stream: Smooth autoplay, loop, hidden native controls, muted */}
            <video
              ref={videoRef}
              src={videoSrc}
              poster={featuredVideoProject.thumbnail}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-auto">
              <div className="space-y-0.5 max-w-md">
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#FFDE00] uppercase font-bold block">
                  FEATURED WORK REEL
                </span>
                <h3 className="text-white font-display font-black text-sm sm:text-xl md:text-2xl uppercase tracking-tight line-clamp-2 sm:line-clamp-none">
                  {featuredVideoProject.title}
                </h3>
              </div>
              
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenVideo && onOpenVideo(featuredVideoProject);
                }}
                className="self-start sm:self-auto px-4 py-2 bg-[#FFDE00] hover:bg-[#FFE838] text-black font-display font-black text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 transition-transform group-hover:scale-105 shadow-xl shrink-0"
              >
                <span>EXPAND VIEW</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
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
