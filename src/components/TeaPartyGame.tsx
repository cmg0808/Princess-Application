import React, { useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { playSound } from '../utils/audio';
import { HeartShape, TwinkleStar } from './GameArt';

interface TeaPartyGameProps {
  onReward: () => void;
}

interface TeaPartyGuest {
  id: string;
  name: string;
  portrait: string;
  hasTea: boolean;
  hasCupcake: boolean;
  happyReaction: boolean;
}

const INITIAL_GUESTS: TeaPartyGuest[] = [
  { id: 'princess-lily', name: 'Princess Lily', portrait: '/art/guest-princess.png', hasTea: false, hasCupcake: false, happyReaction: false },
  { id: 'twinkle-bunny', name: 'Twinkle Bunny', portrait: '/art/guest-bunny.png', hasTea: false, hasCupcake: false, happyReaction: false },
  { id: 'pippin-frog', name: 'Prince Pippin', portrait: '/art/guest-frog.png', hasTea: false, hasCupcake: false, happyReaction: false },
];

export const TeaPartyGame: React.FC<TeaPartyGameProps> = ({ onReward }) => {
  const [guests, setGuests] = useState<TeaPartyGuest[]>(INITIAL_GUESTS);
  const [activePouringId, setActivePouringId] = useState<string | null>(null);
  const celebratedRef = useRef(false);

  const maybeCelebrate = (list: TeaPartyGuest[]) => {
    const allFed = list.every((g) => g.hasTea && g.hasCupcake);
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
      const next = prev.map((g) => (g.id === guestId ? { ...g, hasTea: true, happyReaction: true } : g));
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
        <img src="/art/teapot.png" alt="" className="w-10 h-10 shrink-0 object-contain" />
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
            <img src="/art/cookie-heart.png" alt="" className="w-7 h-7 object-contain" />
            <img src="/art/teapot.png" alt="" className="w-9 h-9 object-contain" />
            <img src="/art/cupcake.png" alt="" className="w-7 h-7 object-contain" />
            <img src="/art/cookie-round.png" alt="" className="w-7 h-7 object-contain" />
          </div>
          <div className="w-full h-4 bg-pink-300/40" />
        </div>

        {/* Guests Seated Around Table */}
        <div className="relative z-10 grid grid-cols-3 gap-2 h-full items-center">
          {guests.map((guest) => {
            const isPouring = activePouringId === guest.id;
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
                  <img
                    src={guest.portrait}
                    alt={guest.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain filter drop-shadow select-none"
                  />
                  <span className="text-xs font-black text-pink-900 bg-white/90 px-2 py-0.5 rounded-full shadow-2xs border border-pink-200 mt-1">
                    {guest.name}
                  </span>
                </div>

                {/* Guest Teacup & Cupcake Plate — big chunky tap targets */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    id={`btn-pour-${guest.id}`}
                    onClick={() => handlePourTea(guest.id)}
                    className="w-12 h-12 cursor-pointer hover:scale-115 active:scale-90 transition-transform"
                    title="Tap to pour tea"
                    aria-label={`Pour tea for ${guest.name}`}
                  >
                    <img
                      src="/art/teacup.png"
                      alt=""
                      className={`w-full h-full object-contain transition-all duration-300 ${
                        guest.hasTea ? 'opacity-100' : 'opacity-30 grayscale'
                      }`}
                    />
                  </button>

                  <button
                    id={`btn-feed-${guest.id}`}
                    onClick={() => handleFeedGuest(guest.id)}
                    className="w-12 h-12 cursor-pointer hover:scale-115 active:scale-90 transition-transform"
                    title="Tap to give a cupcake"
                    aria-label={`Feed cupcake to ${guest.name}`}
                  >
                    <img
                      src="/art/cupcake.png"
                      alt=""
                      className={`w-full h-full object-contain transition-all duration-300 ${
                        guest.hasCupcake ? 'opacity-100' : 'opacity-30 grayscale'
                      }`}
                    />
                  </button>
                </div>

                {/* Pouring Teapot Animation */}
                {isPouring && (
                  <div className="absolute -top-5 right-0 animate-bounce z-30">
                    <img src="/art/teapot.png" alt="" className="w-8 h-8 object-contain" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Hint at bottom */}
        <div className="relative z-10 self-center bg-white/85 backdrop-blur-xs px-3 py-1 rounded-full border border-pink-200 text-xs font-black text-pink-700 pointer-events-none">
          Tap a teacup to pour, or tap a treat to feed it!
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
          <img src="/art/teapot.png" alt="" className="w-6 h-6 object-contain" />
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
          <img src="/art/cupcake.png" alt="" className="w-6 h-6 object-contain" />
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
