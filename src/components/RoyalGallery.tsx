import React, { useState, useEffect } from 'react';
import {
  Star,
  Sparkles,
  Download,
  Trash2,
  Maximize2,
  Paintbrush,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Palette,
  Heart,
  Check,
} from 'lucide-react';
import { SavedColoringArtwork, RoyalFrameStyle, GameMode } from '../types';
import {
  loadSavedColorings,
  deleteColoringArtwork,
  toggleFavoriteArtwork,
  updateArtworkFrameStyle,
} from '../utils/storage';
import { playSound } from '../utils/audio';
import { ColoringPreviewSvg } from './ColoringPreviewSvg';
import { CartoonGalleryIcon } from './CartoonIcons';
import { REAL_COLORING_PAGES } from '../data/coloringPagesData';

interface RoyalGalleryProps {
  onNavigate: (mode: GameMode) => void;
  onContinueColoring: (artwork: SavedColoringArtwork) => void;
  onReward: () => void;
}

const FRAME_OPTIONS: { id: RoyalFrameStyle; name: string; borderClass: string; ribbonColor: string }[] = [
  {
    id: 'gold',
    name: 'Gilded Gold',
    borderClass: 'border-amber-400 bg-linear-to-b from-amber-100 via-amber-200 to-amber-400 ring-4 ring-amber-500/60 shadow-[0_12px_28px_rgba(202,138,4,0.35)]',
    ribbonColor: '#F59E0B',
  },
  {
    id: 'rose',
    name: 'Royal Rose',
    borderClass: 'border-pink-400 bg-linear-to-b from-pink-100 via-pink-200 to-rose-400 ring-4 ring-pink-500/60 shadow-[0_12px_28px_rgba(244,63,94,0.35)]',
    ribbonColor: '#F43F5E',
  },
  {
    id: 'diamond',
    name: 'Sparkle Diamond',
    borderClass: 'border-sky-300 bg-linear-to-b from-sky-100 via-sky-200 to-cyan-400 ring-4 ring-sky-500/60 shadow-[0_12px_28px_rgba(56,189,248,0.35)]',
    ribbonColor: '#0EA5E9',
  },
  {
    id: 'rainbow',
    name: 'Princess Rainbow',
    borderClass: 'border-purple-300 bg-linear-to-r from-pink-300 via-yellow-200 via-emerald-300 to-sky-300 ring-4 ring-purple-400/60 shadow-[0_12px_28px_rgba(168,85,247,0.35)]',
    ribbonColor: '#A855F7',
  },
];

