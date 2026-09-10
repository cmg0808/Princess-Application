import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Music, Play, Square, Star } from 'lucide-react';
import { playSound } from '../utils/audio';

interface MusicHarpGameProps {
  onReward: () => void;
}

interface HarpKey {
  note: string;
  name: string;
  freq: number;
  color: string;
  textColor: string;
  emoji: string;
}

const HARP_KEYS: HarpKey[] = [
  { note: 'C4', name: 'Do', freq: 261.63, color: 'from-rose-400 to-pink-500', textColor: 'text-rose-700', emoji: '🌸' },
  { note: 'D4', name: 'Re', freq: 293.66, color: 'from-orange-400 to-amber-500', textColor: 'text-orange-700', emoji: '🍊' },
  { note: 'E4', name: 'Mi', freq: 329.63, color: 'from-amber-300 to-yellow-500', textColor: 'text-amber-700', emoji: '☀️' },
  { note: 'F4', name: 'Fa', freq: 349.23, color: 'from-emerald-400 to-green-500', textColor: 'text-emerald-700', emoji: '🍀' },
  { note: 'G4', name: 'Sol', freq: 392.0, color: 'from-sky-400 to-blue-500', textColor: 'text-blue-700', emoji: '💎' },
  { note: 'A4', name: 'La', freq: 440.0, color: 'from-indigo-400 to-purple-500', textColor: 'text-indigo-700', emoji: '🔮' },
  { note: 'B4', name: 'Ti', freq: 493.88, color: 'from-purple-400 to-fuchsia-500', textColor: 'text-purple-700', emoji: '🦄' },
  { note: 'C5', name: 'Do', freq: 523.25, color: 'from-pink-400 to-rose-600', textColor: 'text-pink-700', emoji: '👑' },
];

interface Song {
  title: string;
  notes: { note: string; duration: number }[];
  emoji: string;
}

const SONGS: Song[] = [
  {
    title: 'Twinkle Twinkle Little Star',
    emoji: '⭐',
    notes: [
      { note: 'C4', duration: 400 },
      { note: 'C4', duration: 400 },
      { note: 'G4', duration: 400 },
      { note: 'G4', duration: 400 },
      { note: 'A4', duration: 400 },
      { note: 'A4', duration: 400 },
      { note: 'G4', duration: 800 },
      { note: 'F4', duration: 400 },
      { note: 'F4', duration: 400 },
      { note: 'E4', duration: 400 },
      { note: 'E4', duration: 400 },
      { note: 'D4', duration: 400 },
      { note: 'D4', duration: 400 },
      { note: 'C4', duration: 800 },
    ],
  },
  {
    title: 'Lavender’s Blue (Dilly Dilly)',
    emoji: '🪻',
    notes: [
      { note: 'E4', duration: 400 },
      { note: 'E4', duration: 400 },
      { note: 'E4', duration: 400 },
      { note: 'G4', duration: 400 },
      { note: 'A4', duration: 400 },
      { note: 'G4', duration: 400 },
      { note: 'E4', duration: 800 },
      { note: 'D4', duration: 400 },
      { note: 'D4', duration: 400 },
      { note: 'D4', duration: 400 },
      { note: 'F4', duration: 400 },
      { note: 'E4', duration: 800 },
    ],
  },
  {
    title: 'Royal Castle Dance',
    emoji: '🏰',
    notes: [
      { note: 'C4', duration: 300 },
      { note: 'E4', duration: 300 },
      { note: 'G4', duration: 300 },
      { note: 'C5', duration: 500 },
      { note: 'G4', duration: 300 },
      { note: 'E4', duration: 300 },
      { note: 'C4', duration: 600 },
      { note: 'D4', duration: 300 },
      { note: 'F4', duration: 300 },
      { note: 'A4', duration: 300 },
      { note: 'C5', duration: 600 },
    ],
  },
];

