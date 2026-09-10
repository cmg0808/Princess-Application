import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Trash2, RotateCcw, Volume2, Star, Heart } from 'lucide-react';
import { playSound } from '../utils/audio';

interface MagicWandGameProps {
  onReward: () => void;
}

interface MagicSparkleParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  color: string;
  vx: number;
  vy: number;
  opacity: number;
}

interface WandStyle {
  id: string;
  name: string;
  emoji: string;
  particleEmojis: string[];
  gradient: string;
  auraColor: string;
}

const WAND_STYLES: WandStyle[] = [
  {
    id: 'star',
    name: 'Starlight Wand',
    emoji: '🪄',
    particleEmojis: ['⭐', '✨', '🌟', '💫', '🟡'],
    gradient: 'from-amber-300 via-yellow-400 to-amber-500',
    auraColor: 'rgba(253, 224, 71, 0.6)',
  },
  {
    id: 'heart',
    name: 'Heart Wand',
    emoji: '💖',
    particleEmojis: ['💖', '💕', '💗', '✨', '🌸'],
    gradient: 'from-rose-400 via-pink-400 to-rose-500',
    auraColor: 'rgba(244, 63, 94, 0.6)',
  },
  {
    id: 'rainbow',
    name: 'Rainbow Wand',
    emoji: '🌈',
    particleEmojis: ['🌈', '✨', '💎', '🦋', '⭐'],
    gradient: 'from-pink-400 via-purple-400 to-sky-400',
    auraColor: 'rgba(168, 85, 247, 0.6)',
  },
  {
    id: 'fairy',
    name: 'Fairy Blossom',
    emoji: '🌸',
    particleEmojis: ['🌸', '🌺', '🌷', '✨', '🧚'],
    gradient: 'from-emerald-300 via-teal-300 to-pink-300',
    auraColor: 'rgba(52, 211, 153, 0.6)',
  },
];

