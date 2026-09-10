export interface PrincessAvatar {
  id: string;
  name: string;
  skin: string;
  blush: string;
  eye: string;
  mouth: string;
}

export interface DressItem {
  id: string;
  name: string;
  color1: string;
  color2: string;
  accent: string;
  gem: string;
  previewEmoji: string;
}

export interface TiaraItem {
  id: string;
  name: string;
  color: string;
  gem: string;
  emoji: string;
}

export interface HairItem {
  id: string;
  name: string;
  color: string;
  emoji: string;
  style: 'updo' | 'curls' | 'braid' | 'waves' | 'ponytails' | 'twin_braids';
}

export interface JewelryItem {
  id: string;
  name: string;
  color: string;
  emoji: string;
}

export interface ShoeItem {
  id: string;
  name: string;
  color: string;
  accent: string;
  emoji: string;
}

export interface WingItem {
  id: string;
  name: string;
  type: 'none' | 'fairy' | 'swan' | 'cape' | 'angel';
  color: string;
  emoji: string;
}

export interface WandItem {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface PetItem {
  id: string;
  name: string;
  emoji: string;
}

export interface BgItem {
  id: string;
  name: string;
  grad: string;
  emoji: string;
}

export const CHARACTERS: PrincessAvatar[] = [
  { id: 'lily', name: 'Princess Lily', skin: '#FDE047', blush: '#F472B6', eye: '#2563EB', mouth: '#F43F5E' },
  { id: 'maya', name: 'Princess Maya', skin: '#FDBA74', blush: '#FB7185', eye: '#15803D', mouth: '#E11D48' },
  { id: 'aisha', name: 'Princess Aisha', skin: '#A16207', blush: '#BE185D', eye: '#451A03', mouth: '#9D174D' },
  { id: 'rose', name: 'Princess Rose', skin: '#FED7AA', blush: '#FDA4AF', eye: '#0284C7', mouth: '#E11D48' },
];

export const DRESSES: DressItem[] = [
  {
    id: 'pink_rose',
    name: 'Sparkle Rose Gown',
    color1: '#F472B6',
    color2: '#EC4899',
    accent: '#FDF2F8',
    gem: '#BE185D',
    previewEmoji: '🌸',
  },
  {
    id: 'ice_blue',
    name: 'Crystal Ice Gown',
    color1: '#38BDF8',
    color2: '#0284C7',
    accent: '#F0F9FF',
    gem: '#0369A1',
    previewEmoji: '❄️',
  },
  {
    id: 'sun_gold',
    name: 'Sunshine Tiara Gown',
    color1: '#FACC15',
    color2: '#EAB308',
    accent: '#FEF9C3',
    gem: '#CA8A04',
    previewEmoji: '☀️',
  },
  {
    id: 'fairy_lavender',
    name: 'Lavender Fairy Gown',
    color1: '#C084FC',
    color2: '#9333EA',
    accent: '#FAF5FF',
    gem: '#7E22CE',
    previewEmoji: '🧚‍♀️',
  },
  {
    id: 'emerald_garden',
    name: 'Emerald Blossom Gown',
    color1: '#34D399',
    color2: '#059669',
    accent: '#ECFDF5',
    gem: '#047857',
    previewEmoji: '🍀',
  },
  {
    id: 'mermaid_seafoam',
    name: 'Mermaid Coral Gown',
    color1: '#2DD4BF',
    color2: '#0F766E',
    accent: '#CCFBF1',
    gem: '#115E59',
    previewEmoji: '🌊',
  },
  {
    id: 'midnight_star',
    name: 'Midnight Starlight Gown',
    color1: '#6366F1',
    color2: '#3730A3',
    accent: '#EEF2FF',
    gem: '#312E81',
    previewEmoji: '✨',
  },
  {
    id: 'peaches_cream',
    name: 'Peaches & Cream Gown',
    color1: '#FB923C',
    color2: '#EA580C',
    accent: '#FFF7ED',
    gem: '#9A3412',
    previewEmoji: '🍑',
  },
];

export const TIARAS: TiaraItem[] = [
  { id: 'diamond_tiara', name: 'Diamond Tiara', color: '#FACC15', gem: '#EC4899', emoji: '👑' },
  { id: 'ruby_crown', name: 'Ruby Tiara', color: '#EAB308', gem: '#EF4444', emoji: '💎' },
  { id: 'floral_wreath', name: 'Blossom Wreath', color: '#F472B6', gem: '#34D399', emoji: '🌸' },
  { id: 'star_tiara', name: 'Starlight Tiara', color: '#60A5FA', gem: '#FACC15', emoji: '✨' },
  { id: 'pearl_diadem', name: 'Pearl Diadem', color: '#E0E7FF', gem: '#818CF8', emoji: '🪞' },
  { id: 'kitty_ears', name: 'Sweet Bow Ears', color: '#FB7185', gem: '#F43F5E', emoji: '🎀' },
  { id: 'rainbow_tiara', name: 'Rainbow Crest', color: '#F43F5E', gem: '#FBBF24', emoji: '🌈' },
  { id: 'butterfly_crown', name: 'Golden Butterfly', color: '#FBBF24', gem: '#A855F7', emoji: '🦋' },
];

export const HAIRSTYLES: HairItem[] = [
  { id: 'updo', name: 'Golden Updo', color: '#F59E0B', emoji: '👱‍♀️', style: 'updo' },
  { id: 'curls', name: 'Bouncy Curls', color: '#78350F', emoji: '👩‍🦱', style: 'curls' },
  { id: 'braid', name: 'Raven Braids', color: '#1E293B', emoji: '👧', style: 'braid' },
  { id: 'waves', name: 'Autumn Waves', color: '#B45309', emoji: '👩‍🦰', style: 'waves' },
  { id: 'ponytails', name: 'Cotton Ponies', color: '#F472B6', emoji: '🎀', style: 'ponytails' },
  { id: 'twin_braids', name: 'Snow Princess', color: '#E2E8F0', emoji: '❄️', style: 'twin_braids' },
];

export const JEWELRY: JewelryItem[] = [
  { id: 'none', name: 'No Necklace', color: 'transparent', emoji: '❌' },
  { id: 'pearl', name: 'Royal Pearls', color: '#FFFFFF', emoji: '📿' },
  { id: 'ruby_heart', name: 'Ruby Heart', color: '#EF4444', emoji: '💖' },
  { id: 'star_pendant', name: 'Star Medallion', color: '#FACC15', emoji: '⭐' },
  { id: 'emerald_gem', name: 'Emerald Charm', color: '#10B981', emoji: '🍀' },
];

export const SHOES: ShoeItem[] = [
  { id: 'glass_slippers', name: 'Glass Slippers', color: '#E0F2FE', accent: '#38BDF8', emoji: '🥿' },
  { id: 'pink_ballet', name: 'Pink Ballet', color: '#FDF2F8', accent: '#F472B6', emoji: '🩰' },
  { id: 'gold_pumps', name: 'Golden Heels', color: '#FEF9C3', accent: '#EAB308', emoji: '👠' },
  { id: 'lavender_flats', name: 'Lavender Bows', color: '#F3E8FF', accent: '#A855F7', emoji: '👡' },
];

export const WINGS: WingItem[] = [
  { id: 'none', name: 'No Wings', type: 'none', color: 'transparent', emoji: '❌' },
  { id: 'fairy', name: 'Fairy Wings', type: 'fairy', color: '#E0E7FF', emoji: '🧚‍♀️' },
  { id: 'swan', name: 'Swan Wings', type: 'swan', color: '#FFFFFF', emoji: '🪽' },
  { id: 'cape', name: 'Velvet Cape', type: 'cape', color: '#BE185D', emoji: '🧣' },
  { id: 'angel', name: 'Starlight Wings', type: 'angel', color: '#FEF08A', emoji: '🕊️' },
];

export const WANDS: WandItem[] = [
  { id: 'star_wand', name: 'Star Wand', emoji: '⭐', color: '#FACC15' },
  { id: 'heart_wand', name: 'Heart Wand', emoji: '💖', color: '#F43F5E' },
  { id: 'butterfly_wand', name: 'Butterfly Wand', emoji: '🦋', color: '#C084FC' },
  { id: 'royal_fan', name: 'Royal Fan', emoji: '🪭', color: '#FB7185' },
  { id: 'bouquet', name: 'Rose Bouquet', emoji: '💐', color: '#F43F5E' },
  { id: 'purse', name: 'Crystal Purse', emoji: '👛', color: '#EC4899' },
  { id: 'teacup', name: 'Magic Teacup', emoji: '🫖', color: '#FACC15' },
  { id: 'lantern', name: 'Star Lantern', emoji: '🏮', color: '#F97316' },
];

export const PETS: PetItem[] = [
  { id: 'unicorn', name: 'Baby Unicorn', emoji: '🦄' },
  { id: 'bunny', name: 'Fluffy Bunny', emoji: '🐰' },
  { id: 'kitten', name: 'Palace Kitty', emoji: '🐱' },
  { id: 'puppy', name: 'Royal Puppy', emoji: '🐶' },
  { id: 'swan', name: 'White Swan', emoji: '🦢' },
  { id: 'dragon', name: 'Baby Dragon', emoji: '🐲' },
  { id: 'bird', name: 'Magic Bluebird', emoji: '🕊️' },
  { id: 'none', name: 'No Pet', emoji: '❌' },
];

export const BACKGROUNDS: BgItem[] = [
  { id: 'ballroom', name: 'Grand Ballroom', grad: 'from-pink-200 via-rose-100 to-purple-200', emoji: '🏰' },
  { id: 'garden', name: 'Enchanted Garden', grad: 'from-emerald-200 via-green-100 to-teal-200', emoji: '🌺' },
  { id: 'starlight', name: 'Starlight Balcony', grad: 'from-indigo-200 via-purple-100 to-pink-200', emoji: '🌙' },
  { id: 'clouds', name: 'Rainbow Clouds', grad: 'from-sky-200 via-blue-100 to-pink-200', emoji: '🌈' },
  { id: 'coral', name: 'Coral Cove', grad: 'from-teal-200 via-cyan-100 to-blue-200', emoji: '🌊' },
  { id: 'bedroom', name: 'Royal Bedroom', grad: 'from-purple-200 via-pink-100 to-rose-200', emoji: '🎀' },
];