export const RoyalGallery: React.FC<RoyalGalleryProps> = ({
  onNavigate,
  onContinueColoring,
  onReward,
}) => {
  const [artworks, setArtworks] = useState<SavedColoringArtwork[]>([]);
  const [filterMode, setFilterMode] = useState<'all' | 'favorites'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectArtwork, setInspectArtwork] = useState<SavedColoringArtwork | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [celebrationToast, setCelebrationToast] = useState<string | null>(null);

  // Load saved artworks on mount
  useEffect(() => {
    refreshGallery();
  }, []);

  const refreshGallery = () => {
    const list = loadSavedColorings();
    setArtworks(list);
  };

  const showToast = (msg: string) => {
    setCelebrationToast(msg);
    setTimeout(() => {
      setCelebrationToast((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isNowFav = toggleFavoriteArtwork(id);
    if (isNowFav) {
      playSound.sparkle();
      showToast('Added to Royal Favorites! ⭐💖');
    } else {
      playSound.tap();
    }
    refreshGallery();
    if (inspectArtwork && inspectArtwork.id === id) {
      setInspectArtwork((prev) => (prev ? { ...prev, isFavorite: isNowFav } : null));
    }
  };

  const handleChangeFrame = (id: string, frameStyle: RoyalFrameStyle, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playSound.pop();
    updateArtworkFrameStyle(id, frameStyle);
    refreshGallery();
    if (inspectArtwork && inspectArtwork.id === id) {
      setInspectArtwork((prev) => (prev ? { ...prev, frameStyle } : null));
    }
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playSound.boing();
    deleteColoringArtwork(id);
    setDeleteConfirmId(null);
    if (inspectArtwork && inspectArtwork.id === id) {
      setInspectArtwork(null);
    }
    refreshGallery();
    showToast('Artwork removed from gallery 🧼');
  };

  const handleDownload = (art: SavedColoringArtwork, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playSound.sparkle();

    // Construct standalone SVG download
    const page = REAL_COLORING_PAGES.find((p) => p.id === art.pageId) || REAL_COLORING_PAGES[0];
    let pathsXml = '';
    page.regions.forEach((r) => {
      const fill = art.pathColors[r.id] || '#FFFFFF';
      pathsXml += `<path d="${r.d}" fill="${fill}" stroke="#1F2937" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>\n`;
    });

    let stampsXml = '';
    art.stamps.forEach((s) => {
      stampsXml += `<text x="${s.x}" y="${s.y}" font-size="36" text-anchor="middle" dominant-baseline="central">${s.emoji}</text>\n`;
    });

    let brushXml = '';
    if (art.brushDataUrl) {
      brushXml = `<image href="${art.brushDataUrl}" x="0" y="0" width="400" height="400"/>\n`;
    }

    const fullSvg = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="800" height="800">
  <rect width="400" height="400" fill="#FFFFFF" rx="20"/>
  ${pathsXml}
  ${page.overlaySvg || ''}
  ${stampsXml}
  ${brushXml}
</svg>`;

    const blob = new Blob([fullSvg], { type: 'image/svg+xml;charset=utf-8' });
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = `royal-gallery-${art.pageId}-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobURL);

    showToast('Saved to your device for printing! 🖼️🖨️');
  };

  const handleInspectPrev = () => {
    if (!inspectArtwork) return;
    playSound.tap();
    const curIdx = filteredArtworks.findIndex((a) => a.id === inspectArtwork.id);
    if (curIdx > 0) {
      setInspectArtwork(filteredArtworks[curIdx - 1]);
    } else {
      setInspectArtwork(filteredArtworks[filteredArtworks.length - 1]);
    }
  };

  const handleInspectNext = () => {
    if (!inspectArtwork) return;
    playSound.sparkle();
    const curIdx = filteredArtworks.findIndex((a) => a.id === inspectArtwork.id);
    if (curIdx < filteredArtworks.length - 1) {
      setInspectArtwork(filteredArtworks[curIdx + 1]);
    } else {
      setInspectArtwork(filteredArtworks[0]);
    }
  };

  // Get categories from saved artworks
  const categories = ['all', 'Princess', 'Fairytale', 'Castle', 'Pet'];

  const filteredArtworks = artworks.filter((art) => {
    if (filterMode === 'favorites' && !art.isFavorite) return false;
    if (selectedCategory !== 'all') {
      const page = REAL_COLORING_PAGES.find((p) => p.id === art.pageId);
      if (page && page.category !== selectedCategory) return false;
    }
    return true;
  });

  const favoritesCount = artworks.filter((a) => a.isFavorite).length;

  const getFrameConfig = (style: RoyalFrameStyle) => {
    return FRAME_OPTIONS.find((f) => f.id === style) || FRAME_OPTIONS[0];
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-2 select-none font-['Nunito'] flex flex-col gap-4">
      {/* Royal Gallery Header Banner */}
      <div className="bg-linear-to-r from-amber-100 via-pink-100 to-purple-100 border-2 border-amber-300/80 rounded-3xl p-4 sm:p-6 shadow-md relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Decorative corner sparkles */}
        <div className="absolute -top-3 -right-3 text-3xl opacity-30 select-none pointer-events-none">
          ✨
        </div>
        <div className="absolute -bottom-2 -left-2 text-3xl opacity-30 select-none pointer-events-none">
          👑
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left z-10">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-200 border-2 border-amber-400 flex items-center justify-center shadow-inner shrink-0 scale-105">
            <CartoonGalleryIcon className="w-11 h-11" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xl sm:text-2xl">👑</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#7A3E16] font-['Baloo_2'] tracking-tight">
                Royal Art Gallery
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-pink-900 font-bold mt-0.5">
              Your palace collection of beautiful coloring masterpieces!
            </p>
          </div>
        </div>

        {/* Action: Color a New Picture */}
        <div className="flex items-center gap-2 z-10">
          <button
            id="btn-gallery-new-coloring"
            onClick={() => {
              playSound.sparkle();
              onNavigate('coloring');
            }}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-linear-to-r from-pink-500 to-rose-500 text-white font-extrabold text-sm sm:text-base border-2 border-pink-300 shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>Paint New Page</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Category Pills */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/90 backdrop-blur-sm p-3 rounded-2xl border border-amber-200 shadow-xs">
        {/* Main Tab: All Artworks vs Favorites Only */}
        <div className="flex items-center gap-2">
          <button
            id="btn-filter-all"
            onClick={() => {
              playSound.tap();
              setFilterMode('all');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
              filterMode === 'all'
                ? 'bg-amber-400 text-amber-950 shadow-xs scale-102 font-extrabold'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <span>🎨 All Masterpieces</span>
            <span className="bg-white/80 px-1.5 py-0.5 rounded-full text-[11px] font-black">
              {artworks.length}
            </span>
          </button>

          <button
            id="btn-filter-favorites"
            onClick={() => {
              playSound.sparkle();
              setFilterMode('favorites');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
              filterMode === 'favorites'
                ? 'bg-pink-500 text-white shadow-xs scale-102 font-extrabold'
                : 'bg-pink-50 text-pink-800 hover:bg-pink-100'
            }`}
          >
            <span>⭐ Royal Favorites</span>
            <span className="bg-white/80 text-pink-900 px-1.5 py-0.5 rounded-full text-[11px] font-black">
              {favoritesCount}
            </span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playSound.tap();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1 rounded-full font-bold transition cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-2xs font-extrabold'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200/60'
              }`}
            >
              {cat === 'all' ? 'All Themes' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Celebration Toast Message */}
      {celebrationToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-white/95 border-2 border-pink-400 text-pink-900 font-extrabold text-sm px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
          <span>{celebrationToast}</span>
        </div>
      )}

      {/* Gallery Wall Grid */}
      {filteredArtworks.length === 0 ? (
        <div className="bg-white/85 rounded-3xl p-8 sm:p-12 border-2 border-dashed border-amber-300 text-center flex flex-col items-center justify-center my-6">
          <div className="text-5xl sm:text-6xl mb-3 animate-bounce">🖼️</div>
          <h3 className="text-xl sm:text-2xl font-black text-amber-900 font-['Baloo_2'] mb-1">
            {filterMode === 'favorites'
              ? 'No Royal Favorites Yet!'
              : 'The Royal Gallery is Ready For Art!'}
          </h3>
          <p className="text-sm text-pink-800 max-w-md mb-5 font-bold">
            {filterMode === 'favorites'
              ? 'Tap the gold star ⭐ on any coloring page to save it into your Royal Favorites collection!'
              : 'Hop into the Coloring Room, pick your favorite princess or fairytale scene, and tap "Save to Gallery"!'}
          </p>
          <button
            id="btn-empty-start-coloring"
            onClick={() => {
              playSound.sparkle();
              onNavigate('coloring');
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-linear-to-r from-pink-500 to-amber-400 text-white font-black text-base shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <Paintbrush className="w-5 h-5" />
            <span>Paint a Masterpiece Now</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredArtworks.map((art) => {
            const frameCfg = getFrameConfig(art.frameStyle);

            return (
              <div
                key={art.id}
                id={`gallery-art-${art.id}`}
                className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-1"
              >
                {/* Royal Picture Frame Wrapper */}
                <div
                  className={`w-full rounded-3xl p-3 sm:p-4 border-4 transition-all duration-300 relative cursor-pointer ${frameCfg.borderClass}`}
                  onClick={() => {
                    playSound.sparkle();
                    setInspectArtwork(art);
                  }}
                  title="Click to view full-size in the Royal Easel"
                >
                  {/* Ornate Gilded Crown Emblem on top of frame */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 bg-amber-400 border border-amber-600 px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1 text-[11px] font-black text-amber-950">
                    <span>👑</span>
                    <span className="uppercase tracking-wider">Royal Salon</span>
                  </div>

                  {/* Favorite Star Button (Top Right Floating) */}
                  <button
                    id={`btn-fav-${art.id}`}
                    onClick={(e) => handleToggleFavorite(art.id, e)}
                    className={`absolute top-2 right-2 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-200 active:scale-90 hover:scale-110 shadow-md cursor-pointer border ${
                      art.isFavorite
                        ? 'bg-amber-400 border-amber-500 text-amber-950 ring-2 ring-amber-200'
                        : 'bg-white/85 border-pink-200 text-gray-400 hover:text-amber-500'
                    }`}
                    title={art.isFavorite ? 'In Royal Favorites' : 'Add to Royal Favorites'}
                    aria-label="Toggle Favorite"
                  >
                    <Star
                      className={`w-5 h-5 ${art.isFavorite ? 'fill-amber-900 text-amber-900' : ''}`}
                    />
                  </button>

                  {/* Quick Inspect Button (Top Left Floating) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound.tap();
                      setInspectArtwork(art);
                    }}
                    className="absolute top-2 left-2 z-30 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-pink-700 border border-pink-200 flex items-center justify-center shadow-md active:scale-90 transition cursor-pointer"
                    title="Zoom in on Easel"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {/* Canvas Artwork Matting & Artwork Preview */}
                  <div className="relative w-full aspect-square bg-white rounded-2xl p-1.5 border-2 border-black/10 shadow-inner overflow-hidden">
                    <ColoringPreviewSvg
                      pageId={art.pageId}
                      pathColors={art.pathColors}
                      stamps={art.stamps}
                      brushDataUrl={art.brushDataUrl}
                      className="w-full h-full group-hover:scale-103 transition-transform duration-300"
                    />

                    {/* Stamped Stickers Badge count (if present) */}
                    {art.stamps && art.stamps.length > 0 && (
                      <div className="absolute bottom-2 left-2 z-20 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-pink-200 text-[10px] font-black text-pink-700 shadow-xs flex items-center gap-1">
                        <span>✨</span>
                        <span>{art.stamps.length} stamps</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Brass / Marble Artwork Plaque below frame */}
                <div className="w-[92%] -mt-2 z-20 bg-linear-to-b from-amber-50 to-amber-100 border-2 border-amber-300 rounded-2xl p-3 shadow-md text-center flex flex-col gap-2">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-lg">{art.emoji}</span>
                    <h3 className="font-extrabold text-xs sm:text-sm text-amber-950 truncate font-['Baloo_2']">
                      {art.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-amber-800 font-bold px-1 border-t border-amber-200/80 pt-1.5">
                    <span>📅 {art.dateDisplay}</span>
                    <span className="text-pink-600">
                      {art.isFavorite ? '💖 Favorite' : '✨ Masterpiece'}
                    </span>
                  </div>

                  {/* Action Buttons on Plaque */}
                  <div className="grid grid-cols-3 gap-1 pt-1">
                    {/* Color Again */}
                    <button
                      id={`btn-color-again-${art.id}`}
                      onClick={() => {
                        playSound.sparkle();
                        onContinueColoring(art);
                      }}
                      className="flex items-center justify-center gap-1 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-black shadow-xs transition active:scale-95 cursor-pointer"
                      title="Continue or recolor this artwork in the Coloring Room"
                    >
                      <Paintbrush className="w-3.5 h-3.5" />
                      <span>Color</span>
                    </button>

                    {/* Download SVG */}
                    <button
                      id={`btn-download-${art.id}`}
                      onClick={(e) => handleDownload(art, e)}
                      className="flex items-center justify-center gap-1 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-bold border border-sky-300 transition active:scale-95 cursor-pointer"
                      title="Download for printing or saving"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>

                    {/* Delete or Confirm Delete */}
                    {deleteConfirmId === art.id ? (
                      <button
                        onClick={(e) => handleDelete(art.id, e)}
                        className="flex items-center justify-center py-1.5 rounded-xl bg-rose-600 text-white text-xs font-black animate-pulse cursor-pointer shadow-xs"
                        title="Confirm removal"
                      >
                        <span>Yes?</span>
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playSound.tap();
                          setDeleteConfirmId(art.id);
                        }}
                        className="flex items-center justify-center py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition active:scale-95 cursor-pointer"
                        title="Remove from gallery"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FULLSCREEN ROYAL EASEL MODAL */}
      {inspectArtwork && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-linear-to-b from-[#FFFDF9] to-[#FFF7ED] rounded-[36px] p-4 sm:p-6 border-4 border-amber-300 shadow-2xl flex flex-col items-center max-h-[95vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                playSound.tap();
                setInspectArtwork(null);
              }}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 border-2 border-amber-200 flex items-center justify-center shadow-md active:scale-90 transition cursor-pointer"
              title="Close Royal Easel"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-3">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">{inspectArtwork.emoji}</span>
                <h2 className="text-xl sm:text-2xl font-black text-amber-950 font-['Baloo_2']">
                  {inspectArtwork.title}
                </h2>
              </div>
              <p className="text-xs text-amber-800 font-bold">
                Painted on {inspectArtwork.dateDisplay} • Royal Palace Collection
              </p>
            </div>

            {/* Easel Stand Graphic + Large Artwork Frame */}
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square flex items-center justify-center my-1">
              {/* Frame Navigation Buttons */}
              <button
                onClick={handleInspectPrev}
                className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-pink-700 shadow-lg border-2 border-pink-200 flex items-center justify-center cursor-pointer active:scale-90 transition"
                title="Previous Artwork"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleInspectNext}
                className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-pink-700 shadow-lg border-2 border-pink-200 flex items-center justify-center cursor-pointer active:scale-90 transition"
                title="Next Artwork"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Gilded Frame */}
              <div
                className={`w-full h-full rounded-3xl p-3.5 border-4 transition-all duration-300 relative ${
                  getFrameConfig(inspectArtwork.frameStyle).borderClass
                }`}
              >
                <div className="w-full h-full bg-white rounded-2xl p-1.5 border-2 border-black/10 shadow-inner overflow-hidden">
                  <ColoringPreviewSvg
                    pageId={inspectArtwork.pageId}
                    pathColors={inspectArtwork.pathColors}
                    stamps={inspectArtwork.stamps}
                    brushDataUrl={inspectArtwork.brushDataUrl}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Frame Customizer: Choose Frame Style Live! */}
            <div className="w-full max-w-md bg-amber-50 border border-amber-200 rounded-2xl p-2.5 mt-3 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-black text-amber-900 px-1">
                <span>🖼️ Choose Royal Frame:</span>
                <span className="text-[11px] font-bold text-amber-700">
                  {getFrameConfig(inspectArtwork.frameStyle).name}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {FRAME_OPTIONS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleChangeFrame(inspectArtwork.id, f.id)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold border-2 transition active:scale-95 cursor-pointer flex items-center justify-center gap-1 ${
                      inspectArtwork.frameStyle === f.id
                        ? 'border-amber-600 bg-amber-300 text-amber-950 font-black shadow-xs'
                        : 'border-amber-200 bg-white text-amber-800 hover:bg-amber-100'
                    }`}
                  >
                    {inspectArtwork.frameStyle === f.id && <Check className="w-3 h-3" />}
                    <span>{f.name.split(' ')[1] || f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 w-full">
              {/* Favorite Toggle */}
              <button
                onClick={() => handleToggleFavorite(inspectArtwork.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm border-2 transition active:scale-95 cursor-pointer ${
                  inspectArtwork.isFavorite
                    ? 'bg-amber-400 border-amber-500 text-amber-950 font-black'
                    : 'bg-white border-amber-200 text-amber-800 hover:bg-amber-50'
                }`}
              >
                <Star
                  className={`w-4 h-4 ${inspectArtwork.isFavorite ? 'fill-amber-900' : ''}`}
                />
                <span>{inspectArtwork.isFavorite ? 'In Favorites ⭐' : 'Add to Favorites'}</span>
              </button>

              {/* Color Again */}
              <button
                onClick={() => {
                  playSound.sparkle();
                  onContinueColoring(inspectArtwork);
                }}
                className="flex items-center gap-1.5 px-5 py-2 rounded-2xl bg-linear-to-r from-pink-500 to-rose-500 text-white font-black text-xs sm:text-sm border-2 border-pink-300 shadow-md transition active:scale-95 cursor-pointer"
              >
                <Paintbrush className="w-4 h-4" />
                <span>Color & Edit Again 🎨</span>
              </button>

              {/* Download Artwork */}
              <button
                onClick={() => handleDownload(inspectArtwork)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold text-xs sm:text-sm border-2 border-sky-300 transition active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download / Print</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
