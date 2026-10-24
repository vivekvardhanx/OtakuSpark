import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles, Volume2, VolumeX, Pause, Play } from 'lucide-react';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section
      className="relative min-h-[520px] sm:min-h-[580px] lg:h-[72vh] lg:max-h-[720px] w-full flex items-center justify-center overflow-hidden bg-[#08080D] pt-20 pb-12 sm:pt-24 sm:pb-16 select-none border-b border-white/[0.06]"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0.65 }}
          animate={{ opacity: 0.42 }}
          transition={{ duration: 1.2, delay: 1.0, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover object-center scale-[1.02] filter brightness-95 contrast-110"
          >
            <source src="/assets/aistudio/videoplayback_af8c54e4.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Cinematic Multi-layered Contrast Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080D] via-[#08080D]/40 to-[#08080D]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,8,13,0.15)_0%,rgba(8,8,13,0.8)_75%,#08080D_100%)]" />

        {/* Ambient Atmospheric Violet & Crimson accents */}
        <div className="absolute top-[10%] left-[20%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-[#8B5CF6]/15 blur-[140px]" />
        <div className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-[#DC2626]/12 blur-[140px]" />

        {/* Subtle grid mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] opacity-35" />
      </div>

      {/* Main Content: Clean, Impactful Cinematic Hero Viewport (Reveals after 1s delay) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm text-[11px] sm:text-xs font-mono uppercase tracking-widest text-violet-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>156 Legendary Anime Icons</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-[#F5F3F8] leading-[0.92] font-display uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            LEGENDS
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#DC2626]">
              NEVER FADE.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#CBD5E1] font-normal tracking-wide drop-shadow-md">
            Iconic characters. Legendary moments.
          </p>
        </motion.div>

        {/* Buttons: Explore Characters & Surprise Me (Reveals right after headline) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-row items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2"
        >
          <button
            type="button"
            onClick={onExploreClick}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] active:scale-95 transition-all rounded-xl shadow-[0_0_25px_rgba(139,92,246,0.45)] cursor-pointer tracking-wider uppercase font-display"
          >
            <span>EXPLORE CHARACTERS</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onSurpriseClick}
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-[#F5F3F8] bg-black/40 backdrop-blur-sm hover:bg-white/[0.08] border border-white/20 hover:border-[#8B5CF6] active:scale-95 transition-all rounded-xl cursor-pointer tracking-wider uppercase font-display group"
          >
            <Sparkles className="w-4 h-4 text-[#8B5CF6] group-hover:rotate-12 transition-transform" />
            <span>SURPRISE ME</span>
          </button>
        </motion.div>
      </div>

      {/* Floating Video Controls in Bottom Corner (Fades in with text) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={togglePlay}
          className="p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer shadow-lg"
          title={isPlaying ? 'Pause background video' : 'Play background video'}
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer shadow-lg text-[11px] font-mono font-medium"
          title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#8B5CF6]" />}
          <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio ON'}</span>
        </button>
      </motion.div>
    </section>
  );
};
