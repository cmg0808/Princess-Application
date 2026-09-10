import React, { useRef, useState } from 'react';
import { playSound } from '../utils/audio';
import { TwinkleStar } from './GameArt';

interface PetSpaGameProps {
  onReward: () => void;
}

interface PetDef {
  id: string;
  name: string;
  before: string;
  soapy: string;
}

const PETS: PetDef[] = [
  { id: 'dog', name: 'Puppy', before: '/art/pet-dog-before.png', soapy: '/art/pet-dog-soapy.png' },
  { id: 'cat', name: 'Kitten', before: '/art/pet-cat-before.png', soapy: '/art/pet-cat-soapy.png' },
  { id: 'bunny', name: 'Bunny', before: '/art/pet-bunny-before.png', soapy: '/art/pet-bunny-soapy.png' },
  { id: 'lamb', name: 'Lamb', before: '/art/pet-lamb-before.png', soapy: '/art/pet-lamb-soapy.png' },
  { id: 'guinea', name: 'Guinea Pig', before: '/art/pet-guinea-before.png', soapy: '/art/pet-guinea-soapy.png' },
  { id: 'duck', name: 'Duckling', before: '/art/pet-duck-before.png', soapy: '/art/pet-duck-soapy.png' },
];

type StepId = 'wash' | 'rinse' | 'brush' | 'dry';

interface StepDef {
  id: StepId;
  label: string;
  src: string;
  sound: () => void;
}

const STEPS: StepDef[] = [
  { id: 'wash', label: 'Soap', src: '/art/spa-sponge.png', sound: () => playSound.splashWater() },
  { id: 'rinse', label: 'Rinse', src: '/art/spa-droplets.png', sound: () => playSound.splash() },
  { id: 'brush', label: 'Brush', src: '/art/spa-hairbrush.png', sound: () => playSound.brushStroke() },
  { id: 'dry', label: 'Dry', src: '/art/spa-hairdryer.png', sound: () => playSound.chime() },
];

const SPARKLE_BURSTS = [
  '/art/sparkle-burst-pink.png',
  '/art/sparkle-burst-yellow.png',
  '/art/sparkle-burst-blue.png',
  '/art/sparkle-burst-purple.png',
];

