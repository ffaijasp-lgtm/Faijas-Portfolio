import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../js/data/site';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#contact');
      setTimeout(() => {
        const contactEl = document.getElementById('contact');
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHomeAnchorClick = (anchorId) => (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${anchorId}`);
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'py-3.5 bg-black/95 backdrop-blur-md border-b border-white/10 shadow-2xl' 
        : 'py-5 bg-black/80 backdrop-blur-sm border-b border-white/[0.06]'
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <Link 
          to="/" 
          className="group flex items-center gap-2.5 text-white transition-colors"
          aria-label="Faijas P — Home"
        >
          <div className="px-2.5 py-1 bg-[#FFDE00] text-black font-display font-black text-sm tracking-tighter">
            FP
          </div>
          <div>
            <span className="font-display font-black tracking-tighter text-base sm:text-lg block leading-none text-white group-hover:text-[#FFDE00] transition-colors uppercase">
              {siteConfig.name}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-widest block mt-0.5 uppercase">
              MARKETER &bull; AI CREATOR
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-xs font-black uppercase tracking-wider font-display">
          <Link 
            to="/" 
            className={`transition-colors py-1 ${
              location.pathname === '/' 
                ? 'text-[#FFDE00]' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            OVERVIEW
          </Link>

          <Link 
            to="/projects" 
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              location.pathname === '/projects' 
                ? 'text-[#FFDE00]' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            PROJECTS
            <span className="text-[9px] px-1.5 py-0.2 rounded-sm bg-[#FFDE00] text-black font-mono font-bold">
              6
            </span>
          </Link>

          <a 
            href="#expertise" 
            onClick={handleHomeAnchorClick('expertise')}
            className="text-zinc-400 hover:text-white transition-colors py-1"
          >
            SERVICES
          </a>

          <a 
            href="#about" 
            onClick={handleHomeAnchorClick('about')}
            className="text-zinc-400 hover:text-white transition-colors py-1"
          >
            ABOUT
          </a>

          <a 
            href="#experience" 
            onClick={handleHomeAnchorClick('experience')}
            className="text-zinc-400 hover:text-white transition-colors py-1"
          >
            TRACK RECORD
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            onClick={handleContactClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFDE00] hover:bg-[#FFE838] text-black font-display font-black text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md shadow-[#FFDE00]/15"
          >
            <span>COMMISSION / CONTACT</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded text-zinc-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FFDE00]"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#FFDE00]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-[#FFDE00]/30 px-5 py-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-3 font-display font-black uppercase text-sm tracking-wider">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 ${
                location.pathname === '/' 
                  ? 'bg-[#FFDE00] text-black' 
                  : 'text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              OVERVIEW
            </Link>

            <Link
              to="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 flex items-center justify-between ${
                location.pathname === '/projects' 
                  ? 'bg-[#FFDE00] text-black' 
                  : 'text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              <span>PROJECTS</span>
              <span className="text-[10px] px-2 py-0.5 bg-black text-[#FFDE00] font-mono">
                6
              </span>
            </Link>

            <a
              href="#expertise"
              onClick={handleHomeAnchorClick('expertise')}
              className="px-3 py-2 text-zinc-300 hover:bg-zinc-900"
            >
              SERVICES
            </a>

            <a
              href="#about"
              onClick={handleHomeAnchorClick('about')}
              className="px-3 py-2 text-zinc-300 hover:bg-zinc-900"
            >
              ABOUT
            </a>

            <a
              href="#experience"
              onClick={handleHomeAnchorClick('experience')}
              className="px-3 py-2 text-zinc-300 hover:bg-zinc-900"
            >
              TRACK RECORD
            </a>
          </nav>

          <div className="pt-3 border-t border-zinc-800">
            <a
              href="#contact"
              onClick={handleContactClick}
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#FFDE00] hover:bg-[#FFE838] text-black font-display font-black text-xs uppercase tracking-wider transition-colors"
            >
              <span>COMMISSION / CONTACT</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
