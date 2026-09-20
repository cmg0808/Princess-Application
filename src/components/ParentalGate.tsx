import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { playSound } from '../utils/audio';

interface ParentalGateProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const spring = { type: 'spring' as const, stiffness: 360, damping: 22 };

// A simple math problem a toddler can't answer but a parent can solve in a
// couple of seconds — the standard "parental gate" pattern app stores expect
// before anything settings/links-related.
function makeProblem() {
  const a = 3 + Math.floor(Math.random() * 6); // 3-8
  const b = 2 + Math.floor(Math.random() * 6); // 2-7
  const correct = a + b;
  const options = new Set<number>([correct]);
  while (options.size < 3) {
    const decoy = correct + (Math.floor(Math.random() * 7) - 3);
    if (decoy > 0 && decoy !== correct) options.add(decoy);
  }
  const shuffled = Array.from(options).sort(() => Math.random() - 0.5);
  return { a, b, correct, options: shuffled };
}

export const ParentalGate: React.FC<ParentalGateProps> = ({ onSuccess, onCancel }) => {
  const [problem, setProblem] = useState(makeProblem);
  const [wrongPick, setWrongPick] = useState<number | null>(null);

  const handlePick = (value: number) => {
    if (value === problem.correct) {
      playSound.chime();
      onSuccess();
    } else {
      playSound.tap();
      setWrongPick(value);
      setTimeout(() => {
        setWrongPick(null);
        setProblem(makeProblem());
      }, 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={spring}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xs glass-strong glow-lavender rounded-[32px] p-6 text-center relative"
      >
        <button
          id="btn-gate-close"
          onClick={onCancel}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-[#4A3B5C] cursor-pointer"
          aria-label="Cancel"
        >
          <X className="w-4 h-4" />
        </button>

        <p className="font-display italic text-lg font-bold text-[#4A3B5C] mb-1">Just for Grown-Ups</p>
        <p className="text-xs font-bold text-[#4A3B5C]/70 mb-4">Solve this to continue</p>

        <div className="text-3xl font-black text-pink-600 mb-4">
          {problem.a} + {problem.b} = ?
        </div>

        <div className="flex items-center justify-center gap-2">
          <AnimatePresence mode="wait">
            {problem.options.map((opt) => (
              <motion.button
                key={`${problem.a}-${problem.b}-${opt}`}
                id={`btn-gate-opt-${opt}`}
                onClick={() => handlePick(opt)}
                animate={wrongPick === opt ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                className="w-14 h-14 rounded-2xl glass text-lg font-black text-[#4A3B5C] cursor-pointer"
              >
                {opt}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};