export const MagicWandGame: React.FC<MagicWandGameProps> = ({ onReward }) => {
  const [selectedWand, setSelectedWand] = useState<WandStyle>(WAND_STYLES[0]);
  const [particles, setParticles] = useState<MagicSparkleParticle[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGrandFinale, setShowGrandFinale] = useState(false);

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const nextParticleId = useRef(1);
  const notePitchCounter = useRef(0);
  const sparksCountRef = useRef(0);

  // Animation frame loop to drift and fade particles
  useEffect(() => {
    let animationFrameId: number;

    const updateParticles = () => {
      setParticles((prev) => {
        if (prev.length === 0) return prev;
        return prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: p.opacity - 0.02,
          }))
          .filter((p) => p.opacity > 0);
      });

      animationFrameId = requestAnimationFrame(updateParticles);
    };

    animationFrameId = requestAnimationFrame(updateParticles);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Spawn sparkles at relative coordinates (percentage 0-100)
  const spawnSparklesAt = (x: number, y: number, count: number = 3, checkReward: boolean = true) => {
    notePitchCounter.current = (notePitchCounter.current + 1) % 8;
    playSound.wandChime(notePitchCounter.current);

    const newParticles: MagicSparkleParticle[] = [];

    for (let i = 0; i < count; i++) {
      const emojiList = selectedWand.particleEmojis;
      const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.8;

      newParticles.push({
        id: nextParticleId.current++,
        x,
        y,
        emoji,
        size: 24 + Math.random() * 24,
        color: selectedWand.auraColor,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        opacity: 1,
      });
    }

    setParticles((prev) => [...prev.slice(-60), ...newParticles]); // keep max 60 particles for smooth rendering

    if (checkReward) {
      const prevTotal = sparksCountRef.current;
      const newTotal = prevTotal + count;
      sparksCountRef.current = newTotal;

      if ((prevTotal < 40 && newTotal >= 40) || (prevTotal < 100 && newTotal >= 100)) {
        playSound.fanfare();
        onReward();
      }
    }
  };

  // Pointer event handlers for smooth touch & mouse dragging
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spawnSparklesAt(x, y, 4);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spawnSparklesAt(x, y, 2);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  // Launch Royal Fireworks Finale
  const handleLaunchFireworks = () => {
    playSound.fireworkBurst();
    setShowGrandFinale(true);

    const blastPoints = [
      { x: 30, y: 30 },
      { x: 50, y: 20 },
      { x: 70, y: 35 },
      { x: 40, y: 50 },
      { x: 60, y: 45 },
    ];

    blastPoints.forEach((pt, idx) => {
      setTimeout(() => {
        spawnSparklesAt(pt.x, pt.y, 8, false);
        playSound.wandChime(idx * 2);
      }, idx * 180);
    });

    setTimeout(() => {
      setShowGrandFinale(false);
    }, 1500);

    onReward();
  };

  const handleClearSky = () => {
    playSound.boing();
    setParticles([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center gap-3 select-none font-['Fredoka']">
      {/* Top Header */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-3xl border-2 border-pink-200 shadow-sm flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-bounce">🪄</span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-pink-800 leading-tight">
              Magic Wand & Fireworks
            </h3>
            <span className="text-xs font-bold text-pink-500">
              Drag your wand across the sky! ✨
            </span>
          </div>
        </div>

        {/* Fireworks Button */}
        <button
          id="btn-fireworks-launch"
          onClick={handleLaunchFireworks}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-linear-to-r from-amber-400 via-rose-400 to-purple-500 text-white font-black text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition cursor-pointer border-2 border-white"
        >
          <span className="text-lg animate-pulse">🎆</span>
          <span>Fireworks!</span>
        </button>
      </div>

      {/* Main Night Sky Canvas */}
      <div
        ref={canvasRef}
        id="wand-canvas"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full max-w-2xl h-[360px] sm:h-[400px] rounded-3xl border-4 border-pink-300 shadow-2xl overflow-hidden bg-linear-to-b from-slate-950 via-indigo-950 to-purple-900 cursor-crosshair touch-none"
      >
        {/* Fairytale Palace Silhouette at the Bottom */}
        <div className="absolute bottom-0 inset-x-0 flex justify-center pointer-events-none opacity-40 select-none">
          <div className="text-7xl sm:text-8xl filter drop-shadow">🏰</div>
        </div>

        {/* Shimmering Starlight Sky Background */}
        <div className="absolute inset-0 pointer-events-none flex justify-between p-6 opacity-30 text-2xl">
          <span className="animate-pulse">🌙</span>
          <span className="animate-ping">⭐</span>
          <span className="animate-pulse">✨</span>
          <span className="animate-bounce">⭐</span>
        </div>

        {/* Grand Finale Light Burst Flash */}
        {showGrandFinale && (
          <div className="absolute inset-0 bg-white/25 z-40 animate-out fade-out duration-500 pointer-events-none" />
        )}

        {/* Floating Sparkle Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}px`,
              opacity: p.opacity,
              filter: `drop-shadow(0 0 8px ${p.color})`,
            }}
          >
            {p.emoji}
          </div>
        ))}

        {/* Toddler Guidance Banner */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xs px-4 py-1 rounded-full border border-pink-200 pointer-events-none text-xs font-black text-pink-700 shadow-xs">
          👆 Swipe or tap anywhere to cast magical fireworks & sparkles!
        </div>
      </div>

      {/* Wand Selector & Action Controls (Chunky Toddler Buttons) */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xs p-3 rounded-3xl border-2 border-pink-200 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black text-pink-700">Choose Your Magic Wand:</span>
          <button
            id="btn-wand-clear"
            onClick={handleClearSky}
            className="text-[11px] font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            Clear Sky
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
          {WAND_STYLES.map((w) => (
            <button
              key={w.id}
              id={`btn-wand-${w.id}`}
              onClick={() => {
                playSound.sparkle();
                setSelectedWand(w);
              }}
              className={`flex items-center gap-2 p-2.5 rounded-2xl border-2 transition cursor-pointer ${
                selectedWand.id === w.id
                  ? 'bg-pink-500 text-white border-pink-600 shadow-md scale-102 ring-2 ring-pink-300'
                  : 'bg-pink-50 border-pink-200 text-pink-900 hover:bg-pink-100'
              }`}
            >
              <span className="text-2xl filter drop-shadow">{w.emoji}</span>
              <div className="text-left">
                <span className="block text-xs font-black">{w.name}</span>
                <span className="block text-[10px] opacity-80">
                  {w.particleEmojis.slice(0, 3).join('')}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
