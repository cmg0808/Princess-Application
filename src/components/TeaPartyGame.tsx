import React, { useState, useRef } from 'react';
import { Sparkles, RotateCcw, Heart, Coffee, Utensils, Star, Check } from 'lucide-react';
import { playSound } from '../utils/audio';

interface TeaPartyGameProps {
  onReward: () => void;
}

interface TeaPartyGuest {
  id: string;
  name: string;
  emoji: string;
  favorite: string;
  dialogue: string;
  cupFill: number; // 0 to 100%
  hasCupcake: boolean;
  happyReaction: boolean;
}

interface CupcakeTopping {
  id: string;
  name: string;
  emoji: string;
}

const TOPPINGS: CupcakeTopping[] = [
  { id: 'cherry', name: 'Cherry', emoji: '🍒' },
  { id: 'strawberry', name: 'Berry', emoji: '🍓' },
  { id: 'star', name: 'Star Sugar', emoji: '⭐' },
  { id: 'crown', name: 'Mini Crown', emoji: '👑' },
  { id: 'rainbow', name: 'Rainbow', emoji: '🌈' },
  { id: 'sparkle', name: 'Glitter', emoji: '✨' },
];

const FROSTINGS = [
  { id: 'pink', name: 'Strawberry Pink', color: 'from-pink-300 to-rose-400', border: 'border-pink-300' },
  { id: 'purple', name: 'Lavender Berry', color: 'from-purple-300 to-indigo-400', border: 'border-purple-300' },
  { id: 'vanilla', name: 'Sweet Vanilla', color: 'from-amber-100 to-yellow-200', border: 'border-yellow-300' },
  { id: 'blue', name: 'Blueberry Sky', color: 'from-sky-200 to-cyan-300', border: 'border-sky-300' },
  { id: 'mint', name: 'Mint Meadow', color: 'from-emerald-200 to-teal-300', border: 'border-emerald-300' },
];

const CUPCAKE_LINERS = [
  { id: 'gold', name: 'Golden Foil', color: 'bg-amber-400' },
  { id: 'rose', name: 'Pink Polka', color: 'bg-rose-400' },
  { id: 'purple', name: 'Royal Purple', color: 'bg-purple-400' },
  { id: 'cyan', name: 'Sparkle Sky', color: 'bg-sky-400' },
];

