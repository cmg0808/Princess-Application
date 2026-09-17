import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trash2, Camera, Check, User } from 'lucide-react';
import { PlacedGem, CrownBaseOption, CrownMetalOption } from '../types';
import { playSound } from '../utils/audio';

interface CrownDecoratorGameProps {
  onReward: () => void;
}

const CROWN_BASES: CrownBaseOption[] = [
  { id: 'classic', name: 'Classic Crown', src: 'art/crown-classic.png', description: 'The timeless palace crown' },
  { id: 'starlight', name: 'Starlight Crown', src: 'art/crown-spiky.png', description: 'Tall twinkling night-sky points' },
  { id: 'royal', name: 'Royal Crown', src: 'art/crown-royal.png', description: 'Scalloped royal court crown' },
  { id: 'swirl', name: 'Swirl Tiara', src: 'art/crown-tiara-swirl.png', description: 'Elegant fleur-de-lis tiara' },
  { id: 'fan', name: 'Fan Tiara', src: 'art/crown-tiara-fan.png', description: 'Fanned petal-shaped tiara' },
];

// The crown art is one gold line-art style, so "metal" is now a CSS filter
// tint over the same picture rather than a separately re-drawn SVG.
const CROWN_METALS: CrownMetalOption[] = [
  {
    id: 'gold',
    name: 'Sunshine Gold',
    color: '#F59E0B',
    gradient: 'from-amber-300 via-yellow-400 to-amber-500',
    borderColor: 'border-yellow-500',
    glowColor: 'rgba(251, 191, 36, 0.5)',
    filterCss: 'none',
  },
  {
    id: 'rosegold',
    name: 'Rose Gold',
    color: '#FB7185',
    gradient: 'from-rose-300 via-pink-400 to-rose-400',
    borderColor: 'border-rose-400',
    glowColor: 'rgba(244, 114, 182, 0.5)',
    filterCss: 'hue-rotate(300deg) saturate(1.3)',
  },
  {
    id: 'silver',
    name: 'Palace Silver',
    color: '#94A3B8',
    gradient: 'from-slate-100 via-gray-300 to-slate-200',
    borderColor: 'border-slate-400',
    glowColor: 'rgba(203, 213, 225, 0.5)',
    filterCss: 'saturate(0.15) brightness(1.15)',
  },
  {
    id: 'amethyst',
    name: 'Magic Purple',
    color: '#A855F7',
    gradient: 'from-purple-300 via-fuchsia-400 to-indigo-400',
    borderColor: 'border-purple-500',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    filterCss: 'hue-rotate(225deg) saturate(1.4)',
  },
  {
    id: 'sapphire',
    name: 'Crystal Blue',
    color: '#38BDF8',
    gradient: 'from-sky-300 via-blue-400 to-cyan-400',
    borderColor: 'border-sky-500',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    filterCss: 'hue-rotate(155deg) saturate(1.4)',
  },
];

interface GemPaletteItem {
  type: string;
  label: string;
  src: string;
}

const GEM_PALETTE: GemPaletteItem[] = [
  { type: 'diamond', label: 'Diamond', src: 'art/amethyst-diamond.png' },
  { type: 'ruby', label: 'Ruby Heart', src: 'art/ruby-heart.png' },
  { type: 'star', label: 'Star Gem', src: 'art/gold-star.png' },
  { type: 'emerald', label: 'Emerald', src: 'art/emerald-oval.png' },
  { type: 'sapphire', label: 'Sapphire', src: 'art/sapphire.png' },
  { type: 'amethyst', label: 'Amethyst', src: 'art/amethyst-hexagon.png' },
  { type: 'aqua', label: 'Aqua Drop', src: 'art/aqua-teardrop.png' },
  { type: 'ruby-tri', label: 'Ruby Cut', src: 'art/ruby-triangle.png' },
  { type: 'moon', label: 'Moonstone', src: 'art/turquoise-moon.png' },
  { type: 'sun', label: 'Sunstone', src: 'art/citrine-sun.png' },
];

