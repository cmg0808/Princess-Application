import React, { useState, useRef } from 'react';
import { Sparkles, RotateCcw, Trash2, Camera, Star, Heart, Check, User } from 'lucide-react';
import { PlacedGem, CrownBaseOption, CrownMetalOption } from '../types';
import { playSound } from '../utils/audio';

interface CrownDecoratorGameProps {
  onReward: () => void;
}

const CROWN_BASES: CrownBaseOption[] = [
  { id: 'classic', name: 'Royal Tiara', emoji: '👑', description: 'Classic palace princess tiara' },
  { id: 'blossom', name: 'Blossom Coronet', emoji: '🌸', description: 'Floral fairy garden crown' },
  { id: 'star', name: 'Starlight Diadem', emoji: '⭐', description: 'Tall twinkling night sky crown' },
  { id: 'heart', name: 'Heart Princess', emoji: '💖', description: 'Sweet romantic heart crest' },
  { id: 'swan', name: 'Swan Wings', emoji: '🦢', description: 'Graceful winged crystal tiara' },
];

const CROWN_METALS: CrownMetalOption[] = [
  {
    id: 'gold',
    name: 'Sunshine Gold',
    color: '#F59E0B',
    gradient: 'from-amber-300 via-yellow-400 to-amber-500',
    borderColor: 'border-yellow-500',
    glowColor: 'rgba(251, 191, 36, 0.5)',
  },
  {
    id: 'rosegold',
    name: 'Rose Gold',
    color: '#FB7185',
    gradient: 'from-rose-300 via-pink-400 to-rose-400',
    borderColor: 'border-rose-400',
    glowColor: 'rgba(244, 114, 182, 0.5)',
  },
  {
    id: 'silver',
    name: 'Palace Silver',
    color: '#94A3B8',
    gradient: 'from-slate-100 via-gray-300 to-slate-200',
    borderColor: 'border-slate-400',
    glowColor: 'rgba(203, 213, 225, 0.5)',
  },
  {
    id: 'amethyst',
    name: 'Magic Purple',
    color: '#A855F7',
    gradient: 'from-purple-300 via-fuchsia-400 to-indigo-400',
    borderColor: 'border-purple-500',
    glowColor: 'rgba(168, 85, 247, 0.5)',
  },
  {
    id: 'sapphire',
    name: 'Crystal Blue',
    color: '#38BDF8',
    gradient: 'from-sky-300 via-blue-400 to-cyan-400',
    borderColor: 'border-sky-500',
    glowColor: 'rgba(56, 189, 248, 0.5)',
  },
];

interface GemPaletteItem {
  type: string;
  label: string;
  emoji: string;
  color: string;
}

const GEM_PALETTE: GemPaletteItem[] = [
  { type: 'diamond', label: 'Diamond', emoji: '💎', color: '#60A5FA' },
  { type: 'ruby', label: 'Ruby Heart', emoji: '💖', color: '#F43F5E' },
  { type: 'star', label: 'Star Gem', emoji: '⭐', color: '#FACC15' },
  { type: 'emerald', label: 'Emerald', emoji: '🟢', color: '#10B981' },
  { type: 'sapphire', label: 'Sapphire', emoji: '🔷', color: '#3B82F6' },
  { type: 'amethyst', label: 'Amethyst', emoji: '🔮', color: '#8B5CF6' },
  { type: 'pearl', label: 'Pink Pearl', emoji: '⚪', color: '#FBCFE8' },
  { type: 'flower', label: 'Blossom', emoji: '🌸', color: '#FB7185' },
  { type: 'butterfly', label: 'Butterfly', emoji: '🦋', color: '#38BDF8' },
];

