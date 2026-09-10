import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Image as ImageIcon, Wand2, Check } from 'lucide-react';
import { playSound } from '../utils/audio';
import { REAL_COLORING_PAGES, ColoringPage } from '../data/coloringPagesData';
import { SavedColoringArtwork } from '../types';
import { saveColoringArtwork } from '../utils/storage';
import { CartoonGalleryIcon } from './CartoonIcons';
import { ColoringPreviewSvg } from './ColoringPreviewSvg';
import { TwinkleStar } from './GameArt';

interface ColoringGameProps {
  onReward: () => void;
  onOpenGallery?: () => void;
  initialArtwork?: SavedColoringArtwork | null;
}

// A single magic sparkle drawn on the trail/reveal canvas.
interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 0..1, counts down
  size: number;
  imgIdx: number;
}

const SPARKLE_IMAGE_SRCS = [
  '/art/sparkle-burst-pink.png',
  '/art/sparkle-burst-yellow.png',
  '/art/sparkle-burst-blue.png',
  '/art/sparkle-burst-purple.png',
];

// A fully "solved" color map for a page, used for its small preview thumbnail.
const previewColorsFor = (page: ColoringPage): Record<string, string> =>
  page.regions.reduce<Record<string, string>>((acc, r) => {
    acc[r.id] = r.defaultColor;
    return acc;
  }, {});

