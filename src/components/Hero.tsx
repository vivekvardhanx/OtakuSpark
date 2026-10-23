import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Character } from '../types/character';

interface HeroProps {
  onExploreClick: () => void;
  onSurpriseClick: () => void;
  featuredCharacters?: Character[];
  onSelectCharacter?: (char: Character) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onSurpriseClick,
}) => {
  return (
    <section
      className="relative min-h-[500px] sm:min-h-[540px] lg:h-[68vh] lg:max-h-[680px] w-full flex items-center justify-center overflow-hidden bg-[#08080D] pt-20 pb-12 sm:pt-24 sm:pb-16 select-none border-b border-white/[0.06]"
    >
      {/* Ambient Atmospheric Lighting (Minimal Cinematic Violet & Crimson accents) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft violet atmospheric glow */}
        <div className="absolute top-[10%] left-[20%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-[#8B5CF6]/12 blur-[140px]" />
        {/* Dramatic crimson subtle glow */}
        <div className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-[#DC2626]/10 blur-[140px]" />
        {/* Subtle grid mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] opacity-35" />
      </div>

      {/* Main Content: Clean, Impactful Cinematic Hero Viewport */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="space-y-4"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-[#F5F3F8] leading-[0.92] font-display uppercase">
            LEGENDS
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#DC2626]">
              NEVER FADE.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#A5A1B2] font-normal tracking-wide">
            Iconic characters. Legendary moments.
          </p>
        </motion.div>

        {/* Exactly Two Buttons: Explore Characters (primary violet) & Surprise Me (outline) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="flex flex-row items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2"
        >
          <button
            type="button"
            onClick={onExploreClick}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] active:scale-95 transition-all rounded-xl shadow-[0_0_25px_rgba(139,92,246,0.35)] cursor-pointer tracking-wider uppercase font-display"
          >
            <span>EXPLORE CHARACTERS</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onSurpriseClick}
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-[#F5F3F8] bg-transparent hover:bg-white/[0.05] border border-white/20 hover:border-[#8B5CF6] active:scale-95 transition-all rounded-xl cursor-pointer tracking-wider uppercase font-display group"
          >
            <Sparkles className="w-4 h-4 text-[#8B5CF6] group-hover:rotate-12 transition-transform" />
            <span>SURPRISE ME</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
