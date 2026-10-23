import React, { useState } from 'react';
import { Character } from '../types/character';
import { Play } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // High contrast initials fallback
  const initials = character.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      onClick={() => onSelect(character)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(character);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${character.name} from ${character.anime}. Click to view details.`}
      className="group relative flex flex-col justify-end aspect-[3/4] bg-[#101018] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#8B5CF6]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(139,92,246,0.25)] cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] select-none"
    >
      {/* Fallback canvas background behind image */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-[#15151D] text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border border-white/10 mb-2"
          style={{
            backgroundColor: `${character.accentColor}25`,
            color: character.accentColor,
            borderColor: `${character.accentColor}40`,
          }}
        >
          {initials}
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#A5A1B2]">
          {character.anime}
        </span>
        <span className="text-xs font-bold text-white mt-0.5 truncate max-w-[85%]">
          {character.name}
        </span>
      </div>

      {/* Main Character Artwork */}
      {!imageError && (
        <img
          src={character.imageUrl}
          alt={character.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          onLoad={() => setImageLoaded(true)}
          style={{ objectPosition: character.imagePosition || 'top' }}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Cinematic Gradient Scrim: ensures clean text contrast without hiding character artwork */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#08080D] via-[#08080D]/40 to-transparent opacity-90 group-hover:opacity-85 transition-opacity" />

      {/* Top Badges: Motivational Theme & Verified Scene */}
      <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
        <span className="px-2 py-0.5 rounded-md bg-[#08080D]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#A5A1B2]">
          {character.motivationalTheme}
        </span>

        {character.verificationStatus === 'verified' && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#08080D]/85 backdrop-blur-md border border-white/15 text-[10px] font-semibold text-white shadow-sm">
            <Play className="w-2.5 h-2.5 fill-[#8B5CF6] text-[#8B5CF6]" />
            <span>Scene</span>
          </div>
        )}
      </div>

      {/* Clean Character Name & Series Overlay */}
      <div className="relative z-20 p-4 sm:p-5 flex flex-col justify-end space-y-1">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B5CF6] font-semibold">
          {character.anime}
        </span>

        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#F5F3F8] group-hover:text-white transition-colors">
          {character.name}
        </h3>

        <p className="text-xs text-[#A5A1B2] italic truncate font-sans">
          "{character.characterTitle}"
        </p>
      </div>

      {/* Bottom glowing accent bar on hover */}
      <div
        className="absolute bottom-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${character.accentColor || '#8B5CF6'}, transparent)`,
        }}
      />
    </article>
  );
};
