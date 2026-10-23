import React, { useState } from 'react';
import { Play, ExternalLink, VideoOff, Search } from 'lucide-react';
import { Character } from '../types/character';

interface YouTubeEmbedProps {
  character: Character;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ character }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const hasVerifiedVideo =
    character.verificationStatus === 'verified' &&
    character.youtubeVideoId &&
    character.youtubeVideoId.length > 0;

  // Exact fallback YouTube search query for this character
  const searchUrl =
    character.youtubeVideoUrl ||
    `https://www.youtube.com/results?search_query=${encodeURIComponent(
      `${character.name} iconic scene ${character.anime}`
    )}`;

  return (
    <div className="w-full space-y-3">
      {/* 16:9 Video Container */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#101017] border border-white/10 shadow-2xl">
        {hasVerifiedVideo ? (
          isPlaying ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${character.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title={`${character.name} iconic scene`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center group cursor-pointer"
                 onClick={() => setIsPlaying(true)}
                 role="button"
                 tabIndex={0}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter' || e.key === ' ') {
                     e.preventDefault();
                     setIsPlaying(true);
                   }
                 }}
                 aria-label={`Play ${character.name} iconic scene`}
            >
              {/* Cinematic Backdrop Preview with character accent aura */}
              <div
                className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${character.accentColor}33 0%, #101017 80%)`,
                }}
              />

              {/* Large Play Button */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-200">
                <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white translate-x-0.5" />
              </div>

              {/* Play prompt text */}
              <div className="relative z-10 mt-4 space-y-1">
                <p className="text-sm sm:text-base font-semibold text-white tracking-wide">
                  Watch Iconic Scene
                </p>
                <p className="text-xs text-[#A5A1B2]">
                  Verified Scene · Click to play without audio autoplay
                </p>
              </div>
            </div>
          )
        ) : (
          /* Unverified Moment / Coming Soon Placeholder */
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#13131B]">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A5A1B2] mb-3">
              <VideoOff className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-white">
              Scene Moment Coming Soon
            </h4>
            <p className="text-xs sm:text-sm text-[#A5A1B2] max-w-md mt-1 mb-4">
              To protect authenticity, only verified embed-ready moments are hosted directly.
              You can watch this memorable scene immediately on YouTube below.
            </p>
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg transition-colors"
            >
              <Search className="w-4 h-4 text-[#8B5CF6]" />
              <span>Search Scene on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        )}
      </div>

      {/* Under-Video Action Bar: Verification status & Watch on YouTube */}
      <div className="flex items-center justify-between text-xs text-[#A5A1B2] px-1 pt-1">
        <div className="flex items-center gap-2">
          {character.verified === true || character.verificationStatus === 'verified' ? (
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Verified Scene
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[#A5A1B2] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              Unverified
            </span>
          )}
        </div>

        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[#8B5CF6] hover:text-[#A78BFA] font-medium transition-colors"
        >
          <span>Watch on YouTube</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
