import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../../js/data/site';
import { Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.timeline-reveal',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
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
      id="experience"
      ref={sectionRef}
      className="py-24 sm:py-36 border-t border-white/10 bg-[#070707] text-white relative overflow-hidden"
      aria-labelledby="journey-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="timeline-reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FFDE00] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>(05 / JOURNEY &amp; CREDENTIALS)</span>
            </div>
            <h2
              id="journey-heading"
              className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter font-display leading-none"
            >
              EXPERIENCE &amp; <br />
              <span className="text-[#FFDE00]">BACKGROUND.</span>
            </h2>
          </div>

          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            Practical agency production and professional qualifications in digital marketing, AI video creation, and SEO strategy.
          </p>
        </div>

        {/* Two-Column Grid: Work on Left, Education on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Work Experience Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="timeline-reveal flex items-center gap-2.5 text-xs font-black text-white uppercase tracking-widest font-display mb-8">
              <Briefcase className="w-4 h-4 text-[#FFDE00]" />
              <span>PRACTICAL AGENCY EXPERIENCE</span>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-[1px] before:bg-white/10">
              {siteConfig.experience.map((item, idx) => (
                <div key={idx} className="timeline-reveal relative pl-10 space-y-3 group">
                  {/* Glowing Node */}
                  <div className="absolute left-3.5 top-1.5 w-3 h-3 bg-[#FFDE00] border-2 border-black -translate-x-1/2 group-hover:scale-125 transition-transform" />

                  <div className="p-6 bg-[#0d0d0d] border border-white/10 group-hover:border-[#FFDE00]/60 transition-all duration-300">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-black text-white uppercase font-display tracking-tight group-hover:text-[#FFDE00] transition-colors">
                        {item.role}
                      </h3>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 bg-black text-[#FFDE00] border border-white/10 font-bold">
                        {item.period}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-zinc-400 mb-4">
                      <span className="text-white font-semibold">{item.company}</span> &bull; {item.location}
                    </div>

                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="space-y-2 text-xs sm:text-sm text-zinc-400 font-sans font-light">
                        {item.highlights.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 bg-[#FFDE00] shrink-0 mt-1.5" />
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Qualifications Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="timeline-reveal flex items-center gap-2.5 text-xs font-black text-white uppercase tracking-widest font-display mb-8">
              <GraduationCap className="w-4 h-4 text-[#FFDE00]" />
              <span>EDUCATION &amp; CERTIFICATION</span>
            </div>

            <div className="space-y-4">
              {siteConfig.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="timeline-reveal p-6 bg-[#0d0d0d] border border-white/10 hover:border-[#FFDE00] transition-all duration-300 space-y-2 group"
                >
                  <span className="text-xs font-mono text-[#FFDE00] font-bold block">
                    {edu.year}
                  </span>
                  <h4 className="text-base font-black text-white uppercase font-display tracking-tight group-hover:text-[#FFDE00] transition-colors">
                    {edu.degree}
                  </h4>
                  <div className="text-xs text-zinc-400 flex items-center justify-between font-mono pt-1">
                    <span>{edu.institution}</span>
                    <span className="text-zinc-500">{edu.location}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Summary Pill */}
            <div className="timeline-reveal p-6 bg-zinc-950 border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-[#FFDE00] uppercase tracking-widest font-bold block">
                PRACTICE FOCUS
              </span>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Hands-on campaign builds across Meta Ads, Google Ads, WordPress SEO architecture, and generative video workflows with CapCut.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