export const CrownDecoratorGame: React.FC<CrownDecoratorGameProps> = ({ onReward }) => {
  const [selectedBase, setSelectedBase] = useState<CrownBaseOption>(CROWN_BASES[0]);
  const [selectedMetal, setSelectedMetal] = useState<CrownMetalOption>(CROWN_METALS[0]);
  const [selectedGemType, setSelectedGemType] = useState<GemPaletteItem>(GEM_PALETTE[0]);
  const [placedGems, setPlacedGems] = useState<PlacedGem[]>([]);
  const [isWearingOnPrincess, setIsWearingOnPrincess] = useState(false);
  const [sparkleActive, setSparkleActive] = useState(false);
  const [showPhotoFlash, setShowPhotoFlash] = useState(false);

  const crownCanvasRef = useRef<HTMLDivElement | null>(null);

  // Add a gem by tapping on crown
  const handleCanvasTap = (e: React.MouseEvent<HTMLDivElement> | React.PointerEvent<HTMLDivElement>) => {
    if (!crownCanvasRef.current) return;
    const rect = crownCanvasRef.current.getBoundingClientRect();
    const x = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(10, Math.min(85, ((e.clientY - rect.top) / rect.height) * 100));

    playSound.gemSnap();

    const newGem: PlacedGem = {
      id: Math.random().toString(),
      type: selectedGemType.type,
      label: selectedGemType.label,
      emoji: selectedGemType.emoji,
      color: selectedGemType.color,
      x,
      y,
      size: 44,
    };

    const nextGems = [...placedGems, newGem];
    setPlacedGems(nextGems);
    if (nextGems.length === 6 || nextGems.length === 12) {
      // Milestone reward
      playSound.sparkle();
      onReward();
    }
  };

  // Remove individual gem on tap
  const handleGemTap = (gemId: string, e: React.MouseEvent | React.PointerEvent) => {
    e.stopPropagation();
    playSound.pop();
    setPlacedGems((prev) => prev.filter((g) => g.id !== gemId));
  };

  // Clear all gems
  const handleClear = () => {
    playSound.boing();
    setPlacedGems([]);
  };

  // Trigger Magic Sparkles
  const handleSparkleMagic = () => {
    playSound.sparkle();
    setSparkleActive(true);
    setTimeout(() => setSparkleActive(false), 1200);
  };

  // Take Snapshot / Photo
  const handleTakeSnapshot = () => {
    playSound.fanfare();
    setShowPhotoFlash(true);
    setTimeout(() => setShowPhotoFlash(false), 400);
    onReward();
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center gap-3 select-none font-['Fredoka']">
      {/* Top Header Controls */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xs px-4 py-2 rounded-3xl border-2 border-pink-200 shadow-sm flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-bounce">👑</span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-pink-800 leading-tight">
              Crown Decorator
            </h3>
            <span className="text-xs font-bold text-pink-500">
              {placedGems.length} gems placed ✨
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Try On Princess Toggle */}
          <button
            id="btn-crown-try-on"
            onClick={() => {
              playSound.tap();
              setIsWearingOnPrincess(!isWearingOnPrincess);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 text-xs sm:text-sm font-black transition cursor-pointer shadow-xs ${
              isWearingOnPrincess
                ? 'bg-purple-500 text-white border-purple-600'
                : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{isWearingOnPrincess ? 'Crown View' : 'Try On! 👸'}</span>
          </button>

          {/* Sparkle Magic */}
          <button
            id="btn-crown-sparkle"
            onClick={handleSparkleMagic}
            className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-yellow-100 border-2 border-yellow-300 text-yellow-800 font-black text-xs sm:text-sm hover:bg-yellow-200 active:scale-95 transition cursor-pointer shadow-xs"
            title="Make your crown sparkle!"
          >
            <Sparkles className="w-4 h-4 text-yellow-600 fill-yellow-400" />
            <span className="hidden xs:inline">Sparkle</span>
          </button>

          {/* Clear Crown */}
          {placedGems.length > 0 && (
            <button
              id="btn-crown-clear"
              onClick={handleClear}
              className="p-1.5 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-600 hover:bg-rose-100 active:scale-95 transition cursor-pointer shadow-xs"
              title="Remove all gems"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* Photo Snapshot */}
          <button
            id="btn-crown-photo"
            onClick={handleTakeSnapshot}
            className="p-1.5 rounded-2xl bg-pink-500 text-white border-2 border-pink-400 hover:bg-pink-600 active:scale-95 transition cursor-pointer shadow-xs"
            title="Save Royal Crown Snapshot"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Crown Decorating Stage Canvas */}
      <div className="relative w-full max-w-2xl h-[340px] sm:h-[380px] rounded-3xl border-4 border-pink-300 shadow-2xl overflow-hidden bg-linear-to-b from-pink-100 via-purple-50 to-pink-200 flex flex-col items-center justify-center p-4">
        {/* Photo Flash Overlay */}
        {showPhotoFlash && (
          <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-300 pointer-events-none" />
        )}

        {/* Ambient Fairytale Glow */}
        <div className="absolute inset-0 pointer-events-none flex justify-between p-6 opacity-30">
          <span className="text-4xl">✨</span>
          <span className="text-3xl">⭐</span>
          <span className="text-4xl">💎</span>
        </div>

        {/* If Mode is "Wear on Princess", show royal princess model */}
        {isWearingOnPrincess ? (
          <div className="relative flex flex-col items-center animate-in zoom-in duration-300">
            {/* The Crown Sitting On Her Head */}
            <div className="relative z-20 mb-[-24px] scale-90 sm:scale-100 filter drop-shadow-lg">
              <span className="text-7xl sm:text-8xl select-none">{selectedBase.emoji}</span>
              {/* Placed gems overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {placedGems.slice(0, 5).map((gem, idx) => (
                  <span key={idx} className="text-xl sm:text-2xl filter drop-shadow">
                    {gem.emoji}
                  </span>
                ))}
              </div>
            </div>

            {/* Princess Head & Face */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#fce7db] border-4 border-amber-800/30 flex items-center justify-center shadow-lg">
              {/* Hair */}
              <div className="absolute -top-3 w-36 h-20 rounded-t-full bg-amber-600" />
              {/* Long Hair Locks on sides */}
              <div className="absolute -bottom-4 -left-3 w-8 h-24 rounded-full bg-amber-600 shadow-md" />
              <div className="absolute -bottom-4 -right-3 w-8 h-24 rounded-full bg-amber-600 shadow-md" />

              {/* Eyes */}
              <div className="relative flex items-center gap-6 mt-4 z-10">
                <div className="w-3 h-4 bg-stone-800 rounded-full flex items-start justify-end p-0.5">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
                <div className="w-3 h-4 bg-stone-800 rounded-full flex items-start justify-end p-0.5">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
              </div>

              {/* Rosy Cheeks */}
              <div className="absolute top-18 left-4 w-4 h-2 bg-pink-400/80 rounded-full" />
              <div className="absolute top-18 right-4 w-4 h-2 bg-pink-400/80 rounded-full" />

              {/* Cute Smile */}
              <div className="absolute bottom-6 w-6 h-3 border-b-3 border-rose-500 rounded-full" />
            </div>

            {/* Princess Gown Collar */}
            <div className="w-44 h-16 bg-linear-to-b from-pink-400 to-purple-500 rounded-t-3xl border-4 border-white shadow-md mt-[-8px] flex items-center justify-center text-white text-xs font-black">
              ✨ Her Royal Highness ✨
            </div>
          </div>
        ) : (
          /* Large Interactive Crown Canvas for decorating */
          <div
            ref={crownCanvasRef}
            id="crown-canvas-target"
            onClick={handleCanvasTap}
            className="relative w-full max-w-md h-56 sm:h-64 rounded-3xl border-3 border-dashed border-pink-300/80 flex items-center justify-center cursor-pointer transition-all hover:border-pink-400 active:scale-98"
          >
            {/* SVG Crown Base Structure with Dynamic Metal Color */}
            <div className="relative w-72 sm:w-80 h-44 sm:h-48 flex items-center justify-center filter drop-shadow-xl select-none">
              <svg
                viewBox="0 0 320 180"
                className={`w-full h-full transition-colors duration-500 ${sparkleActive ? 'animate-pulse' : ''}`}
                style={{ filter: `drop-shadow(0 8px 16px ${selectedMetal.glowColor})` }}
              >
                <defs>
                  <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={selectedMetal.color} stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.6" />
                    <stop offset="100%" stopColor={selectedMetal.color} stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* Base Arches & Peaks based on selectedBase */}
                {selectedBase.id === 'classic' && (
                  <path
                    d="M 30 140 L 40 50 L 95 100 L 160 25 L 225 100 L 280 50 L 290 140 Z"
                    fill="url(#metalGrad)"
                    stroke={selectedMetal.color}
                    strokeWidth="6"
                    strokeLinejoin="round"
                  />
                )}

                {selectedBase.id === 'blossom' && (
                  <path
                    d="M 30 140 Q 60 70 100 85 Q 160 15 220 85 Q 260 70 290 140 Z"
                    fill="url(#metalGrad)"
                    stroke={selectedMetal.color}
                    strokeWidth="6"
                    strokeLinejoin="round"
                  />
                )}

                {selectedBase.id === 'star' && (
                  <path
                    d="M 30 140 L 60 80 L 110 110 L 160 10 L 210 110 L 260 80 L 290 140 Z"
                    fill="url(#metalGrad)"
                    stroke={selectedMetal.color}
                    strokeWidth="6"
                    strokeLinejoin="round"
                  />
                )}

                {selectedBase.id === 'heart' && (
                  <path
                    d="M 30 140 L 50 60 Q 110 90 160 40 Q 210 90 270 60 L 290 140 Z"
                    fill="url(#metalGrad)"
                    stroke={selectedMetal.color}
                    strokeWidth="6"
                    strokeLinejoin="round"
                  />
                )}

                {selectedBase.id === 'swan' && (
                  <path
                    d="M 30 140 Q 40 40 100 80 Q 160 20 220 80 Q 280 40 290 140 Z"
                    fill="url(#metalGrad)"
                    stroke={selectedMetal.color}
                    strokeWidth="6"
                    strokeLinejoin="round"
                  />
                )}

                {/* Bottom Headband Ring */}
                <path
                  d="M 25 140 Q 160 165 295 140 L 295 155 Q 160 180 25 155 Z"
                  fill="url(#metalGrad)"
                  stroke={selectedMetal.color}
                  strokeWidth="4"
                />

                {/* Built-in socket circles */}
                <circle cx="160" cy="45" r="10" fill="#FFFFFF" opacity="0.6" stroke={selectedMetal.color} strokeWidth="2" />
                <circle cx="95" cy="95" r="8" fill="#FFFFFF" opacity="0.5" stroke={selectedMetal.color} strokeWidth="2" />
                <circle cx="225" cy="95" r="8" fill="#FFFFFF" opacity="0.5" stroke={selectedMetal.color} strokeWidth="2" />
              </svg>

              {/* Sparkle effects */}
              {sparkleActive && (
                <div className="absolute inset-0 flex items-center justify-around pointer-events-none text-3xl animate-ping">
                  <span>✨</span>
                  <span>⭐</span>
                  <span>✨</span>
                </div>
              )}
            </div>

            {/* Placed Gems on Canvas */}
            {placedGems.map((gem) => (
              <button
                key={gem.id}
                id={`placed-gem-${gem.id}`}
                onClick={(e) => handleGemTap(gem.id, e)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-125 active:scale-90 z-20"
                style={{
                  left: `${gem.x}%`,
                  top: `${gem.y}%`,
                }}
                title={`Tap to remove ${gem.label}`}
              >
                <span className="text-3xl sm:text-4xl filter drop-shadow-md select-none inline-block animate-in zoom-in duration-150">
                  {gem.emoji}
                </span>
              </button>
            ))}

            {/* Hint message if empty */}
            {placedGems.length === 0 && (
              <div className="absolute bottom-2 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-pink-200 pointer-events-none text-xs font-extrabold text-pink-700 shadow-2xs">
                👆 Tap anywhere on the crown to place your gems!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chunky Toddler Modular Trays (Bases, Metals, Jewels) */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xs p-3 rounded-3xl border-2 border-pink-200 shadow-sm flex flex-col gap-3">
        {/* Tray 1: Crown Base Selector */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-black text-pink-700">1. Pick Crown Style:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {CROWN_BASES.map((base) => (
              <button
                key={base.id}
                id={`btn-base-${base.id}`}
                onClick={() => {
                  playSound.tap();
                  setSelectedBase(base);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-2xl border-2 transition cursor-pointer shrink-0 font-extrabold text-xs sm:text-sm ${
                  selectedBase.id === base.id
                    ? 'bg-pink-500 text-white border-pink-600 shadow-xs scale-102'
                    : 'bg-pink-50 text-pink-800 border-pink-200 hover:bg-pink-100'
                }`}
              >
                <span className="text-lg">{base.emoji}</span>
                <span>{base.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tray 2: Metal / Color Finish */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-black text-pink-700">2. Pick Royal Metal:</span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {CROWN_METALS.map((metal) => (
              <button
                key={metal.id}
                id={`btn-metal-${metal.id}`}
                onClick={() => {
                  playSound.chime();
                  setSelectedMetal(metal);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 transition cursor-pointer shrink-0 font-extrabold text-xs sm:text-sm ${
                  selectedMetal.id === metal.id
                    ? 'ring-3 ring-pink-400 border-white shadow-sm scale-105 text-gray-900'
                    : 'border-pink-200 text-gray-700 hover:scale-102'
                } bg-linear-to-r ${metal.gradient}`}
              >
                <div
                  className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                  style={{ backgroundColor: metal.color }}
                />
                <span className="text-xs font-black">{metal.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tray 3: Gem & Decorative Jewel Palette */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-black text-pink-700">3. Tap a Jewel to Decorate:</span>
          <div className="grid grid-cols-5 sm:grid-cols-9 gap-1.5">
            {GEM_PALETTE.map((gem) => (
              <button
                key={gem.type}
                id={`btn-gem-${gem.type}`}
                onClick={() => {
                  playSound.gemSnap();
                  setSelectedGemType(gem);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition cursor-pointer ${
                  selectedGemType.type === gem.type
                    ? 'bg-pink-100 border-pink-500 ring-2 ring-pink-300 scale-105 shadow-xs'
                    : 'bg-pink-50/70 border-pink-200 hover:bg-pink-100 active:scale-95'
                }`}
                title={gem.label}
              >
                <span className="text-2xl filter drop-shadow select-none">{gem.emoji}</span>
                <span className="text-[10px] font-black text-pink-800 truncate w-full text-center mt-0.5">
                  {gem.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
