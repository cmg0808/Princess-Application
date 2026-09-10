import React from 'react';
import { REAL_COLORING_PAGES, ColoringPage } from '../data/coloringPagesData';

interface ColoringPreviewSvgProps {
  pageId: string;
  pathColors: Record<string, string>;
  stamps?: { id: string; emoji: string; x: number; y: number }[];
  brushDataUrl?: string;
  className?: string;
}

export const ColoringPreviewSvg: React.FC<ColoringPreviewSvgProps> = ({
  pageId,
  pathColors = {},
  stamps = [],
  brushDataUrl,
  className = 'w-full h-full',
}) => {
  const page: ColoringPage =
    REAL_COLORING_PAGES.find((p) => p.id === pageId) || REAL_COLORING_PAGES[0];

  return (
    <div className={`relative aspect-square overflow-hidden select-none ${className}`}>
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Paper White Base Sheet */}
        <rect width="400" height="400" fill="#FFFFFF" rx="16" />

        {/* Fillable Path Regions */}
        {page.regions.map((region) => {
          const fill = pathColors[region.id] || '#FFFFFF';
          return (
            <path
              key={region.id}
              d={region.d}
              fill={fill}
              stroke="#1F2937"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}

        {/* Outline Overlay Details (Faces, Eyes, Smiles, Folds, Jewels) */}
        {page.overlaySvg && (
          <g
            className="pointer-events-none select-none"
            dangerouslySetInnerHTML={{ __html: page.overlaySvg }}
          />
        )}

        {/* Stamped Sticker Emojis */}
        {stamps.map((stamp) => (
          <text
            key={stamp.id}
            x={stamp.x}
            y={stamp.y}
            fontSize="36"
            textAnchor="middle"
            dominantBaseline="central"
            className="pointer-events-none select-none drop-shadow-xs"
          >
            {stamp.emoji}
          </text>
        ))}

        {/* Freehand Brush Canvas Overlay Layer (if present) */}
        {brushDataUrl && (
          <image
            href={brushDataUrl}
            x="0"
            y="0"
            width="400"
            height="400"
            className="pointer-events-none select-none"
          />
        )}
      </svg>
    </div>
  );
};
