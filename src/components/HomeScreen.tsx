import React, { useState, useEffect } from 'react';
import { Maximize, Minimize } from 'lucide-react';
import { GameMode } from '../types';
import { playSound } from '../utils/audio';
import {
  CartoonBookIcon,
  CartoonMusicIcon,
  CartoonPaletteIcon,
  CartoonDressIcon,
  CartoonTeacupIcon,
  CartoonPuzzleIcon,
  CartoonPetSpaIcon,
  CartoonMagicWandIcon,
  CartoonShapesIcon,
  CartoonBallIcon,
  CartoonCrownIcon,
  CartoonBubblesIcon,
  CartoonStickerStarIcon,
  CartoonHomeIcon,
  CartoonGiftIcon,
  CartoonSoundIcon,
  CartoonHeroCrown,
  CartoonGalleryIcon,
} from './CartoonIcons';

interface HomeScreenProps {
  onSelectMode: (mode: GameMode) => void;
  unlockedStickerCount: number;
  totalStickerCount: number;
  onOpenGift: () => void;
  canOpenGift: boolean;
  isMuted: boolean;
  onToggleSound: () => void;
  starsCount: number;
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
  isMuted,
  onToggleSound,
  starsCount,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    playSound.tap();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const bubbles: CandyBubble[] = [
    {
      mode: 'storybook',
      label: 'Story',
      bgClass: 'bg-[#FFD6E8]', // var(--pink)
      shapeClass: 'rounded-[38%_62%_60%_40%_/_45%_40%_60%_55%]',
      animDelay: '0.04s',
      icon: <CartoonBookIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs" />,
    },
    {
      mode: 'music',
      label: 'Music',
      bgClass: 'bg-[#D4F5E9]', // var(--mint)
      shapeClass: 'rounded-[55%_45%_35%_65%_/_40%_60%_40%_60%]',
      animDelay: '0.10s',
      icon: <CartoonMusicIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs" />,
    },
    {
      mode: 'coloring',
      label: 'Color',
      bgClass: 'bg-[#FFF1C2]', // var(--butter)
      shapeClass: 'rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%]',
      animDelay: '0.16s',
      icon: <CartoonPaletteIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs" />,
    },
    {
      mode: 'dressup',
      label: 'Dress Up',
      bgClass: 'bg-[#E3D6FF]', // var(--lav)
      shapeClass: 'rounded-[60%_40%_45%_55%_/_55%_65%_35%_45%]',
      animDelay: '0.22s',
      icon: <CartoonDressIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs" />,
    },
    {
      mode: 'teaparty',
      label: 'Tea Party',
      bgClass: 'bg-[#FFE3EF]', // soft cotton pink
      shapeClass: 'rounded-[45%_55%_65%_35%_/_40%_50%_50%_60%]',
      animDelay: '0.28s',
      icon: <CartoonTeacupIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs" />,
    },
    {
      mode: 'matching',
      label: 'Puzzles',
      bgClass: 'bg-[#E6FBEF]', // fresh pastel mint
      shapeClass: 'rounded-[38%_62%_58%_42%_/_50%_45%_55%_50%]',
      animDelay: '0.34s',
      icon: <CartoonPuzzleIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs" />,
    },
    {
      mode: 'petspa',
      label: 'Pet Spa',
      bgClass: 'bg-[#D8F3FE]', // soft water pastel
      shapeClass: 'rounded-[50%_50%_40%_60%_/_60%_40%_60%_40%]',
      animDelay: '0.40s',
      icon: <CartoonPetSpaIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs" />,
    },
    {
      mode: 'magicwand',
      label: 'Magic Wand',
      bgClass: 'bg-[#FDE2F3]', // dreamy violet pink
      shapeClass: 'rounded-[42%_58%_62%_38%_/_55%_45%_55%_45%]',
      animDelay: '0.46s',
      icon: <CartoonMagicWandIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs" />,
    },
    {
      mode: 'shapesorter',
      label: 'Shapes',
      bgClass: 'bg-[#FEF3D6]', // lemon cream
      shapeClass: 'rounded-[60%_40%_50%_50%_/_45%_55%_45%_55%]',
      animDelay: '0.52s',
      icon: <CartoonShapesIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs" />,
    },
    {
      mode: 'royalball',
      label: 'Dance Ball',
      bgClass: 'bg-[#F3E8FF]', // lilac dream
      shapeClass: 'rounded-[48%_52%_40%_60%_/_52%_48%_60%_40%]',
      animDelay: '0.58s',
      icon: <CartoonBallIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs" />,
    },
    {
      mode: 'crowndecorator',
      label: 'Crowns',
      bgClass: 'bg-[#FFE8DF]', // warm peach
      shapeClass: 'rounded-[52%_48%_60%_40%_/_40%_60%_40%_60%]',
      animDelay: '0.64s',
      icon: <CartoonCrownIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs" />,
    },
    {
      mode: 'bubblepop',
      label: 'Bubbles',
      bgClass: 'bg-[#E0F7FA]', // ice cyan
      shapeClass: 'rounded-[38%_62%_50%_50%_/_60%_40%_60%_40%]',
      animDelay: '0.70s',
      icon: <CartoonBubblesIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs" />,
    },
    {
      mode: 'stickers',
      label: 'Stickers',
      bgClass: 'bg-[#FFF0F5]', // candy blossom
      shapeClass: 'rounded-[55%_45%_55%_45%_/_45%_55%_45%_55%]',
      animDelay: '0.76s',
      icon: <CartoonStickerStarIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs" />,
    },
    {
      mode: 'royalgallery',
      label: 'Gallery',
      bgClass: 'bg-[#FFF4DE]', // warm gilded cream
      shapeClass: 'rounded-[45%_55%_50%_50%_/_55%_45%_50%_50%]',
      animDelay: '0.82s',
      icon: <CartoonGalleryIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs" />,
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col justify-between p-3 sm:p-6 md:p-8 select-none font-['Nunito'] relative max-w-7xl mx-auto">
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

      {/* Top Bar: Gate Lock / Sound / Stars / Fullscreen / Avatar */}
      <div className="flex justify-between items-center w-full relative z-10 px-2 sm:px-4 pt-1">
        {/* Gate / Parent Lock & Sound Toggle */}
        <button
          id="btn-gate-sound"
          onClick={() => {
            playSound.tap();
            onToggleSound();
          }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-[#E3D6FF] flex items-center justify-center hover:scale-110 active:scale-95 transition cursor-pointer shadow-[0_4px_12px_rgba(227,214,255,0.4)]"
          title={isMuted ? 'Turn Sound ON' : 'Mute Sound'}
          aria-label={isMuted ? 'Turn Sound ON' : 'Mute Sound'}
        >
          <CartoonSoundIcon isMuted={isMuted} className="w-6 h-6" />
        </button>

        {/* Middle: Stars Reward Counter Pill */}
        <button
          id="btn-star-gift"
          onClick={() => {
            playSound.sparkle();
            onOpenGift();
          }}
          className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-yellow-300 text-sm sm:text-base font-['Baloo_2'] font-extrabold text-[#7A5B0B] hover:scale-105 active:scale-95 transition cursor-pointer shadow-[0_4px_16px_rgba(255,241,194,0.7)]"
          title="Tap to open surprise gift!"
        >
          <CartoonStickerStarIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>{starsCount}</span>
          <span className="text-xs text-[#A67E14]">({unlockedStickerCount}/{totalStickerCount})</span>
        </button>

        {/* Right: Fullscreen Toggle & Sticker Album Avatar */}
        <div className="flex items-center gap-2">
          <button
            id="btn-fullscreen-home"
            onClick={toggleFullscreen}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-[#FFF1C2] flex items-center justify-center text-[#7A5B0B] hover:scale-110 active:scale-95 transition cursor-pointer shadow-[0_4px_12px_rgba(255,241,194,0.5)]"
            title={isFullscreen ? 'Exit Full Screen' : 'Go Full Screen'}
            aria-label={isFullscreen ? 'Exit Full Screen' : 'Go Full Screen'}
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>

          <button
            id="btn-avatar-stickers"
            onClick={() => {
              playSound.sparkle();
              onSelectMode('stickers');
            }}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 border-2 border-[#FFD6E8] flex items-center justify-center shadow-[0_6px_16px_rgba(255,111,165,0.3)] hover:scale-110 active:scale-95 transition cursor-pointer"
            title="View Sticker Album"
            aria-label="View Sticker Album"
          >
            <CartoonCrownIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
      </div>

      {/* Hero Area */}
      <div className="text-center my-3 sm:my-5 relative z-10">
        <div
          onClick={() => {
            playSound.sparkle();
            onOpenGift();
          }}
          className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-2.5 rounded-full bg-linear-to-br from-[#FFD6E8] via-[#FFF1C2] to-[#E3D6FF] flex items-center justify-center shadow-[0_12px_28px_rgba(255,111,165,0.4)] animate-float-hero cursor-pointer active:scale-95 transition border-4 border-white"
          title="Sparkle Town!"
        >
          <CartoonHeroCrown className="w-16 h-16 sm:w-20 sm:h-20" />
        </div>

        <h1 className="font-['Baloo_2'] font-extrabold text-3xl sm:text-5xl text-[#FF6FA5] m-0 leading-tight drop-shadow-xs">
          Sparkle Town
        </h1>
        <p className="font-bold text-[#4A3B5C] opacity-75 text-base sm:text-lg mt-1">
          Pick something fun!
        </p>
      </div>

      {/* Bubbles Grid - Full Screen Responsive Layout */}
      <div className="w-full max-w-5xl mx-auto flex-1 flex items-center justify-center relative z-10 px-2 my-2">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-5 justify-items-center w-full py-2">
          {bubbles.map((b) => (
            <button
              key={b.mode}
              id={`bubble-btn-${b.mode}`}
              onClick={() => {
                playSound.pop();
                onSelectMode(b.mode);
              }}
              style={{ animationDelay: b.animDelay }}
              className={`w-[96px] h-[96px] sm:w-[108px] sm:h-[108px] md:w-[118px] md:h-[118px] ${b.shapeClass} ${b.bgClass} flex flex-col items-center justify-center gap-1 sm:gap-1.5 font-['Baloo_2'] font-bold text-[13px] sm:text-[14px] text-[#4A3B5C] shadow-[0_10px_22px_rgba(74,59,92,0.12)] hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer text-center p-2 animate-[popBubble_0.4s_ease_backwards]`}
            >
              <div className="pointer-events-none scale-105 sm:scale-115">{b.icon}</div>
              <span className="leading-tight pointer-events-none truncate w-full px-1">{b.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Dock */}
      <div className="flex justify-center items-center gap-4 sm:gap-6 mt-4 relative z-10 pb-2">
        {/* Dock Item 1: Home (Active) */}
        <button
          id="dock-home"
          onClick={() => {
            playSound.tap();
            onSelectMode('home');
          }}
          className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-[20px] bg-white/95 backdrop-blur-sm border-2 border-[#FF6FA5] flex items-center justify-center shadow-[0_6px_16px_rgba(255,111,165,0.35)] cursor-pointer hover:scale-105 active:scale-95 transition"
          title="Home"
          aria-label="Home"
        >
          <CartoonHomeIcon className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>

        {/* Dock Item 2: Stickers / Favorites */}
        <button
          id="dock-stickers"
          onClick={() => {
            playSound.sparkle();
            onSelectMode('stickers');
          }}
          className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-[20px] bg-white/90 backdrop-blur-sm border-2 border-[#E3D6FF] flex items-center justify-center hover:bg-[#EDE5FF] active:scale-95 transition cursor-pointer shadow-[0_4px_12px_rgba(227,214,255,0.3)]"
          title="Stickers"
          aria-label="Stickers"
        >
          <CartoonStickerStarIcon className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>

        {/* Dock Item 3: Royal Surprise Present */}
        <button
          id="dock-gift"
          onClick={() => {
            playSound.sparkle();
            onOpenGift();
          }}
          className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-[20px] bg-white/90 backdrop-blur-sm border-2 border-[#FFE3EF] flex items-center justify-center hover:bg-[#FFE3EF] active:scale-95 transition cursor-pointer shadow-[0_4px_12px_rgba(255,111,165,0.25)]"
          title="Surprise Gift"
          aria-label="Surprise Gift"
        >
          <CartoonGiftIcon className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>

        {/* Dock Item 4: Fullscreen Toggle */}
        <button
          id="dock-fullscreen"
          onClick={toggleFullscreen}
          className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-[20px] bg-white/90 backdrop-blur-sm border-2 border-[#FFF1C2] flex items-center justify-center text-[#7A5B0B] hover:bg-[#FFF1C2] active:scale-95 transition cursor-pointer shadow-[0_4px_12px_rgba(255,241,194,0.3)]"
          title={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
          aria-label={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
        >
          {isFullscreen ? <Minimize className="w-5 h-5 text-[#7A5B0B]" /> : <Maximize className="w-5 h-5 text-[#7A5B0B]" />}
        </button>
      </div>

      {/* Caption from Wireframe */}
      <p className="text-center text-[#4A3B5C] font-bold mt-2 text-[13px] opacity-75">
        Style 2 — Candy Pastel Playroom: bubble shapes, floaty motion, cotton-candy palette
      </p>
    </div>
  );
};
