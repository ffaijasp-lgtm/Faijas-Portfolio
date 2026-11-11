import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../../js/data/site';
import portraitImg from '../../assets/images/me.png';
import { Languages, Sparkles, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const portraitCardRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Reveal narrative elements
      gsap.fromTo('.about-reveal',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Parallax portrait image
      if (portraitCardRef.current) {
        gsap.to('.about-portrait-img', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: portraitCardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 sm:py-36 border-t border-white/10 bg-[#070707] text-white relative overflow-hidden"
      aria-labelledby="about-narrative-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Top Editorial Bar */}
        <div className="about-reveal flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-16 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FFDE00]" />
            <span className="text-white font-bold">(04 / CREATIVE PROFILE)</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>METHODOLOGY &amp; ETHOS</span>
            <span>&bull;</span>
            <span>{siteConfig.location}</span>
          </div>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Portrait Showcase with Parallax */}
          <div ref={portraitCardRef} className="about-reveal lg:col-span-5 order-2 lg:order-1">
            <div className="relative p-2 sm:p-3 bg-[#0d0d0d] border border-white/10 hover:border-[#FFDE00]/70 transition-colors duration-500 shadow-2xl">
              <div className="aspect-[4/5] overflow-hidden relative bg-black">
                <img
                  src={portraitImg}
                  alt={`${siteConfig.name} - Portrait and Creative Profile`}
                  className="about-portrait-img w-full h-[115%] -top-[7.5%] relative object-cover"
                  loading="lazy"
                  width="800"
                  height="1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-2xl font-black text-white uppercase font-display tracking-tight">
                    {siteConfig.name}
                  </div>
                  <div className="text-xs text-[#FFDE00] font-mono uppercase font-bold tracking-wider mt-1">
                    {siteConfig.role}
                  </div>
                  <div className="text-xs text-zinc-400 font-mono mt-0.5">
                    {siteConfig.location}
                  </div>
                </div>
              </div>

              {/* Language Pill Strip */}
              <div className="mt-3 p-3 bg-black border border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px] uppercase">
                  <Languages className="w-3.5 h-3.5 text-[#FFDE00]" />
                  <span>Languages:</span>
                </div>
                <div className="flex items-center gap-2">
                  {siteConfig.languages.map((lang, lIdx) => (
                    <span
                      key={lIdx}
                      className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-200 font-mono text-[10px]"
                    >
                      {lang.language} ({lang.proficiency})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Bio & Method */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <div className="about-reveal space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFDE00] font-bold block">
                CREATIVE DIRECTION &amp; BACKGROUND
              </span>
              <h2
                id="about-narrative-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter font-display leading-[1.05]"
              >
                WHERE MARKETING <br />
                <span className="text-[#FFDE00]">MEETS AI WORKFLOWS.</span>
              </h2>
            </div>

            <div className="about-reveal space-y-5 text-zinc-300 text-sm sm:text-base leading-relaxed font-sans font-light">
              <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                {siteConfig.summary}
              </p>

              <p>
                My approach unites structured marketing fundamentals—audience identification, search intent, and conversion copywriting—with high-velocity AI creative workflows. Through generative video models, prompt engineering, and polished post-production in CapCut and Photoshop, I create standout visuals that command attention across modern digital feeds.
              </p>

              <p>
                Whether testing promotional copy angles for paid Meta and Google ad campaigns or establishing clean on-page SEO structures in WordPress, my singular goal is turning creativity into measurable digital engagement.
              </p>
            </div>

            {/* Core Philosophy Feature Cards */}
            <div className="about-reveal grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
              <div className="p-5 bg-zinc-950 border border-white/10 space-y-2 hover:border-[#FFDE00]/50 transition-colors">
                <div className="flex items-center gap-2 text-xs font-mono text-[#FFDE00] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>RAPID AI PROTOTYPING</span>
                </div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Fast visual generation using cutting-edge models combined with precision timing and motion pacing in CapCut.
                </p>
              </div>

              <div className="p-5 bg-zinc-950 border border-white/10 space-y-2 hover:border-[#FFDE00]/50 transition-colors">
                <div className="flex items-center gap-2 text-xs font-mono text-[#FFDE00] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>PERFORMANCE DRIVEN</span>
                </div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  On-page SEO structure, Meta &amp; Google ad creative testing, and multi-channel audience growth strategies.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
