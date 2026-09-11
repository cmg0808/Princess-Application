import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Maximize, Minimize } from 'lucide-react';
import { GameMode } from '../types';
import { playSound } from '../utils/audio';
import { CartoonSoundIcon, CartoonHeroCrown } from './CartoonIcons';

interface FloatingNavProps {
  currentMode: GameMode;
  onNavigate: (mode: GameMode) => void;
  isMuted: boolean;
  onToggleSound: () => void;
  starsCount: number;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenGift: () => void;
}

// A tiny lookup just for the floating "you are here" chip's title text —
// icons live inline per-game already, this nav only needs the label.
const MODE_TITLES: Partial<Record<GameMode, string>> = {
  teaparty: 'Tea Party',
  petspa: 'Pet Spa',
  magicwand: 'Magic Wand',
  shapesorter: 'Shapes',
  royalball: 'Dance Ball',
  storybook: 'Story',
  crowndecorator: 'Crowns',
  coloring: 'Color',
  dressup: 'Dress Up',
  matching: 'Puzzles',
  bubblepop: 'Bubbles',
  music: 'Music',
  stickers: 'Stickers',
  royalgallery: 'Royal Gallery',
};

const spring = { type: 'spring' as const, stiffness: 380, damping: 22 };

/**
 * The app's single, shared navigation surface: a glass pill that floats
 * above everything rather than a blocky, full-width bar pinned to an edge.
 * A small "you are here" chip overlaps its top-left corner when a game is
 * open, and a stars badge overlaps its top-right corner — deliberate
 * overlap instead of everything living in tidy rectangular rows.
 */
export const FloatingNav: React.FC<FloatingNavProps> = ({
  currentMode,
  onNavigate,
  isMuted,
  onToggleSound,
  starsCount,
  isFullscreen,
  onToggleFullscreen,
  onOpenGift,
}) => {
  const inGame = currentMode !== 'home';

  return (
    <>
      {/* "You are here" chip — replaces the old full-width sticky header */}
      <AnimatePresence>
        {inGame && (
          <motion.div
            key="title-chip"
            initial={{ opacity: 0, y: -14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.92 }}
            transition={spring}
            className="fixed top-3 left-3 sm:top-5 sm:left-5 z-40 glass-strong glow-lavender rounded-full pl-1.5 pr-4 py-1.5 flex items-center gap-2"
            style={{ paddingTop: 'max(0.375rem, env(safe-area-inset-top))' }}
          >
            <button
              id="btn-nav-home"
              onClick={() => {
                playSound.tap();
                onNavigate('home');
              }}
              className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-[#6E5FA6] active:scale-90 transition cursor-pointer"
              title="Back to Playroom"
              aria-label="Back to Playroom"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-display font-bold text-[#7A5FC2] text-sm sm:text-base italic">
              {MODE_TITLES[currentMode] ?? 'Playroom'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stars badge — overlaps the main pill's top-right corner for depth */}
      <motion.button
        id="btn-stars-badge"
        onClick={() => {
          playSound.sparkle();
          onOpenGift();
        }}
        initial={{ opacity: 0, y: 20, scale: 0.7 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...spring, delay: 0.08 }}
        whileTap={{ scale: 0.9 }}
        className="fixed z-40 glass-strong glow-gold rounded-full px-3.5 py-1.5 flex items-center gap-1.5 cursor-pointer"
        style={{
          bottom: 'calc(4.6rem + env(safe-area-inset-bottom))',
          right: 'calc(50% - 9.5rem)',
        }}
        title="Tap for a surprise!"
      >
        <img src="art/icon-star.png" alt="" className="w-4 h-4 object-contain" draggable={false} />
        <span className="font-bold text-xs text-[#7A5B0B]">{starsCount}</span>
      </motion.button>

      {/* Main floating pill nav */}
      <motion.nav
        id="floating-pill-nav"
        aria-label="Main navigation"
        initial={{ opacity: 0, y: 40, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={spring}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 glass-strong glow-pink rounded-full px-2.5 py-2 sm:px-3 sm:py-2.5 flex items-center gap-1.5 sm:gap-2"
        style={{ marginBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <NavButton
          id="dock-home"
          title="Home"
          active={currentMode === 'home'}
          onClick={() => {
            playSound.tap();
            onNavigate('home');
          }}
        >
          <img src="art/icon-home.png" alt="" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" draggable={false} />
        </NavButton>

        <NavButton
          id="dock-stickers"
          title="Stickers"
          active={currentMode === 'stickers'}
          onClick={() => {
            playSound.sparkle();
            onNavigate('stickers');
          }}
        >
          <img src="art/icon-star.png" alt="" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" draggable={false} />
        </NavButton>

        <NavButton
          id="dock-sound"
          title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
          onClick={() => {
            playSound.tap();
            onToggleSound();
          }}
        >
          <CartoonSoundIcon isMuted={isMuted} className="w-5 h-5 sm:w-6 sm:h-6" />
        </NavButton>

        <NavButton
          id="dock-fullscreen"
          title={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
          onClick={onToggleFullscreen}
        >
          {isFullscreen ? (
            <Minimize className="w-5 h-5 text-[#7A5B0B]" />
          ) : (
            <Maximize className="w-5 h-5 text-[#7A5B0B]" />
          )}
        </NavButton>
      </motion.nav>
    </>
  );
};

interface NavButtonProps {
  id: string;
  title: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ id, title, active, onClick, children }) => (
  <motion.button
    id={id}
    onClick={onClick}
    whileHover={{ y: -3, scale: 1.06 }}
    whileTap={{ scale: 0.88 }}
    transition={spring}
    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
      active ? 'bg-white shadow-[0_4px_14px_rgba(255,111,165,0.4)]' : 'bg-white/70 hover:bg-white'
    }`}
    title={title}
    aria-label={title}
  >
    {children}
  </motion.button>
);

// Kept for the empty-state loading fallback in App.tsx
export const FloatingNavHeroCrown = CartoonHeroCrown;
