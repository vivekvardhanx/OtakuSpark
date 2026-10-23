import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Character } from '../types/character';

interface SurpriseRevealModalProps {
  isOpen: boolean;
  pool: Character[];
  onComplete: (selected: Character) => void;
  onCancel: () => void;
}

export const SurpriseRevealModal: React.FC<SurpriseRevealModalProps> = ({
  isOpen,
  pool,
  onComplete,
}) => {
  const [shufflingCharacter, setShufflingCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (!isOpen || pool.length === 0) return;

    // Pick a final random character from pool
    const finalPick = pool[Math.floor(Math.random() * pool.length)];

    let intervalId: any;
    let step = 0;
    const maxSteps = 7;

    intervalId = setInterval(() => {
      step++;
      const randomChar = pool[Math.floor(Math.random() * pool.length)];
      setShufflingCharacter(randomChar);

      if (step >= maxSteps) {
        clearInterval(intervalId);
        setTimeout(() => {
          onComplete(finalPick);
        }, 150);
      }
    }, 75);

    return () => clearInterval(intervalId);
  }, [isOpen, pool, onComplete]);

  return (
    <AnimatePresence>
      {isOpen && shufflingCharacter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            className="relative flex flex-col items-center justify-center text-center p-8 max-w-sm w-full bg-[#101018] border border-[#8B5CF6]/50 rounded-2xl shadow-[0_0_60px_rgba(139,92,246,0.4)]"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6] mb-5 shadow-[0_0_25px_rgba(139,92,246,0.5)]">
              <Sparkles className="w-7 h-7 animate-spin" />
            </div>

            <span className="text-xs font-mono tracking-widest uppercase text-[#8B5CF6] font-bold">
              SUMMONING LEGEND
            </span>

            <h3 className="text-2xl font-black text-white mt-2 font-display tracking-tight truncate max-w-full">
              {shufflingCharacter.name}
            </h3>

            <p className="text-xs text-[#A5A1B2] mt-1 font-mono uppercase tracking-wider">
              {shufflingCharacter.anime}
            </p>

            <div className="mt-4 w-32 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#E5484D] animate-pulse w-full" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
