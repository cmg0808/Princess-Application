import React, { useState } from 'react';
import { Sparkles, Camera, RotateCw, Heart } from 'lucide-react';
import { playSound } from '../utils/audio';
import {
  CHARACTERS,
  DRESSES,
  TIARAS,
  HAIRSTYLES,
  JEWELRY,
  SHOES,
  WINGS,
  WANDS,
  PETS,
  BACKGROUNDS,
  PrincessAvatar,
  DressItem,
  TiaraItem,
  HairItem,
  JewelryItem,
  ShoeItem,
  WingItem,
  WandItem,
  PetItem,
  BgItem,
} from '../data/dressUpData';

interface DressUpGameProps {
  onReward: () => void;
}

type DressUpCategory = 'dress' | 'tiara' | 'hair' | 'shoes' | 'jewelry' | 'wings' | 'wand' | 'pet' | 'bg';

export const DressUpGame: React.FC<DressUpGameProps> = ({ onReward }) => {
  const [selectedChar, setSelectedChar] = useState<PrincessAvatar>(CHARACTERS[0]);
  const [selectedDress, setSelectedDress] = useState<DressItem>(DRESSES[0]);
  const [selectedTiara, setSelectedTiara] = useState<TiaraItem>(TIARAS[0]);
  const [selectedHair, setSelectedHair] = useState<HairItem>(HAIRSTYLES[0]);
  const [selectedJewelry, setSelectedJewelry] = useState<JewelryItem>(JEWELRY[1]);
  const [selectedShoe, setSelectedShoe] = useState<ShoeItem>(SHOES[0]);
  const [selectedWing, setSelectedWing] = useState<WingItem>(WINGS[0]);
  const [selectedWand, setSelectedWand] = useState<WandItem>(WANDS[0]);
  const [selectedPet, setSelectedPet] = useState<PetItem>(PETS[0]);
  const [selectedBg, setSelectedBg] = useState<BgItem>(BACKGROUNDS[0]);

  const [activeTab, setActiveTab] = useState<DressUpCategory>('dress');
  const [isTwirling, setIsTwirling] = useState(false);
  const [twirlCount, setTwirlCount] = useState(0);

  const handleTwirl = () => {
    if (isTwirling) return;
    playSound.twirl();
    playSound.sparkle();
    setIsTwirling(true);

    const newCount = twirlCount + 1;
    setTwirlCount(newCount);
    if (newCount % 3 === 0) {
      onReward();
    }

    setTimeout(() => {
      setIsTwirling(false);
    }, 1200);
  };

  const handleTakePhoto = () => {
    playSound.chime();
    playSound.sparkle();
    onReward();
  };

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-2 flex flex-col gap-3 select-none font-['Fredoka']">
      {/* Character Selector Row */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-1">
        {CHARACTERS.map((char) => (
          <button
            key={char.id}
            id={`btn-char-${char.id}`}
            onClick={() => {
              playSound.tap();
              setSelectedChar(char);
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedChar.id === char.id
                ? 'bg-pink-500 border-pink-600 text-white shadow-md scale-105 ring-2 ring-pink-300'
                : 'bg-white/95 border-pink-200 text-pink-700 hover:bg-pink-50'
            }`}
          >
            <span className="text-xl">👸</span>
            <span className="font-extrabold text-xs sm:text-sm">{char.name}</span>
          </button>
        ))}
      </div>

      {/* Main Workspace: Left Princess Stage + Right Wardrobe Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* The Stage */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div
            id="princess-stage"
            className={`relative w-full max-w-[380px] aspect-[3/4] rounded-3xl p-4 border-4 border-pink-300 shadow-xl overflow-hidden flex flex-col items-center justify-end bg-linear-to-b ${selectedBg.grad}`}
          >
            {/* Background Sparkles / Ambiance */}
            <div className="absolute top-4 left-4 text-2xl animate-pulse">✨</div>
            <div className="absolute top-8 right-6 text-xl animate-bounce">⭐</div>
            <div className="absolute top-20 left-8 text-lg opacity-60">🌸</div>

            {/* Stage Pedestal */}
            <div className="absolute bottom-2 w-52 h-8 rounded-full bg-pink-300/60 blur-xs border-2 border-pink-400/40" />

            {/* Princess Character SVG Vector */}
            <div
              className={`relative z-10 w-68 h-88 flex items-center justify-center transition-transform duration-700 ${
                isTwirling ? 'rotate-360 scale-105' : ''
              }`}
            >
              <svg viewBox="0 0 240 320" className="w-full h-full drop-shadow-lg">
                <defs>
                  <linearGradient id="gownGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={selectedDress.color1} />
                    <stop offset="100%" stopColor={selectedDress.color2} />
                  </linearGradient>
                </defs>

                {/* --- WINGS / CAPE BEHIND PRINCESS --- */}
                {selectedWing.type === 'fairy' && (
                  <g opacity="0.85">
                    {/* Left fairy wing */}
                    <path
                      d="M110,130 Q30,50 40,110 Q45,150 110,150 Z"
                      fill="#C7D2FE"
                      stroke="#818CF8"
                      strokeWidth="2"
                    />
                    <path
                      d="M105,145 Q40,150 60,195 Q90,195 110,165 Z"
                      fill="#E0E7FF"
                      stroke="#818CF8"
                      strokeWidth="1.5"
                    />
                    {/* Right fairy wing */}
                    <path
                      d="M130,130 Q210,50 200,110 Q195,150 130,150 Z"
                      fill="#C7D2FE"
                      stroke="#818CF8"
                      strokeWidth="2"
                    />
                    <path
                      d="M135,145 Q200,150 180,195 Q150,195 130,165 Z"
                      fill="#E0E7FF"
                      stroke="#818CF8"
                      strokeWidth="1.5"
                    />
                  </g>
                )}

                {selectedWing.type === 'swan' && (
                  <g opacity="0.9">
                    <path
                      d="M110,130 Q20,70 50,140 Q75,170 110,155 Z"
                      fill="#FFFFFF"
                      stroke="#CBD5E1"
                      strokeWidth="2"
                    />
                    <path
                      d="M130,130 Q220,70 190,140 Q165,170 130,155 Z"
                      fill="#FFFFFF"
                      stroke="#CBD5E1"
                      strokeWidth="2"
                    />
                  </g>
                )}

                {selectedWing.type === 'angel' && (
                  <g opacity="0.9">
                    <path
                      d="M110,130 Q15,40 55,130 Q80,165 110,155 Z"
                      fill="#FEF08A"
                      stroke="#FACC15"
                      strokeWidth="2"
                    />
                    <path
                      d="M130,130 Q225,40 185,130 Q160,165 130,155 Z"
                      fill="#FEF08A"
                      stroke="#FACC15"
                      strokeWidth="2"
                    />
                  </g>
                )}

                {selectedWing.type === 'cape' && (
                  <path
                    d="M85,135 Q50,220 65,290 Q120,305 175,290 Q190,220 155,135 Z"
                    fill={selectedWing.color}
                    stroke="#9F1239"
                    strokeWidth="2"
                  />
                )}

                {/* --- BACK HAIR --- */}
                <ellipse cx="120" cy="95" rx="42" ry="46" fill={selectedHair.color} />
                {selectedHair.style === 'waves' && (
                  <path
                    d="M75,95 Q60,180 85,225 Q95,180 90,120 Z M165,95 Q180,180 155,225 Q145,180 150,120 Z"
                    fill={selectedHair.color}
                  />
                )}
                {selectedHair.style === 'braid' && (
                  <path
                    d="M78,105 Q68,170 75,230 Q85,180 90,120 Z M162,105 Q172,170 165,230 Q155,180 150,120 Z"
                    fill={selectedHair.color}
                  />
                )}
                {selectedHair.style === 'twin_braids' && (
                  <g fill={selectedHair.color}>
                    <path d="M78,105 Q65,180 72,235 Q80,240 84,210 Q80,160 88,115 Z" />
                    <path d="M162,105 Q175,180 168,235 Q160,240 156,210 Q160,160 152,115 Z" />
                  </g>
                )}
                {selectedHair.style === 'ponytails' && (
                  <g fill={selectedHair.color}>
                    <circle cx="68" cy="90" r="18" />
                    <circle cx="172" cy="90" r="18" />
                  </g>
                )}

                {/* --- BODY / NECK --- */}
                <rect x="112" y="115" width="16" height="24" rx="4" fill={selectedChar.skin} />
                <ellipse cx="120" cy="140" rx="22" ry="14" fill={selectedChar.skin} />

                {/* --- SHOES --- */}
                <ellipse
                  cx="108"
                  cy="296"
                  rx="11"
                  ry="6"
                  fill={selectedShoe.color}
                  stroke={selectedShoe.accent}
                  strokeWidth="2"
                />
                <ellipse
                  cx="132"
                  cy="296"
                  rx="11"
                  ry="6"
                  fill={selectedShoe.color}
                  stroke={selectedShoe.accent}
                  strokeWidth="2"
                />

                {/* --- SKIRT / BALLGOWN --- */}
                <path
                  d="M95,170 Q45,230 55,290 Q120,310 185,290 Q195,230 145,170 Z"
                  fill="url(#gownGrad)"
                  stroke={selectedDress.color2}
                  strokeWidth="3"
                />
                {/* Skirt sparkle frills */}
                <path
                  d="M95,170 Q70,230 90,285 Q115,220 120,170 Z"
                  fill={selectedDress.accent}
                  opacity="0.6"
                />
                <path
                  d="M145,170 Q170,230 150,285 Q125,220 120,170 Z"
                  fill={selectedDress.accent}
                  opacity="0.6"
                />
                {/* Skirt Bow / Gem */}
                <circle cx="120" cy="172" r="7" fill={selectedDress.gem} stroke="#FFFFFF" strokeWidth="2" />

                {/* --- BODICE --- */}
                <path
                  d="M100,135 L95,172 L145,172 L140,135 Z"
                  fill="url(#gownGrad)"
                  stroke={selectedDress.color2}
                  strokeWidth="2"
                />
                {/* Bodice heart neckline */}
                <path
                  d="M100,135 Q110,145 120,138 Q130,145 140,135 Z"
                  fill={selectedChar.skin}
                />

                {/* --- JEWELRY / NECKLACE --- */}
                {selectedJewelry.id === 'pearl' && (
                  <path
                    d="M110,132 Q120,142 130,132"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeDasharray="2,3"
                    fill="none"
                  />
                )}
                {selectedJewelry.id === 'ruby_heart' && (
                  <g>
                    <path d="M110,130 Q120,138 130,130" stroke="#FACC15" strokeWidth="1.5" fill="none" />
                    <circle cx="120" cy="138" r="3.5" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" />
                  </g>
                )}
                {selectedJewelry.id === 'star_pendant' && (
                  <g>
                    <path d="M110,130 Q120,138 130,130" stroke="#FACC15" strokeWidth="1.5" fill="none" />
                    <circle cx="120" cy="138" r="3" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
                  </g>
                )}
                {selectedJewelry.id === 'emerald_gem' && (
                  <g>
                    <path d="M110,130 Q120,138 130,130" stroke="#FACC15" strokeWidth="1.5" fill="none" />
                    <circle cx="120" cy="138" r="3.5" fill="#10B981" stroke="#047857" strokeWidth="1" />
                  </g>
                )}

                {/* --- PUFF SLEEVES --- */}
                <circle cx="92" cy="142" r="12" fill={selectedDress.accent} stroke={selectedDress.color2} strokeWidth="2" />
                <circle cx="148" cy="142" r="12" fill={selectedDress.accent} stroke={selectedDress.color2} strokeWidth="2" />

                {/* --- ARMS --- */}
                <path d="M88,148 Q78,185 85,205" stroke={selectedChar.skin} strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M152,148 Q165,175 168,195" stroke={selectedChar.skin} strokeWidth="8" strokeLinecap="round" fill="none" />

                {/* --- MAGIC WAND / PROP IN HAND --- */}
                <line x1="168" y1="195" x2="185" y2="135" stroke="#D1D5DB" strokeWidth="4" strokeLinecap="round" />
                <text x="186" y="130" fontSize="24" textAnchor="middle" dominantBaseline="central">
                  {selectedWand.emoji}
                </text>

                {/* --- FACE --- */}
                <ellipse cx="120" cy="85" rx="26" ry="28" fill={selectedChar.skin} />
                {/* Cute Cheeks */}
                <ellipse cx="106" cy="92" rx="5" ry="3" fill={selectedChar.blush} opacity="0.6" />
                <ellipse cx="134" cy="92" rx="5" ry="3" fill={selectedChar.blush} opacity="0.6" />
                {/* Big Toddler Eyes */}
                <ellipse cx="110" cy="82" rx="4" ry="5" fill={selectedChar.eye} />
                <circle cx="111" cy="80" r="1.5" fill="#FFFFFF" />
                <ellipse cx="130" cy="82" rx="4" ry="5" fill={selectedChar.eye} />
                <circle cx="131" cy="80" r="1.5" fill="#FFFFFF" />
                {/* Eyelashes */}
                <path d="M106,77 Q110,74 114,77" stroke="#1F2937" strokeWidth="1.5" fill="none" />
                <path d="M126,77 Q130,74 134,77" stroke="#1F2937" strokeWidth="1.5" fill="none" />
                {/* Cute Smile */}
                <path d="M115,96 Q120,102 125,96" stroke={selectedChar.mouth} strokeWidth="2" strokeLinecap="round" fill="none" />

                {/* --- FRONT HAIR / BANGS --- */}
                <path
                  d="M95,80 Q105,62 120,62 Q135,62 145,80 Q130,70 120,72 Q110,70 95,80 Z"
                  fill={selectedHair.color}
                />
                {selectedHair.style === 'updo' && (
                  <circle cx="120" cy="50" r="16" fill={selectedHair.color} />
                )}

                {/* --- TIARA / CROWN --- */}
                <path
                  d="M104,65 L112,50 L120,58 L128,50 L136,65 Z"
                  fill={selectedTiara.color}
                  stroke="#CA8A04"
                  strokeWidth="1.5"
                />
                <circle cx="120" cy="54" r="3" fill={selectedTiara.gem} />
                <circle cx="112" cy="52" r="2" fill="#FFFFFF" />
                <circle cx="128" cy="52" r="2" fill="#FFFFFF" />
              </svg>

              {/* Royal Pet Companion sitting next to Princess */}
              {selectedPet.id !== 'none' && (
                <div
                  className="absolute bottom-2 left-2 text-4xl filter drop-shadow-md animate-bounce"
                  style={{ animationDuration: '3s' }}
                >
                  {selectedPet.emoji}
                </div>
              )}
            </div>

            {/* Sparkle Twirl & Photo Buttons on the stage bottom */}
            <div className="relative z-20 flex items-center justify-center gap-3 w-full mt-2">
              <button
                id="btn-dressup-twirl"
                onClick={handleTwirl}
                disabled={isTwirling}
                className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 to-rose-500 px-4 py-2 text-white font-black text-sm shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                <RotateCw className={`w-4 h-4 ${isTwirling ? 'animate-spin' : ''}`} />
                <span>Twirl! ✨</span>
              </button>

              <button
                id="btn-dressup-photo"
                onClick={handleTakePhoto}
                className="flex items-center gap-1.5 rounded-2xl bg-white border-2 border-pink-300 px-3.5 py-2 text-pink-700 font-extrabold text-sm shadow-sm hover:bg-pink-50 active:scale-95 transition-transform cursor-pointer"
              >
                <Camera className="w-4 h-4 text-pink-500" />
                <span>Photo 📸</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Wardrobe Drawer Tabs & Items */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          {/* Visual Category Tab Bar (Rich 9-item Grid with friendly icons) */}
          <div className="grid grid-cols-5 sm:grid-cols-5 gap-1.5 bg-white/95 backdrop-blur-xs p-2 rounded-3xl border-2 border-pink-200 shadow-sm">
            {[
              { id: 'dress' as const, label: 'Gowns', emoji: '👗' },
              { id: 'tiara' as const, label: 'Crowns', emoji: '👑' },
              { id: 'hair' as const, label: 'Hair', emoji: '💇' },
              { id: 'shoes' as const, label: 'Shoes', emoji: '👠' },
              { id: 'jewelry' as const, label: 'Jewelry', emoji: '📿' },
              { id: 'wings' as const, label: 'Wings', emoji: '🧚' },
              { id: 'wand' as const, label: 'Props', emoji: '🪄' },
              { id: 'pet' as const, label: 'Pets', emoji: '🐾' },
              { id: 'bg' as const, label: 'Palace', emoji: '🏰' },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`btn-wardrobe-${tab.id}`}
                onClick={() => {
                  playSound.tap();
                  setActiveTab(tab.id);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-pink-500 text-white shadow-md scale-105 ring-2 ring-pink-300'
                    : 'bg-pink-50/80 text-pink-700 hover:bg-pink-100'
                }`}
              >
                <span className="text-xl sm:text-2xl">{tab.emoji}</span>
                <span className="text-[10px] sm:text-xs font-black mt-0.5">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Wardrobe Items Grid based on active category */}
          <div className="bg-white/95 backdrop-blur-xs p-4 rounded-3xl border-2 border-pink-200 shadow-sm min-h-[280px]">
            {/* DRESSES */}
            {activeTab === 'dress' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {DRESSES.map((d) => (
                  <button
                    key={d.id}
                    id={`btn-dress-${d.id}`}
                    onClick={() => {
                      playSound.chime();
                      setSelectedDress(d);
                    }}
                    className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedDress.id === d.id
                        ? 'border-pink-500 bg-pink-100/80 shadow-md ring-2 ring-pink-400 scale-105'
                        : 'border-pink-200 bg-pink-50/50 hover:bg-pink-50'
                    }`}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-inner mb-2"
                      style={{ background: d.color1 }}
                    >
                      {d.previewEmoji}
                    </div>
                    <span className="text-xs font-black text-pink-800 text-center leading-tight">
                      {d.name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* TIARAS */}
            {activeTab === 'tiara' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {TIARAS.map((t) => (
                  <button
                    key={t.id}
                    id={`btn-tiara-${t.id}`}
                    onClick={() => {
                      playSound.sparkle();
                      setSelectedTiara(t);
                    }}
                    className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedTiara.id === t.id
                        ? 'border-pink-500 bg-pink-100/80 shadow-md ring-2 ring-pink-400 scale-105'
                        : 'border-pink-200 bg-pink-50/50 hover:bg-pink-50'
                    }`}
                  >
                    <span className="text-3xl mb-1">{t.emoji}</span>
                    <span className="text-xs font-black text-pink-800 text-center leading-tight">
                      {t.name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* HAIRSTYLES */}
            {activeTab === 'hair' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {HAIRSTYLES.map((h) => (
                  <button
                    key={h.id}
                    id={`btn-hair-${h.id}`}
                    onClick={() => {
                      playSound.tap();
                      setSelectedHair(h);
                    }}
                    className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedHair.id === h.id
                        ? 'border-pink-500 bg-pink-100/80 shadow-md ring-2 ring-pink-400 scale-105'
                        : 'border-pink-200 bg-pink-50/50 hover:bg-pink-50'
                    }`}
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-xl shadow-xs mb-1.5 border-2 border-white"
                      style={{ background: h.color }}
                    >
                      {h.emoji}
                    </div>
                    <span className="text-xs font-black text-pink-800 text-center leading-tight">
                      {h.name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* SHOES */}
            {activeTab === 'shoes' && (
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {SHOES.map((s) => (
                  <button
                    key={s.id}
                    id={`btn-shoes-${s.id}`}
                    onClick={() => {
                      playSound.tap();
                      setSelectedShoe(s);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedShoe.id === s.id
                        ? 'border-pink-500 bg-pink-100/80 shadow-md ring-2 ring-pink-400 scale-105'
                        : 'border-pink-200 bg-pink-50/50 hover:bg-pink-50'
                    }`}
                  >
                    <span className="text-3xl">{s.emoji}</span>
                    <span className="text-xs font-black text-pink-800 text-left">
                      {s.name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* JEWELRY */}
            {activeTab === 'jewelry' && (
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {JEWELRY.map((j) => (
                  <button
                    key={j.id}
                    id={`btn-jewelry-${j.id}`}
                    onClick={() => {
                      playSound.sparkle();
                      setSelectedJewelry(j);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedJewelry.id === j.id
                        ? 'border-pink-500 bg-pink-100/80 shadow-md ring-2 ring-pink-400 scale-105'
                        : 'border-pink-200 bg-pink-50/50 hover:bg-pink-50'
                    }`}
                  >
                    <span className="text-3xl">{j.emoji}</span>
                    <span className="text-xs font-black text-pink-800 text-left">
                      {j.name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* WINGS & CAPES */}
            {activeTab === 'wings' && (
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {WINGS.map((w) => (
                  <button
                    key={w.id}
                    id={`btn-wings-${w.id}`}
                    onClick={() => {
                      playSound.sparkle();
                      setSelectedWing(w);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedWing.id === w.id
                        ? 'border-pink-500 bg-pink-100/80 shadow-md ring-2 ring-pink-400 scale-105'
                        : 'border-pink-200 bg-pink-50/50 hover:bg-pink-50'
                    }`}
                  >
                    <span className="text-3xl">{w.emoji}</span>
                    <span className="text-xs font-black text-pink-800 text-left">
                      {w.name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* WANDS & PROPS */}
            {activeTab === 'wand' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {WANDS.map((w) => (
                  <button
                    key={w.id}
                    id={`btn-wand-${w.id}`}
                    onClick={() => {
                      playSound.sparkle();
                      setSelectedWand(w);
                    }}
                    className={`flex flex-col items-center p-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedWand.id === w.id
                        ? 'border-pink-500 bg-pink-100/80 shadow-md ring-2 ring-pink-400 scale-105'
                        : 'border-pink-200 bg-pink-50/50 hover:bg-pink-50'
                    }`}
                  >
                    <span className="text-3xl mb-1">{w.emoji}</span>
                    <span className="text-[11px] font-black text-pink-800 text-center leading-tight">
                      {w.name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* PETS */}
            {activeTab === 'pet' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PETS.map((p) => (
                  <button
                    key={p.id}
                    id={`btn-pet-${p.id}`}
                    onClick={() => {
                      playSound.giggle();
                      setSelectedPet(p);
                    }}
                    className={`flex flex-col items-center p-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedPet.id === p.id
                        ? 'border-pink-500 bg-pink-100/80 shadow-md ring-2 ring-pink-400 scale-105'
                        : 'border-pink-200 bg-pink-50/50 hover:bg-pink-50'
                    }`}
                  >
                    <span className="text-3xl mb-1">{p.emoji}</span>
                    <span className="text-[11px] font-black text-pink-800 text-center leading-tight">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* BACKGROUNDS */}
            {activeTab === 'bg' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {BACKGROUNDS.map((b) => (
                  <button
                    key={b.id}
                    id={`btn-bg-${b.id}`}
                    onClick={() => {
                      playSound.sparkle();
                      setSelectedBg(b);
                    }}
                    className={`flex flex-col items-center p-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedBg.id === b.id
                        ? 'border-pink-500 bg-pink-100/80 shadow-md ring-2 ring-pink-400 scale-105'
                        : 'border-pink-200 bg-pink-50/50 hover:bg-pink-50'
                    }`}
                  >
                    <span className="text-3xl mb-1">{b.emoji}</span>
                    <span className="text-xs font-black text-pink-800 text-center leading-tight">
                      {b.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
