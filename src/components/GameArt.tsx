import React, { useId } from 'react';
import { KawaiiFace } from './CartoonIcons';

// Original hand-drawn (SVG) cartoon artwork used in place of emoji across
// Magic Wand Coloring, Chunky Dress-Up, Royal Tea Party, Musical Gems and
// Bubble Pop. Everything here is vector shapes built from scratch to match
// the app's existing kawaii illustration style (see CartoonIcons.tsx) —
// no emoji glyphs anywhere in this file.

const INK = '#4A3B5C';

/** A small four-point twinkle, reused wherever a sparkle accent is needed. */
export const TwinkleStar: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-4 h-4',
  color = '#FFD23F',
}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
      fill={color}
      stroke={INK}
      strokeWidth={1.2}
      strokeLinejoin="round"
    />
  </svg>
);

/** Original heart shape (not the emoji glyph) for happy reactions / bows. */
export const HeartShape: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = '#FF6FA5',
}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 21C12 21 3 15 3 8.5C3 5.5 5.5 3 8.5 3C10.3 3 11.5 3.9 12 4.9C12.5 3.9 13.7 3 15.5 3C18.5 3 21 5.5 21 8.5C21 15 12 21 12 21Z"
      fill={color}
      stroke={INK}
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Chunky Dress-Up artwork
// ---------------------------------------------------------------------------

export const TiaraArt: React.FC<{ className?: string; color: string; gem: string }> = ({
  className = 'w-8 h-8',
  color,
  gem,
}) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M8 32 L8 24 L16 32 L20 18 L24 30 L28 18 L32 32 L40 24 L40 32 Z"
      fill={color}
      stroke={INK}
      strokeWidth={2.2}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <rect x="8" y="32" width="32" height="6" rx="2.5" fill={color} stroke={INK} strokeWidth={2.2} />
    <circle cx="24" cy="27" r="4" fill={gem} stroke={INK} strokeWidth={1.8} />
    <circle cx="13" cy="29" r="2" fill={gem} opacity={0.9} />
    <circle cx="35" cy="29" r="2" fill={gem} opacity={0.9} />
  </svg>
);

export const GownArt: React.FC<{ className?: string; color1: string; color2: string; accent: string }> = ({
  className = 'w-8 h-8',
  color1,
  color2,
  accent,
}) => {
  const gradId = useId();
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color1} />
          <stop offset="1" stopColor={color2} />
        </linearGradient>
      </defs>
      {/* A short, shallow bodice on top of a tall, dominant flared skirt —
          deliberately asymmetric (unlike a symmetric hourglass) and with
          no narrow neck at the very top, so it reads as a dress rather
          than a flask or an hourglass. */}
      <path
        d="M16 8L32 8L29 17L42 42H6L19 17Z"
        fill={`url(#${gradId})`}
        stroke={INK}
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      {/* Neckline curve */}
      <path d="M21 8.5Q24 11.5 27 8.5" fill="none" stroke={accent} strokeWidth={1.6} strokeLinecap="round" />
      {/* Waist belt accent */}
      <path d="M20 17H28" stroke={accent} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
};

export const ShoeArt: React.FC<{ className?: string; color: string; accent: string }> = ({
  className = 'w-8 h-8',
  color,
  accent,
}) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Rounded slipper, seen from above, with a strap and button */}
    <path
      d="M24 6C13.5 6 7 14 7 24C7 34 13.5 42 24 42C34.5 42 41 34 41 24C41 14 34.5 6 24 6Z"
      fill={color}
      stroke={INK}
      strokeWidth={2.2}
    />
    <path d="M11 19Q24 14 37 19" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" />
    <circle cx="24" cy="15" r="3" fill={accent} stroke={INK} strokeWidth={1.5} />
  </svg>
);

// ---------------------------------------------------------------------------
// Character portraits (Tea Party guests, reused by other games)
// ---------------------------------------------------------------------------

export const PrincessPortrait: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <path d="M16 32C16 21 23 13 32 13C41 13 48 21 48 32V40C48 46 41 51 32 51C23 51 16 46 16 40Z" fill="#FDE68A" stroke={INK} strokeWidth={2.2} />
    <path d="M14 30 Q10 20 20 16 Q24 10 32 12 Q40 10 44 16 Q54 20 50 30 Q44 22 32 22 Q20 22 14 30Z" fill="#FB923C" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
    <path d="M20 17L23 8L27 15L32 6L37 15L41 8L44 17Z" fill="#FACC15" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
    <circle cx="32" cy="12" r="2.3" fill="#F43F5E" stroke={INK} strokeWidth={1.4} />
    <KawaiiFace cx={32} cy={34} spacing={7} />
  </svg>
);

