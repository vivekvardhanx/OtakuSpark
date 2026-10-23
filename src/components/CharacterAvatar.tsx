import React, { useState } from 'react';
import { Character } from '../types/character';

interface CharacterAvatarProps {
  character: Character;
  className?: string;
  size?: 'card' | 'detail';
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  character,
  className = '',
  size = 'card',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // High-contrast initials
  const initials = character.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#15151D] flex items-center justify-center select-none ${
        size === 'card' ? 'aspect-[3/4]' : 'aspect-square md:aspect-[4/5] rounded-xl'
      } ${className}`}
    >
      {/* Background stylized aura */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${character.accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Styled Canvas Fallback (always ready behind the image) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xl font-bold border border-white/10 shadow-lg mb-2"
          style={{
            backgroundColor: `${character.accentColor}20`,
            color: character.accentColor,
            borderColor: `${character.accentColor}35`,
          }}
        >
          {initials}
        </div>
        <span className="text-[11px] uppercase tracking-widest text-[#A5A1B2] font-mono">
          {character.anime}
        </span>
        <span className="text-sm font-bold text-[#F5F3F8] mt-1 max-w-[90%] truncate">
          {character.name}
        </span>
        <span className="text-xs italic text-[#8B5CF6]/90 mt-0.5 line-clamp-1">
          "{character.characterTitle}"
        </span>
      </div>

      {/* Image with graceful error fallback */}
      {!hasError && (
        <img
          src={character.imageUrl}
          alt={character.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
          style={{ objectPosition: character.imagePosition || 'top' }}
          className={`relative z-10 w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${size === 'card' ? 'group-hover:scale-105' : ''}`}
        />
      )}

      {/* Bottom gradient scrim for legibility */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[#09090D] via-[#09090D]/40 to-transparent" />
    </div>
  );
};
