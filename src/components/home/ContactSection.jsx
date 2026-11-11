import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../../js/data/site';
import { Mail, Linkedin, Phone, MapPin, ArrowUpRight, Sparkles } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';
import DecryptedText from '../ui/DecryptedText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-reveal',
        { y: 40, opacity: 0 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 sm:py-40 border-t border-white/10 bg-[#070707] text-white relative overflow-hidden"
      aria-labelledby="contact-closing-heading"
    >
      {/* Background ambient yellow glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-[#FFDE00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Top Editorial Index */}
        <div className="contact-reveal flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-16 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FFDE00]" />
            <span className="text-white font-bold">
              <DecryptedText text="06 // CONNECT DIRECT" speed={30} />
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>START A PROJECT</span>
            <span>&bull;</span>
            <span>{siteConfig.status}</span>
          </div>
        </div>

        {/* Center Closing Statement */}
        <div className="max-w-5xl mx-auto text-center space-y-8 mb-16 sm:mb-20">
          <h2
            id="contact-closing-heading"
            className="contact-reveal text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter font-display leading-[0.95]"
          >
            LET&apos;S MAKE <br />
            <span className="text-[#FFDE00]">SOMETHING.</span>
          </h2>

          <p className="contact-reveal text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto font-sans leading-relaxed font-light">
            Ready to build high-converting marketing campaigns, cinematic generative AI visuals, or clean search-optimized website structures? Connect directly.
          </p>
        </div>

        {/* Direct Contact Action Cards with SpotlightCard from React Bits */}
        <div className="contact-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          
          {/* Email Card */}
          <a
            href={siteConfig.links.email}
            data-cursor="email"
            aria-label={`Send email to ${siteConfig.email}`}
            className="block group"
          >
            <SpotlightCard
              spotlightColor="rgba(255, 222, 0, 0.16)"
              borderColor="rgba(255, 222, 0, 0.5)"
              className="p-7 rounded-none h-full border border-white/10 hover:border-[#FFDE00] transition-all duration-300 flex flex-col justify-between space-y-8 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-black border border-white/10 text-[#FFDE00] flex items-center justify-center group-hover:bg-[#FFDE00] group-hover:text-black transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#FFDE00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all stroke-[2.5]" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1 font-bold">
                  EMAIL DIRECT
                </span>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#FFDE00] transition-colors break-all font-sans">
                  {siteConfig.email}
                </span>
              </div>
            </SpotlightCard>
          </a>

          {/* LinkedIn Card */}
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="linkedin"
            aria-label="Connect with Faijas P on LinkedIn"
            className="block group"
          >
            <SpotlightCard
              spotlightColor="rgba(255, 222, 0, 0.16)"
              borderColor="rgba(255, 222, 0, 0.5)"
              className="p-7 rounded-none h-full border border-white/10 hover:border-[#FFDE00] transition-all duration-300 flex flex-col justify-between space-y-8 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-black border border-white/10 text-[#FFDE00] flex items-center justify-center group-hover:bg-[#FFDE00] group-hover:text-black transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#FFDE00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all stroke-[2.5]" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1 font-bold">
                  NETWORKING
                </span>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#FFDE00] transition-colors font-sans">
                  LinkedIn Profile
                </span>
              </div>
            </SpotlightCard>
          </a>

          {/* Phone / Call Card */}
          <a
            href={siteConfig.links.phone}
            data-cursor="call"
            aria-label={`Call ${siteConfig.phone}`}
            className="block group"
          >
            <SpotlightCard
              spotlightColor="rgba(255, 222, 0, 0.16)"
              borderColor="rgba(255, 222, 0, 0.5)"
              className="p-7 rounded-none h-full border border-white/10 hover:border-[#FFDE00] transition-all duration-300 flex flex-col justify-between space-y-8 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-black border border-white/10 text-[#FFDE00] flex items-center justify-center group-hover:bg-[#FFDE00] group-hover:text-black transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#FFDE00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all stroke-[2.5]" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1 font-bold">
                  TELEPHONE
                </span>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#FFDE00] transition-colors font-mono">
                  +91 {siteConfig.phone}
                </span>
              </div>
            </SpotlightCard>
          </a>

          {/* Location Information Card */}
          <div className="block">
            <SpotlightCard
              spotlightColor="rgba(255, 222, 0, 0.16)"
              borderColor="rgba(255, 222, 0, 0.5)"
              className="p-7 rounded-none h-full border border-white/10 flex flex-col justify-between space-y-8 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-black border border-white/10 text-[#FFDE00] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1 font-bold">
                  LOCATION
                </span>
                <span className="text-sm sm:text-base font-bold text-white font-sans">
                  {siteConfig.location}
                </span>
              </div>
            </SpotlightCard>
          </div>

        </div>

      </div>
    </section>
  );
}
