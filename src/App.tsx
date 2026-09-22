import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameMode, StickerItem, SavedColoringArtwork } from './types';
import { loadUnlockedStickers, unlockRandomSticker, getStarsCount, addStars } from './utils/storage';
import { getSoundMuted, setSoundMuted, playSound, getAudioContext } from './utils/audio';
import { FloatingNav } from './components/FloatingNav';
import { HomeScreen } from './components/HomeScreen';
import { RewardModal } from './components/RewardModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { CartoonHeroCrown } from './components/CartoonIcons';
import { ParentalGate } from './components/ParentalGate';
import { ParentsCorner } from './components/ParentsCorner';

// Each game is a sizeable chunk of art/logic and only one is ever on screen
// at a time, so they're code-split and fetched on demand instead of bloating
// the initial bundle every toddler has to download before they can play.
const ColoringGame = lazy(() => import('./components/ColoringGame').then((m) => ({ default: m.ColoringGame })));
const DressUpGame = lazy(() => import('./components/DressUpGame').then((m) => ({ default: m.DressUpGame })));
const MatchingGame = lazy(() => import('./components/MatchingGame').then((m) => ({ default: m.MatchingGame })));
const BubblePopGame = lazy(() => import('./components/BubblePopGame').then((m) => ({ default: m.BubblePopGame })));
const MusicHarpGame = lazy(() => import('./components/MusicHarpGame').then((m) => ({ default: m.MusicHarpGame })));
const StickerBookGame = lazy(() => import('./components/StickerBookGame').then((m) => ({ default: m.StickerBookGame })));
const RoyalBallGame = lazy(() => import('./components/RoyalBallGame').then((m) => ({ default: m.RoyalBallGame })));
const InteractiveStorybook = lazy(() => import('./components/InteractiveStorybook').then((m) => ({ default: m.InteractiveStorybook })));
const CrownDecoratorGame = lazy(() => import('./components/CrownDecoratorGame').then((m) => ({ default: m.CrownDecoratorGame })));
const TeaPartyGame = lazy(() => import('./components/TeaPartyGame').then((m) => ({ default: m.TeaPartyGame })));
const PetSpaGame = lazy(() => import('./components/PetSpaGame').then((m) => ({ default: m.PetSpaGame })));
const MagicWandGame = lazy(() => import('./components/MagicWandGame').then((m) => ({ default: m.MagicWandGame })));
const RoyalGallery = lazy(() => import('./components/RoyalGallery').then((m) => ({ default: m.RoyalGallery })));

