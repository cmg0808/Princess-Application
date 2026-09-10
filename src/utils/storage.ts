import { StickerItem, PlacedSticker, SavedColoringArtwork, RoyalFrameStyle } from '../types';

export const INITIAL_STICKERS: StickerItem[] = [
  // Crowns & Royal Jewels
  { id: 'tiara_gold', name: 'Golden Tiara', emoji: '👑', unlocked: true, category: 'crowns' },
  { id: 'tiara_diamond', name: 'Sparkle Tiara', emoji: '✨', unlocked: true, category: 'crowns' },
  { id: 'ruby_gem', name: 'Ruby Heart Gem', emoji: '💎', unlocked: true, category: 'jewels' },
  { id: 'wand_star', name: 'Magic Star Wand', emoji: '🪄', unlocked: true, category: 'magic' },
  { id: 'crystal_slipper', name: 'Glass Slipper', emoji: '🥿', unlocked: false, category: 'crowns' },
  { id: 'royal_castle', name: 'Fairy Castle', emoji: '🏰', unlocked: false, category: 'crowns' },
  { id: 'glitter_heart', name: 'Glitter Heart', emoji: '💖', unlocked: false, category: 'jewels' },
  { id: 'sparkle_star', name: 'Shining Star', emoji: '⭐', unlocked: false, category: 'jewels' },
  { id: 'rainbow_magic', name: 'Royal Rainbow', emoji: '🌈', unlocked: false, category: 'magic' },
  { id: 'magic_mirror', name: 'Magic Mirror', emoji: '🪞', unlocked: false, category: 'magic' },
  { id: 'fairy_wings', name: 'Fairy Wings', emoji: '🧚‍♀️', unlocked: false, category: 'magic' },
  { id: 'royal_carriage', name: 'Royal Carriage', emoji: '🎠', unlocked: false, category: 'crowns' },
  
  // Royal Pets
  { id: 'unicorn_white', name: 'Magic Unicorn', emoji: '🦄', unlocked: false, category: 'pets' },
  { id: 'royal_kitty', name: 'Princess Kitten', emoji: '🐱', unlocked: false, category: 'pets' },
  { id: 'royal_bunny', name: 'Fluffy Bunny', emoji: '🐰', unlocked: false, category: 'pets' },
  { id: 'royal_puppy', name: 'Palace Puppy', emoji: '🐶', unlocked: false, category: 'pets' },
  { id: 'royal_swan', name: 'Graceful Swan', emoji: '🦢', unlocked: false, category: 'pets' },
  { id: 'baby_dragon', name: 'Cute Baby Dragon', emoji: '🐲', unlocked: false, category: 'pets' },
  { id: 'butterfly_pink', name: 'Sparkle Butterfly', emoji: '🦋', unlocked: false, category: 'pets' },
  { id: 'magic_flower', name: 'Royal Rose', emoji: '🌹', unlocked: false, category: 'jewels' },
  { id: 'tea_cup', name: 'Royal Tea Cup', emoji: '🫖', unlocked: false, category: 'crowns' },
  { id: 'cupcake_pink', name: 'Princess Cupcake', emoji: '🧁', unlocked: false, category: 'jewels' },
  { id: 'ribbon_bow', name: 'Pink Bow', emoji: '🎀', unlocked: false, category: 'crowns' },
  { id: 'crystal_ball', name: 'Crystal Orb', emoji: '🔮', unlocked: false, category: 'magic' },
];

const STORAGE_KEYS = {
  STICKERS: 'princess_kingdom_stickers',
  PLACED_SCENE: 'princess_kingdom_scene_',
  TOTAL_STARS: 'princess_kingdom_stars',
  COLORINGS: 'princess_kingdom_saved_colorings',
};

export function loadUnlockedStickers(): StickerItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STICKERS);
    if (!raw) return INITIAL_STICKERS;
    const unlockedIds: string[] = JSON.parse(raw);
    return INITIAL_STICKERS.map((s) => ({
      ...s,
      unlocked: s.unlocked || unlockedIds.includes(s.id),
    }));
  } catch {
    return INITIAL_STICKERS;
  }
}

