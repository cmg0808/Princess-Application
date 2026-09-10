import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trophy, Star } from 'lucide-react';
import { Bubble } from '../types';
import { playSound } from '../utils/audio';

interface BubblePopGameProps {
  onReward: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

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

        const types: ('regular' | 'star' | 'tiara' | 'heart')[] = [
          'regular',
          'regular',
          'regular',
          'star',
          'heart',
          'tiara',
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
    if (bubble.type === 'tiara' || bubble.type === 'star') {
      playSound.sparkle();
    }

    // Spawn popping sparkles
    const emojis = bubble.type === 'tiara' ? ['👑', '✨'] : bubble.type === 'heart' ? ['💖', '💕'] : ['✨', '⭐'];
    const newParticles: Particle[] = [
      { id: Math.random(), x: bubble.x, y: bubble.y, emoji: emojis[0] },
      { id: Math.random(), x: bubble.x + 4, y: bubble.y - 2, emoji: emojis[1] || '✨' },
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
          <span className="text-2xl animate-bounce">🫧</span>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-pink-500">Bubbles Popped</span>
            <span className="text-lg font-black text-pink-700 leading-none">{poppedCount} ✨</span>
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
            Gentle 🌸
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
            Lively 🚀
          </button>
        </div>
      </div>

      {/* Bubble Play Field */}
      <div
        ref={containerRef}
        id="bubble-container"
        className="relative w-full max-w-lg h-[460px] sm:h-[520px] rounded-3xl border-4 border-pink-300 shadow-xl overflow-hidden touch-none cursor-pointer bg-linear-to-b from-sky-200 via-pink-100 to-purple-200"
      >
        {/* Dreamy Fairytale Background Art */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-6 left-6 text-4xl">🏰</div>
          <div className="absolute top-12 right-8 text-3xl">🌈</div>
          <div className="absolute bottom-4 left-10 text-3xl">🌸</div>
          <div className="absolute bottom-8 right-12 text-3xl">🌺</div>
        </div>

        {/* Floating Bubbles */}
        {bubbles.map((bubble) => {
          const wobble = Math.sin(bubble.wobbleOffset) * 8;

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
              {bubble.type === 'tiara' && (
                <span className="text-2xl sm:text-3xl filter drop-shadow select-none animate-pulse">👑</span>
              )}
              {bubble.type === 'star' && (
                <span className="text-2xl sm:text-3xl filter drop-shadow select-none animate-spin" style={{ animationDuration: '4s' }}>⭐</span>
              )}
              {bubble.type === 'heart' && (
                <span className="text-2xl sm:text-3xl filter drop-shadow select-none">💖</span>
              )}
              {bubble.type === 'regular' && (
                <span className="text-lg opacity-75 select-none">✨</span>
              )}
            </div>
          );
        })}

        {/* Pop Particle Sparkles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 text-3xl animate-ping"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
          >
            {p.emoji}
          </div>
        ))}

        {/* Prompt at bottom if no bubbles popped yet */}
        {poppedCount === 0 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xs px-4 py-1.5 rounded-full border border-pink-300 pointer-events-none text-xs sm:text-sm font-extrabold text-pink-700 font-['Fredoka'] animate-pulse">
            👆 Tap the bubbles to pop!
          </div>
        )}
      </div>
    </div>
  );
};
