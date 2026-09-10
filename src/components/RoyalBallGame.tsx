import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Music, Star, Volume2, PartyPopper, Heart, RotateCcw } from 'lucide-react';
import { DanceMove, BallMusicStyle } from '../types';
import { playSound } from '../utils/audio';

interface RoyalBallGameProps {
  onReward: () => void;
}

interface BallroomDancer {
  id: string;
  name: string;
  dressColor: string;
  hairColor: string;
  tiaraColor: string;
  partner?: string;
  x: number; // % across floor
  y: number; // % from bottom
  scale: number;
  currentMove: DanceMove;
  isSpecial: boolean;
}

interface RippleEffect {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export const RoyalBallGame: React.FC<RoyalBallGameProps> = ({ onReward }) => {
  const [musicStyle, setMusicStyle] = useState<BallMusicStyle>('waltz');
  const [isDiscoMode, setIsDiscoMode] = useState(false);
  const [danceEnergy, setDanceEnergy] = useState(35);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [activeSpotlight, setActiveSpotlight] = useState<'pink' | 'purple' | 'gold' | 'cyan'>('pink');
  
  // Dancers on the ballroom floor
  const [dancers, setDancers] = useState<BallroomDancer[]>([
    {
      id: 'princess-lily',
      name: 'Princess Lily',
      dressColor: 'from-pink-400 to-rose-500',
      hairColor: 'bg-amber-700',
      tiaraColor: 'text-yellow-400',
      x: 25,
      y: 18,
      scale: 1,
      currentMove: 'sway',
      isSpecial: false,
    },
    {
      id: 'princess-aurora',
      name: 'Princess Crystal',
      dressColor: 'from-sky-400 to-blue-500',
      hairColor: 'bg-yellow-500',
      tiaraColor: 'text-amber-300',
      x: 50,
      y: 12,
      scale: 1.1,
      currentMove: 'bounce',
      isSpecial: false,
    },
    {
      id: 'princess-jasmine',
      name: 'Princess Violet',
      dressColor: 'from-purple-400 to-indigo-500',
      hairColor: 'bg-stone-900',
      tiaraColor: 'text-yellow-300',
      x: 75,
      y: 20,
      scale: 0.98,
      currentMove: 'sway',
      isSpecial: false,
    },
  ]);

  const [royalPet, setRoyalPet] = useState<{ x: number; currentMove: string }>({
    x: 62,
    currentMove: 'bounce',
  });

  const nextRippleId = useRef(1);

  // Background musical tempo pulse & dance beat
  useEffect(() => {
    const tempoInterval = setInterval(() => {
      // Natural idle dance cadence
      setDancers((prev) =>
        prev.map((d) => {
          if (d.isSpecial) return d; // don't override active move
          const moves: DanceMove[] = ['sway', 'bounce'];
          return {
            ...d,
            currentMove: moves[Math.floor(Math.random() * moves.length)],
          };
        })
      );
    }, 1200);

    return () => clearInterval(tempoInterval);
  }, []);

  // Trigger move on a specific dancer
  const triggerDancerMove = (dancerId: string, move: DanceMove, customSound?: () => void) => {
    if (customSound) {
      customSound();
    } else {
      if (move === 'twirl') playSound.twirl();
      else if (move === 'jump') playSound.sparkle();
      else if (move === 'curtsy') playSound.curtsy();
      else playSound.danceStep();
    }

    setDancers((prev) =>
      prev.map((d) => {
        if (d.id === dancerId) {
          return { ...d, currentMove: move, isSpecial: true };
        }
        return d;
      })
    );

    // Boost energy
    addEnergy(15);

    // Reset back to idle move after animation
    setTimeout(() => {
      setDancers((prev) =>
        prev.map((d) => (d.id === dancerId ? { ...d, isSpecial: false } : d))
      );
    }, 1400);
  };

  // Trigger move on all dancers together
  const triggerAllDancers = (move: DanceMove) => {
    if (move === 'twirl') {
      playSound.twirl();
    } else if (move === 'jump') {
      playSound.sparkle();
    } else if (move === 'curtsy') {
      playSound.curtsy();
    } else {
      playSound.danceStep();
    }

    setDancers((prev) =>
      prev.map((d) => ({ ...d, currentMove: move, isSpecial: true }))
    );

    setRoyalPet((p) => ({ ...p, currentMove: move }));

    addEnergy(20);

    setTimeout(() => {
      setDancers((prev) =>
        prev.map((d) => ({ ...d, isSpecial: false, currentMove: 'sway' }))
      );
    }, 1500);
  };

