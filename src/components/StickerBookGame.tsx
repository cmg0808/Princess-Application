import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trash2, RotateCcw, Lock, Star } from 'lucide-react';
import { StickerItem, PlacedSticker } from '../types';
import { loadSceneStickers, saveSceneStickers } from '../utils/storage';
import { playSound } from '../utils/audio';

interface StickerBookGameProps {
  stickers: StickerItem[];
  onReward: () => void;
}

interface SceneDef {
  id: string;
  name: string;
  grad: string;
  elements: string[];
}

const SCENES: SceneDef[] = [
  {
    id: 'garden',
    name: 'Blossom Garden',
    grad: 'from-emerald-200 via-pink-100 to-sky-200',
    elements: ['🌸', '🌺', '🌳', '🌷', '🦋', '🏰'],
  },
  {
    id: 'throne',
    name: 'Throne Room',
    grad: 'from-purple-200 via-pink-100 to-rose-200',
    elements: ['👑', '✨', '🏰', '💎', '🪞'],
  },
  {
    id: 'meadow',
    name: 'Starlight Meadow',
    grad: 'from-indigo-300 via-purple-200 to-pink-200',
    elements: ['🌙', '⭐', '🌈', '🦄', '✨'],
  },
];

export const StickerBookGame: React.FC<StickerBookGameProps> = ({ stickers, onReward }) => {
  const [selectedScene, setSelectedScene] = useState<SceneDef>(SCENES[0]);
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'crowns' | 'jewels' | 'pets' | 'magic'>('all');
  const [selectedPlacedId, setSelectedPlacedId] = useState<string | null>(null);

  const sceneRef = useRef<HTMLDivElement | null>(null);
  const draggingIdRef = useRef<string | null>(null);

  // Load placed stickers when scene changes
  useEffect(() => {
    const loaded = loadSceneStickers(selectedScene.id);
    setPlacedStickers(loaded);
    setSelectedPlacedId(null);
  }, [selectedScene.id]);

  // Save placed stickers whenever they change
  const updatePlacedStickers = (updater: (prev: PlacedSticker[]) => PlacedSticker[]) => {
    setPlacedStickers((prev) => {
      const next = updater(prev);
      saveSceneStickers(selectedScene.id, next);
      return next;
    });
  };

  // Place sticker on scene
  const handleAddSticker = (item: StickerItem) => {
    if (!item.unlocked) {
      playSound.boing();
      return;
    }

    playSound.boing();
    playSound.sparkle();

    const newPlaced: PlacedSticker = {
      instanceId: Math.random().toString(),
      stickerId: item.id,
      emoji: item.emoji,
      x: 35 + Math.random() * 30, // center-ish %
      y: 35 + Math.random() * 30,
      size: 60,
      rotation: Math.floor(Math.random() * 20 - 10),
    };

    updatePlacedStickers((prev) => [...prev, newPlaced]);
    setSelectedPlacedId(newPlaced.instanceId);
  };

  // Dragging sticker on scene
  const handlePointerDownSticker = (e: React.PointerEvent, instanceId: string) => {
    e.stopPropagation();
    playSound.tap();
    setSelectedPlacedId(instanceId);
    draggingIdRef.current = instanceId;
  };

  const handlePointerMoveScene = (e: React.PointerEvent) => {
    if (!draggingIdRef.current || !sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(5, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100));

    updatePlacedStickers((prev) =>
      prev.map((s) => (s.instanceId === draggingIdRef.current ? { ...s, x, y } : s))
    );
  };

  const handlePointerUpScene = () => {
    draggingIdRef.current = null;
  };

  // Remove selected sticker
  const handleRemoveSelected = () => {
    if (!selectedPlacedId) return;
    playSound.tap();
    updatePlacedStickers((prev) => prev.filter((s) => s.instanceId !== selectedPlacedId));
    setSelectedPlacedId(null);
  };

  // Clear scene
  const handleClearScene = () => {
    playSound.boing();
    updatePlacedStickers(() => []);
    setSelectedPlacedId(null);
  };

  const filteredStickers = stickers.filter(
    (s) => activeCategory === 'all' || s.category === activeCategory
  );

  const unlockedCount = stickers.filter((s) => s.unlocked).length;

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-2 flex flex-col gap-3 select-none">
      {/* Scene Header & Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white/90 backdrop-blur-xs px-4 py-2 rounded-2xl border-2 border-pink-200 shadow-xs font-['Fredoka']">
        {/* Scene Picker */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {SCENES.map((scene) => (
            <button
              key={scene.id}
              id={`btn-scene-${scene.id}`}
              onClick={() => {
                playSound.tap();
                setSelectedScene(scene);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-1 ${
                selectedScene.id === scene.id
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
              }`}
            >
              <span>{scene.elements[0]}</span>
              <span>{scene.name}</span>
            </button>
          ))}
        </div>

        {/* Sticker Stats & Clear */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs font-black text-pink-700 bg-pink-100 px-2.5 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
            <span>
              {unlockedCount} / {stickers.length} Unlocked
            </span>
          </div>

          {placedStickers.length > 0 && (
            <button
              onClick={handleClearScene}
              className="p-1.5 rounded-xl text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 active:scale-95 transition cursor-pointer"
              title="Clear all stickers from this scene"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {selectedPlacedId && (
            <button
              onClick={handleRemoveSelected}
              className="p-1.5 rounded-xl text-white bg-rose-500 hover:bg-rose-600 active:scale-95 transition cursor-pointer shadow-xs"
              title="Delete selected sticker"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Layout: Top Fairytale Stage Canvas + Bottom Sticker Drawer */}
      <div className="flex flex-col gap-3">
        {/* The Interactive Fairytale Scene Canvas */}
        <div
          ref={sceneRef}
          id="sticker-scene-canvas"
          onPointerMove={handlePointerMoveScene}
          onPointerUp={handlePointerUpScene}
          onPointerCancel={handlePointerUpScene}
          onClick={() => setSelectedPlacedId(null)}
          className={`relative w-full h-72 sm:h-96 rounded-3xl border-4 border-pink-300 shadow-xl overflow-hidden touch-none cursor-crosshair bg-linear-to-b ${selectedScene.grad}`}
        >
          {/* Background Fairytale Elements */}
          <div className="absolute inset-0 pointer-events-none flex flex-wrap justify-between p-6 opacity-40 select-none">
            {selectedScene.elements.map((el, idx) => (
              <span key={idx} className="text-4xl sm:text-5xl">
                {el}
              </span>
            ))}
          </div>

          {/* Prompt if empty */}
          {placedStickers.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center font-['Fredoka']">
              <span className="text-4xl animate-bounce">✨</span>
              <p className="text-sm sm:text-base font-extrabold text-pink-700 mt-2">
                Tap any sticker below to add it to your magical scene!
              </p>
            </div>
          )}

          {/* Draggable Placed Stickers */}
          {placedStickers.map((ps) => {
            const isSelected = selectedPlacedId === ps.instanceId;

            return (
              <div
                key={ps.instanceId}
                onPointerDown={(e) => handlePointerDownSticker(e, ps.instanceId)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing select-none transition-transform ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                }`}
                style={{
                  left: `${ps.x}%`,
                  top: `${ps.y}%`,
                  transform: `translate(-50%, -50%) rotate(${ps.rotation}deg)`,
                }}
              >
                <div
                  className={`text-5xl sm:text-6xl filter drop-shadow-md p-1 rounded-2xl ${
                    isSelected ? 'ring-3 ring-pink-400 bg-white/40' : ''
                  }`}
                >
                  {ps.emoji}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticker Collection Drawer */}
        <div className="bg-white/95 backdrop-blur-xs p-3 sm:p-4 rounded-3xl border-2 border-pink-200 shadow-sm font-['Fredoka']">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-pink-100 mb-3">
            {[
              { id: 'all' as const, label: 'All', emoji: '✨' },
              { id: 'crowns' as const, label: 'Crowns', emoji: '👑' },
              { id: 'jewels' as const, label: 'Jewels', emoji: '💎' },
              { id: 'pets' as const, label: 'Pets', emoji: '🦄' },
              { id: 'magic' as const, label: 'Magic', emoji: '🪄' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playSound.tap();
                  setActiveCategory(cat.id);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1 shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-pink-500 text-white shadow-xs'
                    : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Sticker Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-48 overflow-y-auto p-1">
            {filteredStickers.map((item) => {
              return (
                <button
                  key={item.id}
                  id={`btn-sticker-${item.id}`}
                  onClick={() => handleAddSticker(item)}
                  disabled={!item.unlocked}
                  className={`flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all cursor-pointer relative ${
                    item.unlocked
                      ? 'border-pink-200 bg-pink-50/70 hover:bg-pink-100 hover:scale-105 active:scale-95 shadow-xs'
                      : 'border-gray-200 bg-gray-50 opacity-40 cursor-not-allowed'
                  }`}
                  title={item.unlocked ? item.name : 'Locked reward sticker (play games to unlock!)'}
                >
                  {item.unlocked ? (
                    <span className="text-3xl sm:text-4xl filter drop-shadow select-none">
                      {item.emoji}
                    </span>
                  ) : (
                    <div className="w-9 h-9 flex items-center justify-center text-gray-400">
                      <Lock className="w-5 h-5" />
                    </div>
                  )}
                  <span className="text-[10px] font-black text-pink-800 truncate w-full text-center mt-1">
                    {item.unlocked ? item.name : '???'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
