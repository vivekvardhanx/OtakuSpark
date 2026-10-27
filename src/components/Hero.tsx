import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Sparkles, Volume2, VolumeX, Pause, Play, Eye, EyeOff } from 'lucide-react';
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
  const [isCinemaMode, setIsCinemaMode] = useState(false);

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
      className="relative min-h-[540px] sm:min-h-[600px] lg:h-[75vh] lg:max-h-[760px] w-full flex items-center justify-center overflow-hidden bg-[#08080D] pt-20 pb-12 sm:pt-24 sm:pb-16 select-none border-b border-white/[0.06]"
    >
      {/* Background Video Layer - Vibrant & High Contrast */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className={`w-full h-full object-cover object-center scale-[1.02] filter brightness-105 contrast-110 transition-opacity duration-700 ${
            isCinemaMode ? 'opacity-95' : 'opacity-85'
          }`}
        >
          <source src="/assets/aistudio/videoplayback_af8c54e4.mp4" type="video/mp4" />
        </video>

        {/* Lightweight Cinematic Vignette: leaves center crystal clear while preserving top navbar & bottom carousel blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080D]/75 via-transparent to-[#08080D]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(8,8,13,0.65)_85%,#08080D_100%)]" />

        {/* Subtle atmospheric ambient glows */}
        <div className="absolute top-[10%] left-[20%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-[#8B5CF6]/10 blur-[140px]" />
        <div className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-[#DC2626]/10 blur-[140px]" />

        {/* Subtle grid mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
      </div>

      {/* Main Content: Hollow Transparent Kinetic Typography & Actions */}
      <AnimatePresence>
        {!isCinemaMode && (
          <motion.div
            key="hero-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16, transition: { duration: 0.3 } }}
            transition={{ duration: 0.9, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-6 sm:space-y-8"
          >
            {/* Top Badge */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[11px] sm:text-xs font-mono uppercase tracking-widest text-violet-300 shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>156 Legendary Anime Icons</span>
              </div>

              {/* Hollow Transparent Cutout Headline: Video shows directly through the letters! */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-[0.92] font-display uppercase group cursor-default">
                <span
                  className="block text-transparent transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  style={{
                    WebkitTextStroke: '2px rgba(255, 255, 255, 0.9)',
                    textShadow: '0 0 25px rgba(255, 255, 255, 0.15)',
                  }}
                >
                  LEGENDS
                </span>
                <span
                  className="block text-transparent transition-all duration-500 hover:drop-shadow-[0_0_30px_rgba(139,92,246,0.8)]"
                  style={{
                    WebkitTextStroke: '2.5px #A78BFA',
                    textShadow: '0 0 35px rgba(139, 92, 246, 0.65)',
                  }}
                >
                  NEVER FADE.
                </span>
              </h1>

              <p className="text-base sm:text-xl text-[#F5F3F8]/90 font-medium tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                Iconic characters. Legendary moments.
              </p>
            </div>

            {/* Action Buttons: Clean glassmorphic styling */}
            <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white bg-[#8B5CF6]/90 hover:bg-[#8B5CF6] active:scale-95 transition-all rounded-xl shadow-[0_0_30px_rgba(139,92,246,0.5)] cursor-pointer tracking-wider uppercase font-display backdrop-blur-sm"
              >
                <span>EXPLORE CHARACTERS</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onSurpriseClick}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-[#F5F3F8] bg-black/60 backdrop-blur-md hover:bg-black/80 border border-white/20 hover:border-[#8B5CF6] active:scale-95 transition-all rounded-xl cursor-pointer tracking-wider uppercase font-display group shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-[#8B5CF6] group-hover:rotate-12 transition-transform" />
                <span>SURPRISE ME</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Video Controls in Bottom Corner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2"
      >
        {/* Cinema View / Hide UI Toggle */}
        <button
          type="button"
          onClick={() => setIsCinemaMode((prev) => !prev)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full backdrop-blur-md border transition-all cursor-pointer shadow-lg text-[11px] font-mono font-medium ${
            isCinemaMode
              ? 'bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[0_0_15px_rgba(139,92,246,0.6)]'
              : 'bg-black/60 hover:bg-black/80 border-white/15 text-white/80 hover:text-white'
          }`}
          title={isCinemaMode ? 'Show text & buttons' : 'Cinema Mode (Watch unobstructed video)'}
          aria-label={isCinemaMode ? 'Show text and buttons' : 'Enable Cinema Mode'}
        >
          {isCinemaMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-violet-300" />}
          <span>{isCinemaMode ? 'Exit Cinema' : 'Cinema View'}</span>
        </button>

        {/* Play/Pause */}
        <button
          type="button"
          onClick={togglePlay}
          className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white/80 hover:text-white transition-all cursor-pointer shadow-lg"
          title={isPlaying ? 'Pause background video' : 'Play background video'}
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        </button>

        {/* Audio Mute/Unmute */}
        <button
          type="button"
          onClick={toggleMute}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white/80 hover:text-white transition-all cursor-pointer shadow-lg text-[11px] font-mono font-medium"
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
