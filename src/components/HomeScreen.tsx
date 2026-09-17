import React from 'react';
import { motion } from 'motion/react';
import { GameMode } from '../types';
import { playSound } from '../utils/audio';
import { PWAInstallButton } from './PWAInstallButton';
import { CartoonHeroCrown } from './CartoonIcons';

interface HomeScreenProps {
  onSelectMode: (mode: GameMode) => void;
  unlockedStickerCount: number;
  totalStickerCount: number;
  onOpenGift: () => void;
  canOpenGift: boolean;
}

interface CandyBubble {
  mode: GameMode;
  label: string;
  bgClass: string;
  shapeClass: string;
  animDelay: string;
  icon: React.ReactNode;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectMode,
  unlockedStickerCount,
  totalStickerCount,
  onOpenGift,
  canOpenGift,
}) => {
  const bubbles: CandyBubble[] = [
    {
      mode: 'storybook',
      label: 'Story',
      bgClass: 'bg-[#FFD6E8]', // var(--pink)
      shapeClass: 'rounded-[38%_62%_60%_40%_/_45%_40%_60%_55%]',
      animDelay: '0.04s',
      icon: <img src="art/icon-story.png" alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs" draggable={false} />,
    },
    {
      mode: 'music',
      label: 'Music',
      bgClass: 'bg-[#D4F5E9]', // var(--mint)
      shapeClass: 'rounded-[55%_45%_35%_65%_/_40%_60%_40%_60%]',
      animDelay: '0.10s',
      icon: <img src="art/icon-music.png" alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs" draggable={false} />,
    },
    {
      mode: 'coloring',
      label: 'Color',
      bgClass: 'bg-[#FFF1C2]', // var(--butter)
      shapeClass: 'rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%]',
      animDelay: '0.16s',
      icon: <img src="art/icon-coloring.png" alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs" draggable={false} />,
    },
    {
      mode: 'dressup',
      label: 'Dress Up',
      bgClass: 'bg-[#E3D6FF]', // var(--lav)
      shapeClass: 'rounded-[60%_40%_45%_55%_/_55%_65%_35%_45%]',
      animDelay: '0.22s',
      icon: <img src="art/icon-dressup.png" alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs" draggable={false} />,
    },
    {
      mode: 'teaparty',
      label: 'Tea Party',
      bgClass: 'bg-[#FFE3EF]', // soft cotton pink
      shapeClass: 'rounded-[45%_55%_65%_35%_/_40%_50%_50%_60%]',
      animDelay: '0.28s',
      icon: <img src="art/icon-teaparty.png" alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs" draggable={false} />,
    },
    {
      mode: 'matching',
      label: 'Puzzles',
      bgClass: 'bg-[#E6FBEF]', // fresh pastel mint
      shapeClass: 'rounded-[38%_62%_58%_42%_/_50%_45%_55%_50%]',
      animDelay: '0.34s',
      icon: <img src="art/icon-puzzles.png" alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs" draggable={false} />,
    },
    {
      mode: 'petspa',
      label: 'Pet Spa',
      bgClass: 'bg-[#D8F3FE]', // soft water pastel
      shapeClass: 'rounded-[50%_50%_40%_60%_/_60%_40%_60%_40%]',
      animDelay: '0.40s',
      icon: <img src="art/icon-petshop.png" alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs" draggable={false} />,
    },
    {
      mode: 'magicwand',
      label: 'Magic Wand',
      bgClass: 'bg-[#FDE2F3]', // dreamy violet pink
      shapeClass: 'rounded-[42%_58%_62%_38%_/_55%_45%_55%_45%]',
      animDelay: '0.46s',
      icon: <img src="art/icon-magicwand.png" alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs" draggable={false} />,
    },
    {
      mode: 'shapesorter',
      label: 'Shapes',
      bgClass: 'bg-[#FEF3D6]', // lemon cream
      shapeClass: 'rounded-[60%_40%_50%_50%_/_45%_55%_45%_55%]',
      animDelay: '0.52s',
      icon: <img src="art/icon-shapes.png" alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs" draggable={false} />,
    },
    {
      mode: 'royalball',
      label: 'Dance Ball',
      bgClass: 'bg-[#F3E8FF]', // lilac dream
      shapeClass: 'rounded-[48%_52%_40%_60%_/_52%_48%_60%_40%]',
      animDelay: '0.58s',
      icon: <img src="art/icon-danceball.png" alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs" draggable={false} />,
    },
    {
      mode: 'crowndecorator',
      label: 'Crowns',
      bgClass: 'bg-[#FFE8DF]', // warm peach
      shapeClass: 'rounded-[52%_48%_60%_40%_/_40%_60%_40%_60%]',
      animDelay: '0.64s',
      icon: <img src="art/icon-crown.png" alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs" draggable={false} />,
    },
    {
      mode: 'bubblepop',
      label: 'Bubbles',
      bgClass: 'bg-[#E0F7FA]', // ice cyan
      shapeClass: 'rounded-[38%_62%_50%_50%_/_60%_40%_60%_40%]',
      animDelay: '0.70s',
      icon: <img src="art/icon-bubbles.png" alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs" draggable={false} />,
    },
    {
      mode: 'stickers',
      label: 'Stickers',
      bgClass: 'bg-[#FFF0F5]', // candy blossom
      shapeClass: 'rounded-[55%_45%_55%_45%_/_45%_55%_45%_55%]',
      animDelay: '0.76s',
      icon: <img src="art/icon-stickers.png" alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs" draggable={false} />,
    },
    {
      mode: 'royalgallery',
      label: 'Gallery',
      bgClass: 'bg-[#FFF4DE]', // warm gilded cream
      shapeClass: 'rounded-[45%_55%_50%_50%_/_55%_45%_50%_50%]',
      animDelay: '0.82s',
      icon: <img src="art/icon-gallery.png" alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs" draggable={false} />,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-2 p-3 sm:p-6 md:p-8 select-none relative max-w-7xl mx-auto">
      {/* Decorative Floaty Background Blobs positioned across screen */}
      <div
        className="absolute rounded-full opacity-45 filter blur-[2px] pointer-events-none w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] bg-[#D4F5E9] -top-[40px] -left-[40px]"
        aria-hidden="true"
      />
      <div
        className="absolute rounded-full opacity-45 filter blur-[2px] pointer-events-none w-[160px] h-[160px] sm:w-[240px] sm:h-[240px] bg-[#FFF1C2] bottom-[40px] -right-[30px]"
        aria-hidden="true"
      />
      <div
        className="absolute rounded-full opacity-35 filter blur-[2px] pointer-events-none w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] bg-[#E3D6FF] top-[30%] -right-[40px]"
        aria-hidden="true"
      />
      <div
        className="absolute rounded-full opacity-35 filter blur-[2px] pointer-events-none w-[140px] h-[140px] sm:w-[220px] sm:h-[220px] bg-[#FFD6E8] bottom-[25%] -left-[40px]"
        aria-hidden="true"
      />

      {/* Floating "install for offline play" chip */}
      <div
        className="fixed z-30 top-3 right-3 sm:top-5 sm:right-5"
        style={{ paddingTop: 'max(0px, env(safe-area-inset-top))' }}
      >
        <PWAInstallButton />
      </div>

      {/* Hero Area — the crown badge deliberately overlaps/breaks out of its
          own glass plaque for a "pop-up storybook" feel instead of sitting
          neatly boxed inside it. */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="text-center mt-6 sm:mt-8 mb-2 relative z-10"
      >
        <div className="relative w-fit mx-auto">
          <div className="glass-strong glow-lavender rounded-[42px] px-8 sm:px-12 pt-12 pb-5 sm:pt-14 sm:pb-6">
            <h1 className="font-script text-5xl sm:text-7xl text-[#FF6FA5] m-0 leading-none">
              Sparkle Town
            </h1>
            <p className="font-display italic font-semibold text-[#6E5FA6] text-base sm:text-lg mt-2">
              Pick something fun!
            </p>
            {totalStickerCount > 0 && (
              <p className="text-xs font-bold text-[#A67E14] mt-1.5">
                {unlockedStickerCount}/{totalStickerCount} stickers found
              </p>
            )}
          </div>

          {/* Crown badge — popping out above the plaque, overlapping its edge */}
          <motion.button
            id="btn-hero-gift"
            onClick={() => {
              playSound.sparkle();
              onOpenGift();
            }}
            disabled={!canOpenGift}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-linear-to-br from-[#FFD6E8] via-[#FFF1C2] to-[#E3D6FF] flex items-center justify-center glow-pink animate-float-hero cursor-pointer border-4 border-white"
            title="Sparkle Town!"
          >
            <CartoonHeroCrown className="w-16 h-16 sm:w-20 sm:h-20" />
          </motion.button>
        </div>
      </motion.div>

      {/* Bubbles Grid - Full Screen Responsive Layout, springing in staggered */}
      <div className="w-full max-w-5xl mx-auto flex-1 flex items-center justify-center relative z-10 px-2 my-2">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
          }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-5 justify-items-center w-full py-2"
        >
          {bubbles.map((b) => (
            <motion.button
              key={b.mode}
              id={`bubble-btn-${b.mode}`}
              onClick={() => {
                playSound.pop();
                onSelectMode(b.mode);
              }}
              variants={{
                hidden: { opacity: 0, y: 22, scale: 0.6 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ type: 'spring', stiffness: 340, damping: 18 }}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className={`w-[96px] h-[96px] sm:w-[108px] sm:h-[108px] md:w-[118px] md:h-[118px] ${b.shapeClass} ${b.bgClass} flex flex-col items-center justify-center gap-1 sm:gap-1.5 font-['Baloo_2'] font-bold text-[13px] sm:text-[14px] text-[#4A3B5C] shadow-[0_10px_22px_rgba(74,59,92,0.12)] cursor-pointer text-center p-2`}
            >
              <div className="pointer-events-none scale-105 sm:scale-115">{b.icon}</div>
              <span className="leading-tight pointer-events-none truncate w-full px-1">{b.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
