import React from 'react';

// Common cartoon kawaii eyes + blush helper for icons
export const KawaiiFace: React.FC<{ cx?: number; cy?: number; spacing?: number }> = ({
  cx = 24,
  cy = 25,
  spacing = 7,
}) => (
  <g className="pointer-events-none select-none">
    {/* Left eye with shine */}
    <circle cx={cx - spacing} cy={cy} r={1.9} fill="#4A3B5C" />
    <circle cx={cx - spacing - 0.6} cy={cy - 0.7} r={0.8} fill="#FFFFFF" />

    {/* Right eye with shine */}
    <circle cx={cx + spacing} cy={cy} r={1.9} fill="#4A3B5C" />
    <circle cx={cx + spacing - 0.6} cy={cy - 0.7} r={0.8} fill="#FFFFFF" />

    {/* Rosy blush cheeks */}
    <ellipse cx={cx - spacing - 2} cy={cy + 2.2} rx={2.2} ry={1.2} fill="#FF8FB1" opacity={0.7} />
    <ellipse cx={cx + spacing + 2} cy={cy + 2.2} rx={2.2} ry={1.2} fill="#FF8FB1" opacity={0.7} />

    {/* Sweet little smile */}
    <path
      d={`M ${cx - 2.5} ${cy + 1.8} Q ${cx} ${cy + 4.2} ${cx + 2.5} ${cy + 1.8}`}
      stroke="#4A3B5C"
      strokeWidth={1.4}
      strokeLinecap="round"
      fill="none"
    />
  </g>
);

// 1. Storybook Icon
export const CartoonBookIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Book Cover */}
    <path
      d="M10 11C10 9.34 11.34 8 13 8H35C36.66 8 38 9.34 38 11V37C38 38.66 36.66 40 35 40H13C11.34 40 10 38.66 10 37V11Z"
      fill="#FFB6D9"
      stroke="#FF6FA5"
      strokeWidth={2.4}
    />
    {/* Page layers */}
    <path
      d="M14 11H34C35.1 11 36 11.9 36 13V35C36 36.1 35.1 37 34 37H14V11Z"
      fill="#FFF9E6"
    />
    {/* Book Spine */}
    <path
      d="M10 10C10 8.9 10.9 8 12 8H15V40H12C10.9 40 10 39.1 10 38V10Z"
      fill="#FF6FA5"
    />
    {/* Golden Star Ribbon Bookmark */}
    <path d="M22 8V18L25 15.5L28 18V8H22Z" fill="#FFD23F" stroke="#E5B20A" strokeWidth={1} />
    {/* Cute Face on book cover */}
    <KawaiiFace cx={25} cy={26} spacing={5.5} />
    {/* Twinkle sparkle */}
    <path d="M34 10L35 7L36 10L39 11L36 12L35 15L34 12L31 11L34 10Z" fill="#FFD23F" />
  </svg>
);

// 2. Music Icon
export const CartoonMusicIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Horizontal connecting beam */}
    <path
      d="M16 16C16 14.9 16.9 14 18 14H36C37.1 14 38 14.9 38 16V20C38 21.1 37.1 22 36 22H18C16.9 22 16 21.1 16 20V16Z"
      fill="#3FAE87"
    />
    {/* Stems */}
    <rect x="16" y="18" width="4" height="18" rx="2" fill="#3FAE87" />
    <rect x="34" y="18" width="4" height="18" rx="2" fill="#3FAE87" />
    {/* Note heads */}
    <ellipse cx="14" cy="35" rx="7" ry="5.5" fill="#58D1A8" stroke="#3FAE87" strokeWidth={2} />
    <ellipse cx="32" cy="34" rx="7" ry="5.5" fill="#58D1A8" stroke="#3FAE87" strokeWidth={2} />
    {/* Kawaii face on left note */}
    <KawaiiFace cx={14} cy={34} spacing={3.2} />
    {/* Kawaii face on right note */}
    <KawaiiFace cx={32} cy={33} spacing={3.2} />
    {/* Little melody sparkles */}
    <path d="M26 9L27 6L28 9L31 10L28 11L27 14L26 11L23 10L26 9Z" fill="#FFD23F" />
    <circle cx="8" cy="18" r="2" fill="#FF8FB1" />
  </svg>
);

