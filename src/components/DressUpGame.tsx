import React, { useCallback, useRef, useState } from 'react';
import { Camera, RotateCw } from 'lucide-react';
import { playSound } from '../utils/audio';
import {
  CHARACTERS,
  DRESSES,
  TIARAS,
  SHOES,
  PrincessAvatar,
  DressItem,
  TiaraItem,
  ShoeItem,
} from '../data/dressUpData';
import { TiaraArt, GownArt, ShoeArt, TwinkleStar } from './GameArt';

interface DressUpGameProps {
  onReward: () => void;
}

type ItemKind = 'dress' | 'tiara' | 'shoes';
type AnyItem = DressItem | TiaraItem | ShoeItem;

interface FlightState {
  kind: ItemKind;
  item: AnyItem;
  pos: { x: number; y: number };
  target: { x: number; y: number };
  phase: 'flying' | 'landed';
}

const itemArt = (kind: ItemKind, item: AnyItem, className: string): React.ReactNode => {
  if (kind === 'tiara') {
    const t = item as TiaraItem;
    return <TiaraArt className={className} color={t.color} gem={t.gem} />;
  }
  if (kind === 'dress') {
    const d = item as DressItem;
    return <GownArt className={className} color1={d.color1} color2={d.color2} accent={d.accent} />;
  }
  const s = item as ShoeItem;
  return <ShoeArt className={className} color={s.color} accent={s.accent} />;
};

