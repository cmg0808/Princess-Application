import React, { useEffect } from 'react';
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

  if (!sticker) return null;

  return (
    <div
      id="reward-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200 font-['Nunito']"
      onClick={onClose}
    >
      <div
        id="reward-modal-card"
        className="w-full max-w-sm rounded-[34px] bg-linear-to-b from-[#FFF0F5] via-white to-[#E3D6FF] p-6 text-center shadow-2xl border-4 border-yellow-300 relative transform transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Cartoon Crown */}
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-white border-3 border-yellow-300 shadow-lg rounded-full p-2 text-white">
          <CartoonHeroCrown className="w-12 h-12" />
        </div>

        <h3 className="mt-6 text-2xl sm:text-3xl font-extrabold text-[#FF6FA5] font-['Baloo_2']">
          {title}
        </h3>
        <p className="text-sm font-bold text-[#4A3B5C] opacity-80 mt-1">
          {subtitle}
        </p>

        {/* Sticker Box */}
        <div className="my-5 mx-auto w-32 h-32 rounded-3xl bg-linear-to-br from-[#FFD6E8] to-[#E3D6FF] border-4 border-dashed border-[#FF6FA5] flex flex-col items-center justify-center shadow-inner relative group">
          <span className="text-6xl filter drop-shadow-md select-none animate-bounce">
            {sticker.emoji}
          </span>
          <span className="text-xs font-bold text-[#4A3B5C] mt-1 bg-white/90 px-2.5 py-0.5 rounded-full font-['Baloo_2']">
            {sticker.name}
          </span>
        </div>

        <p className="text-xs font-bold text-[#4A3B5C] mb-5 flex items-center justify-center gap-1.5">
          <CartoonStickerStarIcon className="w-4 h-4" />
          <span>Added to your Royal Sticker Album!</span>
        </p>

        <button
          id="btn-claim-reward"
          onClick={() => {
            playSound.boing();
            onClose();
          }}
          className="w-full rounded-2xl bg-linear-to-r from-[#FF6FA5] to-[#8A6FE0] py-3.5 text-lg font-bold text-white shadow-lg shadow-pink-500/25 hover:opacity-95 active:scale-95 transition-transform cursor-pointer font-['Baloo_2']"
        >
          Yay! Keep Playing 💖
        </button>
      </div>
    </div>
  );
};
