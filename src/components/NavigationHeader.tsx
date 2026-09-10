import React, { useState, useEffect } from 'react';
import { ArrowLeft, Maximize, Minimize } from 'lucide-react';
import { GameMode } from '../types';
import { playSound } from '../utils/audio';
import { PWAInstallButton } from './PWAInstallButton';
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
  CartoonSoundIcon,
  CartoonHeroCrown,
  CartoonGalleryIcon,
} from './CartoonIcons';

interface NavigationHeaderProps {
  currentMode: GameMode;
  onNavigate: (mode: GameMode) => void;
  isMuted: boolean;
  onToggleSound: () => void;
  starsCount: number;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentMode,
  onNavigate,
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

  // If on home, the home screen has its own integrated full-width top bar
  if (currentMode === 'home') {
    return null;
  }

  const getModeInfo = () => {
    switch (currentMode) {
      case 'teaparty':
        return { icon: <CartoonTeacupIcon className="w-6 h-6" />, title: 'Tea Party' };
      case 'petspa':
        return { icon: <CartoonPetSpaIcon className="w-6 h-6" />, title: 'Pet Spa' };
      case 'magicwand':
        return { icon: <CartoonMagicWandIcon className="w-6 h-6" />, title: 'Magic Wand' };
      case 'shapesorter':
        return { icon: <CartoonShapesIcon className="w-6 h-6" />, title: 'Shapes' };
      case 'royalball':
        return { icon: <CartoonBallIcon className="w-6 h-6" />, title: 'Dance Ball' };
      case 'storybook':
        return { icon: <CartoonBookIcon className="w-6 h-6" />, title: 'Story' };
      case 'crowndecorator':
        return { icon: <CartoonCrownIcon className="w-6 h-6" />, title: 'Crowns' };
      case 'coloring':
        return { icon: <CartoonPaletteIcon className="w-6 h-6" />, title: 'Color' };
      case 'dressup':
        return { icon: <CartoonDressIcon className="w-6 h-6" />, title: 'Dress Up' };
      case 'matching':
        return { icon: <CartoonPuzzleIcon className="w-6 h-6" />, title: 'Puzzles' };
      case 'bubblepop':
        return { icon: <CartoonBubblesIcon className="w-6 h-6" />, title: 'Bubbles' };
      case 'music':
        return { icon: <CartoonMusicIcon className="w-6 h-6" />, title: 'Music' };
      case 'stickers':
        return { icon: <CartoonStickerStarIcon className="w-6 h-6" />, title: 'Stickers' };
      case 'royalgallery':
        return { icon: <CartoonGalleryIcon className="w-6 h-6" />, title: 'Royal Gallery' };
      default:
        return { icon: <CartoonHeroCrown className="w-6 h-6" />, title: 'Playroom' };
    }
  };

  const modeInfo = getModeInfo();

  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b-2 border-[#E3D6FF] px-3 py-2 sm:px-6 shadow-[0_4px_20px_rgba(227,214,255,0.4)] select-none font-['Nunito']"
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Back to Home Button (Lavender Gate Style) */}
        <button
          id="btn-nav-home"
          onClick={() => {
            playSound.tap();
            onNavigate('home');
          }}
          className="flex items-center gap-1.5 rounded-full bg-[#E3D6FF] px-3.5 py-1.5 text-[#4A3B5C] font-['Baloo_2'] font-bold text-sm shadow-2xs hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#6E5FA6]" />
          <span>Home</span>
        </button>

        {/* Center: Game Title with Cartoon Icon in Baloo 2 */}
        <div className="flex items-center gap-2 font-['Baloo_2']">
          <div className="scale-110">{modeInfo.icon}</div>
          <span className="font-extrabold text-[#FF6FA5] text-base sm:text-xl">
            {modeInfo.title}
          </span>
        </div>

        {/* Right side: Stars, Fullscreen, Sound, and PWA Install */}
        <div className="flex items-center gap-2">
          <PWAInstallButton />

          {/* Fullscreen Toggle */}
          <button
            id="btn-fullscreen-toggle"
            onClick={toggleFullscreen}
            className="w-9 h-9 rounded-full bg-[#FFF1C2] hover:bg-[#FFE89E] flex items-center justify-center text-[#7A5B0B] transition active:scale-90 cursor-pointer shadow-2xs"
            title={isFullscreen ? 'Exit Full Screen' : 'Go Full Screen'}
            aria-label={isFullscreen ? 'Exit Full Screen' : 'Go Full Screen'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Stars badge */}
          <div className="flex items-center gap-1.5 bg-[#FFF1C2] px-2.5 py-1 rounded-full border border-yellow-300 text-xs font-['Baloo_2'] font-extrabold text-[#7A5B0B] shadow-2xs">
            <CartoonStickerStarIcon className="w-4 h-4" />
            <span>{starsCount}</span>
          </div>

          {/* Sound Toggle */}
          <button
            id="btn-sound-toggle"
            onClick={onToggleSound}
            className="w-9 h-9 rounded-full flex items-center justify-center transition active:scale-90 cursor-pointer shadow-2xs bg-white/90 border border-[#E3D6FF] hover:scale-105"
            title={isMuted ? 'Turn Sound ON' : 'Mute Sound'}
            aria-label={isMuted ? 'Turn Sound ON' : 'Mute Sound'}
          >
            <CartoonSoundIcon isMuted={isMuted} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