// 3. Paint Palette & Brush Icon
export const CartoonPaletteIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Chunky Wooden/Cream Palette */}
    <path
      d="M10 24C10 15 17 8 26 8C35 8 40 14 40 21C40 25 37 28 33 28C30.5 28 29.5 29.5 30 32C30.5 35 29 40 23 40C15 40 10 33 10 24Z"
      fill="#FFF0C7"
      stroke="#E5B20A"
      strokeWidth={2.4}
    />
    {/* Thumb hole */}
    <circle cx="16" cy="32" r="3.2" fill="#FFE39F" stroke="#E5B20A" strokeWidth={1.5} />
    {/* Paint dollops */}
    <circle cx="17" cy="17" r="3.6" fill="#FF6FA5" />
    <circle cx="25" cy="13" r="3.6" fill="#5CE1E6" />
    <circle cx="33" cy="17" r="3.6" fill="#A78BFA" />
    <circle cx="34" cy="24" r="3.2" fill="#4ADE80" />
    {/* Palette face */}
    <KawaiiFace cx={24} cy={27} spacing={4.5} />
    {/* Little paintbrush sticking out */}
    <path d="M36 30L44 22" stroke="#8D5B4C" strokeWidth={3} strokeLinecap="round" />
    <path d="M42 24L45 21" stroke="#FF6FA5" strokeWidth={4} strokeLinecap="round" />
  </svg>
);

// 4. Dress Up Icon
export const CartoonDressIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Dress Bodice */}
    <path
      d="M18 10C18 10 21 13 24 13C27 13 30 10 30 10L32 19H16L18 10Z"
      fill="#D6C4FF"
      stroke="#8A6FE0"
      strokeWidth={2}
    />
    {/* Puffy sleeves */}
    <circle cx="15" cy="13" r="4.5" fill="#E8DEFF" stroke="#8A6FE0" strokeWidth={1.8} />
    <circle cx="33" cy="13" r="4.5" fill="#E8DEFF" stroke="#8A6FE0" strokeWidth={1.8} />
    {/* Big Royal Ballgown Skirt */}
    <path
      d="M16 19C16 19 10 32 9 37C8.5 39 10 40 12 40H36C38 40 39.5 39 39 37C38 32 32 19 32 19H16Z"
      fill="#C5ADFF"
      stroke="#8A6FE0"
      strokeWidth={2.4}
    />
    {/* Scalloped hem */}
    <path
      d="M10 37Q14 34 18 37Q22 34 26 37Q30 34 34 37Q38 34 39 37"
      stroke="#FFFFFF"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
    />
    {/* Sparkling bow at waist */}
    <ellipse cx="24" cy="19" rx="3.5" ry="2.2" fill="#FF8FB1" />
    <circle cx="24" cy="19" r="1.5" fill="#FFD23F" />
    {/* Kawaii Face on skirt */}
    <KawaiiFace cx={24} cy={27} spacing={4.5} />
    {/* Sparkles */}
    <path d="M37 10L38 7L39 10L42 11L39 12L38 15L37 12L34 11L37 10Z" fill="#FFD23F" />
  </svg>
);

// 5. Tea Party Teacup Icon
export const CartoonTeacupIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Saucer */}
    <ellipse cx="24" cy="38" rx="16" ry="3.5" fill="#FFD6E8" stroke="#FF6FA5" strokeWidth={2} />
    {/* Teacup handle */}
    <path
      d="M32 20C37 20 38 27 34 30C32 31.5 30 31 30 31"
      stroke="#FF6FA5"
      strokeWidth={2.6}
      strokeLinecap="round"
      fill="none"
    />
    {/* Cup Body */}
    <path
      d="M14 17H34C34 17 34 32 24 32C14 32 14 17 14 17Z"
      fill="#FFE5F0"
      stroke="#FF6FA5"
      strokeWidth={2.4}
    />
    {/* Tea liquid */}
    <ellipse cx="24" cy="17" rx="10" ry="2.5" fill="#FFB6D9" />
    {/* Floating Heart Steam */}
    <path
      d="M23 7C23 7 21 5 19 6.5C17.5 7.8 18 10 23 13C28 10 28.5 7.8 27 6.5C25 5 23 7 23 7Z"
      fill="#FF8FB1"
      opacity={0.85}
    />
    {/* Cute Face on cup */}
    <KawaiiFace cx={24} cy={23.5} spacing={4} />
  </svg>
);