export function unlockRandomSticker(): StickerItem | null {
  try {
    const current = loadUnlockedStickers();
    const locked = current.filter((s) => !s.unlocked);
    if (locked.length === 0) return null;

    const chosen = locked[Math.floor(Math.random() * locked.length)];
    const unlockedIds = current.filter((s) => s.unlocked).map((s) => s.id);
    unlockedIds.push(chosen.id);

    localStorage.setItem(STORAGE_KEYS.STICKERS, JSON.stringify(unlockedIds));
    return chosen;
  } catch {
    return null;
  }
}

export function loadSceneStickers(sceneId: string): PlacedSticker[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PLACED_SCENE + sceneId);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveSceneStickers(sceneId: string, stickers: PlacedSticker[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.PLACED_SCENE + sceneId, JSON.stringify(stickers));
  } catch {
    // Ignore storage errors
  }
}

export function getStarsCount(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TOTAL_STARS);
    return raw ? parseInt(raw, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function addStars(count: number): number {
  try {
    const current = getStarsCount();
    const updated = current + count;
    localStorage.setItem(STORAGE_KEYS.TOTAL_STARS, updated.toString());
    return updated;
  } catch {
    return 0;
  }
}

// Initial Sample Masterpieces so Royal Gallery has glorious artwork on first visit
export const INITIAL_SAVED_COLORINGS: SavedColoringArtwork[] = [
  {
    id: 'royal_masterpiece_1',
    pageId: 'princess_garden',
    title: 'Princess Lily in Blossom Garden',
    emoji: '👸',
    createdAt: '2026-09-08T15:30:00.000Z',
    dateDisplay: 'Yesterday',
    isFavorite: true,
    frameStyle: 'gold',
    pathColors: {
      sky: '#38BDF8',
      grass: '#34D399',
      sun: '#FACC15',
      cloud_l: '#FFFFFF',
      tiara: '#FACC15',
      tiara_gem: '#F43F5E',
      hair_back: '#FB923C',
      hair_back_r: '#FB923C',
      hair_top: '#FB923C',
      bangs_l: '#FB923C',
      bangs_r: '#FB923C',
      face: '#FEF3C7',
      neck: '#FEF3C7',
      sleeve_l: '#F472B6',
      sleeve_r: '#F472B6',
      arm_l: '#FEF3C7',
      arm_r: '#FEF3C7',
      bodice: '#F472B6',
      bow: '#F43F5E',
      skirt_main: '#C084FC',
      skirt_peplum_l: '#F472B6',
      skirt_peplum_r: '#F472B6',
      skirt_ruffle_bottom: '#FEF3C7',
      wand_stick: '#FACC15',
      wand_star: '#FACC15',
      rose_1: '#F43F5E',
      rose_stem_1: '#059669',
      butterfly_wing_top: '#9333EA',
      butterfly_wing_bot: '#F472B6',
    },
    stamps: [
      { id: 's1', emoji: '⭐', x: 340, y: 130 },
      { id: 's2', emoji: '💖', x: 75, y: 310 },
      { id: 's3', emoji: '✨', x: 290, y: 180 },
    ],
  },
  {
    id: 'royal_masterpiece_2',
    pageId: 'unicorn_clouds',
    title: 'Pegasus in Starry Clouds',
    emoji: '🦄',
    createdAt: '2026-09-09T10:15:00.000Z',
    dateDisplay: 'Today',
    isFavorite: true,
    frameStyle: 'diamond',
    pathColors: {
      night_sky: '#9333EA',
      moon: '#FACC15',
      cloud_base: '#FEF3C7',
      uni_body: '#FFFFFF',
      uni_head_neck: '#FFFFFF',
      uni_snout: '#FEF3C7',
      uni_horn: '#FACC15',
      uni_ear: '#FFFFFF',
      wing_top: '#38BDF8',
      wing_mid: '#93C5FD',
      mane_1: '#F472B6',
      mane_2: '#FACC15',
      mane_3: '#34D399',
      tail_top: '#C084FC',
      tail_bot: '#F472B6',
      leg_f: '#FFFFFF',
      leg_b: '#FFFFFF',
      hoof_f: '#FACC15',
      hoof_b: '#FACC15',
      star_1: '#FACC15',
      star_2: '#FACC15',
    },
    stamps: [
      { id: 's4', emoji: '⭐', x: 80, y: 60 },
      { id: 's5', emoji: '💎', x: 190, y: 250 },
      { id: 's6', emoji: '🌸', x: 320, y: 340 },
    ],
  },
  {
    id: 'royal_masterpiece_3',
    pageId: 'fairytale_castle',
    title: 'Fairytale Royal Castle',
    emoji: '🏰',
    createdAt: '2026-09-09T14:45:00.000Z',
    dateDisplay: 'Today',
    isFavorite: false,
    frameStyle: 'rose',
    pathColors: {
      sky: '#38BDF8',
      rainbow_1: '#F43F5E',
      rainbow_2: '#FACC15',
      hill: '#34D399',
      river: '#2563EB',
      bridge: '#FB923C',
      main_wall: '#FEF3C7',
      door: '#FB923C',
      tower_l: '#F472B6',
      roof_l: '#C084FC',
      tower_r: '#F472B6',
      roof_r: '#C084FC',
      spire_center: '#FEF3C7',
      roof_center: '#F43F5E',
      win_c: '#FACC15',
      win_l: '#FACC15',
      win_r: '#FACC15',
      flag_l: '#FACC15',
      flag_c: '#F43F5E',
      flag_r: '#FACC15',
    },
    stamps: [
      { id: 's7', emoji: '👑', x: 200, y: 90 },
      { id: 's8', emoji: '⭐', x: 80, y: 120 },
      { id: 's9', emoji: '🦋', x: 330, y: 220 },
    ],
  },
];

export function loadSavedColorings(): SavedColoringArtwork[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COLORINGS);
    if (!raw) {
      // Seed with initial masterworks
      localStorage.setItem(STORAGE_KEYS.COLORINGS, JSON.stringify(INITIAL_SAVED_COLORINGS));
      return INITIAL_SAVED_COLORINGS;
    }
    const parsed: SavedColoringArtwork[] = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SAVED_COLORINGS;
  } catch {
    return INITIAL_SAVED_COLORINGS;
  }
}

