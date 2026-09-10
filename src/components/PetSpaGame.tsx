import React, { useState } from 'react';
import { Sparkles, RotateCcw, Heart, Droplets, Check, Star, Wind } from 'lucide-react';
import { playSound } from '../utils/audio';
import { CartoonPetGraphic } from './CartoonPetGraphic';

interface PetSpaGameProps {
  onReward: () => void;
}

interface RoyalPet {
  id: 'unicorn' | 'bunny' | 'kitten' | 'puppy';
  name: string;
  title: string;
  emoji: string;
  species: string;
  sound: () => void;
  bubbleCount: number;
  isWashed: boolean;
  isRinsed: boolean;
  isDry: boolean;
  isBrushed: boolean;
  accessoryId?: string;
  accessoryEmoji?: string;
}

const INITIAL_PETS: RoyalPet[] = [
  {
    id: 'unicorn',
    name: 'Sparkle',
    title: 'The Rainbow Unicorn',
    emoji: '🦄',
    species: 'Unicorn',
    sound: () => playSound.neigh(),
    bubbleCount: 0,
    isWashed: false,
    isRinsed: false,
    isDry: false,
    isBrushed: false,
  },
  {
    id: 'bunny',
    name: 'Twinkle',
    title: 'The Palace Bunny',
    emoji: '🐰',
    species: 'Bunny',
    sound: () => playSound.giggle(),
    bubbleCount: 0,
    isWashed: false,
    isRinsed: false,
    isDry: false,
    isBrushed: false,
  },
  {
    id: 'kitten',
    name: 'Princess Bella',
    title: 'The Royal Kitten',
    emoji: '🐱',
    species: 'Kitten',
    sound: () => playSound.giggle(),
    bubbleCount: 0,
    isWashed: false,
    isRinsed: false,
    isDry: false,
    isBrushed: false,
  },
  {
    id: 'puppy',
    name: 'Flora',
    title: 'The Royal Palace Puppy',
    emoji: '🐶',
    species: 'Puppy',
    sound: () => playSound.giggle(),
    bubbleCount: 0,
    isWashed: false,
    isRinsed: false,
    isDry: false,
    isBrushed: false,
  },
];

const PET_ACCESSORIES = [
  { id: 'tiara', name: 'Mini Tiara', emoji: '👑' },
  { id: 'bow', name: 'Pink Bow', emoji: '🎀' },
  { id: 'flower', name: 'Blossom', emoji: '🌸' },
  { id: 'bell', name: 'Gold Bell', emoji: '🔔' },
  { id: 'star', name: 'Starlight', emoji: '⭐' },
  { id: 'heart', name: 'Ruby Pin', emoji: '💖' },
];

