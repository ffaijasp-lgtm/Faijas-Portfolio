import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../js/data/site';
import { ArrowUp, ArrowUpRight, Mail, Linkedin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-black text-zinc-400 py-16 sm:py-20 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 pb-12 border-b border-white/[0.08]">
          
          {/* Identity & Direct Contact */}
          <div className="space-y-4 max-w-md">
            <Link to="/" className="inline-block group">
              <span className="font-display font-black text-2xl sm:text-3xl tracking-tighter uppercase text-white group-hover:text-[#FFDE00] transition-colors">
                {siteConfig.name}
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              {siteConfig.role} based in {siteConfig.location}. Combining performance digital marketing, SEO, and cinematic generative AI production.
            </p>

            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                DIRECT INQUIRIES
              </span>
              <a
                href={siteConfig.links.email}
                className="text-base sm:text-lg font-bold text-white hover:text-[#FFDE00] transition-colors font-sans"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="flex flex-wrap gap-12 sm:gap-20 text-xs font-mono uppercase tracking-widest">
            <div>
              <h4 className="text-zinc-500 font-bold mb-4 text-[10px]">INDEX</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-zinc-300 hover:text-[#FFDE00] transition-colors">Overview [01]</Link>
                </li>
                <li>
                  <a href="/#works" className="text-zinc-300 hover:text-[#FFDE00] transition-colors">Selected Works [02]</a>
                </li>
                <li>
                  <a href="/#capabilities" className="text-zinc-300 hover:text-[#FFDE00] transition-colors">Capabilities [03]</a>
                </li>
                <li>
                  <a href="/#about" className="text-zinc-300 hover:text-[#FFDE00] transition-colors">Narrative [04]</a>
                </li>
                <li>
                  <Link to="/projects" className="text-zinc-300 hover:text-[#FFDE00] transition-colors">Full Archive [05]</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-zinc-500 font-bold mb-4 text-[10px]">CHANNELS</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={siteConfig.links.email}
                    className="text-zinc-300 hover:text-[#FFDE00] transition-colors flex items-center gap-1.5"
                  >
                    <span>Email</span>
                    <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-[#FFDE00] transition-colors flex items-center gap-1.5"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.links.phone}
                    className="text-zinc-300 hover:text-[#FFDE00] transition-colors flex items-center gap-1.5"
                  >
                    <span>+91 {siteConfig.phone}</span>
                    <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col justify-start">
              <h4 className="text-zinc-500 font-bold mb-4 text-[10px]">SCROLL</h4>
              <button
                type="button"
                onClick={scrollToTop}
                data-cursor="top"
                className="flex items-center gap-2 px-4 py-2.5 bg-zinc-950 border border-white/10 hover:border-[#FFDE00] hover:text-[#FFDE00] text-zinc-300 text-[10px] font-mono uppercase tracking-wider transition-all"
                aria-label="Scroll to top of page"
              >
                <span>TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-4">
          <p>
            &copy; {currentYear} {siteConfig.name}. ALL RIGHTS RESERVED.
          </p>

          <div>
            <span>Developed by </span>
            <a
              href="https://github.com/lowdevco"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#FFDE00] font-bold transition-colors underline underline-offset-4"
            >
              lowdevco
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
