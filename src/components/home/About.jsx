import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../../js/data/site';
import portraitImg from '../../assets/images/me.jpg';
import { Languages } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.about-content', 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 sm:py-32 border-t border-zinc-800 bg-zinc-950 relative"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="about-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative border-2 border-zinc-800 bg-black p-3">
              <div className="aspect-[4/5] overflow-hidden relative border border-zinc-800">
                <img
                  src={portraitImg}
                  alt={`${siteConfig.name} - Portrait and Creative Identity`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="800"
                  height="1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-white font-display font-black text-xl uppercase tracking-tight">{siteConfig.name}</div>
                  <div className="text-xs text-[#FFDE00] font-mono uppercase font-bold tracking-wider mt-0.5">{siteConfig.role}</div>
                  <div className="text-xs text-zinc-400 mt-1">{siteConfig.location}</div>
                </div>
              </div>

              <div className="mt-3 p-3 bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-zinc-400 font-mono uppercase text-[11px]">
                  <Languages className="w-3.5 h-3.5 text-[#FFDE00]" />
                  <span>Languages:</span>
                </div>
                <div className="flex items-center gap-2">
                  {siteConfig.languages.map((lang, lIdx) => (
                    <span 
                      key={lIdx}
                      className="px-2 py-0.5 bg-black border border-zinc-800 text-zinc-200 font-mono text-[11px]"
                    >
                      {lang.language} ({lang.proficiency})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFDE00] font-bold block">
                CREATIVE PROFILE
              </span>
              <h2 id="about-heading" className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter font-display leading-tight">
                ABOUT FAIJAS P
              </h2>
            </div>

            <div className="space-y-4 text-zinc-300 text-base leading-relaxed font-sans">
              <p className="text-lg text-white font-medium leading-relaxed">
                {siteConfig.summary}
              </p>
              
              <p>
                My approach unites structured marketing principles—audience identification, search intent, and conversion copywriting—with high-velocity AI creative workflows. Through tools like CapCut, Photoshop, and Canva paired with AI generation models, I develop compelling visuals that elevate brands across digital touchpoints.
              </p>

              <p>
                Whether testing promotional copy angles for paid Meta and Google ads or establishing clean on-page SEO structures in WordPress, my focus is delivering measurable brand engagement and impactful digital presence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
              <div className="p-4 bg-black border border-zinc-800 space-y-1">
                <div className="text-xs font-mono text-[#FFDE00] font-bold uppercase tracking-wider">CREATIVE EXECUTION</div>
                <p className="text-xs text-zinc-400 font-sans">Fast visual prototyping with generative AI tools and polished post-production in CapCut.</p>
              </div>
              <div className="p-4 bg-black border border-zinc-800 space-y-1">
                <div className="text-xs font-mono text-[#FFDE00] font-bold uppercase tracking-wider">STRATEGIC MARKETING</div>
                <p className="text-xs text-zinc-400 font-sans">SEO structure, audience-targeted copy, and multi-channel campaign awareness.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