// Friendly loading state shown for the brief moment a game chunk is fetched.
const GameLoadingFallback: React.FC = () => (
  <div className="w-full flex flex-col items-center justify-center gap-3 py-16 sm:py-24" role="status" aria-live="polite">
    <div className="animate-bounce">
      <CartoonHeroCrown className="w-16 h-16 sm:w-20 sm:h-20" />
    </div>
    <p className="font-['Baloo_2'] font-extrabold text-[#FF6FA5] text-lg">
      Getting the magic ready...
    </p>
  </div>
);

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('home');
  const [stickers, setStickers] = useState<StickerItem[]>([]);
  const [starsCount, setStarsCount] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [rewardSticker, setRewardSticker] = useState<StickerItem | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [continueArtwork, setContinueArtwork] = useState<SavedColoringArtwork | null>(null);
  const [showParentalGate, setShowParentalGate] = useState<boolean>(false);

  // Navigate to any mode, clearing any "continue coloring" hand-off unless
  // explicitly set by handleContinueColoring below.
  const handleSelectMode = (mode: GameMode) => {
    setContinueArtwork(null);
    setCurrentMode(mode);
  };

  const handleContinueColoring = (artwork: SavedColoringArtwork) => {
    setContinueArtwork(artwork);
    setCurrentMode('coloring');
  };

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

  // Initialize storage & audio
  useEffect(() => {
    setStickers(loadUnlockedStickers());
    setStarsCount(getStarsCount());
    setIsMuted(getSoundMuted());

    // Prepare audio context upon first tap
    const handleFirstTap = () => {
      getAudioContext();
      window.removeEventListener('pointerdown', handleFirstTap);
    };
    window.addEventListener('pointerdown', handleFirstTap);

    return () => {
      window.removeEventListener('pointerdown', handleFirstTap);
    };
  }, []);

  const handleToggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    setSoundMuted(nextState);
    if (!nextState) {
      playSound.chime();
    }
  };

  const handleReward = () => {
    // Add stars
    const updatedStars = addStars(3);
    setStarsCount(updatedStars);

    // Try to unlock a new sticker
    const newSticker = unlockRandomSticker();
    if (newSticker) {
      setStickers(loadUnlockedStickers());
      setRewardSticker(newSticker);
    } else {
      // All stickers unlocked! Give celebratory confetti fanfare
      playSound.fanfare();
      const randomUnlocked = stickers[Math.floor(Math.random() * stickers.length)];
      setRewardSticker(randomUnlocked);
    }
  };

  const handleOpenGift = () => {
    handleReward();
  };

  const unlockedCount = stickers.filter((s) => s.unlocked).length;

  return (
    <div className="min-h-screen w-full flex flex-col selection:bg-[#FFD6E8] selection:text-[#4A3B5C]">
      {/* Main View Area */}
      <main className="w-full flex-1 flex flex-col items-center justify-center pb-36 sm:pb-40">
        <AnimatePresence mode="wait">
          {currentMode === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="w-full"
            >
              <HomeScreen
                onSelectMode={handleSelectMode}
                unlockedStickerCount={unlockedCount}
                totalStickerCount={stickers.length}
                onOpenGift={handleOpenGift}
                canOpenGift={true}
                onOpenParents={() => setShowParentalGate(true)}
              />
            </motion.div>
          ) : (
            <motion.div
              key={currentMode}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="w-full max-w-5xl p-2 sm:p-4 my-auto flex-1 flex flex-col justify-center"
            >
              <div className="w-full glass-strong glow-pink rounded-[36px] sm:rounded-[44px] p-3 sm:p-6 pt-14 sm:pt-16 relative overflow-hidden flex flex-col justify-between">
                {/* Decorative blobs inside game container */}
                <div
                  className="absolute rounded-full opacity-40 filter blur-[1px] pointer-events-none w-[140px] h-[140px] bg-[#D4F5E9] -top-[30px] -left-[30px]"
                  aria-hidden="true"
                />
                <div
                  className="absolute rounded-full opacity-40 filter blur-[1px] pointer-events-none w-[120px] h-[120px] bg-[#FFF1C2] -bottom-[30px] -right-[30px]"
                  aria-hidden="true"
                />

                {/* Game View */}
                <div className="relative z-10">
                  <Suspense fallback={<GameLoadingFallback />}>
                    {currentMode === 'coloring' && (
                      <ColoringGame
                        onReward={handleReward}
                        onOpenGallery={() => handleSelectMode('royalgallery')}
                        initialArtwork={continueArtwork}
                      />
                    )}

                    {currentMode === 'royalgallery' && (
                      <RoyalGallery
                        onNavigate={handleSelectMode}
                        onContinueColoring={handleContinueColoring}
                        onReward={handleReward}
                      />
                    )}

                    {currentMode === 'dressup' && (
                      <DressUpGame onReward={handleReward} />
                    )}

                    {currentMode === 'matching' && (
                      <MatchingGame onReward={handleReward} />
                    )}

                    {currentMode === 'bubblepop' && (
                      <BubblePopGame onReward={handleReward} />
                    )}

                    {currentMode === 'music' && (
                      <MusicHarpGame onReward={handleReward} />
                    )}

                    {currentMode === 'stickers' && (
                      <StickerBookGame stickers={stickers} onReward={handleReward} />
                    )}

                    {currentMode === 'royalball' && (
                      <RoyalBallGame onReward={handleReward} />
                    )}

                    {currentMode === 'storybook' && (
                      <InteractiveStorybook onReward={handleReward} />
                    )}

                    {currentMode === 'crowndecorator' && (
                      <CrownDecoratorGame onReward={handleReward} />
                    )}

                    {currentMode === 'teaparty' && (
                      <TeaPartyGame onReward={handleReward} />
                    )}

                    {currentMode === 'petspa' && (
                      <PetSpaGame onReward={handleReward} />
                    )}

                    {currentMode === 'magicwand' && (
                      <MagicWandGame onReward={handleReward} />
                    )}

                    {currentMode === 'parents' && (
                      <ParentsCorner isMuted={isMuted} onToggleSound={handleToggleSound} />
                    )}
                  </Suspense>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating glass pill navigation — replaces the old full-width bar */}
      <FloatingNav
        currentMode={currentMode}
        onNavigate={handleSelectMode}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        starsCount={starsCount}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onOpenGift={handleOpenGift}
      />

      {/* Celebration & Reward Modal */}
      <RewardModal
        sticker={rewardSticker}
        onClose={() => setRewardSticker(null)}
      />

      {/* Parental Gate — required before entering Parents Corner */}
      <AnimatePresence>
        {showParentalGate && (
          <ParentalGate
            onSuccess={() => {
              setShowParentalGate(false);
              handleSelectMode('parents');
            }}
            onCancel={() => setShowParentalGate(false)}
          />
        )}
      </AnimatePresence>

      {/* PWA Offline Indicator */}
      <OfflineIndicator />
    </div>
  );
}
