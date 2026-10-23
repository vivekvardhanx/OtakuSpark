import React, { useRef } from 'react';
import { Play, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Character } from '../types/character';

interface IconicMomentsStripProps {
  characters: Character[];
  onSelectCharacter: (char: Character) => void;
}

export const IconicMomentsStrip: React.FC<IconicMomentsStripProps> = ({
  characters,
  onSelectCharacter,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Focus on characters with verified iconic scenes
  const momentCharacters = characters.filter((c) => c.verificationStatus === 'verified');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="iconic-moments-section" className="py-10 sm:py-14 border-b border-white/[0.06] relative bg-[#08080D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Strip Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F5F3F8] uppercase font-display">
              ICONIC MOMENTS
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A1B2]">
              Defining scenes and breakthrough moments.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Scroll moments left"
              className="p-2 sm:p-2.5 rounded-lg bg-[#101018] hover:bg-[#1A1A24] text-[#A5A1B2] hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Scroll moments right"
              className="p-2 sm:p-2.5 rounded-lg bg-[#101018] hover:bg-[#1A1A24] text-[#A5A1B2] hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Editorial Strip */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory text-left scroll-smooth"
        >
          {momentCharacters.map((char) => (
            <div
              key={char.id}
              onClick={() => onSelectCharacter(char)}
              className="snap-start shrink-0 w-[280px] sm:w-[320px] group relative rounded-2xl overflow-hidden bg-[#101018] border border-white/10 hover:border-[#8B5CF6]/50 transition-all duration-300 shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#08080D]">
                <img
                  src={char.imageUrl}
                  alt={char.name}
                  style={{ objectPosition: char.imagePosition || 'top' }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101018] via-transparent to-transparent" />

                {/* Centered Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Concise Moment Info */}
              <div className="p-4 sm:p-5 space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B5CF6] font-semibold block">
                  {char.anime}
                </span>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#8B5CF6] transition-colors truncate">
                  {char.name}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2 italic pt-1.5 border-t border-white/[0.08]">
                  "{char.quoteText}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
