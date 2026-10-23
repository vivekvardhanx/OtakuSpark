import React from 'react';
import { Play, Sparkles, ArrowRight } from 'lucide-react';
import { Character } from '../types/character';

interface FeaturedLegendsProps {
  legends: Character[];
  onSelectCharacter: (char: Character) => void;
  onViewAllClick: () => void;
}

export const FeaturedLegends: React.FC<FeaturedLegendsProps> = ({
  legends,
  onSelectCharacter,
  onViewAllClick,
}) => {
  if (legends.length === 0) return null;

  const leadLegend = legends[0];
  const sideLegends = legends.slice(1, 5);

  return (
    <section id="featured-legends-section" className="py-20 border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#8B5CF6] uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EDITORIAL SPOTLIGHT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F5F3F8] uppercase font-display">
              FEATURED LEGENDS
            </h2>
            <p className="text-sm sm:text-base text-[#A5A1B2] max-w-lg">
              The towering anime figures whose defining moments set the gold standard for resolve and courage.
            </p>
          </div>

          <button
            type="button"
            onClick={onViewAllClick}
            className="self-start sm:self-end inline-flex items-center gap-2 text-xs font-bold text-[#8B5CF6] hover:text-[#A78BFA] transition-colors uppercase tracking-widest font-mono cursor-pointer"
          >
            <span>Browse All 50 Characters</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Asymmetrical Editorial Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Lead Feature (col-span-7) */}
          <div
            onClick={() => onSelectCharacter(leadLegend)}
            className="lg:col-span-7 group relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[520px] rounded-2xl overflow-hidden bg-[#101018] border border-white/10 hover:border-[#8B5CF6]/50 transition-all duration-500 shadow-2xl cursor-pointer"
          >
            <img
              src={leadLegend.imageUrl}
              alt={leadLegend.name}
              style={{ objectPosition: leadLegend.imagePosition || 'top' }}
              className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Cinematic Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080D] via-[#08080D]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08080D]/80 via-transparent to-transparent" />

            {/* Video Badge */}
            {leadLegend.verificationStatus === 'verified' && (
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#08080D]/80 backdrop-blur-md border border-white/15 text-xs font-semibold text-white group-hover:bg-[#8B5CF6] transition-colors">
                <Play className="w-3.5 h-3.5 fill-current text-white" />
                <span>Featured Scene</span>
              </div>
            )}

            {/* Overlay Info */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 space-y-3 z-20 text-left">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A5A1B2]">
                <span className="text-[#8B5CF6] font-bold">{leadLegend.anime}</span>
                <span aria-hidden="true" className="text-white/20">·</span>
                <span>{leadLegend.motivationalTheme}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-display">
                {leadLegend.name}
              </h3>

              <p className="text-base sm:text-lg font-semibold text-[#8B5CF6] italic font-display">
                "{leadLegend.characterTitle}"
              </p>

              <blockquote className="text-xs sm:text-sm text-slate-300 italic max-w-xl line-clamp-2 pt-2 border-t border-white/10">
                "{leadLegend.quoteText}"
              </blockquote>
            </div>

            {/* Subtle glow border */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-[#8B5CF6]/40 pointer-events-none transition-all" />
          </div>

          {/* Secondary Stack (col-span-5): 4 compact responsive tiles */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sideLegends.map((char) => (
              <div
                key={char.id}
                onClick={() => onSelectCharacter(char)}
                className="group relative aspect-[4/5] sm:aspect-auto sm:h-[248px] rounded-2xl overflow-hidden bg-[#101018] border border-white/10 hover:border-[#8B5CF6]/50 transition-all duration-300 shadow-xl cursor-pointer text-left"
              >
                <img
                  src={char.imageUrl}
                  alt={char.name}
                  style={{ objectPosition: char.imagePosition || 'top' }}
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080D] via-[#08080D]/40 to-transparent" />

                {/* Subtle Play Icon */}
                {char.verificationStatus === 'verified' && (
                  <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-[#08080D]/80 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#8B5CF6] transition-colors">
                    <Play className="w-3 h-3 fill-current" />
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 p-4 space-y-1 z-10">
                  <span className="text-[11px] font-mono text-[#8B5CF6] uppercase font-semibold block">
                    {char.anime}
                  </span>
                  <h4 className="text-lg font-bold text-white group-hover:text-[#8B5CF6] transition-colors truncate">
                    {char.name}
                  </h4>
                  <p className="text-xs text-white/80 italic truncate">
                    "{char.characterTitle}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