export const UnicornPortrait: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <path d="M16 34C16 23 23 15 32 15C41 15 48 23 48 34V40C48 46 41 51 32 51C23 51 16 46 16 40Z" fill="#FFFFFF" stroke={INK} strokeWidth={2.2} />
    <path d="M30 16L34 3L32 17Z" fill="#FACC15" stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
    <path d="M18 22C12 20 8 24 10 30C14 26 18 26 20 28Z" fill="#F472B6" stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
    <path d="M46 22C52 20 56 24 54 30C50 26 46 26 44 28Z" fill="#C084FC" stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
    <path d="M20 18L24 12L26 19Z" fill="#FFFFFF" stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
    <path d="M44 18L40 12L38 19Z" fill="#FFFFFF" stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
    <KawaiiFace cx={32} cy={35} spacing={7} />
  </svg>
);

export const BunnyPortrait: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <path d="M22 4C18 4 16 9 17 16C19 13 22 12 24 13Z" fill="#FDF2F8" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
    <path d="M42 4C46 4 48 9 47 16C45 13 42 12 40 13Z" fill="#FDF2F8" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
    <path d="M23 8C21 6 20 10 20.5 15" fill="none" stroke="#FDA4AF" strokeWidth={1.6} strokeLinecap="round" />
    <path d="M41 8C43 6 44 10 43.5 15" fill="none" stroke="#FDA4AF" strokeWidth={1.6} strokeLinecap="round" />
    <path d="M16 34C16 23 23 15 32 15C41 15 48 23 48 34V40C48 46 41 51 32 51C23 51 16 46 16 40Z" fill="#FDF2F8" stroke={INK} strokeWidth={2.2} />
    <KawaiiFace cx={32} cy={35} spacing={7} />
  </svg>
);

export const FrogPortrait: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <path d="M17 30C17 21 23 15 32 15C41 15 47 21 47 30V38C47 46 41 51 32 51C23 51 17 46 17 38Z" fill="#86EFAC" stroke={INK} strokeWidth={2.2} />
    <circle cx="21" cy="16" r="7" fill="#86EFAC" stroke={INK} strokeWidth={2} />
    <circle cx="43" cy="16" r="7" fill="#86EFAC" stroke={INK} strokeWidth={2} />
    <circle cx="21" cy="16" r="2.6" fill={INK} />
    <circle cx="43" cy="16" r="2.6" fill={INK} />
    <path d="M20 40Q32 48 44 40" stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round" />
    <ellipse cx="26" cy="30" rx="2.4" ry="1.6" fill="#FDA4AF" opacity={0.6} />
    <ellipse cx="38" cy="30" rx="2.4" ry="1.6" fill="#FDA4AF" opacity={0.6} />
  </svg>
);

// ---------------------------------------------------------------------------
// Royal Tea Party — food & table props
// ---------------------------------------------------------------------------

export const CupcakeArt: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M12 26H36L32 42C32 43 31 44 29 44H19C17 44 16 43 16 42Z" fill="#EC4899" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
    <path d="M13 27L15 33M20 27L20 34M28 27L28 34M35 27L33 33" stroke="#BE185D" strokeWidth={1.4} strokeLinecap="round" />
    <path d="M14 26C14 17 18 13 24 13C30 13 34 17 34 26Z" fill="#FDF2F8" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
    <circle cx="24" cy="10" r="3" fill="#F43F5E" stroke={INK} strokeWidth={1.6} />
  </svg>
);

export const TeacupArt: React.FC<{ className?: string; fillPercent: number }> = ({
  className = 'w-8 h-8',
  fillPercent,
}) => {
  const clipId = useId();
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <clipPath id={clipId}>
          <path d="M10 20H34V30C34 36 29 40 22 40C15 40 10 36 10 30Z" />
        </clipPath>
      </defs>
      <path d="M34 22H38C41 22 42 25 40 28C39 30 36 30 34 29" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
      <path d="M10 20H34V30C34 36 29 40 22 40C15 40 10 36 10 30Z" fill="#FFFFFF" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
      <rect x="10" y={40 - (20 * fillPercent) / 100} width="24" height={(20 * fillPercent) / 100} fill="#D97706" clipPath={`url(#${clipId})`} />
      <ellipse cx="22" cy="20" rx="12" ry="3" fill="#FDF2F8" stroke={INK} strokeWidth={2} />
    </svg>
  );
};

export const TeapotArt: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M22 8L24 4L26 8Z" fill="#FACC15" stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
    <path
      d="M10 26C10 18 16 13 24 13C32 13 38 18 38 26C38 33 32 38 24 38C16 38 10 33 10 26Z"
      fill="#F472B6"
      stroke={INK}
      strokeWidth={2.2}
    />
    <path d="M8 22H4C4 22 4 28 9 29" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
    <path d="M38 24H44C44 27 42 30 38 30" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
    <ellipse cx="24" cy="14" rx="9" ry="2.4" fill="#FBCFE8" stroke={INK} strokeWidth={1.6} />
  </svg>
);

