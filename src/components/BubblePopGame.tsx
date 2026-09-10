import React, { useState, useEffect, useRef } from 'react';
import { Bubble } from '../types';
import { playSound } from '../utils/audio';
import { CrownArt, CarriageArt, FrogArt, TwinkleStar, DropletArt } from './GameArt';

interface BubblePopGameProps {
  onReward: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  type: Bubble['type'];
}

const BUBBLE_ICON: Record<Bubble['type'], React.FC<{ className?: string }>> = {
  crown: CrownArt,
  carriage: CarriageArt,
  frog: FrogArt,
  regular: TwinkleStar,
};

export const BubblePopGame: React.FC<BubblePopGameProps> = ({ onReward }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [speedMode, setSpeedMode] = useState<'gentle' | 'lively'>('gentle');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const nextIdRef = useRef(1);
  const requestRef = useRef<number | null>(null);

  // Spawn new bubbles periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles((prev) => {
        if (prev.length >= 14) return prev; // Keep reasonable density for toddlers

        const types: ('regular' | 'crown' | 'carriage' | 'frog')[] = [
          'regular',
          'regular',
          'regular',
          'crown',
          'carriage',
          'frog',
        ];
        const chosenType = types[Math.floor(Math.random() * types.length)];
        const colors = ['#F472B6', '#C084FC', '#38BDF8', '#FACC15', '#FB7185', '#34D399'];
        const chosenColor = colors[Math.floor(Math.random() * colors.length)];

        const newBubble: Bubble = {
          id: nextIdRef.current++,
          x: 10 + Math.random() * 80, // 10% to 90%
          y: 105, // start just below bottom
          size: Math.floor(65 + Math.random() * 45), // 65-110px (big touch targets!)
          color: chosenColor,
          speed: (speedMode === 'gentle' ? 0.35 : 0.6) + Math.random() * 0.25,
          type: chosenType,
          wobbleOffset: Math.random() * 10,
        };

        return [...prev, newBubble];
      });
    }, 800);

    return () => clearInterval(interval);
  }, [speedMode]);

  // Animation frame loop to move bubbles upwards
  useEffect(() => {
    const updatePositions = () => {
      setBubbles((prev) =>
        prev
          .map((b) => ({
            ...b,
            y: b.y - b.speed,
            wobbleOffset: b.wobbleOffset + 0.05,
          }))
          .filter((b) => b.y > -20)
      );

      requestRef.current = requestAnimationFrame(updatePositions);
    };

    requestRef.current = requestAnimationFrame(updatePositions);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const popBubble = (bubble: Bubble, e: React.MouseEvent | React.PointerEvent) => {
    e.stopPropagation();

    playSound.pop();
    if (bubble.type === 'crown' || bubble.type === 'carriage') {
      playSound.sparkle();
    } else if (bubble.type === 'frog') {
      playSound.ribbit();
    }

    // Spawn popping sparkles
    const newParticles: Particle[] = [
      { id: Math.random(), x: bubble.x, y: bubble.y, type: bubble.type },
      { id: Math.random(), x: bubble.x + 4, y: bubble.y - 2, type: 'regular' },
    ];
    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 700);

    // Remove popped bubble
    setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));

    const updatedPopped = poppedCount + 1;
    setPoppedCount(updatedPopped);

    // Reward every 12 bubbles popped
    if (updatedPopped % 12 === 0) {
      onReward();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center gap-3 select-none">
      {/* Top Controls Bar */}
      <div className="w-full max-w-lg flex items-center justify-between bg-white/90 backdrop-blur-xs px-4 py-2 rounded-2xl border-2 border-pink-200 shadow-xs font-['Fredoka']">
        <div className="flex items-center gap-2">
          <DropletArt className="w-7 h-7 animate-bounce" color="#7DD3FC" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-pink-500">Bubbles Popped</span>
            <span className="text-lg font-black text-pink-700 leading-none">{poppedCount}</span>
          </div>
        </div>

        {/* Speed toggle */}
        <div className="flex items-center gap-1 bg-pink-50 p-1 rounded-xl border border-pink-200">
          <button
            onClick={() => {
              playSound.tap();
              setSpeedMode('gentle');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
              speedMode === 'gentle' ? 'bg-pink-500 text-white shadow-xs' : 'text-pink-600 hover:bg-pink-100'
            }`}
          >
            Gentle
          </button>
          <button
            onClick={() => {
              playSound.tap();
              setSpeedMode('lively');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
              speedMode === 'lively' ? 'bg-pink-500 text-white shadow-xs' : 'text-pink-600 hover:bg-pink-100'
            }`}
          >
            Lively
          </button>
        </div>
      </div>

      {/* Bubble Play Field */}
      <div
        ref={containerRef}
        id="bubble-container"
        className="relative w-full max-w-lg h-[460px] sm:h-[520px] rounded-3xl border-4 border-pink-300 shadow-xl overflow-hidden touch-none cursor-pointer bg-linear-to-b from-sky-200 via-pink-100 to-purple-200"
      >
        {/* Dreamy soft background blobs (no literal artwork needed back here) */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full blur-md bg-white" />
          <div className="absolute top-10 -right-6 w-20 h-20 rounded-full blur-md bg-[#FDE68A]" />
          <div className="absolute -bottom-6 left-8 w-20 h-20 rounded-full blur-md bg-[#FBCFE8]" />
          <div className="absolute bottom-10 -right-4 w-16 h-16 rounded-full blur-md bg-[#BBF7D0]" />
        </div>

        {/* Floating Bubbles */}
        {bubbles.map((bubble) => {
          const wobble = Math.sin(bubble.wobbleOffset) * 8;
          const Icon = BUBBLE_ICON[bubble.type];

          return (
            <div
              key={bubble.id}
              id={`bubble-${bubble.id}`}
              onPointerDown={(e) => popBubble(bubble, e)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer flex items-center justify-center transition-transform hover:scale-110 active:scale-90"
              style={{
                left: `calc(${bubble.x}% + ${wobble}px)`,
                top: `${bubble.y}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                background: `radial-gradient(circle at 30% 30%, #FFFFFF, ${bubble.color} 50%, rgba(255,255,255,0.2) 100%)`,
                boxShadow: `inset 0 0 15px rgba(255,255,255,0.8), 0 4px 12px ${bubble.color}66`,
                border: '2px solid rgba(255, 255, 255, 0.7)',
              }}
            >
              {/* Bubble Sheen Highlight */}
              <div className="absolute top-2 left-3 w-4 h-3 rounded-full bg-white/80 transform -rotate-45" />

              {/* Center icon / Surprise */}
              <Icon
                className={`w-1/2 h-1/2 filter drop-shadow select-none ${
                  bubble.type === 'crown' ? 'animate-pulse' : bubble.type === 'frog' ? 'animate-bounce' : ''
                } ${bubble.type === 'regular' ? 'opacity-75 w-1/3 h-1/3' : ''}`}
              />
            </div>
          );
        })}

        {/* Pop Particle Sparkles */}
        {particles.map((p) => {
          const Icon = BUBBLE_ICON[p.type];
          return (
            <div
              key={p.id}
              className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 animate-ping"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <Icon className="w-full h-full" />
            </div>
          );
        })}

        {/* Prompt at bottom if no bubbles popped yet */}
        {poppedCount === 0 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xs px-4 py-1.5 rounded-full border border-pink-300 pointer-events-none text-xs sm:text-sm font-extrabold text-pink-700 font-['Fredoka'] animate-pulse">
            Tap the bubbles to pop!
          </div>
        )}
      </div>
    </div>
  );
};
