import React, { useState } from 'react';
import { playSound } from '../utils/audio';
import { TwinkleStar } from './GameArt';

interface MusicHarpGameProps {
  onReward: () => void;
}

interface GemKey {
  note: string;
  freq: number;
  src: string;
  glow: string;
}

// A pentatonic scale (no "wrong-sounding" combination) mapped one-to-one to
// the five illustrated gem keys, so every tap sounds pleasant.
const GEM_KEYS: GemKey[] = [
  { note: 'C4', freq: 261.63, src: 'art/gem-key-pink.png', glow: 'rgba(244,63,94,0.55)' },
  { note: 'D4', freq: 293.66, src: 'art/gem-key-yellow.png', glow: 'rgba(250,204,21,0.55)' },
  { note: 'E4', freq: 329.63, src: 'art/gem-key-green.png', glow: 'rgba(52,211,153,0.55)' },
  { note: 'G4', freq: 392.0, src: 'art/gem-key-blue.png', glow: 'rgba(56,189,248,0.55)' },
  { note: 'A4', freq: 440.0, src: 'art/gem-key-purple.png', glow: 'rgba(168,85,247,0.55)' },
];

export const MusicHarpGame: React.FC<MusicHarpGameProps> = ({ onReward }) => {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [tapsCount, setTapsCount] = useState(0);

  const handleTap = (key: GemKey) => {
    playSound.harpNote(key.freq);
    setActiveNote(key.note);

    const nextCount = tapsCount + 1;
    setTapsCount(nextCount);
    if (nextCount % 12 === 0) {
      onReward();
    }

    setTimeout(() => setActiveNote((n) => (n === key.note ? null : n)), 320);
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-3 flex flex-col items-center gap-4 select-none font-['Fredoka']">
      {/* Musical Gems Stage */}
      <div className="relative w-full max-w-xl bg-linear-to-b from-purple-100 via-pink-100 to-indigo-100 p-4 sm:p-6 rounded-[32px] border-4 border-white shadow-xl flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center gap-2 mb-4">
          <TwinkleStar className="w-4 h-4" color="#F59E0B" />
          <span className="text-xs font-black text-purple-800 uppercase tracking-wider">
            Tap a glowing crystal!
          </span>
          <TwinkleStar className="w-4 h-4" color="#F59E0B" />
        </div>

        <div className="grid grid-cols-5 gap-2.5 sm:gap-4 w-full">
          {GEM_KEYS.map((k) => {
            const isActive = activeNote === k.note;
            return (
              <button
                key={k.note}
                id={`gem-key-${k.note}`}
                onPointerDown={() => handleTap(k)}
                className={`aspect-square rounded-3xl border-4 bg-white flex items-center justify-center p-1.5 transition-all duration-150 cursor-pointer ${
                  isActive ? 'scale-90 border-white' : 'border-white/70 hover:scale-105 active:scale-90'
                }`}
                style={{
                  boxShadow: isActive ? `0 0 0 8px ${k.glow}, 0 8px 18px ${k.glow}` : `0 6px 14px ${k.glow}`,
                }}
              >
                <img
                  src={k.src}
                  alt=""
                  className={`w-full h-full object-contain filter drop-shadow select-none ${isActive ? 'animate-bounce' : ''}`}
                  draggable={false}
                />
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-xs font-bold text-purple-700 text-center">
          Every tap makes a pretty chime — try them all!
        </p>
      </div>
    </div>
  );
};
