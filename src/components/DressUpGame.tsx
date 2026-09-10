import React, { useCallback, useRef, useState } from 'react';
import { Camera, RotateCw } from 'lucide-react';
import { playSound } from '../utils/audio';

interface DressUpGameProps {
  onReward: () => void;
}

type ItemKind = 'dress' | 'tiara' | 'shoes';

interface DressUpItem {
  id: string;
  name: string;
  src: string;
}

const TIARAS: DressUpItem[] = [{ id: 'gold_heart', name: 'Golden Heart Tiara', src: '/art/tiara.png' }];

const GOWNS: DressUpItem[] = [
  { id: 'purple', name: 'Purple Ballgown', src: '/art/gown-purple.png' },
  { id: 'pink', name: 'Pink Ballgown', src: '/art/gown-pink.png' },
];

const SHOES: DressUpItem[] = [
  { id: 'ballet_pink', name: 'Pink Ballet Flats', src: '/art/shoes-ballet-pink.png' },
  { id: 'glass_blue', name: 'Glass Slippers', src: '/art/shoes-heels-blue.png' },
];

interface FlightState {
  kind: ItemKind;
  item: DressUpItem;
  pos: { x: number; y: number };
  target: { x: number; y: number };
  phase: 'flying' | 'landed';
}

export const DressUpGame: React.FC<DressUpGameProps> = ({ onReward }) => {
  const [dress, setDress] = useState<DressUpItem | null>(null);
  const [tiara, setTiara] = useState<DressUpItem | null>(null);
  const [shoes, setShoes] = useState<DressUpItem | null>(null);
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
    (kind: ItemKind, item: DressUpItem) => {
      if (kind === 'dress') setDress(item);
      else if (kind === 'tiara') setTiara(item);
      else setShoes(item);

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

  const startDrag = (kind: ItemKind, item: DressUpItem) => (e: React.PointerEvent) => {
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

  const trayRow = (label: string, kind: ItemKind, items: DressUpItem[], equippedId: string | undefined) => (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs sm:text-sm font-extrabold text-[#4A3B5C]/80 px-1">{label}</span>
      <div className="flex items-center gap-3 overflow-x-auto pb-1 px-1 scrollbar-none">
        {items.map((item) => (
          <button
            key={item.id}
            id={`dressup-${kind}-${item.id}`}
            onPointerDown={startDrag(kind, item)}
            onPointerMove={onDragMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={`shrink-0 w-20 h-20 sm:w-[88px] sm:h-[88px] rounded-2xl flex items-center justify-center shadow-md border-2 bg-white p-1.5 touch-none cursor-grab active:cursor-grabbing transition active:scale-90 ${
              equippedId === item.id ? 'border-amber-400 ring-4 ring-amber-200 scale-105' : 'border-[#F0E6FF]'
            }`}
            title={item.name}
          >
            <img src={item.src} alt={item.name} className="w-full h-full object-contain pointer-events-none select-none" draggable={false} />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col gap-4 select-none font-['Fredoka']">
      {/* Doll stage */}
      <div className="relative bg-gradient-to-b from-[#F3E8FF] via-[#FFE3EF] to-[#FFF1C2] rounded-[32px] py-6 flex items-center justify-center overflow-hidden">
        <div
          className={`relative w-[210px] h-[350px] transition-transform duration-[1200ms] ${
            isTwirling ? '[transform:rotateY(360deg)_scale(1.06)]' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Base character */}
          <img
            src="/art/doll-base-body.png"
            alt="Princess"
            className="absolute inset-x-0 top-0 mx-auto h-full object-contain select-none pointer-events-none"
            draggable={false}
          />

          {/* Tiara drop zone */}
          <div
            ref={tiaraZoneRef}
            id="dressup-zone-tiara"
            className={`absolute left-1/2 -translate-x-1/2 w-[46%] transition-transform ${
              pulseZone === 'tiara' ? 'scale-125' : ''
            }`}
            style={{ top: '-4%', aspectRatio: '200 / 138' }}
          >
            {tiara ? (
              <img src={tiara.src} alt={tiara.name} className="w-full h-full object-contain drop-shadow-md" draggable={false} />
            ) : (
              <img src="/art/placeholder-head.png" alt="" className="w-full h-full object-contain opacity-60 animate-pulse" draggable={false} />
            )}
          </div>

          {/* Dress / body drop zone */}
          <div
            ref={dressZoneRef}
            id="dressup-zone-dress"
            className={`absolute left-1/2 -translate-x-1/2 w-[78%] transition-transform ${
              pulseZone === 'dress' ? 'scale-105' : ''
            }`}
            style={{ top: '26%', aspectRatio: '215 / 238' }}
          >
            {dress ? (
              <img src={dress.src} alt={dress.name} className="w-full h-full object-contain drop-shadow-md" draggable={false} />
            ) : (
              <img src="/art/placeholder-body.png" alt="" className="w-full h-full object-contain opacity-50 animate-pulse" draggable={false} />
            )}
          </div>

          {/* Shoes drop zone */}
          <div
            ref={shoesZoneRef}
            id="dressup-zone-shoes"
            className={`absolute left-1/2 -translate-x-1/2 w-[42%] transition-transform ${
              pulseZone === 'shoes' ? 'scale-125' : ''
            }`}
            style={{ top: '89%', aspectRatio: '165 / 130' }}
          >
            {shoes ? (
              <img src={shoes.src} alt={shoes.name} className="w-full h-full object-contain drop-shadow-md" draggable={false} />
            ) : (
              <img src="/art/placeholder-shoes.png" alt="" className="w-full h-full object-contain opacity-60 animate-pulse" draggable={false} />
            )}
          </div>
        </div>
      </div>

      {/* Flying ghost item while dragging / snapping */}
      {flight && (
        <div
          onTransitionEnd={onFlightTransitionEnd}
          className={`fixed z-50 pointer-events-none select-none w-16 h-16 ${
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
          <img src={flight.item.src} alt="" className="w-full h-full object-contain drop-shadow-lg" draggable={false} />
        </div>
      )}

      <p className="text-center text-[#4A3B5C]/70 font-bold text-xs sm:text-sm -mt-1">
        Drag a tiara, gown or shoes onto the princess — it'll snap right into place!
      </p>

      {/* Item trays */}
      <div className="flex flex-col gap-3">
        {trayRow('Tiara', 'tiara', TIARAS, tiara?.id)}
        {trayRow('Ballgowns', 'dress', GOWNS, dress?.id)}
        {trayRow('Shoes', 'shoes', SHOES, shoes?.id)}
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
      </div>
    </div>
  );
};
