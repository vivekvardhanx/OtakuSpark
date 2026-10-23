import React, { useState, useEffect } from 'react';
import { Flame, Search, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenSearch: () => void;
  onSurpriseClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateToSection,
  onOpenSearch,
  onSurpriseClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateToSection(id);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08080D]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
          : 'bg-gradient-to-b from-[#08080D]/90 via-[#08080D]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-lg sm:text-xl font-black tracking-tight text-[#F5F3F8] group focus-visible:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6]/30 to-[#E5484D]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <Flame className="w-4 h-4 fill-[#8B5CF6]" />
            </div>
            <span className="font-display tracking-wider uppercase font-black">
              OTAKU<span className="text-[#8B5CF6]">SPARK</span>
            </span>
          </button>

          {/* Minimal Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-[#A5A1B2]">
            <button
              type="button"
              onClick={() => handleLinkClick('all-characters-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Characters
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('iconic-moments-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Iconic Moments
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('themes-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Themes
            </button>
          </nav>

          {/* Right Actions: Compact Search + Surprise Me Button */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search characters"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#A5A1B2] hover:text-[#F5F3F8] border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px] font-mono text-slate-400">Search</span>
              <kbd className="hidden lg:inline text-[10px] font-mono px-1 rounded bg-white/10 text-slate-300">
                /
              </kbd>
            </button>

            <button
              type="button"
              onClick={onSurpriseClick}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] active:scale-95 transition-all rounded-lg shadow-[0_0_25px_rgba(139,92,246,0.4)] whitespace-nowrap cursor-pointer uppercase tracking-wider font-display"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              <span className="hidden sm:inline">Surprise Me</span>
              <span className="sm:hidden">Random</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 text-[#A5A1B2] hover:text-white border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-xl bg-[#101018] border border-white/10 shadow-2xl space-y-3 animate-in fade-in duration-200">
            <button
              type="button"
              onClick={() => handleLinkClick('all-characters-section')}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-[#A5A1B2] hover:text-white hover:bg-white/5"
            >
              Characters
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('iconic-moments-section')}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-[#A5A1B2] hover:text-white hover:bg-white/5"
            >
              Iconic Moments
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('themes-section')}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-[#A5A1B2] hover:text-white hover:bg-white/5"
            >
              Themes
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
