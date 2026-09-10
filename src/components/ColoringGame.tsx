import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Paintbrush, Stamp, RotateCcw, Download, Check, Palette, Image as ImageIcon, Heart, ArrowRight, X } from 'lucide-react';
import { playSound } from '../utils/audio';
import { REAL_COLORING_PAGES, ColoringPage } from '../data/coloringPagesData';
import { SavedColoringArtwork } from '../types';
import { saveColoringArtwork } from '../utils/storage';
import { ColoringPreviewSvg } from './ColoringPreviewSvg';
import { CartoonGalleryIcon } from './CartoonIcons';

interface ColoringGameProps {
  onReward: () => void;
  onOpenGallery?: () => void;
  initialArtwork?: SavedColoringArtwork | null;
}

interface StampItem {
  id: string;
  emoji: string;
  label: string;
}

const STAMPS: StampItem[] = [
  { id: 'star', emoji: '⭐', label: 'Star' },
  { id: 'crown', emoji: '👑', label: 'Crown' },
  { id: 'heart', emoji: '💖', label: 'Heart' },
  { id: 'flower', emoji: '🌸', label: 'Flower' },
  { id: 'butterfly', emoji: '🦋', label: 'Butterfly' },
  { id: 'gem', emoji: '💎', label: 'Gem' },
];

