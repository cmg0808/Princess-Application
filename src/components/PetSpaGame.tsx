import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  { id: 'dog', name: 'Puppy', before: 'art/pet-dog-before.png', soapy: 'art/pet-dog-soapy.png' },
  { id: 'cat', name: 'Kitten', before: 'art/pet-cat-before.png', soapy: 'art/pet-cat-soapy.png' },
  { id: 'bunny', name: 'Bunny', before: 'art/pet-bunny-before.png', soapy: 'art/pet-bunny-soapy.png' },
  { id: 'lamb', name: 'Lamb', before: 'art/pet-lamb-before.png', soapy: 'art/pet-lamb-soapy.png' },
  { id: 'guinea', name: 'Guinea Pig', before: 'art/pet-guinea-before.png', soapy: 'art/pet-guinea-soapy.png' },
  { id: 'duck', name: 'Duckling', before: 'art/pet-duck-before.png', soapy: 'art/pet-duck-soapy.png' },
];

type StepId = 'wash' | 'rinse' | 'brush' | 'dry';

interface StepDef {
  id: StepId;
  label: string;
  src: string;
  sound: () => void;
}

const STEPS: StepDef[] = [
  { id: 'wash', label: 'Soap', src: 'art/spa-sponge.png', sound: () => playSound.splashWater() },
  { id: 'rinse', label: 'Rinse', src: 'art/spa-droplets.png', sound: () => playSound.splash() },
  { id: 'brush', label: 'Brush', src: 'art/spa-hairbrush.png', sound: () => playSound.brushStroke() },
  { id: 'dry', label: 'Dry', src: 'art/spa-hairdryer.png', sound: () => playSound.chime() },
];

const SPARKLE_BURSTS = [
  'art/sparkle-burst-pink.png',
  'art/sparkle-burst-yellow.png',
  'art/sparkle-burst-blue.png',
  'art/sparkle-burst-purple.png',
];

const spring = { type: 'spring' as const, stiffness: 360, damping: 20 };

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
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center gap-4 select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="w-full max-w-2xl glass-strong glow-lavender px-5 py-3 rounded-[28px] flex items-center justify-between gap-2"
      >
        <div>
          <h3 className="font-display italic text-lg sm:text-xl font-bold text-sky-800 leading-tight">Royal Pet Spa</h3>
          <span className="text-xs font-bold text-sky-600/80">Soap, rinse, brush &amp; dry your furry friends!</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/70 rounded-full px-3 py-1.5 shrink-0">
          <TwinkleStar className="w-4 h-4" color="#38BDF8" />
          <span className="text-xs font-black text-sky-700">{cleanedCount}/{PETS.length}</span>
        </div>
      </motion.div>

      {/* Spa Stage */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...spring, delay: 0.05 }}
        className="relative w-full max-w-2xl h-[340px] sm:h-[380px] rounded-[40px] border-4 border-white/80 glow-pink overflow-hidden flex items-end justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('art/spa-bg-bathroom.png')" }}
      >
        <div className="absolute inset-0 bg-white/10" />

        {/* Pet */}
        <motion.button
          id="spa-pet-stage"
          onClick={() => {
            if (isClean) {
              playSound.sparkle();
            } else {
              playSound.tap();
            }
          }}
          animate={{ scale: bounce ? 1.12 : 1 }}
          transition={spring}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative z-10 mb-6 w-40 h-40 sm:w-48 sm:h-48 cursor-pointer"
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
        </motion.button>

        {/* "Squeaky clean" badge */}
        <AnimatePresence>
          {isClean && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              transition={spring}
              className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 glass-strong glow-gold px-3.5 py-1.5 rounded-full"
            >
              <TwinkleStar className="w-4 h-4" color="#38BDF8" />
              <span className="text-xs font-black text-sky-800">Squeaky clean!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pet Picker */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 px-1 w-full max-w-2xl justify-center scrollbar-none">
        {PETS.map((pet) => {
          const petClean = cleanedRef.current.has(pet.id);
          return (
            <motion.button
              key={pet.id}
              id={`spa-select-${pet.id}`}
              onClick={() => handleSelectPet(pet.id)}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.88 }}
              animate={{ scale: selectedPetId === pet.id ? 1.1 : 1 }}
              transition={spring}
              className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full glass p-1 cursor-pointer ${
                selectedPetId === pet.id ? 'ring-4 ring-sky-300 glow-lavender' : ''
              }`}
              title={pet.name}
            >
              <img src={pet.before} alt={pet.name} className="w-full h-full object-contain" draggable={false} />
              {petClean && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-sky-400 border-2 border-white flex items-center justify-center">
                  <TwinkleStar className="w-3 h-3" color="#FFFFFF" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Tool Tray */}
      <div className="flex flex-col items-center gap-2.5 w-full max-w-2xl">
        <p className="text-xs font-bold text-[#4A3B5C]/70">Tap each tool to give {selectedPet.name} a spa treatment!</p>
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {STEPS.map((step) => {
            const stepDone = doneSteps.has(step.id);
            return (
              <motion.button
                key={step.id}
                id={`spa-tool-${step.id}`}
                onClick={() => handleApplyStep(step)}
                whileHover={{ y: -4, scale: 1.06 }}
                whileTap={{ scale: 0.88 }}
                transition={spring}
                className={`flex flex-col items-center gap-1 w-16 sm:w-20 p-2.5 rounded-[24px] cursor-pointer ${
                  stepDone ? 'glass-strong glow-lavender ring-2 ring-sky-300' : 'glass hover:glow-pink'
                }`}
              >
                <img src={step.src} alt="" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" draggable={false} />
                <span className="text-[11px] font-black text-[#4A3B5C]">{step.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isSoapy && !isClean && (
          <motion.button
            id="spa-reset"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetPet}
            className="text-xs font-bold text-sky-600 underline decoration-dotted cursor-pointer"
          >
            Start {selectedPet.name}'s bath over
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
