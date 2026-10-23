import React from 'react';
import { Flame, ArrowUp } from 'lucide-react';
import { MotivationalTheme } from '../types/character';

interface FooterProps {
  onBackToTop: () => void;
  onThemeSelect: (theme: MotivationalTheme) => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop, onThemeSelect }) => {
  return (
    <footer className="w-full bg-[#07070A] border-t border-white/[0.08] mt-24 py-16 text-[#A5A1B2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/[0.06]">
          {/* Brand & Motto */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-2.5 text-lg font-bold text-[#F5F3F8]">
              <div className="w-7 h-7 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
                <Flame className="w-4 h-4 fill-[#8B5CF6]" />
              </div>
              <span className="font-display tracking-tight uppercase">
                OTAKU<span className="text-[#8B5CF6]">SPARK</span>
              </span>
            </div>
            <p className="text-sm font-bold text-[#F5F3F8] tracking-wider uppercase font-display">
              ICONIC CHARACTERS. UNFORGETTABLE MOMENTS.
            </p>
            <p className="text-xs text-[#64748B] leading-relaxed">
              A cinematic tribute celebrating the greatest characters, defining quotes,
              and legendary scenes in anime history.
            </p>
          </div>

          {/* Quick theme navigation */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
              Pillars of Will
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#A5A1B2]">
              {(['Discipline', 'Courage', 'Confidence', 'Sacrifice', 'Leadership', 'Resilience', 'Mental Strength'] as MotivationalTheme[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    onThemeSelect(t);
                    onBackToTop();
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={onBackToTop}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#A5A1B2] hover:text-[#F5F3F8] px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer shrink-0 font-display"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Legal & Editorial Notes */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>
            © {new Date().getFullYear()} OtakuSpark. Non-commercial editorial tribute.
          </p>
          <p className="text-center sm:text-right">
            All character names, imagery, and series trademarks belong to their respective creators and animation studios.
          </p>
        </div>
      </div>
    </footer>
  );
};