export const ColoringGame: React.FC<ColoringGameProps> = ({
  onReward,
  onOpenGallery,
  initialArtwork,
}) => {
  const initialPageIdx = initialArtwork
    ? Math.max(0, REAL_COLORING_PAGES.findIndex((p) => p.id === initialArtwork.pageId))
    : 0;

  const [selectedPageIdx, setSelectedPageIdx] = useState(initialPageIdx);
  const [pathColors, setPathColors] = useState<Record<string, string>>(
    initialArtwork?.pathColors || {}
  );
  const [savedArtworkId, setSavedArtworkId] = useState<string | null>(initialArtwork?.id || null);
  const [justSaved, setJustSaved] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [wandVisible, setWandVisible] = useState(false);

  const currentPage: ColoringPage = REAL_COLORING_PAGES[selectedPageIdx];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wandRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<SparkleParticle[]>([]);
  const sparkleImagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const revealedRef = useRef<Set<string>>(new Set(Object.keys(pathColors)));
  const revealCountRef = useRef<number>(0);
  const lastTrailAtRef = useRef<number>(0);
  const completedRef = useRef<boolean>(false);

  // Preload the sparkle burst images once so canvas drawImage calls never stall.
  useEffect(() => {
    sparkleImagesRef.current = SPARKLE_IMAGE_SRCS.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
  }, []);

  // Load a fresh (or continued) page whenever the selected page changes.
  useEffect(() => {
    const startingColors =
      initialArtwork && initialArtwork.pageId === currentPage.id ? initialArtwork.pathColors : {};
    setPathColors(startingColors);
    revealedRef.current = new Set(Object.keys(startingColors));
    revealCountRef.current = revealedRef.current.size;
    completedRef.current = revealedRef.current.size === currentPage.regions.length;
    setJustSaved(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPageIdx]);

  // Resize the sparkle canvas to match the container in device pixels.
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const stopLoop = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  // Continuously animate & draw the sparkle particle trail on a lightweight canvas.
  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      rafRef.current = null;
      return;
    }
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    const next: SparkleParticle[] = [];
    for (const p of particlesRef.current) {
      const life = p.life - 0.028;
      if (life <= 0) continue;
      const x = p.x + p.vx;
      const y = p.y + p.vy;
      const vy = p.vy + 0.05; // gentle gravity drift
      const img = sparkleImagesRef.current[p.imgIdx];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, life);
        ctx.drawImage(img, x - p.size / 2, y - p.size / 2, p.size, p.size);
        ctx.restore();
      }
      next.push({ ...p, x, y, vy, life });
    }
    particlesRef.current = next;

    if (next.length > 0) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
    }
  }, []);

  const ensureLoopRunning = useCallback(() => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => stopLoop, []);

  const spawnSparkles = useCallback(
    (x: number, y: number, count: number, burst: boolean) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = burst ? 1.5 + Math.random() * 2.5 : 0.4 + Math.random() * 0.8;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (burst ? 1 : 0.2),
          life: 1,
          size: burst ? 22 + Math.random() * 16 : 14 + Math.random() * 10,
          imgIdx: Math.floor(Math.random() * SPARKLE_IMAGE_SRCS.length),
        });
      }
      ensureLoopRunning();
    },
    [ensureLoopRunning]
  );

  const moveWandCursor = (x: number, y: number) => {
    setWandVisible(true);
    const el = wandRef.current;
    if (el) {
      el.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const handlePageComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    playSound.fireworkBurst();
    onReward();
  }, [onReward]);

  const revealRegion = useCallback(
    (regionId: string, x: number, y: number) => {
      if (revealedRef.current.has(regionId)) return;
      const region = currentPage.regions.find((r) => r.id === regionId);
      if (!region) return;

      revealedRef.current.add(regionId);
      revealCountRef.current += 1;
      setPathColors((prev) => ({ ...prev, [regionId]: region.defaultColor }));
      playSound.wandChime(revealCountRef.current);
      spawnSparkles(x, y, 10, true);

      if (revealedRef.current.size === currentPage.regions.length) {
        setTimeout(handlePageComplete, 250);
      }
    },
    [currentPage, spawnSparkles, handlePageComplete]
  );

  const handlePointerEvent = (clientX: number, clientY: number, isDown: boolean) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

    moveWandCursor(x, y);

    // Light trail sparkles while dragging, throttled so it stays performant.
    const now = performance.now();
    if (isDown && now - lastTrailAtRef.current > 60) {
      lastTrailAtRef.current = now;
      spawnSparkles(x, y, 1, false);
    }

    const el = document.elementFromPoint(clientX, clientY) as HTMLElement | null;
    const regionId = el?.dataset?.regionId;
    if (regionId) {
      revealRegion(regionId, x, y);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    handlePointerEvent(e.clientX, e.clientY, true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) {
      moveWandCursor(
        e.clientX - (containerRef.current?.getBoundingClientRect().left || 0),
        e.clientY - (containerRef.current?.getBoundingClientRect().top || 0)
      );
      return;
    }
    handlePointerEvent(e.clientX, e.clientY, true);
  };
  const onPointerUp = () => {
    setIsDragging(false);
  };
  const onPointerLeave = () => {
    setWandVisible(false);
  };

  const revealedCount = Object.keys(pathColors).length;
  const totalCount = currentPage.regions.length;
  const isComplete = revealedCount === totalCount;

  const handleSaveToGallery = () => {
    playSound.sparkle();
    const saved = saveColoringArtwork({
      id: savedArtworkId || undefined,
      pageId: currentPage.id,
      title: currentPage.title,
      emoji: currentPage.emoji,
      pathColors,
      stamps: [],
      isFavorite: false,
      frameStyle: 'gold',
    });
    setSavedArtworkId(saved.id);
    setJustSaved(true);
    onReward();
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col gap-3 select-none font-['Fredoka']">
      {/* Page picker row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {REAL_COLORING_PAGES.map((page, idx) => (
          <button
            key={page.id}
            id={`btn-coloring-page-${page.id}`}
            onClick={() => {
              playSound.tap();
              setSelectedPageIdx(idx);
            }}
            className={`shrink-0 flex flex-col items-center gap-1 px-2 py-2 rounded-2xl border-2 font-bold text-[11px] transition active:scale-95 cursor-pointer ${
              idx === selectedPageIdx
                ? 'bg-pink-500 border-pink-300 text-white shadow-md scale-105'
                : 'bg-white border-[#E3D6FF] text-[#4A3B5C] hover:bg-[#FFF0F8]'
            }`}
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/70 shadow-xs bg-white">
              <ColoringPreviewSvg pageId={page.id} pathColors={previewColorsFor(page)} className="w-full h-full" />
            </div>
            <span className="max-w-[70px] truncate">{page.title.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Header: progress */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 bg-white/90 border-2 border-amber-300 rounded-2xl px-3 py-1.5 font-black text-amber-900 text-sm shadow-xs">
          <TwinkleStar className="w-4 h-4" color="#F59E0B" />
          <span>
            {revealedCount}/{totalCount} colors found!
          </span>
        </div>
      </div>

      {/* Magic canvas */}
      <div
        ref={containerRef}
        id="magic-wand-canvas"
        className="relative w-full aspect-square max-w-[480px] mx-auto rounded-[28px] overflow-hidden border-4 border-white shadow-[0_16px_40px_rgba(255,111,165,0.3)] bg-white touch-none cursor-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerLeave}
        onPointerEnter={() => setWandVisible(true)}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="400" fill="#FFFFFF" />

          {currentPage.regions.map((region) => {
            const revealed = !!pathColors[region.id];
            return (
              <path
                key={region.id}
                data-region-id={region.id}
                d={region.d}
                fill={pathColors[region.id] || '#FFFFFF'}
                stroke="#1F2937"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={revealed ? '' : 'magic-shimmer'}
              />
            );
          })}

          {currentPage.overlaySvg && (
            <g
              className="pointer-events-none select-none"
              dangerouslySetInnerHTML={{ __html: currentPage.overlaySvg }}
            />
          )}
        </svg>

        {/* Sparkle trail / reveal-burst canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Floating wand cursor */}
        <div
          ref={wandRef}
          className={`absolute top-0 left-0 -translate-x-1/4 -translate-y-full pointer-events-none transition-opacity duration-150 ${
            wandVisible ? 'opacity-100' : 'opacity-0'
          } ${isDragging ? 'scale-110 -rotate-12' : '-rotate-6'}`}
          style={{ willChange: 'transform' }}
        >
          <img
            src="/art/wand-sparkle.png"
            alt=""
            className="w-16 h-16 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]"
            draggable={false}
          />
        </div>

        {/* Completion celebration overlay */}
        {isComplete && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-10 pb-3 px-3 flex flex-col items-center gap-2 animate-in fade-in duration-300">
            <p className="flex items-center gap-2 font-['Baloo_2'] font-extrabold text-[#FF6FA5] text-base sm:text-lg text-center">
              <TwinkleStar className="w-5 h-5" color="#FACC15" />
              <span>Ta-da! The magic picture is complete!</span>
              <TwinkleStar className="w-5 h-5" color="#FACC15" />
            </p>
            <div className="flex items-center gap-2">
              <button
                id="btn-save-gallery"
                onClick={handleSaveToGallery}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-amber-400 text-white font-black text-sm shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                {justSaved ? <Check className="w-4 h-4" /> : <CartoonGalleryIcon className="w-5 h-5" />}
                <span>{justSaved ? 'Saved!' : 'Save to Gallery'}</span>
              </button>
              <button
                onClick={() => {
                  playSound.tap();
                  setSelectedPageIdx((idx) => (idx + 1) % REAL_COLORING_PAGES.length);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white border-2 border-[#E3D6FF] text-[#4A3B5C] font-black text-sm shadow-xs hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                <Wand2 className="w-4 h-4" />
                <span>Next Picture</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Helper hint (fades away once they start) */}
      {revealedCount === 0 && (
        <p className="flex items-center justify-center gap-1.5 text-center text-[#4A3B5C]/70 font-bold text-xs sm:text-sm -mt-1">
          <TwinkleStar className="w-3.5 h-3.5" />
          <span>Drag your finger across the picture to make the colors appear!</span>
          <TwinkleStar className="w-3.5 h-3.5" />
        </p>
      )}

      {/* Bottom actions */}
      <div className="flex items-center justify-center gap-3 pt-1">
        <button
          id="btn-save-gallery-anytime"
          onClick={handleSaveToGallery}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-pink-100 hover:bg-pink-200 text-pink-800 font-bold text-xs sm:text-sm border-2 border-pink-300 transition active:scale-95 cursor-pointer"
        >
          {justSaved ? <Check className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
          <span>{justSaved ? 'Saved!' : 'Save to Gallery'}</span>
        </button>

        {onOpenGallery && (
          <button
            id="btn-open-gallery"
            onClick={() => {
              playSound.tap();
              onOpenGallery();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-xs sm:text-sm border-2 border-amber-300 transition active:scale-95 cursor-pointer"
          >
            <CartoonGalleryIcon className="w-4 h-4" />
            <span>Royal Gallery</span>
          </button>
        )}
      </div>
    </div>
  );
};
