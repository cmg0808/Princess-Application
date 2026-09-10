import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, Trophy } from 'lucide-react';
import { MemoryCard } from '../types';
import { playSound } from '../utils/audio';

interface MatchingGameProps {
  onReward: () => void;
}

const CARD_POOL = [
  { pairId: 1, name: 'Crown', emoji: '👑', color: 'from-amber-300 to-yellow-400' },
  { pairId: 2, name: 'Wand', emoji: '🪄', color: 'from-pink-300 to-rose-400' },
  { pairId: 3, name: 'Unicorn', emoji: '🦄', color: 'from-purple-300 to-indigo-400' },
  { pairId: 4, name: 'Castle', emoji: '🏰', color: 'from-blue-300 to-sky-400' },
  { pairId: 5, name: 'Slipper', emoji: '🥿', color: 'from-teal-300 to-emerald-400' },
  { pairId: 6, name: 'Carriage', emoji: '🎠', color: 'from-fuchsia-300 to-pink-400' },
  { pairId: 7, name: 'Heart', emoji: '💖', color: 'from-rose-300 to-red-400' },
  { pairId: 8, name: 'Star', emoji: '⭐', color: 'from-yellow-200 to-amber-400' },
];

type Level = 'easy' | 'medium' | 'hard';

export const MatchingGame: React.FC<MatchingGameProps> = ({ onReward }) => {
  const [level, setLevel] = useState<Level>('easy');
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [matchesFound, setMatchesFound] = useState(0);

  const getPairCount = (lvl: Level) => {
    if (lvl === 'easy') return 2; // 4 cards total (2x2)
    if (lvl === 'medium') return 3; // 6 cards total (2x3)
    return 6; // 12 cards total (3x4)
  };

  const initGame = (lvl: Level) => {
    const pairCount = getPairCount(lvl);
    const selectedPool = CARD_POOL.slice(0, pairCount);
    const deck: MemoryCard[] = [];

    let idCounter = 0;
    selectedPool.forEach((item) => {
      // Add two of each
      deck.push({
        id: idCounter++,
        pairId: item.pairId,
        name: item.name,
        iconName: item.name,
        emoji: item.emoji,
        color: item.color,
        isFlipped: false,
        isMatched: false,
      });
      deck.push({
        id: idCounter++,
        pairId: item.pairId,
        name: item.name,
        iconName: item.name,
        emoji: item.emoji,
        color: item.color,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedIndices([]);
    setIsLocked(false);
    setIsWon(false);
    setMatchesFound(0);
  };

  useEffect(() => {
    initGame(level);
  }, [level]);

  const handleCardClick = (idx: number) => {
    if (isLocked) return;
    const card = cards[idx];
    if (card.isFlipped || card.isMatched) return;

    playSound.cardFlip();

    const newFlipped = [...flippedIndices, idx];
    const updatedCards = [...cards];
    updatedCards[idx].isFlipped = true;
    setCards(updatedCards);
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      const [firstIdx, secondIdx] = newFlipped;
      const card1 = updatedCards[firstIdx];
      const card2 = updatedCards[secondIdx];

      if (card1.pairId === card2.pairId) {
        // Match found!
        setTimeout(() => {
          playSound.sparkle();
          const matchedCards = updatedCards.map((c, i) =>
            i === firstIdx || i === secondIdx ? { ...c, isMatched: true } : c
          );
          setCards(matchedCards);
          setFlippedIndices([]);
          setIsLocked(false);
          const newMatches = matchesFound + 1;
          setMatchesFound(newMatches);

          const totalPairs = getPairCount(level);
          if (newMatches >= totalPairs) {
            // Victory!
            setIsWon(true);
            playSound.fanfare();
            onReward();
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          playSound.boing();
          const resetCards = updatedCards.map((c, i) =>
            i === firstIdx || i === secondIdx ? { ...c, isFlipped: false } : c
          );
          setCards(resetCards);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-3 flex flex-col items-center gap-4 select-none">
      {/* Level Selector (Chunky toddler-friendly tabs) */}
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs p-1.5 rounded-2xl border-2 border-pink-200 shadow-xs font-['Fredoka']">
        <button
          id="btn-level-easy"
          onClick={() => {
            playSound.tap();
            setLevel('easy');
          }}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
            level === 'easy'
              ? 'bg-pink-500 text-white shadow-sm'
              : 'text-pink-700 hover:bg-pink-50'
          }`}
        >
          <span>🍼 Tiny (2x2)</span>
        </button>
        <button
          id="btn-level-medium"
          onClick={() => {
            playSound.tap();
            setLevel('medium');
          }}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
            level === 'medium'
              ? 'bg-pink-500 text-white shadow-sm'
              : 'text-pink-700 hover:bg-pink-50'
          }`}
        >
          <span>🌸 Fairytale (2x3)</span>
        </button>
        <button
          id="btn-level-hard"
          onClick={() => {
            playSound.tap();
            setLevel('hard');
          }}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
            level === 'hard'
              ? 'bg-pink-500 text-white shadow-sm'
              : 'text-pink-700 hover:bg-pink-50'
          }`}
        >
          <span>👑 Palace (3x4)</span>
        </button>
      </div>

      {/* Game Board Container */}
      <div className="relative w-full max-w-lg min-h-[320px] bg-pink-100/70 p-4 sm:p-6 rounded-3xl border-4 border-pink-300 shadow-lg flex flex-col items-center justify-center">
        {/* Memory Grid */}
        <div
          className={`grid gap-3 sm:gap-4 w-full max-w-md ${
            level === 'easy'
              ? 'grid-cols-2 max-w-[280px]'
              : level === 'medium'
              ? 'grid-cols-3'
              : 'grid-cols-3 sm:grid-cols-4'
          }`}
        >
          {cards.map((card, idx) => {
            const isRevealed = card.isFlipped || card.isMatched;

            return (
              <button
                key={card.id}
                id={`card-${idx}`}
                onClick={() => handleCardClick(idx)}
                disabled={card.isMatched || isLocked}
                className={`aspect-square rounded-3xl border-4 flex flex-col items-center justify-center transition-all duration-300 transform active:scale-90 cursor-pointer shadow-md relative ${
                  isRevealed
                    ? `bg-linear-to-br ${card.color} border-white rotate-y-180 scale-100`
                    : 'bg-linear-to-br from-pink-400 to-purple-500 border-pink-200 hover:scale-102'
                } ${card.isMatched ? 'ring-4 ring-yellow-400 opacity-90' : ''}`}
                style={{
                  perspective: '1000px',
                }}
              >
                {isRevealed ? (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-4xl sm:text-5xl filter drop-shadow animate-in zoom-in duration-200">
                      {card.emoji}
                    </span>
                    {card.isMatched && (
                      <span className="absolute top-1 right-2 text-yellow-300 text-xs sm:text-sm animate-ping">
                        ✨
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl sm:text-4xl opacity-90 select-none">👑</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Victory Celebration Overlay */}
        {isWon && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-xs rounded-3xl flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-300 z-20 font-['Fredoka']">
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-white shadow-lg mb-3 animate-bounce">
              <Trophy className="w-9 h-9" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-pink-700">
              Splendid Job, Princess! 🎉
            </h3>
            <p className="text-sm font-bold text-pink-500 mt-1 mb-5">
              You found all the magical matches!
            </p>
            <button
              id="btn-play-again"
              onClick={() => {
                playSound.tap();
                initGame(level);
              }}
              className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 to-purple-600 px-6 py-3 text-lg font-black text-white shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Play Again! ✨</span>
            </button>
          </div>
        )}
      </div>

      {/* Restart Button */}
      {!isWon && (
        <button
          id="btn-restart-game"
          onClick={() => {
            playSound.tap();
            initGame(level);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border-2 border-pink-200 text-pink-700 font-extrabold text-sm hover:bg-pink-50 active:scale-95 transition cursor-pointer font-['Fredoka'] shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Shuffle & Start Over</span>
        </button>
      )}
    </div>
  );
};