// 6. Interlocking Puzzle Buddies Icon
export const CartoonPuzzleIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Left Puzzle Buddy (Mint) */}
    <path
      d="M10 14C10 12.3 11.3 11 13 11H23V15C25 15 26 16.5 26 18C26 19.5 25 21 23 21V29H13C11.3 29 10 27.7 10 26V14Z"
      fill="#6EE7B7"
      stroke="#2FA97F"
      strokeWidth={2.2}
    />
    <KawaiiFace cx={16} cy={19} spacing={2.8} />

    {/* Right Puzzle Buddy (Yellow/Peach) */}
    <path
      d="M23 18C23 16.5 24 15 26 15V21C24 21 23 19.5 23 18ZM26 15H35C36.7 15 38 16.3 38 18V30C38 31.7 36.7 33 35 33H25C23.3 33 22 31.7 22 30V21H26V15Z"
      fill="#FDE68A"
      stroke="#D97706"
      strokeWidth={2.2}
    />
    <KawaiiFace cx={31} cy={24} spacing={2.8} />

    {/* Hearts between them */}
    <circle cx="24" cy="10" r="2.2" fill="#FF6FA5" />
    <path d="M37 11L38 9L39 11L41 12L39 13L38 15L37 13L35 12L37 11Z" fill="#FFD23F" />
  </svg>
);

// 7. Pet Spa Bubble Bunny Icon
export const CartoonPetSpaIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Bunny Ears */}
    <ellipse cx="18" cy="14" rx="3.5" ry="8" fill="#FFFFFF" stroke="#FFB6D9" strokeWidth={2} />
    <ellipse cx="18" cy="14" rx="1.8" ry="5.5" fill="#FFB6D9" />
    <ellipse cx="30" cy="14" rx="3.5" ry="8" fill="#FFFFFF" stroke="#FFB6D9" strokeWidth={2} />
    <ellipse cx="30" cy="14" rx="1.8" ry="5.5" fill="#FFB6D9" />

    {/* Bunny Head */}
    <circle cx="24" cy="24" r="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth={2} />

    {/* Bubbles on head */}
    <circle cx="21" cy="15" r="3.5" fill="#C8F1FF" opacity={0.9} />
    <circle cx="26" cy="14" r="4" fill="#C8F1FF" opacity={0.9} />
    <circle cx="24" cy="16" r="3" fill="#FFFFFF" />

    {/* Bunny Kawaii Face with nose */}
    <KawaiiFace cx={24} cy={24.5} spacing={3.8} />
    {/* Cute pink bunny nose */}
    <ellipse cx="24" cy="26" rx="1.4" ry="1.1" fill="#FF6FA5" />

    {/* Big Bathtub Suds */}
    <ellipse cx="24" cy="35" rx="17" ry="5.5" fill="#E0F7FF" stroke="#38BDF8" strokeWidth={2} />
    <circle cx="12" cy="33" r="4" fill="#BAE6FD" />
    <circle cx="36" cy="33" r="4" fill="#BAE6FD" />
    <circle cx="16" cy="29" r="3.2" fill="#E0F7FF" />
    <circle cx="32" cy="29" r="3.2" fill="#E0F7FF" />
    <circle cx="38" cy="20" r="2.2" fill="#BAE6FD" />
  </svg>
);

// 8. Magic Wand Icon
export const CartoonMagicWandIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Wand stick */}
    <line x1="12" y1="36" x2="28" y2="20" stroke="#E3D6FF" strokeWidth={5} strokeLinecap="round" />
    <line x1="12" y1="36" x2="28" y2="20" stroke="#8A6FE0" strokeWidth={2} strokeLinecap="round" />

    {/* Star Head */}
    <path
      d="M32 7L34.5 13L41 14L36 18.5L37.5 25L32 21.5L26.5 25L28 18.5L23 14L29.5 13L32 7Z"
      fill="#FFE066"
      stroke="#F59E0B"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    {/* Kawaii Face on star */}
    <KawaiiFace cx={32} cy={17} spacing={2.8} />

    {/* Swirling Sparkles */}
    <path d="M16 12L17 9L18 12L21 13L18 14L17 17L16 14L13 13L16 12Z" fill="#FF6FA5" />
    <path d="M10 24L11 21L12 24L15 25L12 26L11 29L10 26L7 25L10 24Z" fill="#38BDF8" />
    <circle cx="21" cy="28" r="2" fill="#FBBF24" />
    <circle cx="26" cy="34" r="1.5" fill="#FF8FB1" />
  </svg>
);

