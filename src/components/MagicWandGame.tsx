import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trash2 } from 'lucide-react';
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
  src: string;
  particleEmojis: string[];
  auraColor: string;
}

// The wand pictures are illustrated; only the sparkle trail itself is still
// emoji-based (kept as-is — it already reads as "magic" and toddlers love
// it, no need to replace what already works).
const WAND_STYLES: WandStyle[] = [
  {
    id: 'moon',
    name: 'Moonlight Wand',
    src: 'art/wand-moon.png',
    particleEmojis: ['⭐', '✨', '🌟', '💫', '🟡'],
    auraColor: 'rgba(125, 211, 252, 0.6)',
  },
  {
    id: 'heart',
    name: 'Heart Wand',
    src: 'art/wand-heart.png',
    particleEmojis: ['💖', '💕', '💗', '✨', '🌸'],
    auraColor: 'rgba(244, 63, 94, 0.6)',
  },
  {
    id: 'crystal',
    name: 'Crystal Wand',
    src: 'art/wand-crystal.png',
    particleEmojis: ['🌈', '✨', '💎', '🦋', '⭐'],
    auraColor: 'rgba(168, 85, 247, 0.6)',
  },
  {
    id: 'clover',
    name: 'Clover Wand',
    src: 'art/wand-clover.png',
    particleEmojis: ['🌸', '🌺', '🌷', '✨', '🧚'],
    auraColor: 'rgba(52, 211, 153, 0.6)',
  },
  {
    id: 'sun',
    name: 'Sunshine Wand',
    src: 'art/wand-sun.png',
    particleEmojis: ['⭐', '✨', '🌟', '💫', '🟡'],
    auraColor: 'rgba(251, 191, 36, 0.6)',
  },
  {
    id: 'spiral',
    name: 'Seashell Wand',
    src: 'art/wand-spiral.png',
    particleEmojis: ['🌈', '✨', '💎', '🦋', '⭐'],
    auraColor: 'rgba(45, 212, 191, 0.6)',
  },
];

const spring = { type: 'spring' as const, stiffness: 360, damping: 20 };

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
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center gap-3 select-none">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="w-full max-w-2xl glass-strong glow-lavender px-4 py-2.5 rounded-[28px] flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-2">
          <img src={selectedWand.src} alt="" className="w-9 h-9 object-contain drop-shadow" />
          <div>
            <h3 className="font-display italic text-base sm:text-xl font-bold text-pink-800 leading-tight">
              Magic Wand &amp; Fireworks
            </h3>
            <span className="text-xs font-bold text-pink-600/80">
              Drag your wand across the sky!
            </span>
          </div>
        </div>

        {/* Fireworks Button */}
        <motion.button
          id="btn-fireworks-launch"
          onClick={handleLaunchFireworks}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-linear-to-r from-amber-400 via-rose-400 to-purple-500 text-white font-black text-xs sm:text-sm glow-gold cursor-pointer"
        >
          <span className="text-lg animate-pulse">🎆</span>
          <span>Fireworks!</span>
        </motion.button>
      </motion.div>

      {/* Main Night Sky Canvas */}
      <motion.div
        ref={canvasRef}
        id="wand-canvas"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...spring, delay: 0.05 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full max-w-2xl h-[360px] sm:h-[400px] rounded-[40px] border-4 border-white/70 glow-pink overflow-hidden bg-linear-to-b from-slate-950 via-indigo-950 to-purple-900 cursor-crosshair touch-none"
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
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 glass-strong px-4 py-1 rounded-full pointer-events-none text-xs font-black text-pink-700 shadow-xs">
          Swipe or tap anywhere to cast magical fireworks &amp; sparkles!
        </div>
      </motion.div>

      {/* Wand Selector & Action Controls */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.1 }}
        className="w-full max-w-2xl glass-strong glow-lavender p-3 rounded-[28px] flex flex-col gap-2"
      >
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

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full">
          {WAND_STYLES.map((w) => (
            <motion.button
              key={w.id}
              id={`btn-wand-${w.id}`}
              onClick={() => {
                playSound.sparkle();
                setSelectedWand(w);
              }}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              animate={{ scale: selectedWand.id === w.id ? 1.06 : 1 }}
              transition={spring}
              className={`flex flex-col items-center gap-1 p-2 rounded-[20px] cursor-pointer ${
                selectedWand.id === w.id ? 'glass-strong glow-gold ring-2 ring-yellow-300' : 'glass hover:glow-pink'
              }`}
              title={w.name}
            >
              <img src={w.src} alt="" className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow" draggable={false} />
              <span className="text-[10px] font-black text-[#4A3B5C] leading-tight text-center">{w.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
