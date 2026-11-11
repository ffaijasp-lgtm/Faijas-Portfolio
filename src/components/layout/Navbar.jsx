import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../js/data/site';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate mobile drawer when toggled
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    const menuEl = mobileMenuRef.current;
    
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(menuEl, 
        { opacity: 0, y: -20, pointerEvents: 'none' },
        { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35, ease: 'power3.out' }
      );
      gsap.fromTo(menuEl.querySelectorAll('.mobile-nav-link'),
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.06, delay: 0.1, ease: 'power2.out' }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(menuEl, {
        opacity: 0,
        y: -15,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          if (menuEl) menuEl.style.pointerEvents = 'none';
        }
      });
    }
  }, [mobileMenuOpen]);

  const navigateToSection = (anchorId) => (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${anchorId}`);
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: "Overview", num: "01", type: "anchor", target: "hero" },
    { name: "Selected Works", num: "02", type: "anchor", target: "works" },
    { name: "Capabilities", num: "03", type: "anchor", target: "capabilities" },
    { name: "Narrative", num: "04", type: "anchor", target: "about" },
    { name: "Archive", num: "05", type: "route", path: "/projects" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3.5 bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-5 bg-gradient-to-b from-black/80 via-black/40 to-transparent border-b border-white/[0.04]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          
          {/* Logo / Personal Brand */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex items-center gap-3 text-white transition-opacity hover:opacity-90"
            aria-label={`${siteConfig.name} — Portfolio Home`}
          >
            <span className="w-2.5 h-2.5 bg-[#FFDE00] rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="font-display font-black text-sm sm:text-base tracking-tighter uppercase text-white group-hover:text-[#FFDE00] transition-colors leading-none">
                {siteConfig.name}
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase mt-0.5">
                AI CREATOR &bull; MARKETER
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Editorial Numbers */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono font-bold tracking-widest uppercase">
            {navLinks.map((link, idx) => {
              if (link.type === "route") {
                const isCurrent = location.pathname === link.path;
                return (
                  <Link
                    key={idx}
                    to={link.path}
                    className={`flex items-center gap-1.5 transition-colors py-1 group ${
                      isCurrent ? 'text-[#FFDE00]' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="text-[9px] text-zinc-600 group-hover:text-[#FFDE00] transition-colors">
                      [{link.num}]
                    </span>
                  </Link>
                );
              }

              return (
                <a
                  key={idx}
                  href={`#${link.target}`}
                  onClick={navigateToSection(link.target)}
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors py-1 group"
                >
                  <span>{link.name}</span>
                  <span className="text-[9px] text-zinc-600 group-hover:text-[#FFDE00] transition-colors">
                    [{link.num}]
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Direct CTA Pill */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={navigateToSection("contact")}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFDE00] text-black font-display font-black text-[11px] uppercase tracking-wider hover:bg-[#FFE838] transition-all duration-300 shadow-lg shadow-[#FFDE00]/15 active:scale-95 group"
            >
              <span>CONNECT DIRECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[3] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 border border-white/10 rounded-full bg-zinc-900/80 text-white focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'translate-y-[2.5px] rotate-45 bg-[#FFDE00]' : 'mb-1'
                }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${
                  mobileMenuOpen ? '-translate-y-[2.5px] -rotate-45 bg-[#FFDE00]' : ''
                }`}
              />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden opacity-0 pointer-events-none"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="max-w-md w-full mx-auto space-y-6">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#FFDE00] mb-8 pb-4 border-b border-zinc-800">
            NAVIGATION INDEX &bull; FAIJAS P
          </div>

          <div className="flex flex-col space-y-4">
            {navLinks.map((link, idx) => {
              if (link.type === "route") {
                return (
                  <Link
                    key={idx}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="mobile-nav-link flex items-baseline justify-between text-2xl font-display font-black text-white hover:text-[#FFDE00] transition-colors uppercase border-b border-zinc-900 pb-3"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs font-mono text-zinc-500">[{link.num}]</span>
                  </Link>
                );
              }

              return (
                <a
                  key={idx}
                  href={`#${link.target}`}
                  onClick={navigateToSection(link.target)}
                  className="mobile-nav-link flex items-baseline justify-between text-2xl font-display font-black text-white hover:text-[#FFDE00] transition-colors uppercase border-b border-zinc-900 pb-3"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-zinc-500">[{link.num}]</span>
                </a>
              );
            })}
          </div>

          <div className="pt-8">
            <a
              href="#contact"
              onClick={navigateToSection("contact")}
              className="w-full py-3.5 px-6 rounded-full bg-[#FFDE00] text-black font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>CONNECT DIRECT</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </a>
          </div>

          <div className="text-[10px] font-mono text-zinc-500 pt-4 text-center">
            &copy; {new Date().getFullYear()} {siteConfig.name} &bull; {siteConfig.location}
          </div>
        </div>
      </div>
    </>
  );
}