export const MusicHarpGame: React.FC<MusicHarpGameProps> = ({ onReward }) => {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [isPlayingSong, setIsPlayingSong] = useState(false);
  const [notesPlayedCount, setNotesPlayedCount] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleKeyPress = (key: HarpKey) => {
    playSound.harpNote(key.freq);
    setActiveNote(key.note);

    const newCount = notesPlayedCount + 1;
    setNotesPlayedCount(newCount);
    if (newCount % 16 === 0) {
      onReward();
    }

    setTimeout(() => {
      setActiveNote(null);
    }, 300);
  };

  const playSong = (songIdx: number) => {
    if (isPlayingSong) {
      stopSong();
      return;
    }

    setIsPlayingSong(true);
    setCurrentSongIndex(songIdx);
    const song = SONGS[songIdx];

    let currentStep = 0;

    const playNext = () => {
      if (currentStep >= song.notes.length) {
        setIsPlayingSong(false);
        setCurrentSongIndex(null);
        playSound.fanfare();
        onReward();
        return;
      }

      const item = song.notes[currentStep];
      const keyObj = HARP_KEYS.find((k) => k.note === item.note);
      if (keyObj) {
        playSound.harpNote(keyObj.freq);
        setActiveNote(keyObj.note);
        setTimeout(() => setActiveNote(null), item.duration * 0.7);
      }

      currentStep++;
      timeoutRef.current = setTimeout(playNext, item.duration);
    };

    playNext();
  };

  const stopSong = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPlayingSong(false);
    setCurrentSongIndex(null);
    setActiveNote(null);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-3 flex flex-col items-center gap-4 select-none">
      {/* Song Player Selection Buttons */}
      <div className="w-full max-w-lg flex flex-col items-center gap-2 bg-white/90 backdrop-blur-xs p-3 rounded-3xl border-2 border-pink-200 shadow-xs font-['Fredoka']">
        <h4 className="text-xs font-black text-pink-700 uppercase tracking-wider flex items-center gap-1.5">
          <Music className="w-4 h-4 text-pink-500" />
          Princess Songbook (Watch & Learn!)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
          {SONGS.map((s, idx) => {
            const isThisPlaying = isPlayingSong && currentSongIndex === idx;

            return (
              <button
                key={s.title}
                id={`btn-song-${idx}`}
                onClick={() => (isThisPlaying ? stopSong() : playSong(idx))}
                className={`flex items-center justify-between px-3 py-2 rounded-2xl border-2 transition-all cursor-pointer ${
                  isThisPlaying
                    ? 'bg-pink-500 border-pink-600 text-white shadow-md animate-pulse'
                    : 'bg-pink-50 border-pink-200 text-pink-800 hover:bg-pink-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{s.emoji}</span>
                  <span className="text-xs font-black truncate max-w-[120px]">{s.title}</span>
                </div>
                {isThisPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* The Royal Musical Rainbow Harp / Chime Bells */}
      <div className="relative w-full max-w-xl bg-pink-100/80 p-4 sm:p-6 rounded-3xl border-4 border-pink-300 shadow-xl flex flex-col items-center justify-center">
        {/* Harp Top Golden Arch */}
        <div className="w-full h-8 rounded-full bg-linear-to-r from-amber-300 via-yellow-400 to-amber-300 border-2 border-yellow-500 shadow-md flex items-center justify-around px-4 mb-3">
          <span className="text-xs font-black text-amber-900 font-['Fredoka']">✨ ROYAL SPARKLE HARP ✨</span>
        </div>

        {/* The 8 Harp Keys */}
        <div className="grid grid-cols-8 gap-1.5 sm:gap-2.5 w-full h-64 sm:h-80">
          {HARP_KEYS.map((k, index) => {
            const isActive = activeNote === k.note;
            // Slightly graduated heights like real panpipes / harp bars
            const heightPercent = 70 + index * 4;

            return (
              <button
                key={k.note}
                id={`harp-key-${k.note}`}
                onPointerDown={() => handleKeyPress(k)}
                className={`group relative rounded-2xl sm:rounded-3xl border-3 flex flex-col items-center justify-between p-2 sm:p-3 transition-all duration-150 transform cursor-pointer shadow-md ${
                  isActive
                    ? 'scale-95 border-yellow-300 ring-4 ring-yellow-300 -translate-y-2'
                    : 'border-white hover:-translate-y-1 active:scale-95'
                } bg-linear-to-b ${k.color}`}
                style={{
                  height: `${heightPercent}%`,
                  marginTop: `${100 - heightPercent}%`,
                }}
              >
                {/* Note Icon / Emoji at top */}
                <span className="text-lg sm:text-2xl filter drop-shadow select-none group-hover:animate-bounce">
                  {k.emoji}
                </span>

                {/* Sparkling String in center */}
                <div className="w-1 h-full bg-white/40 rounded-full my-1" />

                {/* Note Label at bottom */}
                <div className="bg-white/90 px-1.5 py-0.5 rounded-full shadow-xs">
                  <span className="text-xs sm:text-sm font-black text-gray-800 font-['Fredoka']">
                    {k.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tip for toddler */}
        <p className="mt-4 text-xs font-bold text-pink-600 font-['Fredoka'] text-center">
          🎶 Tap any rainbow key to play magical fairy chime notes!
        </p>
      </div>
    </div>
  );
};