export const PetSpaGame: React.FC<PetSpaGameProps> = ({ onReward }) => {
  const [selectedPetId, setSelectedPetId] = useState(PETS[0].id);
  const [progress, setProgress] = useState<Record<string, Set<StepId>>>({});
  const [celebrating, setCelebrating] = useState(false);
  const [bounce, setBounce] = useState(false);
  const cleanedRef = useRef<Set<string>>(new Set());

  const selectedPet = PETS.find((p) => p.id === selectedPetId) ?? PETS[0];
  const doneSteps = progress[selectedPetId] ?? new Set<StepId>();
  const isClean = doneSteps.size === STEPS.length;
  const isSoapy = doneSteps.size > 0 && !isClean;
  const cleanedCount = cleanedRef.current.size;

  const handleSelectPet = (id: string) => {
    playSound.tap();
    setSelectedPetId(id);
  };

  const handleApplyStep = (step: StepDef) => {
    if (doneSteps.has(step.id)) {
      playSound.tap();
      return;
    }
    step.sound();
    setBounce(true);
    setTimeout(() => setBounce(false), 400);

    setProgress((prev) => {
      const next = new Set(prev[selectedPetId] ?? []);
      next.add(step.id);
      const updated = { ...prev, [selectedPetId]: next };

      if (next.size === STEPS.length && !cleanedRef.current.has(selectedPetId)) {
        cleanedRef.current.add(selectedPetId);
        setTimeout(() => {
          playSound.fireworkBurst();
          setCelebrating(true);
          onReward();
          setTimeout(() => setCelebrating(false), 1200);
        }, 150);
      }

      return updated;
    });
  };

  const handleResetPet = () => {
    playSound.tap();
    setProgress((prev) => ({ ...prev, [selectedPetId]: new Set() }));
    cleanedRef.current.delete(selectedPetId);
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center gap-3 select-none font-['Fredoka']">
      {/* Header */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-3xl border-2 border-sky-200 shadow-sm flex items-center justify-between gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-black text-sky-800 leading-tight">Royal Pet Spa</h3>
          <span className="text-xs font-bold text-sky-500">Soap, rinse, brush &amp; dry your furry friends!</span>
        </div>
        <div className="flex items-center gap-1.5 bg-sky-50 border-2 border-sky-200 rounded-full px-3 py-1.5 shrink-0">
          <TwinkleStar className="w-4 h-4" color="#38BDF8" />
          <span className="text-xs font-black text-sky-700">{cleanedCount}/{PETS.length}</span>
        </div>
      </div>

      {/* Spa Stage */}
      <div
        className="relative w-full max-w-2xl h-[340px] sm:h-[380px] rounded-3xl border-4 border-white shadow-2xl overflow-hidden flex items-end justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/art/spa-bg-bathroom.png')" }}
      >
        <div className="absolute inset-0 bg-white/10" />

        {/* Pet */}
        <button
          id="spa-pet-stage"
          onClick={() => {
            if (isClean) {
              playSound.sparkle();
            } else {
              playSound.tap();
            }
          }}
          className={`relative z-10 mb-6 w-40 h-40 sm:w-48 sm:h-48 cursor-pointer transition-transform duration-300 ${
            bounce ? 'scale-110' : 'hover:scale-105 active:scale-95'
          }`}
          title={selectedPet.name}
        >
          <img
            src={isSoapy ? selectedPet.soapy : selectedPet.before}
            alt={selectedPet.name}
            className="w-full h-full object-contain drop-shadow-xl select-none"
            draggable={false}
          />

          {/* Celebration sparkle burst */}
          {celebrating && (
            <img
              src={SPARKLE_BURSTS[Math.floor(Math.random() * SPARKLE_BURSTS.length)]}
              alt=""
              className="absolute -inset-6 w-[calc(100%+3rem)] h-[calc(100%+3rem)] object-contain pointer-events-none animate-ping"
            />
          )}
        </button>

        {/* "Squeaky clean" badge */}
        {isClean && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-full border-2 border-sky-300 shadow-md">
            <TwinkleStar className="w-4 h-4" color="#38BDF8" />
            <span className="text-xs font-black text-sky-800">Squeaky clean!</span>
          </div>
        )}
      </div>

      {/* Pet Picker */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 px-1 w-full max-w-2xl justify-center scrollbar-none">
        {PETS.map((pet) => {
          const petClean = cleanedRef.current.has(pet.id);
          return (
            <button
              key={pet.id}
              id={`spa-select-${pet.id}`}
              onClick={() => handleSelectPet(pet.id)}
              className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white p-1 border-2 transition active:scale-90 cursor-pointer ${
                selectedPetId === pet.id ? 'border-sky-400 ring-4 ring-sky-200 scale-110' : 'border-[#E3D6FF]'
              }`}
              title={pet.name}
            >
              <img src={pet.before} alt={pet.name} className="w-full h-full object-contain" draggable={false} />
              {petClean && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-sky-400 border-2 border-white flex items-center justify-center">
                  <TwinkleStar className="w-3 h-3" color="#FFFFFF" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Tool Tray */}
      <div className="flex flex-col items-center gap-2 w-full max-w-2xl">
        <p className="text-xs font-bold text-[#4A3B5C]/70">Tap each tool to give {selectedPet.name} a spa treatment!</p>
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {STEPS.map((step) => {
            const stepDone = doneSteps.has(step.id);
            return (
              <button
                key={step.id}
                id={`spa-tool-${step.id}`}
                onClick={() => handleApplyStep(step)}
                className={`flex flex-col items-center gap-1 w-16 sm:w-20 p-2 rounded-2xl border-2 shadow-md transition active:scale-90 cursor-pointer ${
                  stepDone ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-200' : 'bg-white border-[#E3D6FF] hover:scale-105'
                }`}
              >
                <img src={step.src} alt="" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" draggable={false} />
                <span className="text-[11px] font-black text-[#4A3B5C]">{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {isSoapy && !isClean && (
        <button
          id="spa-reset"
          onClick={handleResetPet}
          className="text-xs font-bold text-sky-600 underline decoration-dotted cursor-pointer"
        >
          Start {selectedPet.name}'s bath over
        </button>
      )}
    </div>
  );
};
