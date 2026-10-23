import React from 'react';
import { Character } from '../types/character';
import { Play, Sparkles } from 'lucide-react';

interface DailyFireQuoteProps {
  featuredCharacter: Character;
  onSelect: (character: Character) => void;
}

export const DailyFireQuote: React.FC<DailyFireQuoteProps> = ({
  featuredCharacter,
  onSelect,
}) => {
  return (
    <div
      id="verified-moments"
      className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#17142A] via-[#15151D] to-[#1E121E] border border-[#8B5CF6]/30 p-6 sm:p-8 shadow-[0_0_40px_-15px_rgba(139,92,246,0.3)] my-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8B5CF6] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Moment Spotlight</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span className="text-slate-400">{featuredCharacter.anime}</span>
          </div>

          <blockquote className="text-xl sm:text-2xl font-black tracking-tight text-[#F5F3F8] leading-tight font-display">
            "{featuredCharacter.quoteText}"
          </blockquote>

          <div className="flex items-center gap-2 text-xs text-[#A5A1B2]">
            <span className="font-bold text-[#F5F3F8]">{featuredCharacter.name}</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span className="italic text-[#8B5CF6]">"{featuredCharacter.characterTitle}"</span>
            {featuredCharacter.episodeOrChapter && (
              <>
                <span aria-hidden="true" className="text-white/20">·</span>
                <span className="font-mono text-slate-400">{featuredCharacter.episodeOrChapter}</span>
              </>
            )}
          </div>
        </div>

        <div className="shrink-0">
          <button
            type="button"
            onClick={() => onSelect(featuredCharacter)}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] active:scale-95 transition-all rounded-xl shadow-[0_0_25px_rgba(139,92,246,0.4)] cursor-pointer font-display uppercase tracking-wide"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Watch This Moment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
