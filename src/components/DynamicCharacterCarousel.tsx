import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, PlayCircle } from 'lucide-react';
import { Character } from '../types/character';

interface DynamicCharacterCarouselProps {
  characters: Character[];
  onSelectCharacter: (char: Character) => void;
  onViewAllClick: () => void;
  isModalOpen?: boolean;
}

export const DynamicCharacterCarousel: React.FC<DynamicCharacterCarouselProps> = ({
  characters,
  onSelectCharacter,
  onViewAllClick,
  isModalOpen = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevModalOpenRef = useRef(isModalOpen);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = characters.length;
  const AUTOPLAY_INTERVAL = 2000; // 2 seconds per requirement

  // Clear interaction timer helper
  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  // Reset 3-second resume timer on any user interaction
  const triggerInteractionDelay = useCallback(() => {
    clearResumeTimer();
    setIsInteracting(true);
    // Only schedule resume if modal is not open
    if (!isModalOpen) {
      resumeTimerRef.current = setTimeout(() => {
        setIsInteracting(false);
        setProgress(0);
      }, 3000);
    }
  }, [clearResumeTimer, isModalOpen]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => clearResumeTimer();
  }, [clearResumeTimer]);

  // Handle modal open/close lifecycle
  useEffect(() => {
    if (prevModalOpenRef.current && !isModalOpen) {
      // Modal just closed: resume autoplay 3 seconds after it is closed
      clearResumeTimer();
      setIsInteracting(true);
      resumeTimerRef.current = setTimeout(() => {
        setIsInteracting(false);
        setProgress(0);
      }, 3000);
    } else if (!prevModalOpenRef.current && isModalOpen) {
      // Modal opened: stop autoplay immediately while open
      clearResumeTimer();
      setIsInteracting(true);
    }
    prevModalOpenRef.current = isModalOpen;
  }, [isModalOpen, clearResumeTimer]);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
    setProgress(0);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setProgress(0);
  }, [total]);

  const handleManualNext = useCallback(() => {
    triggerInteractionDelay();
    handleNext();
  }, [triggerInteractionDelay, handleNext]);

  const handleManualPrev = useCallback(() => {
    triggerInteractionDelay();
    handlePrev();
  }, [triggerInteractionDelay, handlePrev]);

  // Autoplay active condition: no hover pause, stops on interaction or open modal
  const shouldAutoplay = !isInteracting && !isModalOpen && !manualPause && !prefersReducedMotion && total > 1;

  useEffect(() => {
    if (!shouldAutoplay) return;

    const stepTime = 40;
    const increment = (stepTime / AUTOPLAY_INTERVAL) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [shouldAutoplay, total, handleNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleManualPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleManualNext();
    }
  };

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    triggerInteractionDelay();
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    triggerInteractionDelay();
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 40;
      if (distance > minSwipeDistance) {
        handleNext();
      } else if (distance < -minSwipeDistance) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (total === 0) return null;

  const activeChar = characters[currentIndex];

  return (
    <section
      id="featured-legends-section"
      className="py-10 sm:py-14 border-b border-white/[0.06] relative bg-[#08080D] overflow-hidden select-none outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Character Carousel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header: Minimal, reduced wasted space */}
        <div className="flex items-center justify-between gap-4">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F5F3F8] uppercase font-display">
              FEATURED LEGENDS
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A1B2]">
              Swipe or use arrow keys to navigate the collection.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Minimal Autoplay Indicator */}
            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={() => {
                  setManualPause((prev) => !prev);
                  triggerInteractionDelay();
                }}
                aria-label={manualPause || isInteracting || isModalOpen ? 'Resume autoplay' : 'Pause autoplay'}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[11px] font-mono text-[#A5A1B2] hover:text-white border border-white/10 transition-colors cursor-pointer"
              >
                {manualPause || isInteracting || isModalOpen ? (
                  <>
                    <PlayCircle className="w-3 h-3 text-[#8B5CF6]" />
                    <span>Paused</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3 h-3 text-[#8B5CF6]" />
                    <span>Auto 2s</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={onViewAllClick}
              className="text-xs font-semibold text-[#8B5CF6] hover:text-[#A78BFA] transition-colors uppercase tracking-wider font-mono cursor-pointer"
            >
              All {characters.length} →
            </button>
          </div>
        </div>

        {/* Dynamic Carousel Stage (Horizontal carousel: one large center card, neighbours partially visible) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full py-2 flex items-center justify-center min-h-[420px] sm:min-h-[460px] overflow-hidden"
        >
          {/* Small Prev Arrow */}
          <button
            type="button"
            onClick={handleManualPrev}
            aria-label="Previous character"
            className="absolute left-2 sm:left-4 z-40 p-2 sm:p-2.5 rounded-full bg-[#101018]/90 hover:bg-[#8B5CF6] text-white/80 hover:text-white border border-white/15 hover:border-[#8B5CF6] shadow-lg transition-all active:scale-95 cursor-pointer group"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Small Next Arrow */}
          <button
            type="button"
            onClick={handleManualNext}
            aria-label="Next character"
            className="absolute right-2 sm:right-4 z-40 p-2 sm:p-2.5 rounded-full bg-[#101018]/90 hover:bg-[#8B5CF6] text-white/80 hover:text-white border border-white/15 hover:border-[#8B5CF6] shadow-lg transition-all active:scale-95 cursor-pointer group"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Cards Track Container: transform & opacity only, 450ms cubic-bezier transition */}
          <div className="relative w-full max-w-4xl h-[400px] sm:h-[440px] flex items-center justify-center">
            {characters.map((char, index) => {
              // Calculate relative offset from currentIndex
              let offset = (index - currentIndex + total) % total;
              if (offset > total / 2) {
                offset -= total;
              }

              // Only render cards within visible range [-2, 2]
              const isVisible = Math.abs(offset) <= 2;
              if (!isVisible) return null;

              const isActive = offset === 0;
              const isImmediateNeighbor = Math.abs(offset) === 1;

              // Scale & opacity only (per requirement)
              const translateXPercent = prefersReducedMotion ? 0 : offset * 66;
              const scale = isActive ? 1.04 : isImmediateNeighbor ? 0.88 : 0.76;
              const opacity = isActive ? 1 : isImmediateNeighbor ? 0.5 : 0.2;
              const zIndex = isActive ? 30 : isImmediateNeighbor ? 20 : 10;

              return (
                <motion.div
                  key={char.id}
                  initial={false}
                  animate={{
                    x: `${translateXPercent}%`,
                    scale,
                    opacity,
                    zIndex,
                  }}
                  transition={{
                    duration: 0.45, // 450ms fast swipe
                    ease: [0.25, 1, 0.5, 1], // ease-out cubic-bezier
                  }}
                  onClick={() => {
                    triggerInteractionDelay();
                    onSelectCharacter(char);
                  }}
                  className={`absolute top-0 bottom-0 w-[260px] sm:w-[310px] md:w-[340px] h-[400px] sm:h-[440px] rounded-2xl overflow-hidden bg-[#101018] cursor-pointer transition-shadow duration-300 ${
                    isActive
                      ? 'border-2 border-[#8B5CF6] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(139,92,246,0.25)]'
                      : 'border border-white/10 hover:border-white/25 shadow-xl'
                  }`}
                  role="button"
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`${char.name} from ${char.anime}. Click to view details.`}
                >
                  {/* High Quality Anime Artwork with reserved dimensions */}
                  <div className="relative w-full h-full bg-[#08080D]">
                    <img
                      src={char.imageUrl}
                      alt={char.name}
                      width={340}
                      height={440}
                      loading={isActive || isImmediateNeighbor ? 'eager' : 'lazy'}
                      style={{ objectPosition: char.imagePosition || 'top' }}
                      className="w-full h-full object-cover filter brightness-95"
                    />

                    {/* Gradient scrim for readable text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080D] via-[#08080D]/40 to-transparent" />
                  </div>

                  {/* Cards show ONLY: artwork, character name, anime title */}
                  <div className="absolute inset-x-0 bottom-0 p-5 z-20 space-y-1 text-left bg-gradient-to-t from-[#08080D] via-[#08080D]/80 to-transparent pt-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#8B5CF6] font-semibold block">
                      {char.anime}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white font-display">
                      {char.name}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel Bottom Controls: Thin progress line and discreet dots */}
        <div className="flex flex-col items-center gap-2.5 pt-1">
          {/* Thin progress line */}
          {!prefersReducedMotion && (
            <div className="w-36 sm:w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8B5CF6] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Discreet pagination dots */}
          <div className="flex items-center gap-1.5">
            {characters.map((char, idx) => (
              <button
                key={char.id}
                type="button"
                onClick={() => {
                  triggerInteractionDelay();
                  setCurrentIndex(idx);
                  setProgress(0);
                }}
                aria-label={`Go to ${char.name}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-5 h-1 bg-[#8B5CF6]'
                    : 'w-1 h-1 bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <span className="text-[11px] font-mono text-[#A5A1B2]">
            {currentIndex + 1} of {total} · {activeChar.name}
          </span>
        </div>
      </div>
    </section>
  );
};