// 9. Shapes Icon
export const CartoonShapesIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Cute Diamond */}
    <path
      d="M17 9L25 9L30 15L21 28L12 15L17 9Z"
      fill="#93C5FD"
      stroke="#2563EB"
      strokeWidth={2.2}
      strokeLinejoin="round"
    />
    <path d="M12 15H30M21 28L19 15M21 28L23 15M17 9L19 15M25 9L23 15" stroke="#BFDBFE" strokeWidth={1.2} />
    <KawaiiFace cx={21} cy={16} spacing={2.6} />

    {/* Cute Smiling Heart */}
    <path
      d="M29 25C29 25 26 22 23 24C20.5 25.8 21 29 29 36C37 29 37.5 25.8 35 24C32 22 29 25 29 25Z"
      fill="#F472B6"
      stroke="#DB2777"
      strokeWidth={2}
    />
    <KawaiiFace cx={29} cy={27.5} spacing={2.5} />
  </svg>
);

// 10. Royal Dance Ball Icon
export const CartoonBallIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Sparkling Princess Slipper */}
    <path
      d="M10 28C10 28 13 25 19 25C25 25 28 28 32 28C36 28 40 25 40 32C40 36 36 37 32 37H16C12 37 10 33 10 28Z"
      fill="#DDD6FE"
      stroke="#7C3AED"
      strokeWidth={2.2}
    />
    {/* Heel */}
    <path d="M12 37V41C12 41.6 12.4 42 13 42H15C15.6 42 16 41.6 16 41V37" fill="#7C3AED" />
    {/* Sparkling heart on shoe tip */}
    <path
      d="M34 26C34 26 32 24.5 30.5 25.5C29.5 26.5 30 28 34 31C38 28 38.5 26.5 37.5 25.5C36 24.5 34 26 34 26Z"
      fill="#FF6FA5"
    />
    {/* Kawaii Face on shoe */}
    <KawaiiFace cx={23} cy={30.5} spacing={3.2} />
    {/* Musical sparkles */}
    <path d="M22 13L23 10L24 13L27 14L24 15L23 18L22 15L19 14L22 13Z" fill="#FBBF24" />
    <path d="M33 11L34 8L35 11L38 12L35 13L34 16L33 13L30 12L33 11Z" fill="#F472B6" />
  </svg>
);

// 11. Crown Decorator Icon
export const CartoonCrownIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Crown Base & Spikes */}
    <path
      d="M8 35L11 17L19 24L24 12L29 24L37 17L40 35H8Z"
      fill="#FDE047"
      stroke="#CA8A04"
      strokeWidth={2.4}
      strokeLinejoin="round"
    />
    {/* Bottom band */}
    <path d="M8 35H40V38C40 39.1 39.1 40 38 40H10C8.9 40 8 39.1 8 38V35Z" fill="#EAB308" />
    {/* Pearls on tips */}
    <circle cx="11" cy="16" r="2.8" fill="#FF8FB1" stroke="#CA8A04" strokeWidth={1.2} />
    <circle cx="24" cy="11" r="3.2" fill="#38BDF8" stroke="#CA8A04" strokeWidth={1.2} />
    <circle cx="37" cy="16" r="2.8" fill="#C084FC" stroke="#CA8A04" strokeWidth={1.2} />
    {/* Jewels on band */}
    <circle cx="16" cy="37.5" r="1.6" fill="#F43F5E" />
    <circle cx="24" cy="37.5" r="1.8" fill="#38BDF8" />
    <circle cx="32" cy="37.5" r="1.6" fill="#4ADE80" />
    {/* Kawaii Face on crown */}
    <KawaiiFace cx={24} cy={28} spacing={4.2} />
  </svg>
);

// 12. Bubbles Icon
export const CartoonBubblesIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Main big bubble */}
    <circle cx="21" cy="27" r="14" fill="#BAE6FD" opacity={0.8} stroke="#38BDF8" strokeWidth={2.2} />
    {/* Bubble sheen reflections */}
    <path
      d="M13 21C14 17 18 15 22 15"
      stroke="#FFFFFF"
      strokeWidth={2.4}
      strokeLinecap="round"
    />
    <circle cx="27" cy="18" r="1.5" fill="#FFFFFF" />
    {/* Kawaii Face on main bubble */}
    <KawaiiFace cx={21} cy={27} spacing={4} />

    {/* Little satellite bubbles */}
    <circle cx="36" cy="16" r="7" fill="#FBCFE8" opacity={0.85} stroke="#F472B6" strokeWidth={1.8} />
    <path d="M33 13C34 11 36 10 38 10" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" />
    <KawaiiFace cx={36} cy={16} spacing={2} />

    <circle cx="34" cy="35" r="4.5" fill="#DDD6FE" opacity={0.85} stroke="#8B5CF6" strokeWidth={1.5} />
    <circle cx="10" cy="13" r="3" fill="#BBF7D0" opacity={0.85} stroke="#4ADE80" strokeWidth={1.2} />
  </svg>
);

