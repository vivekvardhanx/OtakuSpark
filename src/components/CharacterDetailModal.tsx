import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Copy, Check, Quote, Sparkles } from 'lucide-react';
import { Character } from '../types/character';
import { CharacterAvatar } from './CharacterAvatar';
import { YouTubeEmbed } from './YouTubeEmbed';

interface CharacterDetailModalProps {
  character: Character | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export const CharacterDetailModal: React.FC<CharacterDetailModalProps> = ({
  character,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}) => {
  const [copied, setCopied] = useState(false);

  // Keyboard navigation: Escape to close, Left/Right for previous/next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (character) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [character]);

  if (!character) return null;

  const handleCopyQuote = () => {
    const textToCopy = `"${character.quoteText}" — ${character.name} (${character.anime})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="character-detail-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-xl overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Animated Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-5xl my-auto bg-[#101018] border border-white/10 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden text-left focus:outline-none"
        >
          {/* Top Header Bar */}
          <div className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-[#101018]/95 backdrop-blur border-b border-white/10">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#A5A1B2] hover:text-[#F5F3F8] transition-colors py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer"
                aria-label="Back to gallery"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Roster</span>
              </button>

              {currentIndex !== undefined && totalCount !== undefined && (
                <span className="hidden sm:inline text-xs font-mono text-[#A5A1B2]">
                  {currentIndex + 1} of {totalCount}
                </span>
              )}
            </div>

            {/* Quick Prev / Next + Close */}
            <div className="flex items-center gap-2">
              {onPrev && (
                <button
                  onClick={onPrev}
                  aria-label="Previous character"
                  className="p-2 text-[#A5A1B2] hover:text-[#F5F3F8] rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  aria-label="Next character"
                  className="p-2 text-[#A5A1B2] hover:text-[#F5F3F8] rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 text-[#A5A1B2] hover:text-[#F5F3F8] rounded-lg bg-white/5 hover:bg-white/10 transition-colors ml-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body: 2-Column Responsive Split */}
          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Character Portrait & Core Identity */}
              <div className="lg:col-span-4 flex flex-col space-y-4">
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-xl">
                  <CharacterAvatar character={character} size="detail" />
                </div>

                {/* Identity & Tags */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A5A1B2]">
                    <span className="text-[#8B5CF6] font-semibold">{character.anime}</span>
                    <span aria-hidden="true" className="text-white/20">·</span>
                    <span>{character.motivationalTheme}</span>
                  </div>

                  <h2 id="character-detail-title" className="text-2xl sm:text-3xl font-black tracking-tight text-[#F5F3F8]">
                    {character.name}
                  </h2>

                  <p className="text-sm leading-relaxed text-[#CBD5E1] pt-3 border-t border-white/10 line-clamp-2">
                    {character.shortDescription}
                  </p>
                </div>
              </div>

              {/* Right: The Scene & Motivational Breakdown */}
              <div className="lg:col-span-8 space-y-6">
                {/* Central Video Player */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#8B5CF6] font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Iconic Scene
                    </span>
                  </div>
                  <YouTubeEmbed character={character} />
                  {(() => {
                    const parts: string[] = [];
                    if (character.episode !== undefined && character.episode !== null && String(character.episode).trim() !== '') {
                      const ep = String(character.episode).replace(/^(episode\s*|ep\.?\s*)/i, '').trim();
                      if (ep) parts.push(`Episode ${ep}`);
                    }
                    if (character.chapter !== undefined && character.chapter !== null && String(character.chapter).trim() !== '') {
                      const ch = String(character.chapter).replace(/^(chapter\s*|ch\.?\s*)/i, '').trim();
                      if (ch) parts.push(`Chapter ${ch}`);
                    }
                    const text = parts.length > 0 
                      ? parts.join(' · ') 
                      : (character.episodeOrChapter && character.episodeOrChapter.trim() 
                          ? character.episodeOrChapter.replace(/\s*[\/|\\]\s*/g, ' · ').trim() 
                          : null);
                    if (!text) return null;
                    return (
                      <p className="text-xs font-mono text-[#A5A1B2] tracking-wide px-1">
                        {text}
                      </p>
                    );
                  })()}
                </div>

                {/* Iconic Quote Section */}
                <div className="relative p-5 sm:p-6 rounded-xl bg-[#08080D] border border-white/10 space-y-3">
                  <Quote className="w-8 h-8 text-[#8B5CF6]/30" />
                  <blockquote className="text-lg sm:text-xl font-bold tracking-tight text-[#F5F3F8] leading-snug font-display">
                    "{character.quoteText}"
                  </blockquote>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs text-[#A5A1B2]">
                    <cite className="not-italic font-medium text-slate-300">
                      {character.sceneName ? `${character.quoteSource} — ${character.sceneName}` : character.quoteSource}
                    </cite>
                    <button
                      onClick={handleCopyQuote}
                      className="inline-flex items-center gap-1.5 text-xs text-[#8B5CF6] hover:text-[#A78BFA] transition-colors self-start sm:self-auto cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-medium">Copied to clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Quote</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* “WHY THIS MOMENT HITS” Section */}
                <div className="p-5 sm:p-6 rounded-xl bg-[#0F0F16] border border-white/10 space-y-2">
                  <h4 className="text-sm font-bold tracking-wider uppercase text-[#F5F3F8] font-mono flex items-center gap-2">
                    <span className="w-1.5 h-3.5 rounded-sm bg-[#8B5CF6]" />
                    WHY THIS MOMENT HITS
                  </h4>
                  <p className="text-sm sm:text-base leading-relaxed text-[#CBD5E1] line-clamp-3">
                    {character.whyItHitsHard}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
