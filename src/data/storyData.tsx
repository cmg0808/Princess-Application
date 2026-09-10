import React from 'react';

export interface StoryInteractiveChar {
  id: string;
  name: string;
  emoji: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  size: number;
  speech: string;
  soundType: 'giggle' | 'ribbit' | 'neigh' | 'twinkle' | 'tweet' | 'pop' | 'chime';
  animation: 'bounce' | 'spin' | 'wiggle' | 'pulse';
}

export interface StoryChapter {
  id: number;
  chapterNumber: string;
  title: string;
  text: string;
  bgGradient: string;
  // Scene SVG illustrations that provide high quality cartoon visuals
  sceneSvg: React.ReactNode;
  characters: StoryInteractiveChar[];
}

export const ORIGINAL_STORY_CHAPTERS: StoryChapter[] = [
  // ================= CHAPTER 1 =================
  {
    id: 1,
    chapterNumber: 'Chapter 1',
    title: 'The Secret of the Starlight Crown',
    text: 'Morning sunshine warmed the palace balcony! Princess Lily peeked into her golden mirror and gasped—the magic Star Gem from her royal crown was missing! "Look, Princess!" squeaked Pip the Bluebird. A trail of glowing stardust led straight into the Enchanted Forest.',
    bgGradient: 'from-amber-100 via-rose-100 to-sky-200',
    sceneSvg: (
      <svg viewBox="0 0 600 320" className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Morning Sun */}
        <circle cx="90" cy="50" r="38" fill="#FEF08A" opacity="0.8" />
        <circle cx="90" cy="50" r="48" fill="#FEF08A" opacity="0.3" />

        {/* Distant Royal Castle */}
        <path d="M420,170 L420,110 L440,80 L460,110 L460,170 Z" fill="#FBCFE8" opacity="0.7" />
        <path d="M460,170 L460,95 L485,60 L510,95 L510,170 Z" fill="#F472B6" opacity="0.7" />
        <path d="M510,170 L510,120 L530,90 L550,120 L550,170 Z" fill="#FBCFE8" opacity="0.7" />

        {/* Rolling Green Hills */}
        <path d="M0,210 Q180,160 380,210 Q490,180 600,200 L600,320 L0,320 Z" fill="#86EFAC" opacity="0.6" />
        <path d="M0,230 Q220,190 440,240 Q530,220 600,230 L600,320 L0,320 Z" fill="#4ADE80" opacity="0.7" />

        {/* Palace Balcony Terrace */}
        <rect x="0" y="260" width="600" height="60" fill="#FDF2F8" />
        <line x1="0" y1="260" x2="600" y2="260" stroke="#F472B6" strokeWidth="4" />
        {/* Balustrade pillars */}
        {[30, 80, 130, 180, 230, 280, 330, 380, 430, 480, 530, 580].map((x, i) => (
          <g key={i}>
            <rect x={x - 4} y="264" width="8" height="40" rx="3" fill="#FCE7F3" stroke="#F472B6" strokeWidth="1.5" />
            <circle cx={x} cy="262" r="5" fill="#F472B6" />
          </g>
        ))}

        {/* Rose Trellis Garland */}
        <path d="M40,255 Q80,240 120,255 Q160,240 200,255 Q240,240 280,255" stroke="#15803D" strokeWidth="3" fill="none" />
        <circle cx="80" cy="246" r="6" fill="#F43F5E" />
        <circle cx="160" cy="246" r="6" fill="#FB7185" />
        <circle cx="240" cy="246" r="6" fill="#F43F5E" />

        {/* Star Sparkle Trail */}
        <circle cx="210" cy="215" r="3" fill="#FACC15" />
        <circle cx="260" cy="205" r="4" fill="#FACC15" />
        <circle cx="310" cy="215" r="3" fill="#FACC15" />
        <circle cx="360" cy="200" r="5" fill="#FACC15" />
      </svg>
    ),
    characters: [
      {
        id: 'lily',
        name: 'Princess Lily',
        emoji: '👸',
        x: 32,
        y: 64,
        size: 75,
        speech: 'Oh no, my Starlight Gem! Let us follow the sparkles! 🌸',
        soundType: 'twinkle',
        animation: 'bounce',
      },
      {
        id: 'pip',
        name: 'Pip the Bluebird',
        emoji: '🐦',
        x: 62,
        y: 38,
        size: 56,
        speech: 'Chirp chirp! The stars flew toward the forest! Follow me! 🎶',
        soundType: 'tweet',
        animation: 'bounce',
      },
      {
        id: 'mirror',
        name: 'Golden Mirror',
        emoji: '🪞',
        x: 18,
        y: 65,
        size: 52,
        speech: 'Glimmer shimmer! True princesses are brave and kind! ✨',
        soundType: 'chime',
        animation: 'pulse',
      },
      {
        id: 'butterfly',
        name: 'Garden Butterfly',
        emoji: '🦋',
        x: 82,
        y: 50,
        size: 50,
        speech: 'Flutter flutter! I will show you the flower path! 🌺',
        soundType: 'giggle',
        animation: 'wiggle',
      },
    ],
  },

  // ================= CHAPTER 2 =================
  {
    id: 2,
    chapterNumber: 'Chapter 2',
    title: 'The Whispering Willow Grove',
    text: 'Lily stepped into the enchanted woods where giant glowing mushrooms lit the path. "We saw your gem!" giggled Flutter the Pixie, swirling her sparkling wand. "It bounced right across the singing river on a shiny green lily pad!" Pippin the Frog nodded his crown in agreement!',
    bgGradient: 'from-purple-200 via-pink-100 to-emerald-200',
    sceneSvg: (
      <svg viewBox="0 0 600 320" className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Magical Tree Trunks & Willow Canopy */}
        <path d="M-20,0 L60,0 Q30,120 70,260 L-20,260 Z" fill="#581C87" opacity="0.25" />
        <path d="M620,0 L540,0 Q570,120 530,260 L620,260 Z" fill="#581C87" opacity="0.25" />

        {/* Willow draping vines */}
        <path d="M50,0 Q60,110 40,160" stroke="#A855F7" strokeWidth="2.5" fill="none" opacity="0.6" />
        <path d="M90,0 Q110,120 85,190" stroke="#C084FC" strokeWidth="2.5" fill="none" opacity="0.6" />
        <path d="M550,0 Q530,110 560,160" stroke="#A855F7" strokeWidth="2.5" fill="none" opacity="0.6" />
        <path d="M510,0 Q490,120 520,190" stroke="#C084FC" strokeWidth="2.5" fill="none" opacity="0.6" />

        {/* Glowing Forest Floor */}
        <path d="M0,230 Q300,190 600,230 L600,320 L0,320 Z" fill="#86EFAC" opacity="0.75" />

        {/* Giant Glowing Fairy Mushrooms */}
        {/* Left Mushroom */}
        <path d="M90,260 Q100,200 120,200 Q140,200 150,260 Z" fill="#FEF08A" opacity="0.9" />
        <path d="M70,200 Q120,130 170,200 Z" fill="#F43F5E" />
        <circle cx="105" cy="170" r="6" fill="#FFFFFF" />
        <circle cx="135" cy="165" r="5" fill="#FFFFFF" />

        {/* Right Mushroom */}
        <path d="M470,270 Q480,210 500,210 Q520,210 530,270 Z" fill="#FEF08A" opacity="0.9" />
        <path d="M450,210 Q500,140 550,210 Z" fill="#C084FC" />
        <circle cx="485" cy="180" r="6" fill="#FFFFFF" />
        <circle cx="515" cy="175" r="5" fill="#FFFFFF" />

        {/* Fireflies / Pixie dust */}
        {[
          [200, 110], [280, 80], [350, 120], [420, 95], [160, 90], [390, 160]
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="#FEF08A" opacity="0.4" />
            <circle cx={x} cy={y} r="2.5" fill="#FFFFFF" />
          </g>
        ))}
      </svg>
    ),
    characters: [
      {
        id: 'fairy',
        name: 'Flutter the Pixie',
        emoji: '🧚',
        x: 28,
        y: 45,
        size: 68,
        speech: 'Tee-hee! Pixie dust lights the way! Follow the music! ✨',
        soundType: 'giggle',
        animation: 'spin',
      },
      {
        id: 'frog',
        name: 'Pippin with Crown',
        emoji: '🐸',
        x: 72,
        y: 65,
        size: 64,
        speech: 'Ribbit ribbit! The river is just past the big willow tree! 👑',
        soundType: 'ribbit',
        animation: 'bounce',
      },
      {
        id: 'lily',
        name: 'Princess Lily',
        emoji: '👸',
        x: 50,
        y: 65,
        size: 72,
        speech: 'Thank you, kind friends! We are getting so close! 💖',
        soundType: 'twinkle',
        animation: 'wiggle',
      },
      {
        id: 'mushroom',
        name: 'Magic Mushroom',
        emoji: '🍄',
        x: 18,
        y: 68,
        size: 52,
        speech: 'Boing! Bounce on my cap to reach higher! 🌟',
        soundType: 'pop',
        animation: 'pulse',
      },
    ],
  },

  // ================= CHAPTER 3 =================
  {
    id: 3,
    chapterNumber: 'Chapter 3',
    title: 'The Crystal River & Mermaid Bridge',
    text: 'At the Crystal River, the water sparkled with turquoise ripples. Out splashed Princess Coral the Mermaid! "Do not worry, Princess Lily!" Coral laughed. With a twirl of her seashell staff, Coral spun giant floating bubbles that created a glowing bridge right across the river!',
    bgGradient: 'from-sky-200 via-teal-100 to-blue-200',
    sceneSvg: (
      <svg viewBox="0 0 600 320" className="absolute inset-0 w-full h-full pointer-events-none">
        {/* River Banks */}
        <path d="M0,0 L180,0 L140,320 L0,320 Z" fill="#86EFAC" opacity="0.8" />
        <path d="M460,0 L600,0 L600,320 L420,320 Z" fill="#86EFAC" opacity="0.8" />

        {/* Flowing Crystal River */}
        <path d="M180,0 L460,0 L420,320 L140,320 Z" fill="#38BDF8" opacity="0.75" />

        {/* River Waves & Shimmers */}
        <path d="M190,60 Q300,45 420,60" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.7" />
        <path d="M180,140 Q300,120 400,140" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.7" />
        <path d="M160,220 Q290,200 390,220" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.7" />

        {/* Floating Bubble Bridge */}
        {[
          [170, 170, 24], [230, 155, 28], [295, 150, 32], [360, 155, 28], [415, 170, 24]
        ].map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill="#E0F2FE" opacity="0.5" stroke="#38BDF8" strokeWidth="2.5" />
            <ellipse cx={x - r / 3} cy={y - r / 3} rx={r / 4} ry={r / 6} fill="#FFFFFF" opacity="0.8" />
          </g>
        ))}

        {/* Water Lilies */}
        <circle cx="210" cy="270" r="16" fill="#15803D" opacity="0.8" />
        <circle cx="210" cy="268" r="6" fill="#F472B6" />
        <circle cx="370" cy="80" r="14" fill="#15803D" opacity="0.8" />
        <circle cx="370" cy="78" r="5" fill="#F472B6" />
      </svg>
    ),
    characters: [
      {
        id: 'coral',
        name: 'Princess Coral',
        emoji: '🧜‍♀️',
        x: 52,
        y: 50,
        size: 78,
        speech: 'Splish splash! Step on the magical bubbles! They never pop! 🫧',
        soundType: 'giggle',
        animation: 'wiggle',
      },
      {
        id: 'lily',
        name: 'Princess Lily',
        emoji: '👸',
        x: 20,
        y: 65,
        size: 70,
        speech: 'The bubbles are so soft and bouncy! Wheeee! 💖',
        soundType: 'twinkle',
        animation: 'bounce',
      },
      {
        id: 'dolphin',
        name: 'Splashy Dolphin',
        emoji: '🐬',
        x: 78,
        y: 45,
        size: 58,
        speech: 'Click click! Pegasus is waiting on the other hill! 🌊',
        soundType: 'pop',
        animation: 'bounce',
      },
      {
        id: 'starfish',
        name: 'Pink Starfish',
        emoji: '⭐',
        x: 82,
        y: 72,
        size: 46,
        speech: 'I shine bright at the bottom of the river! 🌟',
        soundType: 'chime',
        animation: 'spin',
      },
    ],
  },

  // ================= CHAPTER 4 =================
  {
    id: 4,
    chapterNumber: 'Chapter 4',
    title: 'Flight to the Cloud Kingdom',
    text: 'Waiting on the sunny meadow was Sparkle the Rainbow Pegasus! Lily climbed onto Sparkle’s soft back. With a magnificent flap of winged feathers, they soared up into the cotton-candy pink clouds! There, sitting in a cozy nest of spun stardust, was Twinkle the Palace Bunny snuggling the Star Gem!',
    bgGradient: 'from-pink-200 via-sky-100 to-amber-100',
    sceneSvg: (
      <svg viewBox="0 0 600 320" className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Giant Rainbow Arch across sky */}
        <path d="M-20,320 Q300,-40 620,320" stroke="#F43F5E" strokeWidth="12" fill="none" opacity="0.7" />
        <path d="M-20,320 Q300,-16 620,320" stroke="#FBBF24" strokeWidth="12" fill="none" opacity="0.7" />
        <path d="M-20,320 Q300,8 620,320" stroke="#34D399" strokeWidth="12" fill="none" opacity="0.7" />
        <path d="M-20,320 Q300,32 620,320" stroke="#38BDF8" strokeWidth="12" fill="none" opacity="0.7" />
        <path d="M-20,320 Q300,56 620,320" stroke="#C084FC" strokeWidth="12" fill="none" opacity="0.7" />

        {/* Fluffy Cloud Meadow Islands */}
        <g fill="#FFFFFF" opacity="0.95">
          {/* Cloud Base Left */}
          <circle cx="90" cy="280" r="60" />
          <circle cx="160" cy="270" r="50" />
          <circle cx="230" cy="290" r="55" />
          {/* Cloud Center Nest */}
          <circle cx="420" cy="260" r="60" />
          <circle cx="490" cy="250" r="70" />
          <circle cx="560" cy="270" r="60" />
        </g>

        {/* Golden Stardust Nest */}
        <ellipse cx="490" cy="260" rx="65" ry="24" fill="#FEF08A" stroke="#FACC15" strokeWidth="4" />
        {/* Glowing Star Gem in nest */}
        <circle cx="490" cy="245" r="18" fill="#FACC15" opacity="0.4" />
        <circle cx="490" cy="245" r="10" fill="#FFFFFF" />

        {/* Floating Twinkles */}
        {[
          [80, 100], [140, 60], [240, 110], [380, 80], [540, 90]
        ].map(([x, y], i) => (
          <text key={i} x={x} y={y} fontSize="20" fill="#FACC15" textAnchor="middle">✨</text>
        ))}
      </svg>
    ),
    characters: [
      {
        id: 'pegasus',
        name: 'Sparkle Pegasus',
        emoji: '🦄',
        x: 32,
        y: 56,
        size: 84,
        speech: 'Neigh! Flap flap! Soaring above the rainbows is magical! 🌈',
        soundType: 'neigh',
        animation: 'bounce',
      },
      {
        id: 'bunny',
        name: 'Twinkle the Bunny',
        emoji: '🐰',
        x: 75,
        y: 64,
        size: 70,
        speech: 'Hop hop! I kept your sparkly gem safe and warm for you! 💖',
        soundType: 'giggle',
        animation: 'wiggle',
      },
      {
        id: 'stargem',
        name: 'The Royal Star Gem',
        emoji: '⭐',
        x: 85,
        y: 50,
        size: 54,
        speech: 'SHINE! I am ready to return to Princess Lily’s crown! ✨',
        soundType: 'twinkle',
        animation: 'spin',
      },
      {
        id: 'lily',
        name: 'Princess Lily',
        emoji: '👸',
        x: 18,
        y: 60,
        size: 70,
        speech: 'You found it, Twinkle! You are the sweetest bunny! 🌸',
        soundType: 'twinkle',
        animation: 'bounce',
      },
    ],
  },

  // ================= CHAPTER 5 =================
  {
    id: 5,
    chapterNumber: 'Chapter 5',
    title: 'The Grand Royal Starlight Ball',
    text: 'Click! Lily placed the Star Gem back onto her golden crown. Instantly, the grand ballroom burst into dazzling rainbow sparkles! Fireworks lit the sky as all her fairytale friends—fairies, mermaids, unicorns, and bunnies—gathered together to dance happily ever after!',
    bgGradient: 'from-amber-200 via-rose-200 to-purple-200',
    sceneSvg: (
      <svg viewBox="0 0 600 320" className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Grand Palace Ballroom Arches & Velvet Drapes */}
        <path d="M0,0 L600,0 L600,60 Q300,120 0,60 Z" fill="#881337" opacity="0.35" />
        <path d="M0,0 L120,0 Q90,160 0,220 Z" fill="#9F1239" opacity="0.4" />
        <path d="M600,0 L480,0 Q510,160 600,220 Z" fill="#9F1239" opacity="0.4" />

        {/* Sparkling Crystal Chandeliers */}
        {/* Center Chandelier */}
        <line x1="300" y1="0" x2="300" y2="45" stroke="#CA8A04" strokeWidth="3" />
        <path d="M260,45 Q300,75 340,45 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
        <circle cx="270" cy="55" r="4" fill="#FFFFFF" />
        <circle cx="300" cy="62" r="5" fill="#FFFFFF" />
        <circle cx="330" cy="55" r="4" fill="#FFFFFF" />

        {/* Left Chandelier */}
        <line x1="150" y1="0" x2="150" y2="35" stroke="#CA8A04" strokeWidth="2" />
        <path d="M125,35 Q150,60 175,35 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />

        {/* Right Chandelier */}
        <line x1="450" y1="0" x2="450" y2="35" stroke="#CA8A04" strokeWidth="2" />
        <path d="M425,35 Q450,60 475,35 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />

        {/* Polished Marble Ballroom Floor */}
        <path d="M0,230 L600,230 L600,320 L0,320 Z" fill="#FEF3C7" />
        <line x1="0" y1="230" x2="600" y2="230" stroke="#F59E0B" strokeWidth="3" />

        {/* Confetti & Golden Sparkle bursts */}
        {[
          [100, 120, '#F43F5E'], [180, 100, '#38BDF8'], [240, 140, '#FACC15'],
          [360, 130, '#A855F7'], [440, 110, '#34D399'], [520, 135, '#FB7185']
        ].map(([x, y, c], i) => (
          <circle key={i} cx={Number(x)} cy={Number(y)} r="4" fill={String(c)} />
        ))}
      </svg>
    ),
    characters: [
      {
        id: 'lily',
        name: 'Queen Lily',
        emoji: '👸',
        x: 48,
        y: 62,
        size: 82,
        speech: 'Thank you for helping me find my star, sweet Princess! 👑💖',
        soundType: 'twinkle',
        animation: 'bounce',
      },
      {
        id: 'unicorn',
        name: 'Sparkle',
        emoji: '🦄',
        x: 22,
        y: 65,
        size: 72,
        speech: 'Neigh! Let us dance the royal waltz together! 🎶',
        soundType: 'neigh',
        animation: 'wiggle',
      },
      {
        id: 'coral',
        name: 'Coral',
        emoji: '🧜‍♀️',
        x: 74,
        y: 66,
        size: 68,
        speech: 'Hooray for true friendship and starlight magic! 🫧',
        soundType: 'giggle',
        animation: 'spin',
      },
      {
        id: 'crown',
        name: 'Starlight Crown',
        emoji: '👑',
        x: 48,
        y: 32,
        size: 56,
        speech: 'FLASH! Shining brighter than all the stars! ✨',
        soundType: 'chime',
        animation: 'pulse',
      },
      {
        id: 'cake',
        name: 'Celebration Cake',
        emoji: '🎂',
        x: 88,
        y: 68,
        size: 52,
        speech: 'Sweet treats for everyone at the royal ball! 🍰',
        soundType: 'pop',
        animation: 'bounce',
      },
    ],
  },
];