// 13. Stickers Star Icon
export const CartoonStickerStarIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Glowing chubby kawaii star */}
    <path
      d="M24 6L28.5 17.5L40 18.5L31 26.5L34 38.5L24 32L14 38.5L17 26.5L8 18.5L19.5 17.5L24 6Z"
      fill="#FDE047"
      stroke="#EAB308"
      strokeWidth={2.4}
      strokeLinejoin="round"
    />
    {/* Big expressive kawaii face */}
    <KawaiiFace cx={24} cy={23} spacing={3.6} />
    {/* Twinkles around star */}
    <path d="M38 8L39 5L40 8L43 9L40 10L39 13L38 10L35 9L38 8Z" fill="#FF6FA5" />
    <circle cx="9" cy="33" r="2" fill="#38BDF8" />
  </svg>
);

// 14. Cartoon Cozy Cottage (Dock Home)
export const CartoonHomeIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    {/* Chimney puff */}
    <circle cx="23" cy="6" r="1.5" fill="#FFD6E8" />
    <circle cx="24" cy="4" r="1.2" fill="#FFD6E8" opacity={0.7} />
    <rect x="21" y="8" width="3.5" height="5" fill="#FF6FA5" rx="0.8" />
    {/* Roof */}
    <path d="M5 16L16 6L27 16H5Z" fill="#FF6FA5" stroke="#FF4081" strokeWidth={1.5} strokeLinejoin="round" />
    {/* House body */}
    <rect x="7" y="16" width="18" height="12" rx="3" fill="#FFFFFF" stroke="#FF6FA5" strokeWidth={1.5} />
    {/* Door with heart */}
    <rect x="13" y="20" width="6" height="8" rx="2" fill="#FFD6E8" />
    <circle cx="17.5" cy="24" r="0.8" fill="#FF6FA5" />
    {/* Window */}
    <circle cx="11" cy="20" r="2" fill="#FFF1C2" stroke="#FFD6E8" strokeWidth={1} />
  </svg>
);

// 15. Cartoon Surprise Gift Box (Dock Gift)
export const CartoonGiftIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    {/* Big Bow */}
    <ellipse cx="12" cy="8" rx="3.5" ry="2.5" fill="#FF6FA5" stroke="#FF3377" strokeWidth={1.2} />
    <ellipse cx="20" cy="8" rx="3.5" ry="2.5" fill="#FF6FA5" stroke="#FF3377" strokeWidth={1.2} />
    <circle cx="16" cy="8.5" r="1.8" fill="#FFD23F" />

    {/* Lid */}
    <rect x="5" y="10" width="22" height="5" rx="2" fill="#FFE3EF" stroke="#FF6FA5" strokeWidth={1.4} />
    {/* Box body */}
    <rect x="7" y="15" width="18" height="13" rx="2.5" fill="#FFF1F7" stroke="#FF6FA5" strokeWidth={1.4} />
    {/* Golden ribbon ribbons */}
    <rect x="14" y="10" width="4" height="18" fill="#FFD23F" />
    {/* Cheerful Polka dots */}
    <circle cx="10.5" cy="19" r="1.2" fill="#FF8FB1" />
    <circle cx="21.5" cy="23" r="1.2" fill="#FF8FB1" />
  </svg>
);

// 16. Cartoon Sound Speaker (Dock / Header Sound)
export const CartoonSoundIcon: React.FC<{ isMuted: boolean; className?: string }> = ({
  isMuted,
  className = 'w-6 h-6',
}) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    {/* Speaker body */}
    <path
      d="M7 12H11L17 7V25L11 20H7C6 20 5 19 5 18V14C5 13 6 12 7 12Z"
      fill={isMuted ? '#CBD5E1' : '#E3D6FF'}
      stroke={isMuted ? '#94A3B8' : '#8A6FE0'}
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
    {isMuted ? (
      /* Cross line */
      <path d="M21 12L27 20M27 12L21 20" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round" />
    ) : (
      /* Cheerful musical waves */
      <>
        <path d="M20 12C22 14 22 18 20 20" stroke="#8A6FE0" strokeWidth={2} strokeLinecap="round" />
        <path d="M23 9C26 13 26 19 23 23" stroke="#FF6FA5" strokeWidth={2} strokeLinecap="round" />
        {/* Floating tiny note */}
        <circle cx="27" cy="8" r="1.5" fill="#FFD23F" />
      </>
    )}
  </svg>
);