export const FlowerArt: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#F472B6',
}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="7" r="4" fill={color} stroke={INK} strokeWidth={1.2} />
    <circle cx="12" cy="17" r="4" fill={color} stroke={INK} strokeWidth={1.2} />
    <circle cx="7" cy="12" r="4" fill={color} stroke={INK} strokeWidth={1.2} />
    <circle cx="17" cy="12" r="4" fill={color} stroke={INK} strokeWidth={1.2} />
    <circle cx="12" cy="12" r="3.4" fill="#FDE047" stroke={INK} strokeWidth={1.2} />
  </svg>
);

export const PlateArt: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <ellipse cx="24" cy="24" rx="18" ry="10" fill="#FDF2F8" stroke={INK} strokeWidth={2.2} />
    <ellipse cx="24" cy="24" rx="9" ry="5" fill="#FBCFE8" stroke={INK} strokeWidth={1.4} />
  </svg>
);

// ---------------------------------------------------------------------------
// Musical Gems
// ---------------------------------------------------------------------------

export const CrystalArt: React.FC<{ className?: string; color: string }> = ({
  className = 'w-10 h-10',
  color,
}) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 4L42 18L24 44L6 18Z" fill={color} stroke="#FFFFFF" strokeWidth={2} strokeLinejoin="round" />
    <path d="M24 4L14 18H34Z" fill="#FFFFFF" opacity={0.4} />
    <path d="M24 4V44M14 18H34" stroke="#FFFFFF" strokeWidth={1.2} opacity={0.55} />
  </svg>
);

// ---------------------------------------------------------------------------
// Bubble Pop surprises
// ---------------------------------------------------------------------------

export const DropletArt: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-4 h-4',
  color = '#38BDF8',
}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2C12 2 5 12 5 16.5C5 20.1 8.1 23 12 23C15.9 23 19 20.1 19 16.5C19 12 12 2 12 2Z"
      fill={color}
      stroke={INK}
      strokeWidth={1.4}
      strokeLinejoin="round"
    />
    <ellipse cx="9.5" cy="15" rx="1.6" ry="2.4" fill="#FFFFFF" opacity={0.6} />
  </svg>
);

export const CarriageArt: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M18 14C13 18 12 26 15 34H33C36 26 35 18 30 14C27 12 21 12 18 14Z" fill="#FB923C" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
    <path d="M24 13V35M18 14C16 20 16 28 18 34M30 14C32 20 32 28 30 34" stroke="#EA580C" strokeWidth={1.6} fill="none" />
    <path d="M20 10L22 5L24 9L26 5L28 10Z" fill="#FACC15" stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
    <circle cx="16" cy="40" r="5" fill="#FDE68A" stroke={INK} strokeWidth={2} />
    <circle cx="32" cy="40" r="5" fill="#FDE68A" stroke={INK} strokeWidth={2} />
  </svg>
);

export { CartoonCrownIcon as CrownArt } from './CartoonIcons';
export { FrogPortrait as FrogArt };

/**
 * Draws a small four-point twinkle star directly onto a canvas context.
 * Used for the Magic Wand Coloring particle trail so the sparkles are real
 * drawn vector shapes rather than an emoji glyph rendered via fillText.
 */
export function drawSparkleOnCanvas(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  const r = size / 2;
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.bezierCurveTo(x + r * 0.15, y - r * 0.15, x + r * 0.85, y - r * 0.15, x + r, y);
  ctx.bezierCurveTo(x + r * 0.15, y + r * 0.15, x + r * 0.15, y + r * 0.85, x, y + r);
  ctx.bezierCurveTo(x - r * 0.15, y + r * 0.15, x - r * 0.85, y + r * 0.15, x - r, y);
  ctx.bezierCurveTo(x - r * 0.15, y - r * 0.15, x - r * 0.15, y - r * 0.85, x, y - r);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

// ---------------------------------------------------------------------------
// Magic wand cursor
// ---------------------------------------------------------------------------

export type WandTipShape = 'star' | 'heart' | 'rainbow';

export const WandCursorArt: React.FC<{ className?: string; tip: WandTipShape; color: string }> = ({
  className = 'w-12 h-12',
  tip,
  color,
}) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M30 30L42 42" stroke="#B45309" strokeWidth={4} strokeLinecap="round" />
    <path d="M28 28L32 32" stroke="#FDE68A" strokeWidth={2} strokeLinecap="round" />
    {tip === 'star' && (
      <path
        d="M18 2L21.5 12.5L32 16L21.5 19.5L18 30L14.5 19.5L4 16L14.5 12.5L18 2Z"
        fill={color}
        stroke={INK}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    )}
    {tip === 'heart' && (
      <path
        d="M17 27C17 27 4 19 4 11C4 6.5 7.5 4 11 4C13.5 4 15.5 5.5 17 7.5C18.5 5.5 20.5 4 23 4C26.5 4 30 6.5 30 11C30 19 17 27 17 27Z"
        fill={color}
        stroke={INK}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    )}
    {tip === 'rainbow' && (
      <path
        d="M4 22C4 12 10 5 19 5C28 5 34 12 34 22"
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
      />
    )}
  </svg>
);
