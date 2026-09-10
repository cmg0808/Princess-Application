import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Maximize, Minimize } from 'lucide-react';
import { GameMode, StickerItem, SavedColoringArtwork } from './types';
import { loadUnlockedStickers, unlockRandomSticker, getStarsCount, addStars } from './utils/storage';
import { getSoundMuted, setSoundMuted, playSound, getAudioContext } from './utils/audio';
import { NavigationHeader } from './components/NavigationHeader';
import { HomeScreen } from './components/HomeScreen';
import { RewardModal } from './components/RewardModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { CartoonSoundIcon, CartoonHeroCrown } from './components/CartoonIcons';

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
const ShapeSorterGame = lazy(() => import('./components/ShapeSorterGame').then((m) => ({ default: m.ShapeSorterGame })));
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
    <div className="min-h-screen w-full bg-[linear-gradient(160deg,#E3D6FF_0%,#FFD6E8_45%,#FFF1C2_100%)] flex flex-col font-['Nunito',sans-serif] selection:bg-[#FFD6E8] selection:text-[#4A3B5C]">
      {/* Top App Header (visible in games) */}
      <NavigationHeader
        currentMode={currentMode}
        onNavigate={handleSelectMode}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        starsCount={starsCount}
      />

      {/* Main View Area */}
      <main className="w-full flex-1 flex flex-col items-center justify-center">
        {currentMode === 'home' && (
          <HomeScreen
            onSelectMode={handleSelectMode}
            unlockedStickerCount={unlockedCount}
            totalStickerCount={stickers.length}
            onOpenGift={handleOpenGift}
            canOpenGift={true}
            isMuted={isMuted}
            onToggleSound={handleToggleSound}
            starsCount={starsCount}
          />
        )}

        {currentMode !== 'home' && (
          <div className="w-full max-w-5xl p-2 sm:p-4 my-auto flex-1 flex flex-col justify-center">
            <div className="w-full bg-white rounded-[36px] sm:rounded-[44px] p-3 sm:p-6 shadow-[0_25px_60px_rgba(255,111,165,0.3)] relative overflow-hidden flex flex-col justify-between">
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

                {currentMode === 'shapesorter' && (
                  <ShapeSorterGame onReward={handleReward} />
                )}
              </Suspense>
              </div>

              {/* In-Game Bottom Dock */}
              <div className="flex justify-center gap-4 sm:gap-6 mt-4 pt-3 border-t border-[#F0E6FF] relative z-20">
                <button
                  id="ingame-dock-home"
                  onClick={() => {
                    playSound.tap();
                    handleSelectMode('home');
                  }}
                  className="w-[50px] h-[50px] rounded-[18px] bg-white/95 border-2 border-[#E3D6FF] hover:bg-[#FFD6E8] flex items-center justify-center text-[#6E5FA6] active:scale-95 transition cursor-pointer shadow-2xs"
                  title="Return to Playroom"
                >
                  <img src="/art/icon-home.png" alt="" className="w-8 h-8 object-contain" />
                </button>

                <button
                  id="ingame-dock-stickers"
                  onClick={() => {
                    playSound.sparkle();
                    handleSelectMode('stickers');
                  }}
                  className={`w-[50px] h-[50px] rounded-[18px] flex items-center justify-center active:scale-95 transition cursor-pointer shadow-2xs ${
                    currentMode === 'stickers'
                      ? 'bg-white/95 border-2 border-[#FF6FA5] shadow-[0_4px_12px_rgba(255,111,165,0.35)]'
                      : 'bg-white/90 border-2 border-[#E3D6FF] hover:bg-[#EDE5FF]'
                  }`}
                  title="Stickers"
                >
                  <img src="/art/icon-star.png" alt="" className="w-7 h-7 object-contain" />
                </button>

                <button
                  id="ingame-dock-sound"
                  onClick={() => {
                    playSound.tap();
                    handleToggleSound();
                  }}
                  className="w-[50px] h-[50px] rounded-[18px] bg-white/90 border-2 border-[#E3D6FF] hover:bg-[#EDE5FF] flex items-center justify-center text-[#6E5FA6] active:scale-95 transition cursor-pointer shadow-2xs"
                  title={isMuted ? 'Turn Sound ON' : 'Mute Sound'}
                >
                  <CartoonSoundIcon isMuted={isMuted} className="w-6 h-6" />
                </button>

                <button
                  id="ingame-dock-fullscreen"
                  onClick={toggleFullscreen}
                  className="w-[50px] h-[50px] rounded-[18px] bg-white/90 border-2 border-[#FFF1C2] hover:bg-[#FFF1C2] flex items-center justify-center text-[#7A5B0B] active:scale-95 transition cursor-pointer shadow-2xs"
                  title={isFullscreen ? 'Exit Full Screen' : 'Go Full Screen'}
                  aria-label={isFullscreen ? 'Exit Full Screen' : 'Go Full Screen'}
                >
                  {isFullscreen ? <Minimize className="w-5 h-5 text-[#7A5B0B]" /> : <Maximize className="w-5 h-5 text-[#7A5B0B]" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Celebration & Reward Modal */}
      <RewardModal
        sticker={rewardSticker}
        onClose={() => setRewardSticker(null)}
      />

      {/* PWA Offline Indicator */}
      <OfflineIndicator />
    </div>
  );
}
