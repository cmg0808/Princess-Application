import React, { useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { playSound } from '../utils/audio';
import {
  TeapotArt,
  TeacupArt,
  PlateArt,
  CupcakeArt,
  FlowerArt,
  HeartShape,
  TwinkleStar,
  PrincessPortrait,
  UnicornPortrait,
  BunnyPortrait,
  FrogPortrait,
} from './GameArt';

interface TeaPartyGameProps {
  onReward: () => void;
}

interface TeaPartyGuest {
  id: string;
  name: string;
  Portrait: React.FC<{ className?: string }>;
  cupFill: number; // 0 to 100%
  hasCupcake: boolean;
  happyReaction: boolean;
}

const INITIAL_GUESTS: TeaPartyGuest[] = [
  { id: 'princess-lily', name: 'Princess Lily', Portrait: PrincessPortrait, cupFill: 0, hasCupcake: false, happyReaction: false },
  { id: 'sparkle-unicorn', name: 'Sparkle Unicorn', Portrait: UnicornPortrait, cupFill: 0, hasCupcake: false, happyReaction: false },
  { id: 'twinkle-bunny', name: 'Twinkle Bunny', Portrait: BunnyPortrait, cupFill: 0, hasCupcake: false, happyReaction: false },
  { id: 'pippin-frog', name: 'Prince Pippin', Portrait: FrogPortrait, cupFill: 0, hasCupcake: false, happyReaction: false },
];

export const TeaPartyGame: React.FC<TeaPartyGameProps> = ({ onReward }) => {
  const [guests, setGuests] = useState<TeaPartyGuest[]>(INITIAL_GUESTS);
  const [activePouringId, setActivePouringId] = useState<string | null>(null);
  const celebratedRef = useRef(false);

  const maybeCelebrate = (list: TeaPartyGuest[]) => {
    const allFed = list.every((g) => g.cupFill >= 50 && g.hasCupcake);
    if (allFed && !celebratedRef.current) {
      celebratedRef.current = true;
      playSound.fanfare();
      onReward();
    }
  };

  // Pour tea into a guest's cup
  const handlePourTea = (guestId: string) => {
    playSound.teaPour();
    setActivePouringId(guestId);

    setGuests((prev) => {
      const next = prev.map((g) =>
        g.id === guestId ? { ...g, cupFill: Math.min(100, g.cupFill + 50), happyReaction: true } : g
      );
      maybeCelebrate(next);
      return next;
    });

    setTimeout(() => {
      setActivePouringId(null);
      setGuests((prev) => prev.map((g) => (g.id === guestId ? { ...g, happyReaction: false } : g)));
    }, 1200);
  };

  // Feed cupcake treat to a guest
  const handleFeedGuest = (guestId: string) => {
    playSound.munch();

    setGuests((prev) => {
      const next = prev.map((g) =>
        g.id === guestId ? { ...g, hasCupcake: true, happyReaction: true } : g
      );
      maybeCelebrate(next);
      return next;
    });

    setTimeout(() => {
      setGuests((prev) => prev.map((g) => (g.id === guestId ? { ...g, happyReaction: false } : g)));
    }, 1500);
  };

  // Refill / reset tea party
  const handleResetTable = () => {
    playSound.tap();
    celebratedRef.current = false;
    setGuests(INITIAL_GUESTS.map((g) => ({ ...g })));
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center gap-3 select-none font-['Fredoka']">
      {/* Header */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-3xl border-2 border-pink-200 shadow-sm flex items-center gap-2">
        <TeapotArt className="w-9 h-9 shrink-0" />
        <div>
          <h3 className="text-base sm:text-lg font-black text-pink-800 leading-tight">
            Royal Tea Party
          </h3>
          <span className="text-xs font-bold text-pink-500">
            Serve tea and yummy cupcakes to your royal friends!
          </span>
        </div>
      </div>

      {/* Royal Tea Table Canvas */}
      <div className="relative w-full max-w-2xl h-[320px] sm:h-[360px] rounded-3xl border-4 border-pink-300 shadow-2xl bg-linear-to-b from-purple-100 via-pink-100 to-rose-200 overflow-hidden flex flex-col justify-between p-3 sm:p-4">
        {/* Tablecloth & Centerpiece */}
        <div className="absolute inset-x-8 bottom-4 h-40 bg-white/90 rounded-3xl border-3 border-pink-200 shadow-lg flex flex-col items-center justify-center pointer-events-none">
          <div className="w-full h-4 bg-pink-300/40" />
          <div className="flex items-center gap-4 my-auto opacity-70">
            <FlowerArt className="w-6 h-6" color="#F472B6" />
            <TeapotArt className="w-8 h-8" />
            <CupcakeArt className="w-7 h-7" />
            <FlowerArt className="w-6 h-6" color="#C084FC" />
          </div>
          <div className="w-full h-4 bg-pink-300/40" />
        </div>

        {/* Guests Seated Around Table */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 h-full items-center">
          {guests.map((guest) => {
            const isPouring = activePouringId === guest.id;
            const Portrait = guest.Portrait;
            return (
              <div
                key={guest.id}
                id={`guest-${guest.id}`}
                className="relative flex flex-col items-center justify-between p-2 rounded-2xl bg-white/60"
              >
                {/* Happy Reaction Hearts */}
                {guest.happyReaction && (
                  <div className="absolute -top-6 flex items-center gap-0.5 animate-bounce z-30">
                    <HeartShape className="w-4 h-4" />
                    <TwinkleStar className="w-4 h-4" color="#FACC15" />
                    <HeartShape className="w-4 h-4" />
                  </div>
                )}

                {/* Guest Character Portrait */}
                <div className="flex flex-col items-center">
                  <Portrait className="w-14 h-14 sm:w-16 sm:h-16 filter drop-shadow select-none" />
                  <span className="text-xs font-black text-pink-900 bg-white/90 px-2 py-0.5 rounded-full shadow-2xs border border-pink-200 mt-1">
                    {guest.name}
                  </span>
                </div>

                {/* Guest Teacup & Cupcake Plate — big chunky tap targets */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    id={`btn-pour-${guest.id}`}
                    onClick={() => handlePourTea(guest.id)}
                    className="w-11 h-11 cursor-pointer hover:scale-115 active:scale-90 transition-transform"
                    title="Tap to pour tea"
                    aria-label={`Pour tea for ${guest.name}`}
                  >
                    <TeacupArt className="w-full h-full drop-shadow-xs" fillPercent={guest.cupFill} />
                  </button>

                  <button
                    id={`btn-feed-${guest.id}`}
                    onClick={() => handleFeedGuest(guest.id)}
                    className="relative w-11 h-11 cursor-pointer hover:scale-115 active:scale-90 transition-transform"
                    title="Tap to give a cupcake"
                    aria-label={`Feed cupcake to ${guest.name}`}
                  >
                    <PlateArt className="w-full h-full drop-shadow-xs" />
                    {guest.hasCupcake && (
                      <CupcakeArt className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-7 h-7 drop-shadow" />
                    )}
                  </button>
                </div>

                {/* Pouring Teapot Stream Animation */}
                {isPouring && (
                  <div className="absolute -top-5 right-0 animate-bounce z-30">
                    <TeapotArt className="w-8 h-8" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Hint at bottom */}
        <div className="relative z-10 self-center bg-white/85 backdrop-blur-xs px-3 py-1 rounded-full border border-pink-200 text-xs font-black text-pink-700 pointer-events-none">
          Tap a teacup to pour, or tap a plate to feed treats!
        </div>
      </div>

      {/* Toddler Action Bar */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xs p-3 rounded-3xl border-2 border-pink-200 shadow-sm flex items-center justify-between gap-2">
        <button
          id="btn-pour-all"
          onClick={() => {
            guests.forEach((g, idx) => {
              setTimeout(() => handlePourTea(g.id), idx * 250);
            });
          }}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-linear-to-b from-amber-400 to-yellow-500 text-amber-950 font-black text-xs sm:text-sm shadow-md hover:scale-102 active:scale-95 transition cursor-pointer border-2 border-yellow-300"
        >
          <TeapotArt className="w-6 h-6" />
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
          <CupcakeArt className="w-6 h-6" />
          <span>Feed Cupcakes!</span>
        </button>

        <button
          id="btn-reset-table"
          onClick={handleResetTable}
          className="p-3 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-600 hover:bg-rose-100 active:scale-95 transition cursor-pointer shadow-xs"
          title="Reset Table"
          aria-label="Reset Table"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