const PALETTE_COLORS = [
  { name: 'Princess Pink', hex: '#F472B6' },
  { name: 'Rose Red', hex: '#F43F5E' },
  { name: 'Royal Purple', hex: '#C084FC' },
  { name: 'Deep Lavender', hex: '#9333EA' },
  { name: 'Sky Blue', hex: '#38BDF8' },
  { name: 'Royal Blue', hex: '#2563EB' },
  { name: 'Mint Green', hex: '#34D399' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Sunshine Gold', hex: '#FACC15' },
  { name: 'Peach Coral', hex: '#FB923C' },
  { name: 'Warm Cream', hex: '#FEF3C7' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Fairytale Glitter', hex: 'rainbow' },
];

const PASTEL_RAINBOW = ['#FDA4AF', '#FCD34D', '#86EFAC', '#93C5FD', '#D8B4FE', '#F472B6'];

export const ColoringGame: React.FC<ColoringGameProps> = ({
  onReward,
  onOpenGallery,
  initialArtwork,
}) => {
  const [selectedPageIdx, setSelectedPageIdx] = useState(0);
  const [activeColor, setActiveColor] = useState('#F472B6');
  const [toolMode, setToolMode] = useState<'fill' | 'brush' | 'stamp'>('fill');
  const [selectedStamp, setSelectedStamp] = useState('star');
  const [brushSize, setBrushSize] = useState(16);

  // Path colors for current page: { pathId: hex }
  const [pathColors, setPathColors] = useState<Record<string, string>>({});
  const [colorHistory, setColorHistory] = useState<Record<string, string>[]>([]);
  const [colorCount, setColorCount] = useState(0);

  // Stamped stickers on drawing
  const [stamps, setStamps] = useState<{ id: string; emoji: string; x: number; y: number }[]>([]);

  // Brush canvas overlay ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  // Royal Gallery save state
  const [savedArtworkId, setSavedArtworkId] = useState<string | null>(initialArtwork?.id || null);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [savedSuccessInfo, setSavedSuccessInfo] = useState<SavedColoringArtwork | null>(null);

  const currentPage = REAL_COLORING_PAGES[selectedPageIdx] || REAL_COLORING_PAGES[0];

  // Load initial artwork if provided (from Royal Gallery "Color Again")
  useEffect(() => {
    if (initialArtwork) {
      const idx = REAL_COLORING_PAGES.findIndex((p) => p.id === initialArtwork.pageId);
      if (idx >= 0) {
        setSelectedPageIdx(idx);
      }
      setPathColors(initialArtwork.pathColors || {});
      setStamps(initialArtwork.stamps || []);
      setSavedArtworkId(initialArtwork.id);

      if (initialArtwork.brushDataUrl) {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0);
            }
          }
        };
        img.src = initialArtwork.brushDataUrl;
      }
    }
  }, [initialArtwork]);

  // Reset colors when page changes manually (unless loading initial artwork)
  useEffect(() => {
    if (initialArtwork && initialArtwork.pageId === currentPage.id) {
      return;
    }
    setPathColors({});
    setColorHistory([]);
    setStamps([]);
    clearCanvas();
    setSavedArtworkId(null);
  }, [selectedPageIdx]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const getRandomPastel = () => {
    return PASTEL_RAINBOW[Math.floor(Math.random() * PASTEL_RAINBOW.length)];
  };

  // Tap-to-Fill click handler
  const handlePathClick = (pathId: string) => {
    playSound.pop();
    const resolvedColor = activeColor === 'rainbow' ? getRandomPastel() : activeColor;

    setColorHistory((prev) => [...prev, { ...pathColors }]);
    setPathColors((prev) => ({
      ...prev,
      [pathId]: resolvedColor,
    }));

    const newCount = colorCount + 1;
    setColorCount(newCount);
    if (newCount % 5 === 0) {
      playSound.sparkle();
      onReward();
    }
  };

  // Stamp click on SVG
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (toolMode !== 'stamp') return;
    playSound.sparkle();

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 400;
    const y = ((e.clientY - rect.top) / rect.height) * 400;

    const stampObj = STAMPS.find((s) => s.id === selectedStamp);
    if (stampObj) {
      setStamps((prev) => [
        ...prev,
        { id: `stamp-${Date.now()}-${Math.random()}`, emoji: stampObj.emoji, x, y },
      ]);
      const newCount = colorCount + 1;
      setColorCount(newCount);
      if (newCount % 6 === 0) {
        onReward();
      }
    }
  };

  // Undo last action
  const handleUndo = () => {
    playSound.tap();
    if (colorHistory.length > 0) {
      const prev = colorHistory[colorHistory.length - 1];
      setPathColors(prev);
      setColorHistory((h) => h.slice(0, h.length - 1));
    } else if (stamps.length > 0) {
      setStamps((s) => s.slice(0, s.length - 1));
    }
  };

  // Clear all colors on current page
  const handleClear = () => {
    playSound.boing();
    setPathColors({});
    setColorHistory([]);
    setStamps([]);
    clearCanvas();
  };

  // Freehand drawing handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (toolMode !== 'brush') return;
    isDrawingRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = activeColor === 'rainbow' ? getRandomPastel() : activeColor;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || toolMode !== 'brush') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    if (activeColor === 'rainbow') {
      ctx.strokeStyle = getRandomPastel();
    }
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      const newCount = colorCount + 1;
      setColorCount(newCount);
      if (newCount % 8 === 0) {
        onReward();
      }
    }
  };

  // Download artwork for parents
  const handleSaveArtwork = () => {
    playSound.sparkle();
    const svgEl = document.getElementById('coloring-svg');
    if (!svgEl) return;

    const svgData = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL;
    const blobURL = URL.createObjectURL(svgBlob);

    const a = document.createElement('a');
    a.href = blobURL;
    a.download = `princess-${currentPage.id}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-2 flex flex-col gap-3 select-none font-['Fredoka']">
      {/* Page Selector Carousel (Friendly, big thumb-friendly buttons with preview emojis) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {REAL_COLORING_PAGES.map((page, idx) => (
          <button
            key={page.id}
            id={`btn-page-${page.id}`}
            onClick={() => {
              playSound.tap();
              setSelectedPageIdx(idx);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border-2 transition-all shrink-0 cursor-pointer ${
              selectedPageIdx === idx
                ? 'bg-pink-500 border-pink-600 text-white shadow-md scale-105 ring-2 ring-pink-300'
                : 'bg-white/95 border-pink-200 text-pink-700 hover:bg-pink-50'
            }`}
          >
            <span className="text-xl sm:text-2xl">{page.emoji}</span>
            <span className="font-extrabold text-xs sm:text-sm">{page.title}</span>
          </button>
        ))}
      </div>

      {/* Main Workspace: Left Canvas + Right Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* The Coloring Canvas (Center / Left) */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="relative w-full max-w-[420px] aspect-square bg-white rounded-3xl p-2 border-4 border-pink-300 shadow-xl overflow-hidden touch-none">
            {/* SVG Interactive Coloring Template */}
            <svg
              id="coloring-svg"
              viewBox="0 0 400 400"
              className="w-full h-full cursor-pointer"
              onClick={handleSvgClick}
            >
              {/* Clean White Sheet Paper background */}
              <rect width="400" height="400" fill="#FFFFFF" rx="20" />

              {/* Page Segments (fillable paths) */}
              {currentPage.regions.map((p) => {
                const filledColor = pathColors[p.id] || '#FFFFFF';
                return (
                  <path
                    key={p.id}
                    id={`path-${p.id}`}
                    d={p.d}
                    fill={filledColor}
                    stroke="#1F2937"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={(e) => {
                      if (toolMode === 'fill') {
                        e.stopPropagation();
                        handlePathClick(p.id);
                      }
                    }}
                    className={`transition-colors duration-150 ${
                      toolMode === 'fill' ? 'hover:opacity-90' : ''
                    }`}
                  />
                );
              })}

              {/* Detailed Real Coloring Book Overlays (faces, curls, lace, stitches, sparkles) */}
              <g
                className="pointer-events-none select-none"
                dangerouslySetInnerHTML={{ __html: currentPage.overlaySvg }}
              />

              {/* Stamped Emojis on SVG */}
              {stamps.map((s) => (
                <text
                  key={s.id}
                  x={s.x}
                  y={s.y}
                  fontSize="36"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none select-none drop-shadow-sm"
                >
                  {s.emoji}
                </text>
              ))}
            </svg>

            {/* Freehand Brush Canvas Overlay */}
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`absolute inset-0 w-full h-full ${
                toolMode === 'brush' ? 'pointer-events-auto cursor-crosshair' : 'pointer-events-none'
              }`}
            />
          </div>

          {/* Quick Undo, Clear & Save Bar below canvas */}
          <div className="flex items-center gap-3 mt-2">
            <button
              id="btn-coloring-undo"
              onClick={handleUndo}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border-2 border-pink-200 text-pink-600 font-bold text-xs sm:text-sm hover:bg-pink-50 active:scale-95 transition cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Undo</span>
            </button>
            <button
              id="btn-coloring-clear"
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-50 border-2 border-rose-200 text-rose-600 font-bold text-xs sm:text-sm hover:bg-rose-100 active:scale-95 transition cursor-pointer shadow-xs"
            >
              <span>🧼 Clear</span>
            </button>
            <button
              id="btn-coloring-save"
              onClick={handleSaveArtwork}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-pink-50 border-2 border-pink-300 text-pink-700 font-bold text-xs sm:text-sm hover:bg-pink-100 active:scale-95 transition cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Right Toolbars (Mode Selector, Colors & Stamps) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {/* Tool Modes: Fill / Brush / Stamp */}
          <div className="bg-white/95 backdrop-blur-xs p-3 rounded-3xl border-2 border-pink-200 shadow-sm">
            <h4 className="text-xs font-black text-pink-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-pink-500" />
              Magic Color Tool
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                id="btn-mode-fill"
                onClick={() => {
                  playSound.tap();
                  setToolMode('fill');
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all cursor-pointer ${
                  toolMode === 'fill'
                    ? 'bg-pink-500 border-pink-600 text-white shadow-md'
                    : 'bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100'
                }`}
              >
                <span className="text-2xl">✨</span>
                <span className="text-xs font-extrabold mt-1">Tap-Fill</span>
              </button>

              <button
                id="btn-mode-brush"
                onClick={() => {
                  playSound.tap();
                  setToolMode('brush');
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all cursor-pointer ${
                  toolMode === 'brush'
                    ? 'bg-purple-500 border-purple-600 text-white shadow-md'
                    : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
                }`}
              >
                <Paintbrush className="w-6 h-6" />
                <span className="text-xs font-extrabold mt-1">Brush</span>
              </button>

              <button
                id="btn-mode-stamp"
                onClick={() => {
                  playSound.tap();
                  setToolMode('stamp');
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all cursor-pointer ${
                  toolMode === 'stamp'
                    ? 'bg-amber-500 border-amber-600 text-white shadow-md'
                    : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                }`}
              >
                <Stamp className="w-6 h-6" />
                <span className="text-xs font-extrabold mt-1">Stamps</span>
              </button>
            </div>

            {/* Brush Size Picker if in Brush Mode */}
            {toolMode === 'brush' && (
              <div className="mt-3 flex items-center justify-around bg-purple-50 p-2 rounded-2xl border border-purple-200">
                {[8, 16, 28].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      playSound.tap();
                      setBrushSize(size);
                    }}
                    className={`flex items-center justify-center rounded-full p-2 border-2 ${
                      brushSize === size ? 'border-purple-600 bg-white' : 'border-transparent'
                    }`}
                  >
                    <div
                      className="rounded-full bg-purple-600"
                      style={{ width: size, height: size }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Stamp Selector if in Stamp Mode */}
            {toolMode === 'stamp' && (
              <div className="mt-3 grid grid-cols-6 gap-1 bg-amber-50 p-2 rounded-2xl border border-amber-200">
                {STAMPS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      playSound.tap();
                      setSelectedStamp(s.id);
                    }}
                    className={`text-xl p-1.5 rounded-xl transition ${
                      selectedStamp === s.id ? 'bg-amber-300 scale-110 shadow-xs' : 'hover:bg-amber-200'
                    }`}
                  >
                    {s.emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Princess Color Palette (Big, Chunky, Easy to tap with toddler thumbs!) */}
          <div className="bg-white/95 backdrop-blur-xs p-3 rounded-3xl border-2 border-pink-200 shadow-sm">
            <h4 className="text-xs font-black text-pink-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              Princess Palette
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {PALETTE_COLORS.map((c) => {
                const isSelected = activeColor === c.hex;
                const isRainbow = c.hex === 'rainbow';

                return (
                  <button
                    key={c.name}
                    id={`btn-color-${c.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => {
                      playSound.tap();
                      setActiveColor(c.hex);
                    }}
                    title={c.name}
                    className={`h-11 sm:h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer relative shadow-xs ${
                      isSelected
                        ? 'ring-4 ring-pink-500 scale-105 z-10'
                        : 'hover:scale-98 active:scale-90 border-2 border-black/10'
                    }`}
                    style={{
                      background: isRainbow
                        ? 'linear-gradient(135deg, #F43F5E, #FACC15, #34D399, #38BDF8, #C084FC)'
                        : c.hex,
                    }}
                  >
                    {isRainbow && <span className="text-xs font-black text-white drop-shadow">✨</span>}
                    {isSelected && (
                      <Check
                        className={`w-5 h-5 drop-shadow-md ${
                          c.hex === '#FFFFFF' || c.hex === '#FEF3C7' || c.hex === '#FACC15' ? 'text-gray-800' : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
