export type GameMode = 
  | 'home' 
  | 'coloring' 
  | 'royalgallery'
  | 'dressup' 
  | 'matching' 
  | 'bubblepop' 
  | 'music' 
  | 'stickers'
  | 'royalball'
  | 'storybook'
  | 'crowndecorator'
  | 'teaparty'
  | 'petspa'
  | 'magicwand'
  | 'shapesorter'
  | 'parents';

export interface StickerItem {
  id: string;
  name: string;
  emoji: string;
  unlocked: boolean;
  category: 'crowns' | 'jewels' | 'pets' | 'magic';
}

export interface PlacedSticker {
  instanceId: string;
  stickerId: string;
  emoji: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  size: number; // 40-120px
  rotation: number; // degrees
}

export interface PrincessCharacter {
  id: string;
  name: string;
  skinColor: string;
  eyeColor: string;
  hairStyle: string;
  hairColor: string;
}

export interface DressUpState {
  characterId: string;
  dressId: string;
  hairId: string;
  tiaraId: string;
  wandId: string;
  petId: string;
  shoesId: string;
  bgId: string;
}

export interface MemoryCard {
  id: number;
  pairId: number;
  name: string;
  iconName: string;
  emoji: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Bubble {
  id: number;
  x: number; // %
  y: number; // %
  size: number;
  speed: number;
  type: 'crown' | 'carriage' | 'frog' | 'wand' | 'castle';
  wobbleOffset: number;
}

// Crown Decorator Types
export interface PlacedGem {
  id: string;
  type: string;
  label: string;
  src: string;
  color: string;
  x: number; // %
  y: number; // %
  size: number;
}

export interface CrownBaseOption {
  id: string;
  name: string;
  src: string;
  description: string;
}

export interface CrownMetalOption {
  id: string;
  name: string;
  color: string;
  gradient: string;
  borderColor: string;
  glowColor: string;
  filterCss: string;
}

// Storybook Types
export interface StoryInteractiveElement {
  id: string;
  name: string;
  emoji: string;
  x: number; // %
  y: number; // %
  size?: number;
  speech: string;
  soundType: 'giggle' | 'ribbit' | 'neigh' | 'twinkle' | 'tweet' | 'pop' | 'chime';
  animation: 'bounce' | 'spin' | 'wiggle' | 'pulse';
}

export interface StoryPage {
  id: number;
  title: string;
  text: string;
  bgGradient: string;
  backdropEmojis: { emoji: string; x: number; y: number; size: string }[];
  elements: StoryInteractiveElement[];
}

// Royal Ball Types
export type DanceMove = 'twirl' | 'jump' | 'curtsy' | 'sway' | 'bounce';
export type BallMusicStyle = 'waltz' | 'sparkle' | 'disco';

// Royal Gallery Saved Coloring Artwork Types
export type RoyalFrameStyle = 'gold' | 'rose' | 'diamond' | 'rainbow';

export interface SavedColoringArtwork {
  id: string;
  pageId: string;
  title: string;
  emoji: string;
  createdAt: string; // ISO date string
  dateDisplay: string; // Readable date e.g. "Sep 9, 2026"
  pathColors: Record<string, string>; // { pathId: hexColor }
  stamps: { id: string; emoji: string; x: number; y: number }[];
  brushDataUrl?: string; // Freehand brush overlay image data
  isFavorite: boolean;
  frameStyle: RoyalFrameStyle;
}