export function saveColoringArtwork(
  artwork: Omit<SavedColoringArtwork, 'id' | 'createdAt' | 'dateDisplay'> & { id?: string }
): SavedColoringArtwork {
  try {
    const list = loadSavedColorings();
    const now = new Date();
    const id = artwork.id || `art_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const fullArtwork: SavedColoringArtwork = {
      ...artwork,
      id,
      createdAt: new Date().toISOString(),
      dateDisplay: now.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      }),
      frameStyle: artwork.frameStyle || 'gold',
      isFavorite: artwork.isFavorite ?? false,
    };

    // If existing artwork, replace; otherwise prepend
    const existingIdx = list.findIndex((a) => a.id === id);
    let updatedList: SavedColoringArtwork[];
    if (existingIdx >= 0) {
      updatedList = [...list];
      updatedList[existingIdx] = fullArtwork;
    } else {
      updatedList = [fullArtwork, ...list];
    }

    localStorage.setItem(STORAGE_KEYS.COLORINGS, JSON.stringify(updatedList));
    return fullArtwork;
  } catch (err) {
    console.error('Failed to save coloring artwork', err);
    return {
      ...artwork,
      id: artwork.id || `art_${Date.now()}`,
      createdAt: new Date().toISOString(),
      dateDisplay: 'Today',
      frameStyle: artwork.frameStyle || 'gold',
      isFavorite: artwork.isFavorite ?? false,
    };
  }
}

export function deleteColoringArtwork(id: string): SavedColoringArtwork[] {
  try {
    const list = loadSavedColorings();
    const updated = list.filter((a) => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.COLORINGS, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function toggleFavoriteArtwork(id: string): boolean {
  try {
    const list = loadSavedColorings();
    const item = list.find((a) => a.id === id);
    if (!item) return false;
    item.isFavorite = !item.isFavorite;
    localStorage.setItem(STORAGE_KEYS.COLORINGS, JSON.stringify(list));
    return item.isFavorite;
  } catch {
    return false;
  }
}

export function updateArtworkFrameStyle(id: string, frameStyle: RoyalFrameStyle): void {
  try {
    const list = loadSavedColorings();
    const item = list.find((a) => a.id === id);
    if (!item) return;
    item.frameStyle = frameStyle;
    localStorage.setItem(STORAGE_KEYS.COLORINGS, JSON.stringify(list));
  } catch {
    // ignore
  }
}

