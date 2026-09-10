import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, Trophy, Check, Star, Heart } from 'lucide-react';
import { playSound } from '../utils/audio';

interface ShapeSorterGameProps {
  onReward: () => void;
}

interface ShapeItem {
  id: string;
  name: string;
  emoji: string;
  colorName: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  matched: boolean;
}

const ALL_SHAPES: Omit<ShapeItem, 'matched'>[] = [
  {
    id: 'star',
    name: 'Yellow Star',
    emoji: '⭐',
    colorName: 'Gold',
    bgGradient: 'from-amber-300 via-yellow-400 to-amber-400',
    borderColor: 'border-yellow-400',
    textColor: 'text-amber-900',
  },
  {
    id: 'heart',
    name: 'Ruby Heart',
    emoji: '💖',
    colorName: 'Pink',
    bgGradient: 'from-pink-400 via-rose-400 to-pink-500',
    borderColor: 'border-rose-400',
    textColor: 'text-rose-950',
  },
  {
    id: 'circle',
    name: 'Blue Circle',
    emoji: '🔵',
    colorName: 'Blue',
    bgGradient: 'from-sky-400 via-blue-400 to-cyan-400',
    borderColor: 'border-sky-400',
    textColor: 'text-sky-950',
  },
  {
    id: 'diamond',
    name: 'Crystal Diamond',
    emoji: '💎',
    colorName: 'Cyan',
    bgGradient: 'from-cyan-300 via-teal-300 to-sky-300',
    borderColor: 'border-cyan-400',
    textColor: 'text-cyan-950',
  },
  {
    id: 'triangle',
    name: 'Emerald Triangle',
    emoji: '🔺',
    colorName: 'Green',
    bgGradient: 'from-emerald-400 via-green-400 to-teal-400',
    borderColor: 'border-emerald-400',
    textColor: 'text-emerald-950',
  },
  {
    id: 'moon',
    name: 'Purple Moon',
    emoji: '🌙',
    colorName: 'Purple',
    bgGradient: 'from-purple-400 via-fuchsia-400 to-indigo-400',
    borderColor: 'border-purple-400',
    textColor: 'text-purple-950',
  },
];

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
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center gap-3 select-none font-['Fredoka']">
      {/* Top Header & Level Selector */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-3xl border-2 border-pink-200 shadow-sm flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-bounce">💎</span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-pink-800 leading-tight">
              Royal Shape Sorter
            </h3>
            <span className="text-xs font-bold text-pink-500">
              Match gems into velvet treasure chests
            </span>
          </div>
        </div>

        {/* Level Selector */}
        <div className="flex items-center gap-1 bg-pink-100 p-1 rounded-2xl border border-pink-200">
          {([1, 2, 3] as const).map((lvl) => (
            <button
              key={lvl}
              id={`btn-shape-lvl-${lvl}`}
              onClick={() => {
                playSound.tap();
                setLevel(lvl);
              }}
              className={`px-3 py-1 rounded-xl font-black text-xs sm:text-sm transition cursor-pointer ${
                level === lvl
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-pink-700 hover:bg-pink-200/60'
              }`}
            >
              Lvl {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Sorting Stage Canvas */}
      <div className="relative w-full max-w-2xl h-[320px] sm:h-[350px] rounded-3xl border-4 border-pink-300 shadow-2xl bg-linear-to-b from-indigo-100 via-purple-50 to-pink-100 overflow-hidden flex flex-col justify-between p-4">
        {/* Praise Speech Bubble Banner */}
        <div className="relative z-10 self-center bg-white/95 backdrop-blur-xs px-4 py-1.5 rounded-full border-2 border-pink-300 shadow-md flex items-center gap-2 animate-in zoom-in duration-200">
          <span className="text-base sm:text-lg">✨</span>
          <span className="text-xs sm:text-sm font-black text-pink-800">
            {praiseText}
          </span>
        </div>

        {/* Treasure Chests Grid (Target Sockets) */}
        <div className="relative z-10 grid grid-cols-3 gap-2 sm:gap-3 my-auto w-full max-w-lg mx-auto">
          {shapes.map((shape) => {
            const isTargetSelected = selectedShapeId === shape.id;
            return (
              <button
                key={shape.id}
                id={`chest-${shape.id}`}
                onClick={() => handleChestTap(shape.id)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border-3 transition-all cursor-pointer ${
                  shape.matched
                    ? 'bg-white/95 border-emerald-400 ring-2 ring-emerald-200 shadow-md'
                    : isTargetSelected
                    ? 'bg-amber-100/90 border-amber-400 ring-4 ring-amber-300 scale-105 animate-pulse'
                    : 'bg-white/70 border-dashed border-purple-300 hover:bg-white/90 active:scale-95'
                }`}
                title={`Treasure Chest for ${shape.name}`}
              >
                {/* Chest Emoji & Shape Slot Silhouette */}
                <div className="relative flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl filter drop-shadow select-none">
                    {shape.matched ? '📦' : '🧰'}
                  </span>

                  {/* Inside Gem if matched */}
                  {shape.matched ? (
                    <span className="absolute text-2xl sm:text-3xl animate-bounce">
                      {shape.emoji}
                    </span>
                  ) : (
                    /* Silhouette outline */
                    <span className="absolute text-xl opacity-35 filter grayscale">
                      {shape.emoji}
                    </span>
                  )}
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
              </button>
            );
          })}
        </div>

        {/* Celebration Banner if round complete */}
        {roundComplete && (
          <div className="relative z-20 self-center bg-linear-to-r from-yellow-400 via-pink-400 to-purple-400 text-white px-5 py-2 rounded-2xl border-2 border-white shadow-xl flex items-center gap-2 animate-bounce">
            <Trophy className="w-5 h-5" />
            <span className="text-sm sm:text-base font-black">All gems sorted! Hooray! 🎉</span>
          </div>
        )}

        {/* Toddler Hint */}
        <div className="relative z-10 self-center text-[11px] font-bold text-pink-700 bg-white/80 backdrop-blur-xs px-3 py-0.5 rounded-full border border-pink-200 pointer-events-none">
          👆 Tap a shape at the bottom, then tap its matching chest!
        </div>
      </div>

      {/* Bottom Shape Gem Tray (Chunky Touch Targets for Toddlers) */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xs p-3 rounded-3xl border-2 border-pink-200 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black text-pink-700">Pick a Royal Shape:</span>
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
            <button
              key={shape.id}
              id={`shape-item-${shape.id}`}
              disabled={shape.matched}
              onClick={() => handleSelectShape(shape.id)}
              className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border-3 transition-all cursor-pointer ${
                shape.matched
                  ? 'opacity-30 cursor-not-allowed border-gray-200 bg-gray-50'
                  : selectedShapeId === shape.id
                  ? 'bg-pink-100 border-pink-500 ring-4 ring-pink-300 scale-110 shadow-md'
                  : 'bg-white border-pink-200 hover:scale-105 active:scale-95 shadow-xs'
              }`}
            >
              <span className="text-3xl sm:text-4xl filter drop-shadow select-none">
                {shape.emoji}
              </span>
              <span className="text-[10px] font-black text-pink-900 mt-1 truncate w-full text-center">
                {shape.colorName}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
