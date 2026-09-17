import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Trophy, Check } from 'lucide-react';
import { playSound } from '../utils/audio';

interface ShapeSorterGameProps {
  onReward: () => void;
}

interface ShapeItem {
  id: string;
  name: string;
  src: string;
  colorName: string;
  matched: boolean;
}

const ALL_SHAPES: Omit<ShapeItem, 'matched'>[] = [
  { id: 'star', name: 'Gold Star', src: 'art/gold-star.png', colorName: 'Gold' },
  { id: 'heart', name: 'Ruby Heart', src: 'art/ruby-heart.png', colorName: 'Pink' },
  { id: 'circle', name: 'Sapphire Circle', src: 'art/sapphire.png', colorName: 'Blue' },
  { id: 'diamond', name: 'Amethyst Diamond', src: 'art/amethyst-diamond.png', colorName: 'Purple' },
  { id: 'triangle', name: 'Ruby Triangle', src: 'art/ruby-triangle.png', colorName: 'Red' },
  { id: 'moon', name: 'Turquoise Moon', src: 'art/turquoise-moon.png', colorName: 'Teal' },
];

const spring = { type: 'spring' as const, stiffness: 360, damping: 20 };

export const ShapeSorterGame: React.FC<ShapeSorterGameProps> = ({ onReward }) => {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [shapes, setShapes] = useState<ShapeItem[]>([]);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [praiseText, setPraiseText] = useState<string>('Match the royal shapes! 👑');
  const [roundComplete, setRoundComplete] = useState(false);

  // Initialize level shapes
  const initLevel = (lvl: 1 | 2 | 3) => {
    let count = 3;
    if (lvl === 2) count = 4;
    if (lvl === 3) count = 6;

    const chosen = ALL_SHAPES.slice(0, count).map((s) => ({
      ...s,
      matched: false,
    }));

    // Shuffle shapes in tray
    const shuffled = [...chosen].sort(() => Math.random() - 0.5);
    setShapes(shuffled);
    setSelectedShapeId(null);
    setRoundComplete(false);
    setPraiseText('Tap a shape, then tap its treasure chest!');
  };

  useEffect(() => {
    initLevel(level);
  }, [level]);

  // Speak voice praise using Web Speech API if supported
  const speakPraise = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.3;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Tap a shape in the bottom tray
  const handleSelectShape = (shapeId: string) => {
    playSound.pop();
    setSelectedShapeId(shapeId);
    const shape = shapes.find((s) => s.id === shapeId);
    if (shape) {
      setPraiseText(`Selected ${shape.name}! Now tap its chest! ✨`);
    }
  };

  // Tap a treasure chest at the top
  const handleChestTap = (targetShapeId: string) => {
    if (!selectedShapeId) {
      playSound.tap();
      const target = shapes.find((s) => s.id === targetShapeId);
      if (target) {
        setPraiseText(`This is the ${target.name} chest! Find its shape below! 🗝️`);
      }
      return;
    }

    if (selectedShapeId === targetShapeId) {
      // MATCH!
      playSound.shapeMatch();
      const matchedShape = shapes.find((s) => s.id === selectedShapeId);
      const name = matchedShape ? matchedShape.name : 'Shape';
      setPraiseText(`Sparkling ${name}! Great job! 🎉`);
      speakPraise(`${name}! Great job!`);

      const nextShapes = shapes.map((s) => (s.id === selectedShapeId ? { ...s, matched: true } : s));
      setShapes(nextShapes);
      setSelectedShapeId(null);

      // Check if all matched
      const allDone = nextShapes.every((s) => s.matched);
      if (allDone) {
        setRoundComplete(true);
        playSound.fanfare();
        onReward();
      }
    } else {
      // Gentle mismatch feedback (gentle sound, no harsh buzzer)
      playSound.boing();
      setPraiseText('Almost! Try finding the matching treasure chest! 🌸');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center gap-3 select-none">
      {/* Top Header & Level Selector */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="w-full max-w-2xl glass-strong glow-lavender px-4 py-2.5 rounded-[28px] flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-2">
          <img src="art/gold-star.png" alt="" className="w-9 h-9 object-contain drop-shadow" />
          <div>
            <h3 className="font-display italic text-base sm:text-xl font-bold text-pink-800 leading-tight">
              Royal Shape Sorter
            </h3>
            <span className="text-xs font-bold text-pink-600/80">
              Match gems into their treasure chests
            </span>
          </div>
        </div>

        {/* Level Selector */}
        <div className="flex items-center gap-1 bg-white/70 p-1 rounded-full">
          {([1, 2, 3] as const).map((lvl) => (
            <button
              key={lvl}
              id={`btn-shape-lvl-${lvl}`}
              onClick={() => {
                playSound.tap();
                setLevel(lvl);
              }}
              className={`px-3 py-1 rounded-full font-black text-xs sm:text-sm transition cursor-pointer ${
                level === lvl
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-pink-700 hover:bg-pink-100'
              }`}
            >
              Lvl {lvl}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Sorting Stage Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...spring, delay: 0.05 }}
        className="relative w-full max-w-2xl h-[320px] sm:h-[350px] rounded-[40px] border-4 border-white/70 glow-pink bg-linear-to-b from-indigo-100 via-purple-50 to-pink-100 overflow-hidden flex flex-col justify-between p-4"
      >
        {/* Praise Speech Bubble Banner */}
        <div className="relative z-10 self-center glass-strong px-4 py-1.5 rounded-full flex items-center gap-2">
          <span className="text-xs sm:text-sm font-black text-pink-800">
            {praiseText}
          </span>
        </div>

        {/* Treasure Chests Grid (Target Sockets) */}
        <div className="relative z-10 grid grid-cols-3 gap-2 sm:gap-3 my-auto w-full max-w-lg mx-auto">
          {shapes.map((shape) => {
            const isTargetSelected = selectedShapeId === shape.id;
            return (
              <motion.button
                key={shape.id}
                id={`chest-${shape.id}`}
                onClick={() => handleChestTap(shape.id)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.92 }}
                animate={{ scale: isTargetSelected ? 1.06 : 1 }}
                transition={spring}
                className={`relative flex flex-col items-center justify-center p-3 rounded-[22px] cursor-pointer ${
                  shape.matched
                    ? 'glass-strong ring-2 ring-emerald-300 glow-lavender'
                    : isTargetSelected
                    ? 'glass-strong glow-gold ring-4 ring-amber-300'
                    : 'glass border-2 border-dashed border-purple-200'
                }`}
                title={`Treasure Chest for ${shape.name}`}
              >
                {/* Chest & Shape Slot */}
                <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
                  <span className="text-3xl sm:text-4xl filter drop-shadow select-none">
                    {shape.matched ? '📦' : '🧰'}
                  </span>

                  <img
                    src={shape.src}
                    alt=""
                    className={`absolute w-6 h-6 sm:w-7 sm:h-7 object-contain ${
                      shape.matched ? 'animate-bounce' : 'opacity-40 grayscale'
                    }`}
                  />
                </div>

                {/* Chest Label */}
                <span className="text-[11px] font-black text-purple-900 mt-1 truncate w-full text-center">
                  {shape.name}
                </span>

                {shape.matched && (
                  <div className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-0.5 shadow-xs">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Celebration Banner if round complete */}
        {roundComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={spring}
            className="relative z-20 self-center bg-linear-to-r from-yellow-400 via-pink-400 to-purple-400 text-white px-5 py-2 rounded-full glow-gold flex items-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            <span className="text-sm sm:text-base font-black">All gems sorted! Hooray!</span>
          </motion.div>
        )}

        {/* Toddler Hint */}
        <div className="relative z-10 self-center text-[11px] font-bold text-pink-700 glass px-3 py-0.5 rounded-full pointer-events-none">
          Tap a gem at the bottom, then tap its matching chest!
        </div>
      </motion.div>

      {/* Bottom Shape Gem Tray */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.1 }}
        className="w-full max-w-2xl glass-strong glow-lavender p-3 rounded-[28px] flex flex-col gap-2"
      >
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black text-pink-700">Pick a Royal Gem:</span>
          <button
            id="btn-shape-reset"
            onClick={() => initLevel(level)}
            className="text-[11px] font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Restart Round
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full">
          {shapes.map((shape) => (
            <motion.button
              key={shape.id}
              id={`shape-item-${shape.id}`}
              disabled={shape.matched}
              onClick={() => handleSelectShape(shape.id)}
              whileHover={shape.matched ? {} : { y: -3, scale: 1.05 }}
              whileTap={shape.matched ? {} : { scale: 0.9 }}
              animate={{ scale: selectedShapeId === shape.id ? 1.08 : 1 }}
              transition={spring}
              className={`flex flex-col items-center justify-center gap-1 p-2 rounded-[20px] cursor-pointer ${
                shape.matched
                  ? 'opacity-30 cursor-not-allowed glass'
                  : selectedShapeId === shape.id
                  ? 'glass-strong glow-gold ring-4 ring-pink-300'
                  : 'glass hover:glow-pink'
              }`}
            >
              <img src={shape.src} alt="" className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow" draggable={false} />
              <span className="text-[10px] font-black text-pink-900 truncate w-full text-center">
                {shape.colorName}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
