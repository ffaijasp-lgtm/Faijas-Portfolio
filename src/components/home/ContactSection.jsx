import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../../js/data/site';
import { Mail, Linkedin, Phone, MapPin, ArrowUpRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-element', 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 sm:py-36 border-t-2 border-[#FFDE00] bg-black relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          <div className="contact-element inline-flex items-center gap-2 px-3.5 py-1 bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-[#FFDE00] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONTACT &bull; INQUIRIES</span>
          </div>

          <h2 id="contact-heading" className="contact-element text-3xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tighter font-display leading-[1.0]">
            LET&apos;S WORK <span className="text-[#FFDE00]">TOGETHER.</span>
          </h2>

          <p className="contact-element text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Ready to elevate your brand presence with creative digital marketing campaigns, high-ranking SEO, or cinematic AI-generated visuals? Contact directly.
          </p>

          <div className="contact-element pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
            
            <a
              href={siteConfig.links.email}
              className="p-6 bg-zinc-950 border border-zinc-800 hover:border-[#FFDE00] hover:bg-zinc-900 transition-all group flex flex-col justify-between"
              aria-label={`Send email to ${siteConfig.email}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-black border border-zinc-800 text-[#FFDE00] flex items-center justify-center group-hover:bg-[#FFDE00] group-hover:text-black transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#FFDE00] transition-colors stroke-[3]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1 font-bold">EMAIL ADDRESS</span>
                <span className="text-sm font-bold text-white group-hover:text-[#FFDE00] break-all transition-colors font-sans">
                  {siteConfig.email}
                </span>
              </div>
            </a>

            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-zinc-950 border border-zinc-800 hover:border-[#FFDE00] hover:bg-zinc-900 transition-all group flex flex-col justify-between"
              aria-label="Visit Faijas P on LinkedIn"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-black border border-zinc-800 text-[#FFDE00] flex items-center justify-center group-hover:bg-[#FFDE00] group-hover:text-black transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#FFDE00] transition-colors stroke-[3]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1 font-bold">PROFESSIONAL NETWORK</span>
                <span className="text-sm font-bold text-white group-hover:text-[#FFDE00] transition-colors font-sans">
                  LinkedIn Profile
                </span>
              </div>
            </a>

            <a
              href={siteConfig.links.phone}
              className="p-6 bg-zinc-950 border border-zinc-800 hover:border-[#FFDE00] hover:bg-zinc-900 transition-all group flex flex-col justify-between"
              aria-label={`Call Faijas P at ${siteConfig.phone}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-black border border-zinc-800 text-[#FFDE00] flex items-center justify-center group-hover:bg-[#FFDE00] group-hover:text-black transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#FFDE00] transition-colors stroke-[3]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1 font-bold">DIRECT PHONE</span>
                <span className="text-sm font-bold text-white group-hover:text-[#FFDE00] transition-colors font-sans">
                  +91 {siteConfig.phone}
                </span>
              </div>
            </a>

          </div>

          <div className="contact-element pt-8 flex items-center justify-center gap-2 text-xs text-zinc-400 font-mono">
            <MapPin className="w-3.5 h-3.5 text-[#FFDE00]" />
            <span>AVAILABLE FOR REMOTE WORK &bull; BASED IN {siteConfig.location}</span>
          </div>

        </div>
      </div>
    </section>
  );
}
