import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../js/data/site';
import { ArrowUp, Mail, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800 bg-black text-zinc-400 py-16 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        
        <div className="space-y-3 max-w-sm">
          <div className="flex items-center gap-2.5">
            <div className="px-2.5 py-1 bg-[#FFDE00] text-black font-display font-black text-sm">
              FP
            </div>
            <span className="text-white font-display font-black text-lg tracking-tight uppercase">
              {siteConfig.name}
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            {siteConfig.role} based in {siteConfig.location}. Combining performance digital marketing, SEO, and cinematic generative AI production.
          </p>
        </div>

        <div className="flex flex-wrap gap-10 text-xs font-mono uppercase">
          <div>
            <h4 className="text-zinc-500 font-bold mb-3 tracking-widest text-[10px]">NAVIGATION</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#FFDE00] transition-colors">OVERVIEW</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#FFDE00] transition-colors">PROJECT ARCHIVE</Link>
              </li>
              <li>
                <a href="/#expertise" className="hover:text-[#FFDE00] transition-colors">SERVICES</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-zinc-500 font-bold mb-3 tracking-widest text-[10px]">CONTACT DIRECT</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href={siteConfig.links.email}
                  className="hover:text-[#FFDE00] transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FFDE00]" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a 
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFDE00] transition-colors flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#FFDE00]" />
                  <span>LINKEDIN PROFILE</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-950 border border-zinc-800 hover:border-[#FFDE00] text-xs font-mono uppercase text-zinc-300 hover:text-[#FFDE00] transition-all"
            aria-label="Scroll back to top of page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-4">
        <p>&copy; {currentYear} {siteConfig.name}. ALL RIGHTS RESERVED.</p>
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
    </footer>
  );
}
