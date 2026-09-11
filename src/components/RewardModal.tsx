import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { StickerItem } from '../types';
import { playSound } from '../utils/audio';
import { CartoonHeroCrown, CartoonStickerStarIcon } from './CartoonIcons';

interface RewardModalProps {
  sticker: StickerItem | null;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export const RewardModal: React.FC<RewardModalProps> = ({
  sticker,
  onClose,
  title = 'Royal Treasure Reward!',
  subtitle = 'You earned a magical new sticker!',
}) => {
  useEffect(() => {
    if (!sticker) return;

    playSound.fanfare();
    playSound.sparkle();

    // Toddler-delightful pastel & glitter confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#ec4899', '#facc15', '#c084fc', '#60a5fa', '#fef08a'],
      });
    } catch {
      // Ignore in environments where canvas may be restricted
    }
  }, [sticker]);

  return (
    <AnimatePresence>
      {sticker && (
        <motion.div
          id="reward-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            id="reward-modal-card"
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            className="w-full max-w-sm rounded-[34px] glass-strong glow-gold p-6 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Floating Cartoon Crown — breaks out above the card */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.1 }}
              className="absolute -top-9 left-1/2 -translate-x-1/2 bg-white glow-gold rounded-full p-2"
            >
              <CartoonHeroCrown className="w-12 h-12" />
            </motion.div>

            <h3 className="mt-6 font-display italic text-2xl sm:text-3xl font-bold text-[#FF6FA5]">
              {title}
            </h3>
            <p className="text-sm font-bold text-[#4A3B5C] opacity-80 mt-1">
              {subtitle}
            </p>

            {/* Sticker Box */}
            <div className="my-5 mx-auto w-32 h-32 rounded-3xl bg-linear-to-br from-[#FFD6E8] to-[#E3D6FF] border-4 border-dashed border-[#FF6FA5] flex flex-col items-center justify-center shadow-inner relative group">
              <span className="text-6xl filter drop-shadow-md select-none animate-bounce">
                {sticker?.emoji}
              </span>
              <span className="text-xs font-bold text-[#4A3B5C] mt-1 bg-white/90 px-2.5 py-0.5 rounded-full font-['Baloo_2']">
                {sticker?.name}
              </span>
            </div>

            <p className="text-xs font-bold text-[#4A3B5C] mb-5 flex items-center justify-center gap-1.5">
              <CartoonStickerStarIcon className="w-4 h-4" />
              <span>Added to your Royal Sticker Album!</span>
            </p>

            <motion.button
              id="btn-claim-reward"
              onClick={() => {
                playSound.boing();
                onClose();
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full rounded-2xl bg-linear-to-r from-[#FF6FA5] to-[#8A6FE0] py-3.5 text-lg font-bold text-white glow-pink cursor-pointer font-['Baloo_2']"
            >
              Yay! Keep Playing
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