export const TeaPartyGame: React.FC<TeaPartyGameProps> = ({ onReward }) => {
  // Mode: 'bakery' (decorating cupcakes) or 'table' (serving tea & feeding friends)
  const [activeTab, setActiveTab] = useState<'bakery' | 'table'>('bakery');

  // Cupcake Bakery State
  const [selectedFrosting, setSelectedFrosting] = useState(FROSTINGS[0]);
  const [selectedLiner, setSelectedLiner] = useState(CUPCAKE_LINERS[0]);
  const [placedToppings, setPlacedToppings] = useState<CupcakeTopping[]>([]);
  const [bakedCupcakesCount, setBakedCupcakesCount] = useState(0);

  // Guests at the Royal Table
  const [guests, setGuests] = useState<TeaPartyGuest[]>([
    {
      id: 'princess-lily',
      name: 'Princess Lily',
      emoji: '👸',
      favorite: 'Strawberry Pink',
      dialogue: 'A cup of chamomile tea, please! ☕',
      cupFill: 0,
      hasCupcake: false,
      happyReaction: false,
    },
    {
      id: 'sparkle-unicorn',
      name: 'Sparkle Unicorn',
      emoji: '🦄',
      favorite: 'Glitter Sweet',
      dialogue: 'Neigh! I love rainbow cupcakes! 🌈',
      cupFill: 0,
      hasCupcake: false,
      happyReaction: false,
    },
    {
      id: 'twinkle-bunny',
      name: 'Twinkle Bunny',
      emoji: '🐰',
      favorite: 'Sweet Vanilla',
      dialogue: 'Sip sip! So yummy and sweet! 🌸',
      cupFill: 0,
      hasCupcake: false,
      happyReaction: false,
    },
    {
      id: 'pippin-frog',
      name: 'Prince Pippin',
      emoji: '🐸',
      favorite: 'Mint Meadow',
      dialogue: 'Ribbit! Royal tea party is the best! 👑',
      cupFill: 0,
      hasCupcake: false,
      happyReaction: false,
    },
  ]);

  const [activePouringId, setActivePouringId] = useState<string | null>(null);
  const [selectedGuestId, setSelectedGuestId] = useState<string>('princess-lily');

  // Add topping to cupcake
  const handleAddTopping = (topping: CupcakeTopping) => {
    playSound.pop();
    if (placedToppings.length < 5) {
      const next = [...placedToppings, topping];
      setPlacedToppings(next);
      if (next.length === 3) {
        playSound.sparkle();
      }
    }
  };

  // Finish baking cupcake and send to table
  const handleFinishCupcake = () => {
    playSound.fanfare();
    setBakedCupcakesCount((prev) => prev + 1);
    onReward();

    // Reset cupcake decoration for the next one
    setPlacedToppings([]);
    setActiveTab('table');
  };

  // Clear cupcake toppings
  const handleClearCupcake = () => {
    playSound.boing();
    setPlacedToppings([]);
  };

  // Pour tea into a guest's cup
  const handlePourTea = (guestId: string) => {
    playSound.teaPour();
    setActivePouringId(guestId);

    setGuests((prev) =>
      prev.map((g) => {
        if (g.id === guestId) {
          const nextFill = Math.min(100, g.cupFill + 50);
          return {
            ...g,
            cupFill: nextFill,
            happyReaction: true,
          };
        }
        return g;
      })
    );

    setTimeout(() => {
      setActivePouringId(null);
      setGuests((prev) =>
        prev.map((g) => (g.id === guestId ? { ...g, happyReaction: false } : g))
      );
    }, 1200);

    checkTableCelebration();
  };

  // Feed cupcake treat to a guest
  const handleFeedGuest = (guestId: string) => {
    playSound.munch();
    setGuests((prev) =>
      prev.map((g) => {
        if (g.id === guestId) {
          return {
            ...g,
            hasCupcake: true,
            happyReaction: true,
          };
        }
        return g;
      })
    );

    setTimeout(() => {
      setGuests((prev) =>
        prev.map((g) => (g.id === guestId ? { ...g, happyReaction: false } : g))
      );
    }, 1500);

    checkTableCelebration();
  };

  // Check if all guests are served & happy
  const checkTableCelebration = () => {
    const allFed = guests.every((g) => g.cupFill >= 50 && g.hasCupcake);
    if (allFed) {
      playSound.fanfare();
      onReward();
    }
  };

  // Refill / reset tea party
  const handleResetTable = () => {
    playSound.tap();
    setGuests((prev) =>
      prev.map((g) => ({
        ...g,
        cupFill: 0,
        hasCupcake: false,
        happyReaction: false,
      }))
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center gap-3 select-none font-['Fredoka']">
      {/* Top Header & Tab Switcher */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-3xl border-2 border-pink-200 shadow-sm flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-bounce">🫖</span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-pink-800 leading-tight">
              Royal Tea Party & Bakery
            </h3>
            <span className="text-xs font-bold text-pink-500">
              {activeTab === 'bakery' ? 'Bake & frost sweet treats!' : 'Serve royal tea to friends!'}
            </span>
          </div>
        </div>

        {/* Tab Buttons (Chunky, Toddler-Friendly) */}
        <div className="flex items-center gap-1.5 bg-pink-100 p-1 rounded-2xl border border-pink-200">
          <button
            id="tab-bakery"
            onClick={() => {
              playSound.tap();
              setActiveTab('bakery');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition cursor-pointer ${
              activeTab === 'bakery'
                ? 'bg-pink-500 text-white shadow-xs'
                : 'text-pink-700 hover:bg-pink-200/60'
            }`}
          >
            <span>🧁</span>
            <span>Bakery</span>
          </button>

          <button
            id="tab-table"
            onClick={() => {
              playSound.tap();
              setActiveTab('table');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition cursor-pointer ${
              activeTab === 'table'
                ? 'bg-pink-500 text-white shadow-xs'
                : 'text-pink-700 hover:bg-pink-200/60'
            }`}
          >
            <span>🫖</span>
            <span>Tea Table</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: CUPCAKE BAKERY */}
      {activeTab === 'bakery' && (
        <div className="w-full max-w-2xl flex flex-col gap-3">
          {/* Cupcake Display Pedestal */}
          <div className="relative w-full h-[290px] sm:h-[330px] rounded-3xl border-4 border-pink-300 shadow-2xl bg-linear-to-b from-rose-100 via-purple-50 to-pink-200 overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Ambient Sparkles */}
            <div className="absolute inset-0 pointer-events-none flex justify-between p-6 opacity-30 text-3xl">
              <span>✨</span>
              <span>⭐</span>
              <span>🍰</span>
              <span>✨</span>
            </div>

            {/* Giant Toddler-Friendly Cupcake Illustration */}
            <div className="relative flex flex-col items-center select-none filter drop-shadow-xl animate-in zoom-in duration-200">
              {/* Placed Toppings on Crown of Cupcake */}
              <div className="relative z-30 flex items-center justify-center gap-2 mb-[-14px] min-h-[44px]">
                {placedToppings.length === 0 ? (
                  <span className="text-4xl animate-bounce">🍒</span>
                ) : (
                  placedToppings.map((top, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        playSound.pop();
                        setPlacedToppings((prev) => prev.filter((_, i) => i !== idx));
                      }}
                      className="text-4xl sm:text-5xl hover:scale-125 active:scale-95 transition-transform cursor-pointer filter drop-shadow animate-in zoom-in"
                      title="Tap to remove"
                    >
                      {top.emoji}
                    </button>
                  ))
                )}
              </div>

              {/* Swirly Frosting Layer */}
              <div
                className={`w-40 sm:w-48 h-24 sm:h-28 rounded-t-full rounded-b-3xl bg-linear-to-b ${selectedFrosting.color} border-4 border-white shadow-md relative overflow-hidden flex items-center justify-center transition-colors duration-500`}
              >
                {/* Frosting Swirl Glaze */}
                <div className="absolute top-2 w-32 h-6 rounded-full bg-white/40 blur-xs" />
                <div className="flex gap-2 text-white/80 text-xl pointer-events-none">
                  <span>✨</span>
                  <span>⭐</span>
                  <span>✨</span>
                </div>
              </div>

              {/* Cupcake Liner Base */}
              <div
                className={`w-32 sm:w-38 h-20 sm:h-24 ${selectedLiner.color} rounded-b-3xl border-4 border-white shadow-lg -mt-3 relative flex items-center justify-around px-2`}
              >
                {/* Fluted Liner Lines */}
                <div className="w-1 h-full bg-black/10 rounded-full" />
                <div className="w-1 h-full bg-black/10 rounded-full" />
                <div className="w-1 h-full bg-black/10 rounded-full" />
                <div className="w-1 h-full bg-black/10 rounded-full" />
              </div>
            </div>

            {/* Tap Hint */}
            <div className="absolute bottom-2 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-pink-200 text-xs font-black text-pink-700 pointer-events-none">
              👆 Tap frosting & toppings below to decorate!
            </div>
          </div>

          {/* Bakery Controls Tray */}
          <div className="bg-white/95 backdrop-blur-xs p-3 rounded-3xl border-2 border-pink-200 shadow-sm flex flex-col gap-3">
            {/* Frosting Flavor Buttons */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-black text-pink-700">1. Pick Frosting Flavor:</span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {FROSTINGS.map((f) => (
                  <button
                    key={f.id}
                    id={`btn-frosting-${f.id}`}
                    onClick={() => {
                      playSound.pop();
                      setSelectedFrosting(f);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 transition cursor-pointer shrink-0 font-extrabold text-xs sm:text-sm ${
                      selectedFrosting.id === f.id
                        ? 'ring-3 ring-pink-400 border-white scale-105 shadow-xs text-gray-900'
                        : 'border-pink-200 text-gray-700 hover:scale-102'
                    } bg-linear-to-r ${f.color}`}
                  >
                    <span>🍰</span>
                    <span>{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Toppings Grid */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-black text-pink-700">2. Tap Toppings to Add:</span>
              <div className="grid grid-cols-6 gap-2">
                {TOPPINGS.map((t) => (
                  <button
                    key={t.id}
                    id={`btn-topping-${t.id}`}
                    onClick={() => handleAddTopping(t)}
                    className="flex flex-col items-center justify-center p-2 rounded-2xl bg-pink-50 border-2 border-pink-200 hover:bg-pink-100 hover:scale-110 active:scale-90 transition-all cursor-pointer shadow-2xs"
                  >
                    <span className="text-2xl sm:text-3xl select-none">{t.emoji}</span>
                    <span className="text-[10px] font-black text-pink-700 mt-0.5 truncate w-full text-center">
                      {t.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-1 border-t border-pink-100">
              <button
                id="btn-clear-cupcake"
                onClick={handleClearCupcake}
                className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-700 font-bold text-xs hover:bg-rose-100 active:scale-95 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Over</span>
              </button>

              <button
                id="btn-bake-cupcake"
                onClick={handleFinishCupcake}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-linear-to-r from-pink-500 to-rose-500 text-white font-black text-sm shadow-md hover:scale-105 active:scale-95 transition cursor-pointer border-2 border-pink-300"
              >
                <span>Serve to Friends! 🫖</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: ROYAL TEA TABLE */}
      {activeTab === 'table' && (
        <div className="w-full max-w-2xl flex flex-col gap-3">
          {/* Royal Tea Table Canvas */}
          <div className="relative w-full h-[320px] sm:h-[360px] rounded-3xl border-4 border-pink-300 shadow-2xl bg-linear-to-b from-purple-100 via-pink-100 to-rose-200 overflow-hidden flex flex-col justify-between p-3 sm:p-4">
            {/* Tablecloth & Centerpiece */}
            <div className="absolute inset-x-8 bottom-4 h-40 bg-white/90 rounded-3xl border-3 border-pink-200 shadow-lg flex flex-col items-center justify-center pointer-events-none">
              {/* Table Runner Pattern */}
              <div className="w-full h-4 bg-pink-300/40" />
              <div className="text-4xl my-auto opacity-70">🌸 🫖 🧁 🌸</div>
              <div className="w-full h-4 bg-pink-300/40" />
            </div>

            {/* Guests Seated Around Table */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 h-full items-center">
              {guests.map((guest) => {
                const isPouring = activePouringId === guest.id;
                return (
                  <div
                    key={guest.id}
                    id={`guest-${guest.id}`}
                    onClick={() => setSelectedGuestId(guest.id)}
                    className={`relative flex flex-col items-center justify-between p-2 rounded-2xl transition-all cursor-pointer ${
                      selectedGuestId === guest.id
                        ? 'bg-pink-200/60 ring-3 ring-pink-400 scale-105'
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                  >
                    {/* Happy Reaction Hearts */}
                    {guest.happyReaction && (
                      <div className="absolute -top-6 text-2xl animate-bounce text-rose-500 z-30">
                        💖 ✨ 💖
                      </div>
                    )}

                    {/* Guest Character Face / Avatar */}
                    <div className="flex flex-col items-center">
                      <span className="text-5xl sm:text-6xl filter drop-shadow select-none">
                        {guest.emoji}
                      </span>
                      <span className="text-xs font-black text-pink-900 bg-white/90 px-2 py-0.5 rounded-full shadow-2xs border border-pink-200 mt-1">
                        {guest.name}
                      </span>
                    </div>

                    {/* Guest Teacup & Cupcake Plate */}
                    <div className="flex items-center gap-2 mt-2">
                      {/* Teacup with Fill Level */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePourTea(guest.id);
                        }}
                        className="relative w-9 h-8 bg-white rounded-b-xl border-2 border-pink-300 flex items-end p-0.5 overflow-hidden shadow-xs cursor-pointer hover:scale-115 active:scale-95 transition-transform"
                        title="Tap to pour tea"
                      >
                        <div
                          className="w-full bg-linear-to-t from-amber-600 via-amber-400 to-amber-300 rounded-b-lg transition-all duration-500"
                          style={{ height: `${guest.cupFill}%` }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-pink-700">
                          {guest.cupFill > 0 ? '☕' : '🫖'}
                        </span>
                      </div>

                      {/* Cupcake Plate */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFeedGuest(guest.id);
                        }}
                        className="w-9 h-8 bg-pink-100 rounded-full border-2 border-pink-300 flex items-center justify-center shadow-xs cursor-pointer hover:scale-115 active:scale-95 transition-transform text-lg"
                        title="Tap to give cupcake"
                      >
                        {guest.hasCupcake ? '🧁' : '🍽️'}
                      </div>
                    </div>

                    {/* Pouring Teapot Stream Animation */}
                    {isPouring && (
                      <div className="absolute -top-4 right-1 text-3xl animate-bounce z-30">
                        🫖💦
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Hint at bottom */}
            <div className="relative z-10 self-center bg-white/85 backdrop-blur-xs px-3 py-1 rounded-full border border-pink-200 text-xs font-black text-pink-700 pointer-events-none">
              👆 Tap a teacup to pour ☕ or tap a plate to feed treats 🧁!
            </div>
          </div>

          {/* Toddler Action Bar for Table */}
          <div className="bg-white/95 backdrop-blur-xs p-3 rounded-3xl border-2 border-pink-200 shadow-sm flex items-center justify-between gap-2">
            <button
              id="btn-pour-all"
              onClick={() => {
                guests.forEach((g, idx) => {
                  setTimeout(() => handlePourTea(g.id), idx * 250);
                });
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-linear-to-b from-amber-400 to-yellow-500 text-amber-950 font-black text-xs sm:text-sm shadow-md hover:scale-102 active:scale-95 transition cursor-pointer border-2 border-yellow-300"
            >
              <span className="text-xl">🫖</span>
              <span>Pour Tea for All!</span>
            </button>

            <button
              id="btn-feed-all"
              onClick={() => {
                guests.forEach((g, idx) => {
                  setTimeout(() => handleFeedGuest(g.id), idx * 250);
                });
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-linear-to-b from-pink-400 to-rose-500 text-white font-black text-xs sm:text-sm shadow-md hover:scale-102 active:scale-95 transition cursor-pointer border-2 border-pink-300"
            >
              <span className="text-xl">🧁</span>
              <span>Feed Cupcakes!</span>
            </button>

            <button
              id="btn-reset-table"
              onClick={handleResetTable}
              className="p-3 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-600 hover:bg-rose-100 active:scale-95 transition cursor-pointer shadow-xs"
              title="Reset Table"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