const spring = { type: 'spring' as const, stiffness: 360, damping: 20 };

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
      src: selectedGemType.src,
      color: '#FFFFFF',
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
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center gap-3 select-none">
      {/* Top Header Controls */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="w-full max-w-2xl glass-strong glow-lavender px-4 py-2 rounded-[28px] flex items-center justify-between gap-2 flex-wrap"
      >
        <div className="flex items-center gap-2">
          <img src={selectedBase.src} alt="" className="w-9 h-9 object-contain drop-shadow" style={{ filter: selectedMetal.filterCss }} />
          <div>
            <h3 className="font-display italic text-base sm:text-xl font-bold text-pink-800 leading-tight">
              Crown Decorator
            </h3>
            <span className="text-xs font-bold text-pink-600/80">
              {placedGems.length} gems placed
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Try On Princess Toggle */}
          <motion.button
            id="btn-crown-try-on"
            onClick={() => {
              playSound.tap();
              setIsWearingOnPrincess(!isWearingOnPrincess);
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-black cursor-pointer ${
              isWearingOnPrincess ? 'bg-purple-500 text-white glow-lavender' : 'glass text-purple-700'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{isWearingOnPrincess ? 'Crown View' : 'Try On!'}</span>
          </motion.button>

          {/* Sparkle Magic */}
          <motion.button
            id="btn-crown-sparkle"
            onClick={handleSparkleMagic}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full glass text-yellow-700 font-black text-xs sm:text-sm cursor-pointer"
            title="Make your crown sparkle!"
          >
            <Sparkles className="w-4 h-4 text-yellow-600 fill-yellow-400" />
            <span className="hidden xs:inline">Sparkle</span>
          </motion.button>

          {/* Clear Crown */}
          {placedGems.length > 0 && (
            <motion.button
              id="btn-crown-clear"
              onClick={handleClear}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-full glass text-rose-600 cursor-pointer"
              title="Remove all gems"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          )}

          {/* Photo Snapshot */}
          <motion.button
            id="btn-crown-photo"
            onClick={handleTakeSnapshot}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 rounded-full bg-pink-500 text-white glow-pink cursor-pointer"
            title="Save Royal Crown Snapshot"
          >
            <Camera className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Main Crown Decorating Stage Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...spring, delay: 0.05 }}
        className="relative w-full max-w-2xl h-[340px] sm:h-[380px] rounded-[40px] border-4 border-white/70 glow-pink overflow-hidden bg-linear-to-b from-pink-100 via-purple-50 to-pink-200 flex flex-col items-center justify-center p-4"
      >
        {/* Photo Flash Overlay */}
        {showPhotoFlash && (
          <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-300 pointer-events-none" />
        )}

        {/* If Mode is "Wear on Princess", show royal princess model */}
        {isWearingOnPrincess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={spring}
            className="relative flex flex-col items-center"
          >
            {/* The Crown Sitting On Her Head */}
            <div className="relative z-20 mb-[-16px] w-32 sm:w-40 filter drop-shadow-lg">
              <img src={selectedBase.src} alt="" className="w-full object-contain select-none" style={{ filter: selectedMetal.filterCss }} />
              {/* Placed gems overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center flex-wrap gap-0.5 p-2">
                {placedGems.slice(0, 6).map((gem, idx) => (
                  <img key={idx} src={gem.src} alt="" className="w-4 h-4 sm:w-5 sm:h-5 object-contain filter drop-shadow" />
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
              Her Royal Highness
            </div>
          </motion.div>
        ) : (
          /* Large Interactive Crown Canvas for decorating */
          <div
            ref={crownCanvasRef}
            id="crown-canvas-target"
            onClick={handleCanvasTap}
            className="relative w-full max-w-md h-56 sm:h-64 rounded-[32px] border-3 border-dashed border-pink-300/80 flex items-center justify-center cursor-pointer transition-all hover:border-pink-400 active:scale-98"
          >
            {/* Crown Base Art, tinted by the selected metal */}
            <motion.img
              key={selectedBase.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: sparkleActive ? 1.05 : 1 }}
              transition={spring}
              src={selectedBase.src}
              alt=""
              className="relative w-56 sm:w-64 object-contain select-none pointer-events-none"
              style={{ filter: `${selectedMetal.filterCss} drop-shadow(0 8px 16px ${selectedMetal.glowColor})` }}
            />

            {/* Sparkle effects */}
            {sparkleActive && (
              <div className="absolute inset-0 flex items-center justify-around pointer-events-none text-3xl animate-ping">
                <span>✨</span>
                <span>⭐</span>
                <span>✨</span>
              </div>
            )}

            {/* Placed Gems on Canvas */}
            {placedGems.map((gem) => (
              <motion.button
                key={gem.id}
                id={`placed-gem-${gem.id}`}
                onClick={(e) => handleGemTap(gem.id, e)}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.85 }}
                transition={spring}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                style={{
                  left: `${gem.x}%`,
                  top: `${gem.y}%`,
                }}
                title={`Tap to remove ${gem.label}`}
              >
                <img src={gem.src} alt="" className="w-8 h-8 sm:w-10 sm:h-10 object-contain filter drop-shadow-md select-none" />
              </motion.button>
            ))}

            {/* Hint message if empty */}
            {placedGems.length === 0 && (
              <div className="absolute bottom-2 glass px-3 py-1 rounded-full pointer-events-none text-xs font-extrabold text-pink-700">
                Tap anywhere on the crown to place your gems!
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Chunky Toddler Modular Trays (Bases, Metals, Jewels) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.1 }}
        className="w-full max-w-2xl glass-strong glow-lavender p-3 rounded-[28px] flex flex-col gap-3"
      >
        {/* Tray 1: Crown Base Selector */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-black text-pink-700">1. Pick Crown Style:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {CROWN_BASES.map((base) => (
              <motion.button
                key={base.id}
                id={`btn-base-${base.id}`}
                onClick={() => {
                  playSound.tap();
                  setSelectedBase(base);
                }}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.93 }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full cursor-pointer shrink-0 font-extrabold text-xs sm:text-sm ${
                  selectedBase.id === base.id ? 'glass-strong glow-gold ring-2 ring-pink-300' : 'glass hover:glow-pink'
                }`}
              >
                <img src={base.src} alt="" className="w-6 h-6 object-contain" style={{ filter: selectedMetal.filterCss }} />
                <span className="text-[#4A3B5C]">{base.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tray 2: Metal / Color Finish */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-black text-pink-700">2. Pick Royal Metal:</span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {CROWN_METALS.map((metal) => (
              <motion.button
                key={metal.id}
                id={`btn-metal-${metal.id}`}
                onClick={() => {
                  playSound.chime();
                  setSelectedMetal(metal);
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.92 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer shrink-0 font-extrabold text-xs sm:text-sm bg-linear-to-r ${metal.gradient} ${
                  selectedMetal.id === metal.id ? 'ring-3 ring-pink-400' : ''
                }`}
              >
                <div className="w-3.5 h-3.5 rounded-full border border-white shadow-xs" style={{ backgroundColor: metal.color }} />
                <span className="text-xs font-black text-gray-900">{metal.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tray 3: Gem & Decorative Jewel Palette */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-black text-pink-700">3. Tap a Jewel to Decorate:</span>
          <div className="grid grid-cols-5 gap-1.5">
            {GEM_PALETTE.map((gem) => (
              <motion.button
                key={gem.type}
                id={`btn-gem-${gem.type}`}
                onClick={() => {
                  playSound.gemSnap();
                  setSelectedGemType(gem);
                }}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                className={`flex flex-col items-center justify-center gap-0.5 p-1.5 rounded-[18px] cursor-pointer ${
                  selectedGemType.type === gem.type ? 'glass-strong glow-gold ring-2 ring-pink-300' : 'glass hover:glow-pink'
                }`}
                title={gem.label}
              >
                <img src={gem.src} alt="" className="w-8 h-8 sm:w-9 sm:h-9 object-contain filter drop-shadow select-none" draggable={false} />
                <span className="text-[9px] font-black text-pink-800 truncate w-full text-center">
                  {gem.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
