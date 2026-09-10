import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  RotateCcw,
  BookOpen,
  Trophy,
} from 'lucide-react';
import { playSound } from '../utils/audio';
import { ORIGINAL_STORY_CHAPTERS, StoryChapter, StoryInteractiveChar } from '../data/storyData';

interface InteractiveStorybookProps {
  onReward: () => void;
}

interface TouchParticle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  scale: number;
  opacity: number;
}

export const InteractiveStorybook: React.FC<InteractiveStorybookProps> = ({ onReward }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [activeSpeech, setActiveSpeech] = useState<{
    id: string;
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const [pressedId, setPressedId] = useState<string | null>(null);
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [touchParticles, setTouchParticles] = useState<TouchParticle[]>([]);
  const [interactionCount, setInteractionCount] = useState(0);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [completedStory, setCompletedStory] = useState(false);

  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const nextParticleIdRef = useRef(0);
  const page = ORIGINAL_STORY_CHAPTERS[currentPageIndex];

  // Play sound for an element
  const playElementSound = (type: StoryInteractiveChar['soundType']) => {
    switch (type) {
      case 'ribbit':
        playSound.ribbit();
        break;
      case 'giggle':
        playSound.giggle();
        break;
      case 'neigh':
        playSound.neigh();
        break;
      case 'tweet':
        playSound.tweet();
        break;
      case 'twinkle':
        playSound.sparkle();
        break;
      case 'chime':
        playSound.chime();
        break;
      case 'pop':
      default:
        playSound.pop();
        break;
    }
  };

  // Spawn celebratory floating particles around touch coordinates with CSS transition
  const spawnTouchBurst = (centerX: number, centerY: number) => {
    const emojis = ['✨', '💖', '⭐', '🌸', '🪄', '💫'];
    const count = 6;
    const initialParticles: TouchParticle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (i * 2 * Math.PI) / count + (Math.random() * 0.4 - 0.2);
      const distance = 28 + Math.random() * 22; // percentage offset
      const pId = ++nextParticleIdRef.current;
      initialParticles.push({
        id: pId,
        emoji: emojis[i % emojis.length],
        x: centerX,
        y: centerY,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        scale: 0.5,
        opacity: 1,
      });
    }

    setTouchParticles((prev) => [...prev, ...initialParticles]);

    // Animate outward in the next frame using CSS transitions
    requestAnimationFrame(() => {
      setTouchParticles((current) =>
        current.map((p) => {
          if (initialParticles.some((ip) => ip.id === p.id)) {
            return {
              ...p,
              scale: 1.3,
              opacity: 0,
            };
          }
          return p;
        })
      );
    });

    // Remove particles after CSS transition completes
    setTimeout(() => {
      setTouchParticles((current) =>
        current.filter((p) => !initialParticles.some((ip) => ip.id === p.id))
      );
    }, 700);
  };

  // Handle touch down (immediate tactile squash via CSS transition)
  const handlePointerDown = (el: StoryInteractiveChar) => {
    setPressedId(el.id);
  };

  // Handle touch release / tap (triggers character animation & sound)
  const handlePointerUpOrLeave = () => {
    setPressedId(null);
  };

  // Handle tap on interactive character or item
  const handleElementTap = (
    el: StoryInteractiveChar,
    e: React.MouseEvent | React.PointerEvent
  ) => {
    e.stopPropagation();
    setPressedId(null);

    // Play character-specific voice / sound effect
    playElementSound(el.soundType);

    // Trigger character animation via CSS transitions
    setAnimatingId(el.id);

    // Spawn magical sparkles and hearts on touch
    spawnTouchBurst(el.x, el.y);

    // Show toddler speech bubble
    setActiveSpeech({
      id: el.id,
      text: el.speech,
      x: el.x,
      y: el.y - 12,
    });

    // Count interactions and give occasional toddler reward
    setInteractionCount((prev) => {
      const next = prev + 1;
      if (next % 5 === 0) {
        playSound.chime();
        onReward();
      }
      return next;
    });

    // Reset character back to resting position with smooth CSS transition
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    animTimeoutRef.current = setTimeout(() => {
      setAnimatingId(null);
    }, 850);

    // Auto-dismiss speech bubble after 2.8s
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => {
      setActiveSpeech(null);
    }, 2800);
  };

  // Read Aloud using SpeechSynthesis API if available
  const handleReadAloudToggle = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      playSound.chime();
      return;
    }

    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(page.text);
    utterance.rate = 0.85; // gently paced for toddlers
    utterance.pitch = 1.2; // friendly princess pitch

    utterance.onstart = () => setIsReadingAloud(true);
    utterance.onend = () => setIsReadingAloud(false);
    utterance.onerror = () => setIsReadingAloud(false);

    window.speechSynthesis.speak(utterance);
  };

  // Cancel speech synthesis when changing page or unmounting
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsReadingAloud(false);
    setActiveSpeech(null);
    setAnimatingId(null);
    setPressedId(null);

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, [currentPageIndex]);

  // Navigate to next page with dedicated 'Next Page' navigation sound effect
  const goToNextPage = () => {
    // Play dedicated Next Page sound effect
    playSound.nextPage();

    if (currentPageIndex < ORIGINAL_STORY_CHAPTERS.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      // Completed the storybook!
      setCompletedStory(true);
      playSound.fanfare();
      onReward();
    }
  };

  // Navigate to previous page
  const goToPrevPage = () => {
    playSound.pageTurn();
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleRestart = () => {
    playSound.tap();
    setCurrentPageIndex(0);
    setCompletedStory(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center gap-3 select-none font-['Fredoka']">
      {/* Top Story Header Controls */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-3xl border-2 border-pink-200 shadow-sm flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-pink-500" />
          <div>
            <h3 className="text-base sm:text-lg font-black text-pink-800 leading-tight">
              Princess Storybook
            </h3>
            <span className="text-xs font-bold text-pink-500">
              {page.chapterNumber} of {ORIGINAL_STORY_CHAPTERS.length}
            </span>
          </div>
        </div>

        {/* Page progress dots */}
        <div className="hidden sm:flex items-center gap-1.5">
          {ORIGINAL_STORY_CHAPTERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (idx > currentPageIndex) {
                  playSound.nextPage();
                } else {
                  playSound.pageTurn();
                }
                setCurrentPageIndex(idx);
              }}
              className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                currentPageIndex === idx
                  ? 'bg-pink-500 scale-125 ring-2 ring-pink-300 shadow-xs'
                  : 'bg-pink-200 hover:bg-pink-300'
              }`}
              title={`Jump to Page ${idx + 1}`}
            />
          ))}
        </div>

        {/* Read aloud / narration button */}
        <button
          id="btn-story-read-aloud"
          onClick={handleReadAloudToggle}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 transition active:scale-95 cursor-pointer font-bold text-xs sm:text-sm ${
            isReadingAloud
              ? 'bg-pink-500 border-pink-600 text-white shadow-sm animate-pulse'
              : 'bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100'
          }`}
          title="Read story out loud"
        >
          {isReadingAloud ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4 text-pink-600" />
          )}
          <span>{isReadingAloud ? 'Stop' : 'Read to Me'}</span>
        </button>
      </div>

      {/* Fairytale Book Canvas with Illustrated Scenic Backdrop */}
      <div
        id="storybook-stage"
        className={`relative w-full max-w-2xl h-[360px] sm:h-[400px] rounded-3xl border-4 border-pink-300 shadow-2xl overflow-hidden bg-linear-to-b ${page.bgGradient} transition-colors duration-500 flex flex-col justify-between p-3 sm:p-4`}
      >
        {/* Custom Scenic SVG Vector Art for this Chapter */}
        {page.sceneSvg}

        {/* Story Title Ribbon Banner */}
        <div className="relative z-10 self-center bg-white/95 backdrop-blur-xs px-4 py-1 rounded-full border-2 border-pink-200 shadow-md">
          <h4 className="text-xs sm:text-sm font-black text-pink-800">
            ✨ {page.title} ✨
          </h4>
        </div>

        {/* Floating Stage Navigation Chevrons for Easy Toddler Tapping */}
        {currentPageIndex > 0 && (
          <button
            id="btn-stage-prev"
            onClick={goToPrevPage}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 hover:bg-white text-pink-600 shadow-md border-2 border-pink-200 flex items-center justify-center cursor-pointer transition active:scale-90 hover:scale-105"
            title="Go to Previous Page"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        <button
          id="btn-stage-next"
          onClick={goToNextPage}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 h-9 sm:h-10 px-2.5 sm:px-3 rounded-full bg-white/90 hover:bg-white text-pink-600 shadow-md border-2 border-pink-300 flex items-center gap-1 cursor-pointer transition active:scale-90 hover:scale-105 font-black text-xs"
          title="Turn to Next Page (with sound effect)"
          aria-label="Next Page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
        </button>

        {/* Interactive Characters in the Scene (Touch-triggered CSS Transitions) */}
        <div className="relative w-full h-full">
          {page.characters.map((el) => {
            const isTargetAnimated = animatingId === el.id;
            const isPressed = pressedId === el.id;

            let animTransitionClass = '';
            if (isPressed) {
              animTransitionClass = 'is-touch-pressed';
            } else if (isTargetAnimated) {
              if (el.animation === 'bounce') animTransitionClass = 'is-touch-anim-bounce';
              else if (el.animation === 'spin') animTransitionClass = 'is-touch-anim-spin';
              else if (el.animation === 'wiggle') animTransitionClass = 'is-touch-anim-wiggle';
              else if (el.animation === 'pulse') animTransitionClass = 'is-touch-anim-pulse';
            }

            return (
              <button
                key={el.id}
                id={`story-elem-${el.id}`}
                onPointerDown={() => handlePointerDown(el)}
                onPointerUp={handlePointerUpOrLeave}
                onPointerLeave={handlePointerUpOrLeave}
                onTouchStart={() => handlePointerDown(el)}
                onTouchEnd={handlePointerUpOrLeave}
                onClick={(e) => handleElementTap(el, e)}
                className={`storybook-char-btn absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none ${animTransitionClass} z-20 focus:outline-none`}
                style={{
                  left: `${el.x}%`,
                  top: `${el.y}%`,
                }}
                title={`Touch ${el.name}!`}
              >
                <span
                  className="filter drop-shadow-md select-none inline-block transition-transform duration-200"
                  style={{ fontSize: `${el.size}px` }}
                >
                  {el.emoji}
                </span>
                {/* Character Cute Name Tag */}
                <span className="block text-[10px] font-black text-pink-800 bg-white/95 px-2 py-0.5 rounded-full shadow-xs border border-pink-200 mt-[-4px] whitespace-nowrap text-center">
                  {el.name}
                </span>
              </button>
            );
          })}

          {/* Magical Touch Sparkle Burst Particles with CSS transitions */}
          {touchParticles.map((particle) => (
            <div
              key={particle.id}
              className="char-touch-particle absolute z-25 text-base sm:text-lg pointer-events-none"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                transform: `translate(${particle.dx}px, ${particle.dy}px) scale(${particle.scale})`,
                opacity: particle.opacity,
              }}
            >
              {particle.emoji}
            </div>
          ))}

          {/* Toddler Speech Bubble on Tap */}
          {activeSpeech && (
            <div
              className="storybook-speech-bubble absolute z-35 transform -translate-x-1/2 -translate-y-full bg-white/95 px-3.5 py-2 rounded-2xl border-2 border-pink-300 shadow-lg text-xs sm:text-sm font-extrabold text-pink-800 max-w-[240px] text-center pointer-events-none"
              style={{
                left: `${activeSpeech.x}%`,
                top: `${activeSpeech.y}%`,
              }}
            >
              <span>{activeSpeech.text}</span>
              {/* Speech bubble pointy tail */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-pink-300" />
            </div>
          )}
        </div>

        {/* Toddler interaction hint */}
        <div className="relative z-10 self-center text-[11px] font-bold text-pink-700 bg-white/85 backdrop-blur-xs px-3.5 py-0.5 rounded-full border border-pink-200 shadow-xs pointer-events-none">
          👆 Tap or touch characters to hear voices & magic animations!
        </div>
      </div>

      {/* Storybook Narration Text Card (Big, Clear, High-Contrast Typography for Toddlers) */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xs p-4 sm:p-5 rounded-3xl border-2 border-pink-200 shadow-md flex flex-col gap-3">
        <p className="text-base sm:text-lg font-bold text-gray-800 leading-relaxed text-center">
          {page.text}
        </p>

        {/* Page Turn Controls (Chunky Toddler Buttons) */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-pink-100">
          <button
            id="btn-story-prev"
            onClick={goToPrevPage}
            disabled={currentPageIndex === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-sm sm:text-base border-2 transition active:scale-95 cursor-pointer ${
              currentPageIndex === 0
                ? 'opacity-40 border-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-pink-50 border-pink-300 text-pink-700 hover:bg-pink-100 shadow-xs'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-black text-pink-500">
            {currentPageIndex + 1} / {ORIGINAL_STORY_CHAPTERS.length}
          </span>

          <button
            id="btn-story-next"
            onClick={goToNextPage}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm sm:text-base bg-linear-to-r from-pink-500 to-rose-500 text-white shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer border-2 border-pink-300"
            title="Next Page Sound & Turn"
          >
            <span>
              {currentPageIndex === ORIGINAL_STORY_CHAPTERS.length - 1
                ? 'Finish Story! 🎉'
                : 'Next Page ✨'}
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Celebration Modal when Story finishes */}
      {completedStory && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl border-4 border-yellow-300 p-6 shadow-2xl flex flex-col items-center text-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-white shadow-lg mb-3 animate-bounce">
              <Trophy className="w-9 h-9" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-pink-800">
              Fairytale Complete! 🌟
            </h3>
            <p className="text-sm font-bold text-pink-600 mt-2 mb-6">
              You helped Princess Lily recover the Starlight Gem and danced at the royal ball!
            </p>
            <div className="flex gap-3 w-full">
              <button
                id="btn-story-read-again"
                onClick={handleRestart}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-pink-50 border-2 border-pink-300 text-pink-700 font-black text-sm hover:bg-pink-100 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Read Again</span>
              </button>
              <button
                id="btn-story-close-celebration"
                onClick={() => setCompletedStory(false)}
                className="flex-1 py-3 rounded-2xl bg-pink-500 text-white font-black text-sm shadow-md hover:bg-pink-600 transition cursor-pointer"
              >
                Hooray! 💖
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
