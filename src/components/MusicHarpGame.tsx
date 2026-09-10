import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { playSound } from '../utils/audio';

interface MusicHarpGameProps {
  onReward: () => void;
}

interface GemKey {
  note: string;
  freq: number;
  color: string;
  glow: string;
}

const GEM_KEYS: GemKey[] = [
  { note: 'C4', freq: 261.63, color: 'from-rose-300 to-pink-500', glow: 'rgba(244,63,94,0.6)' },
  { note: 'D4', freq: 293.66, color: 'from-orange-300 to-amber-500', glow: 'rgba(251,146,60,0.6)' },
  { note: 'E4', freq: 329.63, color: 'from-amber-200 to-yellow-500', glow: 'rgba(250,204,21,0.6)' },
  { note: 'F4', freq: 349.23, color: 'from-emerald-300 to-green-500', glow: 'rgba(52,211,153,0.6)' },
  { note: 'G4', freq: 392.0, color: 'from-sky-300 to-blue-500', glow: 'rgba(56,189,248,0.6)' },
  { note: 'A4', freq: 440.0, color: 'from-indigo-300 to-purple-500', glow: 'rgba(129,140,248,0.6)' },
  { note: 'B4', freq: 493.88, color: 'from-purple-300 to-fuchsia-500', glow: 'rgba(217,70,239,0.6)' },
  { note: 'C5', freq: 523.25, color: 'from-pink-300 to-rose-600', glow: 'rgba(244,114,182,0.6)' },
];

interface ChimeTheme {
  id: 'crystal' | 'frog';
  name: string;
  emoji: string;
  glyphs: string[];
}

const THEMES: ChimeTheme[] = [
  { id: 'crystal', name: 'Castle Crystals', emoji: '💎', glyphs: ['💎', '🔷', '🔮', '💠'] },
  { id: 'frog', name: 'Frog Choir', emoji: '🐸', glyphs: ['🐸'] },
];

export const MusicHarpGame: React.FC<MusicHarpGameProps> = ({ onReward }) => {
  const [theme, setTheme] = useState<ChimeTheme>(THEMES[0]);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [tapsCount, setTapsCount] = useState(0);

  const handleTap = (key: GemKey) => {
    playSound.harpNote(key.freq);
    if (theme.id === 'frog') playSound.ribbit();
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
      {/* Theme switcher */}
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs p-1.5 rounded-2xl border-2 border-pink-200 shadow-xs">
        {THEMES.map((t) => (
          <button
            key={t.id}
            id={`btn-theme-${t.id}`}
            onClick={() => {
              playSound.tap();
              setTheme(t);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition cursor-pointer ${
              theme.id === t.id ? 'bg-pink-500 text-white shadow-xs scale-105' : 'text-pink-700 hover:bg-pink-100'
            }`}
          >
            <span className="text-base">{t.emoji}</span>
            <span>{t.name}</span>
          </button>
        ))}
      </div>

      {/* Musical Gems Stage */}
      <div className="relative w-full max-w-xl bg-linear-to-b from-purple-100 via-pink-100 to-indigo-100 p-4 sm:p-6 rounded-[32px] border-4 border-white shadow-xl flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-black text-purple-800 uppercase tracking-wider">
            {theme.id === 'crystal' ? 'Tap a glowing crystal!' : 'Tap a singing frog!'}
          </span>
          <Sparkles className="w-4 h-4 text-amber-500" />
        </div>

        <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full">
          {GEM_KEYS.map((k, idx) => {
            const isActive = activeNote === k.note;
            const glyph = theme.glyphs[idx % theme.glyphs.length];
            return (
              <button
                key={k.note}
                id={`gem-key-${k.note}`}
                onPointerDown={() => handleTap(k)}
                className={`aspect-square rounded-3xl border-4 flex items-center justify-center text-3xl sm:text-4xl transition-all duration-150 cursor-pointer bg-linear-to-br ${k.color} ${
                  isActive ? 'scale-90 border-white' : 'border-white/70 hover:scale-105 active:scale-90'
                }`}
                style={{
                  boxShadow: isActive ? `0 0 0 8px ${k.glow}, 0 8px 18px ${k.glow}` : `0 6px 14px ${k.glow}`,
                }}
              >
                <span className={`filter drop-shadow select-none ${isActive ? 'animate-bounce' : ''}`}>
                  {glyph}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-xs font-bold text-purple-700 text-center">
          🎶 Every tap makes a pretty chime — try them all!
        </p>
      </div>
    </div>
  );
};