// 17. Cartoon Hero Mascot Crown with Kawaii Face
export const CartoonHeroCrown: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    {/* Glowing Sunburst background sparkles */}
    <circle cx="32" cy="34" r="26" fill="#FFF5F9" opacity={0.6} />

    {/* Crown Base */}
    <path
      d="M10 44L14 20L25 30L32 14L39 30L50 20L54 44H10Z"
      fill="#FDE047"
      stroke="#CA8A04"
      strokeWidth={3}
      strokeLinejoin="round"
    />
    {/* Base rim */}
    <rect x="10" y="44" width="44" height="7" rx="3.5" fill="#EAB308" stroke="#CA8A04" strokeWidth={1.5} />

    {/* Jewels on peaks */}
    <circle cx="14" cy="18" r="4.2" fill="#FF8FB1" stroke="#CA8A04" strokeWidth={1.8} />
    <circle cx="32" cy="12" r="5" fill="#38BDF8" stroke="#CA8A04" strokeWidth={2} />
    <circle cx="50" cy="18" r="4.2" fill="#C084FC" stroke="#CA8A04" strokeWidth={1.8} />

    {/* Sparkle highlights on pearls */}
    <circle cx="12.5" cy="16.5" r="1.2" fill="#FFFFFF" />
    <circle cx="30.5" cy="10" r="1.5" fill="#FFFFFF" />
    <circle cx="48.5" cy="16.5" r="1.2" fill="#FFFFFF" />

    {/* Kawaii Face on Crown */}
    <KawaiiFace cx={32} cy={35} spacing={5.5} />

    {/* Sparkling star bursts */}
    <path d="M52 10L53.5 6L55 10L59 11.5L55 13L53.5 17L52 13L48 11.5L52 10Z" fill="#F59E0B" />
    <path d="M9 28L10 25L11 28L14 29L11 30L10 33L9 30L6 29L9 28Z" fill="#FF6FA5" />
    <circle cx="20" cy="47.5" r="2" fill="#F43F5E" />
    <circle cx="32" cy="47.5" r="2.2" fill="#38BDF8" />
    <circle cx="44" cy="47.5" r="2" fill="#4ADE80" />
  </svg>
);

// 18. Cartoon Royal Gallery Frame Icon
export const CartoonGalleryIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Outer Gilded Golden Picture Frame */}
    <rect
      x="6"
      y="8"
      width="36"
      height="32"
      rx="7"
      fill="#FDE047"
      stroke="#CA8A04"
      strokeWidth={2.4}
    />
    {/* Inner Matting Border */}
    <rect
      x="10"
      y="12"
      width="28"
      height="24"
      rx="4"
      fill="#FFFBEB"
      stroke="#EAB308"
      strokeWidth={1.5}
    />
    {/* Canvas Artwork Background */}
    <rect
      x="13"
      y="15"
      width="22"
      height="18"
      rx="3"
      fill="#E0F2FE"
    />
    {/* Painted Landscape in Canvas: Pink rolling hill */}
    <path
      d="M13 27C17 24 21 28 25 25C29 22 32 26 35 25V33H13V27Z"
      fill="#F472B6"
    />
    {/* Golden Painted Sun with Kawaii Face */}
    <circle cx="24" cy="21" r="4.5" fill="#FACC15" />
    <KawaiiFace cx={24} cy={21} spacing={1.5} />
    {/* Ornate Golden Crown Crest on Top Frame */}
    <path
      d="M20 8L22 4L24 6L26 4L28 8H20Z"
      fill="#FACC15"
      stroke="#CA8A04"
      strokeWidth={1.2}
      strokeLinejoin="round"
    />
    {/* Sparkling gems on corners */}
    <circle cx="9" cy="11" r="1.5" fill="#F43F5E" />
    <circle cx="39" cy="11" r="1.5" fill="#38BDF8" />
    <circle cx="9" cy="37" r="1.5" fill="#38BDF8" />
    <circle cx="39" cy="37" r="1.5" fill="#F43F5E" />
    {/* Twinkle Star */}
    <path d="M37 6L38 3L39 6L42 7L39 8L38 11L37 8L34 7L37 6Z" fill="#FACC15" />
  </svg>
);

