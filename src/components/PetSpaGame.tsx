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

// Puppy/Kitten/Bunny/Duckling use one illustration for both states — a
// floating soap-bubble overlay (rendered below) signals "soapy" instead of
// swapping to a whole second picture. Lamb/Guinea Pig still have a distinct
// hand-extracted soapy illustration from an earlier art pass.
const PETS: PetDef[] = [
  { id: 'dog', name: 'Puppy', before: 'art/pet-dog-before.png', soapy: 'art/pet-dog-before.png' },
  { id: 'cat', name: 'Kitten', before: 'art/pet-cat-before.png', soapy: 'art/pet-cat-before.png' },
  { id: 'bunny', name: 'Bunny', before: 'art/pet-bunny-before.png', soapy: 'art/pet-bunny-before.png' },
  { id: 'lamb', name: 'Lamb', before: 'art/pet-lamb-before.png', soapy: 'art/pet-lamb-soapy.png' },
  { id: 'guinea', name: 'Guinea Pig', before: 'art/pet-guinea-before.png', soapy: 'art/pet-guinea-soapy.png' },
  { id: 'duck', name: 'Duckling', before: 'art/pet-duck-before.png', soapy: 'art/pet-duck-before.png' },
];

// Scattered positions (in % of the pet's own box) for the ambient floating
// soap bubbles shown the whole time a pet is mid-bath.
const BUBBLE_SPOTS = [
  { x: 12, y: 15, size: 22, delay: 0 },
  { x: 78, y: 8, size: 16, delay: 0.15 },
  { x: 85, y: 40, size: 20, delay: 0.3 },
  { x: 8, y: 55, size: 18, delay: 0.45 },
  { x: 55, y: -2, size: 14, delay: 0.6 },
  { x: 30, y: 70, size: 16, delay: 0.2 },
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

interface TouchParticle {
  id: number;
  x: number;
  y: number;
  kind: StepId;
  sparkle: string;
}

const spring = { type: 'spring' as const, stiffness: 360, damping: 20 };

export const PetSpaGame: React.FC<PetSpaGameProps> = ({ onReward }) => {
  const [selectedPetId, setSelectedPetId] = useState(PETS[0].id);
  const [progress, setProgress] = useState<Record<string, Set<StepId>>>({});
  const [celebrating, setCelebrating] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [wiggleTick, setWiggleTick] = useState(0);
  const [activeTool, setActiveTool] = useState<StepId | null>(null);
  const [particles, setParticles] = useState<TouchParticle[]>([]);
  const cleanedRef = useRef<Set<string>>(new Set());
  const nextParticleId = useRef(0);

  const selectedPet = PETS.find((p) => p.id === selectedPetId) ?? PETS[0];
  const doneSteps = progress[selectedPetId] ?? new Set<StepId>();
  const isClean = doneSteps.size === STEPS.length;
  const isSoapy = doneSteps.size > 0 && !isClean;
  const cleanedCount = cleanedRef.current.size;
  const activeStep = activeTool ? STEPS.find((s) => s.id === activeTool) : null;

  const handleSelectPet = (id: string) => {
    playSound.tap();
    setActiveTool(null);
    setSelectedPetId(id);
  };

  const spawnBurst = (x: number, y: number, kind: StepId) => {
    const id = nextParticleId.current++;
    const sparkle = SPARKLE_BURSTS[Math.floor(Math.random() * SPARKLE_BURSTS.length)];
    setParticles((prev) => [...prev, { id, x, y, kind, sparkle }]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 700);
  };

  // Finish a step (called once the child actually touches the pet with a
  // tool "in hand" — see handlePetTouch below) and hand out the reward once
  // every step is done.
  const completeStep = (step: StepDef) => {
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

  // Picking up a tool from the rail just "arms" it — the treatment happens
  // when that tool is then dabbed onto the pet itself.
  const handlePickTool = (step: StepDef) => {
    if (doneSteps.has(step.id)) {
      playSound.tap();
      return;
    }
    playSound.tap();
    setActiveTool((prev) => (prev === step.id ? null : step.id));
  };

  const handlePetTouch = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!activeStep) {
      playSound[isClean ? 'sparkle' : 'tap']();
      return;
    }
    if (doneSteps.has(activeStep.id)) {
      playSound.tap();
      setActiveTool(null);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    spawnBurst(Math.min(90, Math.max(10, x)), Math.min(90, Math.max(10, y)), activeStep.id);
    activeStep.sound();
    setBounce(true);
    setTimeout(() => setBounce(false), 400);
    setWiggleTick((t) => t + 1);
    completeStep(activeStep);
    setActiveTool(null);
  };

  const handleResetPet = () => {
    playSound.tap();
    setProgress((prev) => ({ ...prev, [selectedPetId]: new Set() }));
    cleanedRef.current.delete(selectedPetId);
    setActiveTool(null);
  };

  const hintText = isClean
    ? null
    : activeStep
      ? `Now dab the ${activeStep.label.toLowerCase()} onto ${selectedPet.name}!`
      : `Pick a tool, then use it on ${selectedPet.name}!`;

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

      {/* Tool rail (left) + Spa stage (right) */}
      <div className="w-full max-w-2xl flex items-stretch gap-2.5 sm:gap-3">
        {/* Tool Rail */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...spring, delay: 0.05 }}
          className="glass-strong glow-lavender rounded-[28px] p-2 sm:p-2.5 flex flex-col justify-center gap-2 sm:gap-2.5 shrink-0"
        >
          {STEPS.map((step) => {
            const stepDone = doneSteps.has(step.id);
            const isHeld = activeTool === step.id;
            return (
              <motion.button
                key={step.id}
                id={`spa-tool-${step.id}`}
                onClick={() => handlePickTool(step)}
                whileHover={{ scale: stepDone ? 1 : 1.08 }}
                whileTap={{ scale: 0.88 }}
                animate={{ scale: isHeld ? 1.12 : 1 }}
                transition={spring}
                className={`flex flex-col items-center gap-0.5 w-14 sm:w-16 p-1.5 sm:p-2 rounded-[20px] cursor-pointer ${
                  stepDone
                    ? 'glass ring-2 ring-sky-300 opacity-60'
                    : isHeld
                      ? 'glass-strong glow-gold ring-2 ring-yellow-300'
                      : 'glass hover:glow-pink'
                }`}
                title={step.label}
              >
                <img src={step.src} alt="" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" draggable={false} />
                <span className="text-[10px] font-black text-[#4A3B5C]">{step.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Spa Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, delay: 0.05 }}
          className="relative flex-1 h-[340px] sm:h-[380px] rounded-[40px] border-4 border-white/80 glow-pink overflow-hidden flex items-end justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('art/spa-bg-bathroom.png')" }}
        >
          <div className="absolute inset-0 bg-white/10" />

          {/* Pet — tap/dab it with whichever tool is "in hand" */}
          <motion.button
            id="spa-pet-stage"
            onPointerDown={handlePetTouch}
            animate={{ scale: bounce ? 1.12 : 1 }}
            transition={spring}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className={`relative z-10 mb-6 w-40 h-40 sm:w-48 sm:h-48 ${activeStep ? 'cursor-crosshair' : 'cursor-pointer'}`}
            title={selectedPet.name}
          >
            <motion.div key={wiggleTick} initial={{ rotate: 0 }} animate={{ rotate: [0, -9, 8, -5, 4, 0] }} transition={{ duration: 0.5 }}>
              <img
                src={isSoapy ? selectedPet.soapy : selectedPet.before}
                alt={selectedPet.name}
                className="w-full h-full object-contain drop-shadow-xl select-none"
                draggable={false}
              />
            </motion.div>

            {/* Ambient floating soap bubbles while mid-bath */}
            <AnimatePresence>
              {isSoapy && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {BUBBLE_SPOTS.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.3, y: 6 }}
                      animate={{ opacity: [0, 1, 1, 0.7], scale: [0.3, 1, 1, 0.85], y: [6, -6, -14, -20] }}
                      transition={{ duration: 2.2, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute rounded-full"
                      style={{
                        left: `${b.x}%`,
                        top: `${b.y}%`,
                        width: b.size,
                        height: b.size,
                        background:
                          'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), rgba(224,242,254,0.55) 55%, rgba(186,230,253,0.35) 100%)',
                        boxShadow: '0 0 6px rgba(255,255,255,0.6)',
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Wand-like burst exactly where the tool touched the pet */}
            {particles.map((p) =>
              p.kind === 'wash' || p.kind === 'rinse' ? (
                <motion.div
                  key={p.id}
                  className="absolute pointer-events-none"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.4, 1.15, 0.9], y: p.kind === 'wash' ? [0, -26] : [0, 14] }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <div
                    className="w-7 h-7 rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{
                      background:
                        p.kind === 'wash'
                          ? 'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), rgba(224,242,254,0.6) 55%, rgba(186,230,253,0.4) 100%)'
                          : 'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.9), rgba(125,211,252,0.65) 60%, rgba(56,189,248,0.45) 100%)',
                      boxShadow: '0 0 8px rgba(255,255,255,0.7)',
                    }}
                  />
                </motion.div>
              ) : (
                <motion.img
                  key={p.id}
                  src={p.sparkle}
                  alt=""
                  className="absolute w-12 h-12 object-contain pointer-events-none -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.3, 1.25, 0.9], rotate: 0 }}
                  transition={{ duration: 0.7 }}
                />
              )
            )}

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
      </div>

      {/* Dynamic hint */}
      <AnimatePresence mode="wait">
        {hintText && (
          <motion.p
            key={hintText}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs font-bold text-[#4A3B5C]/70 text-center -mt-1"
          >
            {hintText}
          </motion.p>
        )}
      </AnimatePresence>

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