export const PetSpaGame: React.FC<PetSpaGameProps> = ({ onReward }) => {
  const [pets, setPets] = useState<RoyalPet[]>(INITIAL_PETS);
  const [activePetIndex, setActivePetIndex] = useState(0);
  const [activeTool, setActiveTool] = useState<'soap' | 'rinse' | 'dry' | 'brush'>('soap');
  const [isSparkling, setIsSparkling] = useState(false);
  const [petHappiness, setPetHappiness] = useState(false);

  const currentPet = pets[activePetIndex];

  // Tool 1: Soap up with bubbles
  const handleApplySoap = () => {
    playSound.pop();
    setPets((prev) =>
      prev.map((p, idx) => {
        if (idx === activePetIndex) {
          const nextCount = Math.min(12, p.bubbleCount + 3);
          const isDone = nextCount >= 9;
          return {
            ...p,
            bubbleCount: nextCount,
            isWashed: isDone,
            isRinsed: false,
            isDry: false,
          };
        }
        return p;
      })
    );

    triggerHappiness();
  };

  // Tool 2: Warm shower rinse
  const handleRinse = () => {
    playSound.splashWater();
    setPets((prev) =>
      prev.map((p, idx) => {
        if (idx === activePetIndex) {
          return {
            ...p,
            bubbleCount: 0,
            isWashed: true,
            isRinsed: true,
            isDry: false,
          };
        }
        return p;
      })
    );

    triggerHappiness();
  };

  // Tool 3: Warm Fluff Dryer
  const handleBlowDry = () => {
    playSound.chime();
    setPets((prev) =>
      prev.map((p, idx) => {
        if (idx === activePetIndex) {
          return {
            ...p,
            isDry: true,
          };
        }
        return p;
      })
    );

    triggerHappiness();
  };

  // Tool 4: Magic Brush
  const handleBrush = () => {
    playSound.brushStroke();
    setIsSparkling(true);
    setTimeout(() => setIsSparkling(false), 1200);

    const pet = pets[activePetIndex];
    const isFinishing = pet && pet.isWashed && pet.isRinsed && !pet.isBrushed;

    setPets((prev) =>
      prev.map((p, idx) => (idx === activePetIndex ? { ...p, isBrushed: true, isDry: true } : p))
    );

    if (isFinishing) {
      playSound.fanfare();
      onReward();
    }

    triggerHappiness();
  };

  // Tap directly on pet
  const handlePetDirectTap = () => {
    currentPet.sound();
    triggerHappiness();

    if (activeTool === 'soap') {
      handleApplySoap();
    } else if (activeTool === 'rinse') {
      handleRinse();
    } else if (activeTool === 'dry') {
      handleBlowDry();
    } else if (activeTool === 'brush') {
      handleBrush();
    }
  };

  const triggerHappiness = () => {
    setPetHappiness(true);
    setTimeout(() => setPetHappiness(false), 1000);
  };

  // Toggle accessory
  const handleSelectAccessory = (accId: string, emoji: string) => {
    playSound.sparkle();
    setPets((prev) =>
      prev.map((p, idx) => {
        if (idx === activePetIndex) {
          const currentAcc = p.accessoryId;
          return {
            ...p,
            accessoryId: currentAcc === accId ? undefined : accId,
            accessoryEmoji: currentAcc === accId ? undefined : emoji,
          };
        }
        return p;
      })
    );

    triggerHappiness();
  };

  // Reset current pet
  const handleResetPet = () => {
    playSound.boing();
    setPets((prev) =>
      prev.map((p, idx) => {
        if (idx === activePetIndex) {
          return {
            ...p,
            bubbleCount: 0,
            isWashed: false,
            isRinsed: false,
            isDry: false,
            isBrushed: false,
            accessoryId: undefined,
            accessoryEmoji: undefined,
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center gap-3 select-none font-['Fredoka']">
      {/* Top Header & Pet Selector */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-3xl border-2 border-pink-200 shadow-sm flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-bounce">🛁</span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-pink-800 leading-tight">
              Royal Pet Spa & Salon
            </h3>
            <span className="text-xs font-bold text-pink-500">
              {currentPet.name} {currentPet.title}
            </span>
          </div>
        </div>

        {/* Pet Carousel Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {pets.map((pet, idx) => (
            <button
              key={pet.id}
              id={`pet-tab-${pet.id}`}
              onClick={() => {
                pet.sound();
                setActivePetIndex(idx);
              }}
              className={`flex items-center justify-center w-11 h-11 rounded-2xl border-2 transition cursor-pointer text-xl ${
                activePetIndex === idx
                  ? 'bg-pink-500 border-pink-600 text-white shadow-md scale-105 ring-2 ring-pink-300'
                  : 'bg-pink-50 border-pink-200 hover:bg-pink-100'
              }`}
              title={pet.name}
            >
              <span>{pet.emoji}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Spa Bathing Stage Canvas */}
      <div className="relative w-full max-w-2xl h-[340px] sm:h-[380px] rounded-3xl border-4 border-pink-300 shadow-2xl bg-linear-to-b from-sky-100 via-pink-50 to-purple-100 overflow-hidden flex flex-col items-center justify-center p-4">
        {/* Ambient Spa Bubbles */}
        <div className="absolute inset-0 pointer-events-none flex justify-between p-6 opacity-30 text-3xl">
          <span className="animate-bounce">🫧</span>
          <span className="animate-pulse">✨</span>
          <span className="animate-bounce">🫧</span>
        </div>

        {/* Golden Royal Bathtub */}
        <div className="relative w-76 sm:w-84 h-36 sm:h-40 bg-linear-to-b from-amber-200 via-yellow-100 to-amber-300 rounded-b-[60px] border-4 border-white shadow-2xl flex flex-col items-center justify-start pt-2 mt-24">
          {/* Bathtub Rim */}
          <div className="w-84 sm:w-92 h-7 bg-linear-to-r from-amber-300 via-yellow-200 to-amber-300 rounded-full border-2 border-white shadow-md -mt-4" />

          {/* Bath Water Level */}
          <div className="w-72 sm:w-78 h-16 bg-sky-300/40 rounded-b-[40px] border-t-2 border-white flex items-center justify-around text-xl text-white">
            <span>🫧</span>
            <span>🫧</span>
            <span>🫧</span>
          </div>

          {/* Tub Lion Paws / Feet */}
          <div className="absolute -bottom-3 inset-x-8 flex justify-between">
            <div className="w-6 h-4 bg-amber-400 rounded-full border border-amber-500 shadow-xs" />
            <div className="w-6 h-4 bg-amber-400 rounded-full border border-amber-500 shadow-xs" />
          </div>
        </div>

        {/* The Royal Pet in the Bathtub - Handcrafted Vector Illustration */}
        <div
          id="royal-pet-canvas"
          className="absolute z-20 top-6 sm:top-8 flex flex-col items-center cursor-pointer"
        >
          {/* Happiness Hearts Overlay */}
          {petHappiness && (
            <div className="absolute -top-6 text-3xl animate-bounce text-rose-500 z-30 pointer-events-none">
              💖 ✨ 💖
            </div>
          )}

          {/* High Quality Cartoon Pet SVG */}
          <CartoonPetGraphic
            petId={currentPet.id}
            isWashed={currentPet.isWashed}
            isRinsed={currentPet.isRinsed}
            isBrushed={currentPet.isBrushed}
            isDry={currentPet.isDry}
            bubbleCount={currentPet.bubbleCount}
            happiness={petHappiness}
            sparkling={isSparkling}
            accessoryId={currentPet.accessoryId}
            onClick={handlePetDirectTap}
          />

          {/* Pet Status Badge */}
          <div className="mt-[-8px] z-30 bg-white/95 backdrop-blur-xs px-3.5 py-1 rounded-full border border-pink-200 text-xs font-black text-pink-700 shadow-md">
            {currentPet.isBrushed
              ? '✨ Sparkly, Fluffy & Crowned! ✨'
              : currentPet.isDry
              ? '💨 Fluffy & Warm! Ready to brush!'
              : currentPet.isRinsed
              ? '🚿 Fresh & Clean! Ready to dry!'
              : currentPet.isWashed
              ? '🫧 Squeaky Soapy! Ready to rinse!'
              : 'Tap to start spa bath! 🌸'}
          </div>
        </div>

        {/* Toddler Hint */}
        <div className="absolute bottom-2 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-pink-200 text-xs font-black text-pink-700 pointer-events-none">
          👆 Tap tools below: Soap 🫧, Rinse 🚿, Dry 💨, and Brush ✨!
        </div>
      </div>

      {/* Spa Grooming Action Tools (Chunky Giant Buttons) */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xs p-3 rounded-3xl border-2 border-pink-200 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black text-pink-700">1. Spa Care Steps:</span>
          <span className="text-[11px] font-bold text-pink-500">Step by step royal salon!</span>
        </div>

        <div className="grid grid-cols-4 gap-2 w-full">
          {/* Tool 1: Soap Sponge */}
          <button
            id="tool-spa-soap"
            onClick={() => {
              setActiveTool('soap');
              handleApplySoap();
            }}
            className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition cursor-pointer ${
              activeTool === 'soap'
                ? 'bg-linear-to-b from-pink-400 to-rose-500 text-white border-pink-300 shadow-md scale-102 ring-2 ring-pink-300'
                : 'bg-pink-50 border-pink-200 text-pink-800 hover:bg-pink-100'
            }`}
          >
            <span className="text-2xl sm:text-3xl animate-bounce">🧽</span>
            <span className="text-[11px] sm:text-xs font-black mt-1">1. Soap 🫧</span>
          </button>

          {/* Tool 2: Shower Rinse */}
          <button
            id="tool-spa-rinse"
            onClick={() => {
              setActiveTool('rinse');
              handleRinse();
            }}
            className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition cursor-pointer ${
              activeTool === 'rinse'
                ? 'bg-linear-to-b from-sky-400 to-blue-500 text-white border-sky-300 shadow-md scale-102 ring-2 ring-sky-300'
                : 'bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100'
            }`}
          >
            <span className="text-2xl sm:text-3xl">🚿</span>
            <span className="text-[11px] sm:text-xs font-black mt-1">2. Rinse 💧</span>
          </button>

          {/* Tool 3: Warm Dryer */}
          <button
            id="tool-spa-dryer"
            onClick={() => {
              setActiveTool('dry');
              handleBlowDry();
            }}
            className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition cursor-pointer ${
              activeTool === 'dry'
                ? 'bg-linear-to-b from-purple-400 to-indigo-500 text-white border-purple-300 shadow-md scale-102 ring-2 ring-purple-300'
                : 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100'
            }`}
          >
            <span className="text-2xl sm:text-3xl">💨</span>
            <span className="text-[11px] sm:text-xs font-black mt-1">3. Dry ☁️</span>
          </button>

          {/* Tool 4: Magic Brush */}
          <button
            id="tool-spa-brush"
            onClick={() => {
              setActiveTool('brush');
              handleBrush();
            }}
            className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition cursor-pointer ${
              activeTool === 'brush'
                ? 'bg-linear-to-b from-amber-300 to-yellow-500 text-amber-950 border-yellow-300 shadow-md scale-102 ring-2 ring-yellow-300'
                : 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100'
            }`}
          >
            <span className="text-2xl sm:text-3xl">🪮</span>
            <span className="text-[11px] sm:text-xs font-black mt-1">4. Glow ✨</span>
          </button>
        </div>

        {/* Tray 2: Dress Up Accessories */}
        <div className="flex flex-col gap-1 pt-1 border-t border-pink-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-pink-700">2. Royal Tiara & Accessories:</span>
            <button
              id="btn-reset-spa-pet"
              onClick={handleResetPet}
              className="text-[11px] font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Pet
            </button>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {PET_ACCESSORIES.map((acc) => (
              <button
                key={acc.id}
                id={`btn-pet-acc-${acc.id}`}
                onClick={() => handleSelectAccessory(acc.id, acc.emoji)}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition cursor-pointer ${
                  currentPet.accessoryId === acc.id
                    ? 'bg-pink-100 border-pink-500 ring-2 ring-pink-300 scale-105'
                    : 'bg-pink-50/70 border-pink-200 hover:bg-pink-100 active:scale-95'
                }`}
                title={acc.name}
              >
                <span className="text-2xl filter drop-shadow select-none">{acc.emoji}</span>
                <span className="text-[10px] font-black text-pink-800 truncate w-full text-center mt-0.5">
                  {acc.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