  // Add magic energy & check for royal celebration
  const addEnergy = (amount: number) => {
    const next = Math.min(100, danceEnergy + amount);
    if (next >= 100) {
      // Grand Ball Celebration!
      playSound.fanfare();
      onReward();
      setDanceEnergy(20); // reset to 20%
    } else {
      setDanceEnergy(next);
    }
  };

  // Tap anywhere on the ballroom floor
  const handleFloorTap = (e: React.MouseEvent<HTMLDivElement> | React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    playSound.danceStep();

    const sparkles = ['✨', '💖', '⭐', '🌸', '🪩', '👑'];
    const randomSparkle = sparkles[Math.floor(Math.random() * sparkles.length)];

    const rippleId = nextRippleId.current++;
    setRipples((prev) => [...prev, { id: rippleId, x, y, emoji: randomSparkle }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippleId));
    }, 900);

    // Randomize spotlight
    const spotlights: ('pink' | 'purple' | 'gold' | 'cyan')[] = ['pink', 'purple', 'gold', 'cyan'];
    setActiveSpotlight(spotlights[Math.floor(Math.random() * spotlights.length)]);

    addEnergy(5);
  };

  // Toggle Disco Ball mode
  const handleDiscoToggle = () => {
    playSound.discoBurst();
    setIsDiscoMode(!isDiscoMode);
    triggerAllDancers('twirl');
    addEnergy(25);
  };

  // Confetti Blast
  const handleConfettiBlast = () => {
    playSound.fanfare();
    triggerAllDancers('jump');
    
    // Add multiple sparkles
    const newRipples: RippleEffect[] = [
      { id: Math.random(), x: 30, y: 30, emoji: '🎉' },
      { id: Math.random(), x: 50, y: 25, emoji: '✨' },
      { id: Math.random(), x: 70, y: 35, emoji: '💖' },
      { id: Math.random(), x: 45, y: 55, emoji: '⭐' },
    ];
    setRipples((prev) => [...prev, ...newRipples]);

    setTimeout(() => {
      setRipples([]);
    }, 1200);

    addEnergy(20);
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center gap-3 select-none font-['Fredoka']">
      {/* Top Ballroom Header & Energy Meter */}
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xs px-4 py-2.5 rounded-3xl border-2 border-pink-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-bounce">🏰</span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-pink-800 leading-tight">
              The Grand Royal Ball
            </h3>
            <p className="text-xs font-bold text-pink-500">
              Tap the princesses to make them dance!
            </p>
          </div>
        </div>

        {/* Dance Magic Energy Bar */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-black text-pink-700 whitespace-nowrap">
            Magic Energy ✨
          </span>
          <div className="w-full sm:w-36 h-4 bg-pink-100 rounded-full border border-pink-300 p-0.5 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-pink-400 via-purple-400 to-yellow-400 rounded-full transition-all duration-300 shadow-inner"
              style={{ width: `${danceEnergy}%` }}
            />
          </div>
          <span className="text-xs font-extrabold text-pink-600 min-w-[32px]">
            {danceEnergy}%
          </span>
        </div>
      </div>

      {/* Main Royal Ballroom Stage */}
      <div
        id="royal-ballroom-stage"
        onClick={handleFloorTap}
        className={`relative w-full max-w-2xl h-[420px] sm:h-[480px] rounded-3xl border-4 border-pink-300 shadow-2xl overflow-hidden cursor-pointer transition-colors duration-700 ${
          isDiscoMode
            ? 'bg-linear-to-b from-indigo-950 via-purple-900 to-fuchsia-950'
            : 'bg-linear-to-b from-purple-200 via-pink-100 to-rose-200'
        }`}
      >
        {/* Ballroom Architecture: Crystal Chandeliers & Grand Arches */}
        <div className="absolute top-0 inset-x-0 flex justify-around pointer-events-none z-10">
          <div className="text-3xl sm:text-4xl opacity-90 animate-pulse">💎</div>
          <div className="flex flex-col items-center">
            {/* Chandelier or Disco Ball */}
            <div
              className={`text-4xl sm:text-5xl select-none transition-transform duration-500 ${
                isDiscoMode ? 'animate-spin' : 'animate-bounce'
              }`}
              style={{ animationDuration: isDiscoMode ? '3s' : '4s' }}
            >
              {isDiscoMode ? '🪩' : '👑'}
            </div>
            <div className="w-1 h-6 bg-yellow-400/60" />
          </div>
          <div className="text-3xl sm:text-4xl opacity-90 animate-pulse">💎</div>
        </div>

        {/* Palace Windows & Starlight */}
        <div className="absolute inset-0 pointer-events-none flex justify-between p-4 opacity-40">
          <span className="text-4xl">🪟</span>
          <span className="text-3xl">✨</span>
          <span className="text-4xl">🪟</span>
        </div>

        {/* Dynamic Colorful Spotlight Cone */}
        <div
          className={`absolute inset-0 pointer-events-none opacity-35 transition-all duration-700 mix-blend-screen ${
            activeSpotlight === 'pink'
              ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-300 via-transparent to-transparent'
              : activeSpotlight === 'purple'
              ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-300 via-transparent to-transparent'
              : activeSpotlight === 'gold'
              ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-300 via-transparent to-transparent'
              : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-300 via-transparent to-transparent'
          }`}
        />

        {/* Ballroom Floor Polished Sheen Grid */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-linear-to-t from-pink-300/40 via-purple-200/20 to-transparent pointer-events-none border-t border-white/40" />

        {/* Tap Ripples */}
        {ripples.map((rip) => (
          <div
            key={rip.id}
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 text-3xl sm:text-4xl animate-ping z-30"
            style={{ left: `${rip.x}%`, top: `${rip.y}%` }}
          >
            {rip.emoji}
          </div>
        ))}

        {/* Dancing Princess Characters */}
        {dancers.map((dancer) => {
          let moveAnimation = '';
          if (dancer.currentMove === 'twirl') {
            moveAnimation = 'animate-spin duration-700';
          } else if (dancer.currentMove === 'jump') {
            moveAnimation = '-translate-y-16 duration-300';
          } else if (dancer.currentMove === 'curtsy') {
            moveAnimation = 'scale-y-80 translate-y-4 duration-400';
          } else if (dancer.currentMove === 'sway') {
            moveAnimation = 'rotate-3 duration-500';
          } else if (dancer.currentMove === 'bounce') {
            moveAnimation = '-translate-y-3 duration-300';
          }

          return (
            <div
              key={dancer.id}
              id={`dancer-${dancer.id}`}
              onClick={(e) => {
                e.stopPropagation();
                // Random special move on direct tap!
                const specialMoves: DanceMove[] = ['twirl', 'jump', 'curtsy'];
                const chosen = specialMoves[Math.floor(Math.random() * specialMoves.length)];
                triggerDancerMove(dancer.id, chosen);
              }}
              className={`absolute transform -translate-x-1/2 cursor-pointer transition-all ${moveAnimation} z-20 hover:scale-105 active:scale-95`}
              style={{
                left: `${dancer.x}%`,
                bottom: `${dancer.y}%`,
                transform: `translateX(-50%) scale(${dancer.scale})`,
              }}
            >
              {/* Dancer Name Badge */}
              <div className="mb-1 text-center">
                <span className="bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[11px] font-black text-pink-700 shadow-xs border border-pink-200">
                  {dancer.name}
                </span>
              </div>

              {/* Princess Figure Illustration */}
              <div className="relative flex flex-col items-center select-none w-24 sm:w-28">
                {/* Floating sparkles when performing move */}
                {dancer.isSpecial && (
                  <span className="absolute -top-6 text-2xl animate-bounce text-yellow-300 filter drop-shadow">
                    ✨
                  </span>
                )}

                {/* Tiara */}
                <span className={`text-2xl ${dancer.tiaraColor} filter drop-shadow mb-[-8px] z-10 animate-pulse`}>
                  👑
                </span>

                {/* Head */}
                <div className="relative w-12 h-12 rounded-full bg-[#fce7db] border-2 border-amber-800/30 flex items-center justify-center shadow-xs">
                  {/* Hair */}
                  <div className={`absolute -top-1 w-13 h-7 rounded-t-full ${dancer.hairColor}`} />
                  {/* Face */}
                  <div className="relative flex items-center gap-2.5 mt-2 z-10">
                    {/* Big twinkling eyes */}
                    <div className="w-1.5 h-2 bg-stone-800 rounded-full" />
                    <div className="w-1.5 h-2 bg-stone-800 rounded-full" />
                  </div>
                  {/* Rosy cheeks */}
                  <div className="absolute top-6 left-2 w-2 h-1 bg-pink-400 rounded-full opacity-70" />
                  <div className="absolute top-6 right-2 w-2 h-1 bg-pink-400 rounded-full opacity-70" />
                  {/* Gentle smile */}
                  <div className="absolute bottom-2.5 w-3 h-1.5 border-b-2 border-rose-500 rounded-full" />
                </div>

                {/* Sparkling Gown */}
                <div
                  className={`w-16 h-20 sm:w-20 sm:h-24 bg-linear-to-b ${dancer.dressColor} rounded-t-lg rounded-b-[40px] border-2 border-white shadow-lg relative overflow-hidden flex flex-col items-center justify-between p-1`}
                >
                  {/* Gown Lace/Sparkle Pattern */}
                  <div className="w-full flex justify-center text-xs text-white/90">
                    ✨
                  </div>
                  <div className="w-10 h-0.5 bg-white/40 rounded-full" />
                  <div className="w-14 h-1 bg-white/50 rounded-full mb-1" />
                </div>

                {/* Little Dancing Shoes */}
                <div className="flex gap-3 -mt-1 z-10">
                  <div className="w-3 h-2 bg-pink-300 rounded-full shadow-xs border border-white" />
                  <div className="w-3 h-2 bg-pink-300 rounded-full shadow-xs border border-white" />
                </div>
              </div>
            </div>
          );
        })}

        {/* Dancing Palace Pet Companion (Kitten / Bunny) */}
        <div
          id="dancer-royal-pet"
          onClick={(e) => {
            e.stopPropagation();
            playSound.giggle();
            setRoyalPet((p) => ({ ...p, currentMove: 'jump' }));
            addEnergy(10);
            setTimeout(() => setRoyalPet((p) => ({ ...p, currentMove: 'bounce' })), 800);
          }}
          className={`absolute transform -translate-x-1/2 cursor-pointer transition-all z-20 ${
            royalPet.currentMove === 'jump' ? '-translate-y-12' : 'animate-bounce'
          }`}
          style={{ left: `${royalPet.x}%`, bottom: '10%' }}
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl filter drop-shadow">🐰</span>
            <span className="text-[10px] font-black text-pink-600 bg-white/80 px-1.5 rounded-full">
              Twinkle
            </span>
          </div>
        </div>

        {/* Toddler Tap Hint Banner */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/85 backdrop-blur-xs px-4 py-1.5 rounded-full border border-pink-300 pointer-events-none shadow-sm flex items-center gap-1.5 text-xs font-black text-pink-700">
          <span>👆</span>
          <span>Tap anywhere on the floor or tap a princess to dance!</span>
        </div>
      </div>

      {/* Chunky Toddler Action Buttons (Giant Touch-Friendly Controls) */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xs p-3 rounded-3xl border-2 border-pink-200 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black text-pink-700 flex items-center gap-1">
            <Music className="w-3.5 h-3.5" />
            Dance Choreography Moves:
          </span>
          <span className="text-[11px] font-bold text-pink-500">
            Big buttons for little fingers!
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 w-full">
          {/* Twirl Button */}
          <button
            id="btn-dance-twirl"
            onClick={() => triggerAllDancers('twirl')}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-linear-to-b from-pink-400 to-rose-500 text-white font-black shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer border-2 border-pink-200"
          >
            <span className="text-2xl animate-spin" style={{ animationDuration: '3s' }}>
              💫
            </span>
            <span className="text-xs mt-1">Royal Twirl!</span>
          </button>

          {/* Jump Button */}
          <button
            id="btn-dance-jump"
            onClick={() => triggerAllDancers('jump')}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-linear-to-b from-purple-400 to-indigo-500 text-white font-black shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer border-2 border-purple-200"
          >
            <span className="text-2xl animate-bounce">⭐</span>
            <span className="text-xs mt-1">Star Leap!</span>
          </button>

          {/* Curtsy Button */}
          <button
            id="btn-dance-curtsy"
            onClick={() => triggerAllDancers('curtsy')}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-linear-to-b from-amber-300 to-yellow-500 text-amber-950 font-black shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer border-2 border-amber-200"
          >
            <span className="text-2xl">👑</span>
            <span className="text-xs mt-1">Royal Curtsy!</span>
          </button>

          {/* Disco Ball Toggle */}
          <button
            id="btn-dance-disco"
            onClick={handleDiscoToggle}
            className={`flex flex-col items-center justify-center p-2.5 rounded-2xl font-black shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer border-2 ${
              isDiscoMode
                ? 'bg-linear-to-b from-cyan-400 to-blue-600 text-white border-cyan-200 ring-2 ring-cyan-300'
                : 'bg-linear-to-b from-sky-100 to-blue-200 text-blue-900 border-blue-200'
            }`}
          >
            <span className="text-2xl">🪩</span>
            <span className="text-xs mt-1">{isDiscoMode ? 'Ballroom 🏰' : 'Disco 🪩'}</span>
          </button>

          {/* Confetti Blast */}
          <button
            id="btn-dance-confetti"
            onClick={handleConfettiBlast}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-linear-to-b from-rose-400 to-pink-500 text-white font-black shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer border-2 border-rose-200 col-span-3 sm:col-span-1"
          >
            <span className="text-2xl animate-pulse">🎉</span>
            <span className="text-xs mt-1">Party Blast!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