export const DressUpGame: React.FC<DressUpGameProps> = ({ onReward }) => {
  const [character, setCharacter] = useState<PrincessAvatar>(CHARACTERS[0]);
  const [dress, setDress] = useState<DressItem | null>(null);
  const [tiara, setTiara] = useState<TiaraItem | null>(null);
  const [shoes, setShoes] = useState<ShoeItem | null>(null);
  const [flight, setFlight] = useState<FlightState | null>(null);
  const [pulseZone, setPulseZone] = useState<ItemKind | null>(null);
  const [isTwirling, setIsTwirling] = useState(false);

  const dressZoneRef = useRef<HTMLDivElement | null>(null);
  const tiaraZoneRef = useRef<HTMLDivElement | null>(null);
  const shoesZoneRef = useRef<HTMLDivElement | null>(null);
  const dragActiveRef = useRef(false);
  const firstEquipRef = useRef<Record<ItemKind, boolean>>({ dress: false, tiara: false, shoes: false });
  const fullOutfitCelebratedRef = useRef(false);

  const zoneRef = (kind: ItemKind) =>
    kind === 'dress' ? dressZoneRef : kind === 'tiara' ? tiaraZoneRef : shoesZoneRef;

  const commitEquip = useCallback(
    (kind: ItemKind, item: AnyItem) => {
      if (kind === 'dress') setDress(item as DressItem);
      else if (kind === 'tiara') setTiara(item as TiaraItem);
      else setShoes(item as ShoeItem);

      playSound.gemSnap();
      setPulseZone(kind);
      setTimeout(() => setPulseZone(null), 450);

      if (!firstEquipRef.current[kind]) {
        firstEquipRef.current[kind] = true;
        onReward();
      }

      const willComplete =
        (kind === 'dress' || dress) && (kind === 'tiara' || tiara) && (kind === 'shoes' || shoes);
      if (willComplete && !fullOutfitCelebratedRef.current) {
        fullOutfitCelebratedRef.current = true;
        setTimeout(() => {
          playSound.fireworkBurst();
          onReward();
        }, 300);
      }
    },
    [dress, tiara, shoes, onReward]
  );

  const startDrag = (kind: ItemKind, item: AnyItem) => (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    dragActiveRef.current = true;
    playSound.tap();
    setFlight({
      kind,
      item,
      pos: { x: e.clientX, y: e.clientY },
      target: { x: e.clientX, y: e.clientY },
      phase: 'flying',
    });
  };

  const onDragMove = (e: React.PointerEvent) => {
    if (!dragActiveRef.current) return;
    setFlight((f) => (f ? { ...f, pos: { x: e.clientX, y: e.clientY } } : f));
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!dragActiveRef.current) return;
    dragActiveRef.current = false;
    setFlight((f) => {
      if (!f) return f;
      const rect = zoneRef(f.kind).current?.getBoundingClientRect();
      const target = rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : f.pos;
      return { ...f, target, phase: 'flying' };
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlight((f) => (f ? { ...f, pos: f.target, phase: 'landed' } : f));
      });
    });
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  const onFlightTransitionEnd = () => {
    if (!flight || flight.phase !== 'landed') return;
    commitEquip(flight.kind, flight.item);
    setFlight(null);
  };

  const handleTwirl = () => {
    if (isTwirling) return;
    playSound.twirl();
    playSound.sparkle();
    setIsTwirling(true);
    onReward();
    setTimeout(() => setIsTwirling(false), 1200);
  };

  const handleTakePhoto = () => {
    playSound.chime();
    playSound.sparkle();
    onReward();
  };

  const trayRow = (
    label: string,
    kind: ItemKind,
    items: AnyItem[],
    color: (item: AnyItem) => string,
    equippedId: string | undefined
  ) => (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs sm:text-sm font-extrabold text-[#4A3B5C]/80 px-1">{label}</span>
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 px-1 scrollbar-none">
        {items.map((item) => (
          <button
            key={item.id}
            id={`dressup-${kind}-${item.id}`}
            onPointerDown={startDrag(kind, item)}
            onPointerMove={onDragMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={`shrink-0 w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full flex items-center justify-center shadow-md border-2 bg-white touch-none cursor-grab active:cursor-grabbing transition active:scale-90 ${
              equippedId === item.id ? 'border-amber-400 ring-4 ring-amber-200 scale-105' : 'border-[#F0E6FF]'
            }`}
            style={{ boxShadow: `inset 0 0 0 100px ${color(item)}22` }}
            title={item.name}
          >
            {itemArt(kind, item, 'w-10 h-10 sm:w-11 sm:h-11')}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col gap-4 select-none font-['Fredoka']">
      {/* Character picker */}
      <div className="flex items-center justify-center gap-2.5">
        {CHARACTERS.map((c) => (
          <button
            key={c.id}
            id={`btn-char-${c.id}`}
            onClick={() => {
              playSound.tap();
              setCharacter(c);
            }}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 transition active:scale-90 cursor-pointer ${
              character.id === c.id ? 'border-pink-400 ring-4 ring-pink-200 scale-110' : 'border-white/80'
            }`}
            style={{ background: c.skin }}
            title={c.name}
            aria-label={c.name}
          />
        ))}
      </div>

      {/* Doll stage */}
      <div className="relative bg-gradient-to-b from-[#F3E8FF] via-[#FFE3EF] to-[#FFF1C2] rounded-[32px] py-6 flex items-center justify-center overflow-hidden">
        <div
          className={`relative w-[220px] h-[380px] transition-transform duration-[1200ms] ${
            isTwirling ? '[transform:rotateY(360deg)_scale(1.06)]' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Tiara drop zone */}
          <div
            ref={tiaraZoneRef}
            id="dressup-zone-tiara"
            className={`absolute left-1/2 -translate-x-1/2 top-0 w-20 h-20 rounded-full flex items-center justify-center transition-transform ${
              pulseZone === 'tiara' ? 'scale-125' : ''
            } ${!tiara ? 'border-4 border-dashed border-amber-400/70 animate-pulse' : ''}`}
          >
            {tiara ? (
              <TiaraArt className="w-14 h-14 drop-shadow-md" color={tiara.color} gem={tiara.gem} />
            ) : (
              <TiaraArt className="w-8 h-8 opacity-30" color="#E5E7EB" gem="#D1D5DB" />
            )}
          </div>

          {/* Head */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-14 w-28 h-28 rounded-full border-4 border-white shadow-inner"
            style={{ background: character.skin }}
          >
            <div className="absolute w-3 h-4 rounded-full bg-[#1F2937]" style={{ left: '30%', top: '42%' }} />
            <div className="absolute w-3 h-4 rounded-full bg-[#1F2937]" style={{ left: '61%', top: '42%' }} />
            <div
              className="absolute w-6 h-3 rounded-b-full border-b-[3px]"
              style={{ left: '35%', top: '58%', borderColor: character.mouth }}
            />
            <div
              className="absolute w-4 h-4 rounded-full opacity-50"
              style={{ left: '10%', top: '55%', background: character.blush }}
            />
            <div
              className="absolute w-4 h-4 rounded-full opacity-50"
              style={{ left: '76%', top: '55%', background: character.blush }}
            />
          </div>

          {/* Dress / body drop zone — the colored block itself is the gown,
              so we don't duplicate it with a floating icon on top. */}
          <div
            ref={dressZoneRef}
            id="dressup-zone-dress"
            className={`absolute left-1/2 -translate-x-1/2 top-[148px] w-[150px] h-[180px] rounded-[26px] flex flex-col items-center justify-start pt-4 gap-1 transition-transform ${
              pulseZone === 'dress' ? 'scale-105' : ''
            } ${!dress ? 'bg-white/80 border-4 border-dashed border-pink-300 animate-pulse' : 'border-4'}`}
            style={
              dress
                ? {
                    background: `linear-gradient(180deg, ${dress.color1}, ${dress.color2})`,
                    borderColor: dress.accent,
                  }
                : undefined
            }
          >
            {dress ? (
              <div className="w-16 h-2.5 rounded-full" style={{ background: dress.accent }} />
            ) : (
              <span className="text-[11px] font-extrabold text-pink-400/80 mt-8 text-center px-4">
                Drag a gown here!
              </span>
            )}
          </div>

          {/* Shoes drop zone */}
          <div
            ref={shoesZoneRef}
            id="dressup-zone-shoes"
            className={`absolute left-1/2 -translate-x-1/2 top-[336px] w-28 h-16 rounded-2xl flex items-center justify-center gap-1 transition-transform ${
              pulseZone === 'shoes' ? 'scale-125' : ''
            } ${!shoes ? 'border-4 border-dashed border-sky-300 animate-pulse' : ''}`}
          >
            {shoes ? (
              <>
                <ShoeArt className="w-9 h-9 drop-shadow-md -scale-x-100" color={shoes.color} accent={shoes.accent} />
                <ShoeArt className="w-9 h-9 drop-shadow-md" color={shoes.color} accent={shoes.accent} />
              </>
            ) : (
              <ShoeArt className="w-8 h-8 opacity-30" color="#E5E7EB" accent="#D1D5DB" />
            )}
          </div>
        </div>
      </div>

      {/* Flying ghost item while dragging / snapping */}
      {flight && (
        <div
          onTransitionEnd={onFlightTransitionEnd}
          className={`fixed z-50 pointer-events-none select-none ${
            flight.phase === 'landed' ? 'transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]' : ''
          }`}
          style={{
            left: 0,
            top: 0,
            transform: `translate(${flight.pos.x}px, ${flight.pos.y}px) translate(-50%, -50%) scale(${
              flight.phase === 'landed' ? 0.9 : 1.2
            })`,
          }}
        >
          {itemArt(flight.kind, flight.item, 'w-11 h-11 drop-shadow-lg')}
        </div>
      )}

      <p className="flex items-center justify-center gap-1.5 text-center text-[#4A3B5C]/70 font-bold text-xs sm:text-sm -mt-1">
        <TwinkleStar className="w-3.5 h-3.5" />
        <span>Drag a tiara, gown or shoes onto the princess — it'll snap right into place!</span>
        <TwinkleStar className="w-3.5 h-3.5" />
      </p>

      {/* Item trays */}
      <div className="flex flex-col gap-3">
        {trayRow('Tiaras', 'tiara', TIARAS, (i) => (i as TiaraItem).color, tiara?.id)}
        {trayRow('Ballgowns', 'dress', DRESSES, (i) => (i as DressItem).color1, dress?.id)}
        {trayRow('Shoes', 'shoes', SHOES, (i) => (i as ShoeItem).color, shoes?.id)}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-3 pt-1">
        <button
          id="btn-twirl"
          onClick={handleTwirl}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white font-black text-sm shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          <RotateCw className="w-4 h-4" />
          <span>Twirl!</span>
        </button>
        <button
          id="btn-photo"
          onClick={handleTakePhoto}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white border-2 border-amber-300 text-amber-800 font-black text-sm shadow-xs hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>Photo!</span>
        </button>
        <div className="flex items-center gap-1 text-amber-500">
          <TwinkleStar className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
