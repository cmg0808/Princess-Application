import React from 'react';

// Small original (non-emoji) vector accents used alongside the illustrated
// artwork in public/art/ across Magic Wand Coloring, Chunky Dress-Up, Royal
// Tea Party, Musical Gems and Bubble Pop.

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

/** Original heart shape (not the emoji glyph) for happy reactions. */
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

/** Water droplet accent, used on Bubble Pop's "bubbles popped" counter. */
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
