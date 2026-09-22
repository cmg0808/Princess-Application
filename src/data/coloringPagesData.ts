export interface ColoringRegion {
  id: string;
  d: string;
  label: string;
  // The "magic" color that appears when the wand swipes over this region.
  defaultColor: string;
}

export interface ColoringPage {
  id: string;
  title: string;
  emoji: string;
  category: string;
  // Magic-wand reveal regions (closed paths, each with its own magic color)
  regions: ColoringRegion[];
  // SVG fine outline paths that render on top of fills (eyes, smiles, folds, bricks)
  overlaySvg: string;
}

export const REAL_COLORING_PAGES: ColoringPage[] = [
  // ================= 1. PRINCESS LILY IN THE FLOWER GARDEN =================
  {
    id: 'princess_garden',
    title: 'Princess in Blossom Garden',
    emoji: '👸',
    category: 'Princess',
    regions: [
      // Sky background
      { id: 'sky', d: 'M0,0 L400,0 L400,280 L0,280 Z', label: 'Sky', defaultColor: '#38BDF8' },
      // Garden Lawn / Grass
      { id: 'grass', d: 'M0,280 Q200,260 400,280 L400,400 L0,400 Z', label: 'Garden Lawn', defaultColor: '#34D399' },
      // Sun
      { id: 'sun', d: 'M330,60 A35,35 0 1,0 330,61 Z', label: 'Sun', defaultColor: '#FACC15' },
      // Clouds
      { id: 'cloud_l', d: 'M30,70 Q45,45 75,55 Q95,45 115,65 Q130,85 105,95 L40,95 Q20,85 30,70 Z', label: 'Left Cloud', defaultColor: '#FFFFFF' },
      // Tiara
      { id: 'tiara', d: 'M170,85 L180,55 L200,70 L220,55 L230,85 Z', label: 'Crown Tiara', defaultColor: '#FACC15' },
      { id: 'tiara_gem', d: 'M195,68 L200,60 L205,68 L200,75 Z', label: 'Tiara Gem', defaultColor: '#F43F5E' },
      // Hair Back
      { id: 'hair_back', d: 'M145,95 Q130,170 140,240 Q160,250 170,230 Q150,160 160,110 Z', label: 'Left Hair Lock', defaultColor: '#FB923C' },
      { id: 'hair_back_r', d: 'M255,95 Q270,170 260,240 Q240,250 230,230 Q250,160 240,110 Z', label: 'Right Hair Lock', defaultColor: '#FB923C' },
      // Hair Top & Bangs
      { id: 'hair_top', d: 'M150,105 Q200,60 250,105 Q230,85 200,85 Q170,85 150,105 Z', label: 'Hair Top', defaultColor: '#FB923C' },
      { id: 'bangs_l', d: 'M155,100 Q180,95 190,125 Q170,120 155,100 Z', label: 'Left Bangs', defaultColor: '#FB923C' },
      { id: 'bangs_r', d: 'M245,100 Q220,95 210,125 Q230,120 245,100 Z', label: 'Right Bangs', defaultColor: '#FB923C' },
      // Princess Face
      { id: 'face', d: 'M160,110 Q200,100 240,110 Q245,160 200,185 Q155,160 160,110 Z', label: 'Princess Face', defaultColor: '#FEF3C7' },
      // Neck & Chest
      { id: 'neck', d: 'M188,180 L188,205 L212,205 L212,180 Z', label: 'Neck', defaultColor: '#FEF3C7' },
      // Puff Sleeves
      { id: 'sleeve_l', d: 'M150,205 Q125,195 135,230 Q150,245 168,225 Z', label: 'Left Puff Sleeve', defaultColor: '#F472B6' },
      { id: 'sleeve_r', d: 'M250,205 Q275,195 265,230 Q250,245 232,225 Z', label: 'Right Puff Sleeve', defaultColor: '#F472B6' },
      // Arms / Hands
      { id: 'arm_l', d: 'M140,230 Q130,265 145,280 Q155,275 150,240 Z', label: 'Left Arm', defaultColor: '#FEF3C7' },
      { id: 'arm_r', d: 'M260,230 Q275,255 295,245 Q285,235 255,230 Z', label: 'Right Arm', defaultColor: '#FEF3C7' },
      // Bodice / Corset
      { id: 'bodice', d: 'M168,210 L160,265 Q200,275 240,265 L232,210 Q200,225 168,210 Z', label: 'Dress Bodice', defaultColor: '#F472B6' },
      // Bodice Center Bow
      { id: 'bow', d: 'M188,218 Q200,212 212,218 Q208,230 200,224 Q192,230 188,218 Z', label: 'Dress Bow', defaultColor: '#F43F5E' },
      // Royal Ballgown Skirt - Main Center Tier
      { id: 'skirt_main', d: 'M160,265 Q90,320 85,385 Q200,405 315,385 Q310,320 240,265 Q200,275 160,265 Z', label: 'Main Ballgown', defaultColor: '#C084FC' },
      // Skirt Tier Folds / Ruffles
      { id: 'skirt_peplum_l', d: 'M160,265 Q115,300 135,340 Q165,305 180,270 Z', label: 'Skirt Left Drape', defaultColor: '#F472B6' },
      { id: 'skirt_peplum_r', d: 'M240,265 Q285,300 265,340 Q235,305 220,270 Z', label: 'Skirt Right Drape', defaultColor: '#F472B6' },
      { id: 'skirt_ruffle_bottom', d: 'M85,385 Q200,405 315,385 L318,396 Q200,415 82,396 Z', label: 'Hem Ruffle', defaultColor: '#FEF3C7' },
      // Magic Wand
      { id: 'wand_stick', d: 'M290,250 L345,175 L352,180 L296,255 Z', label: 'Wand Handle', defaultColor: '#FACC15' },
      { id: 'wand_star', d: 'M350,170 L356,155 L368,155 L358,146 L362,132 L350,140 L338,132 L342,146 L332,155 L344,155 Z', label: 'Wand Star', defaultColor: '#FACC15' },
      // Garden Rose 1 (Left)
      { id: 'rose_1', d: 'M35,340 Q55,320 70,345 Q55,370 35,340 Z', label: 'Garden Rose', defaultColor: '#F43F5E' },
      { id: 'rose_stem_1', d: 'M50,355 Q52,385 45,400 L40,400 Q46,385 44,355 Z', label: 'Rose Stem', defaultColor: '#059669' },
      // Butterfly (Right)
      { id: 'butterfly_wing_top', d: 'M340,285 Q375,260 365,295 Q350,305 340,285 Z', label: 'Butterfly Wing', defaultColor: '#9333EA' },
      { id: 'butterfly_wing_bot', d: 'M340,295 Q365,310 350,325 Q335,315 340,295 Z', label: 'Lower Wing', defaultColor: '#F472B6' },
    ],
    overlaySvg: `
      <!-- Facial Features -->
      <!-- Eyes -->
      <ellipse cx="185" cy="142" rx="7" ry="9" fill="#1F2937" />
      <circle cx="183" cy="139" r="2.5" fill="#FFFFFF" />
      <circle cx="187" cy="145" r="1.5" fill="#FFFFFF" />
      <path d="M176,134 Q185,130 193,134" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <line x1="176" y1="134" x2="172" y2="131" stroke="#1F2937" stroke-width="2" stroke-linecap="round" />

      <ellipse cx="215" cy="142" rx="7" ry="9" fill="#1F2937" />
      <circle cx="213" cy="139" r="2.5" fill="#FFFFFF" />
      <circle cx="217" cy="145" r="1.5" fill="#FFFFFF" />
      <path d="M207,134 Q215,130 224,134" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <line x1="224" y1="134" x2="228" y2="131" stroke="#1F2937" stroke-width="2" stroke-linecap="round" />

      <!-- Cute Smile -->
      <path d="M193,162 Q200,169 207,162" stroke="#E11D48" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <!-- Cheeks -->
      <circle cx="174" cy="155" r="5" fill="#FDA4AF" opacity="0.6" />
      <circle cx="226" cy="155" r="5" fill="#FDA4AF" opacity="0.6" />

      <!-- Hair lock curves -->
      <path d="M185,95 Q195,115 190,130" stroke="#1F2937" stroke-width="2" fill="none" />
      <path d="M215,95 Q205,115 210,130" stroke="#1F2937" stroke-width="2" fill="none" />

      <!-- Dress creases & lace folds -->
      <path d="M165,300 Q195,340 195,385" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M235,300 Q205,340 205,385" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M130,340 Q150,365 145,388" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M270,340 Q250,365 255,388" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />

      <!-- Sun rays -->
      <line x1="330" y1="15" x2="330" y2="2" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round" />
      <line x1="365" y1="28" x2="375" y2="20" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round" />
      <line x1="375" y1="60" x2="390" y2="60" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round" />
      <line x1="295" y1="28" x2="285" y2="20" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round" />

      <!-- Butterfly body -->
      <ellipse cx="338" cy="295" rx="3" ry="12" fill="#1F2937" />
      <path d="M336,284 Q330,275 328,276" stroke="#1F2937" stroke-width="1.5" fill="none" />
      <path d="M338,284 Q342,275 344,276" stroke="#1F2937" stroke-width="1.5" fill="none" />
    `,
  },

  // ================= 2. SPARKLE THE PEGASUS UNICORN =================
  {
    id: 'unicorn_clouds',
    title: 'Pegasus in Starry Clouds',
    emoji: '🦄',
    category: 'Fairytale',
    regions: [
      // Starry Night Sky
      { id: 'night_sky', d: 'M0,0 L400,0 L400,320 L0,320 Z', label: 'Night Sky', defaultColor: '#9333EA' },
      // Crescent Moon
      { id: 'moon', d: 'M60,40 A45,45 0 1,0 125,100 A35,35 0 1,1 60,40 Z', label: 'Crescent Moon', defaultColor: '#FACC15' },
      // Big Fluffy Cloud Ground
      { id: 'cloud_base', d: 'M-10,320 Q30,270 90,290 Q150,260 210,285 Q280,260 340,290 Q390,270 410,320 L410,400 L-10,400 Z', label: 'Cloud Meadow', defaultColor: '#FEF3C7' },
      // Unicorn Body
      { id: 'uni_body', d: 'M140,210 Q115,260 180,275 Q260,275 285,225 Q260,195 200,195 Z', label: 'Unicorn Body', defaultColor: '#FFFFFF' },
      // Neck and Head
      { id: 'uni_head_neck', d: 'M140,210 L115,145 Q100,105 140,105 Q175,105 185,150 L195,205 Z', label: 'Head & Neck', defaultColor: '#FFFFFF' },
      // Snout / Muzzle
      { id: 'uni_snout', d: 'M105,128 Q80,145 98,165 Q120,165 130,145 Z', label: 'Snout', defaultColor: '#FEF3C7' },
      // Magic Spiral Horn
      { id: 'uni_horn', d: 'M135,105 L155,30 L152,100 Z', label: 'Golden Horn', defaultColor: '#FACC15' },
      // Ears
      { id: 'uni_ear', d: 'M160,105 L175,70 L172,110 Z', label: 'Ear', defaultColor: '#FFFFFF' },
      // Pegasus Wings
      { id: 'wing_top', d: 'M195,195 Q230,110 300,115 Q290,155 245,185 Z', label: 'Wing Feather Top', defaultColor: '#38BDF8' },
      { id: 'wing_mid', d: 'M205,195 Q255,150 285,175 Q260,205 220,205 Z', label: 'Wing Middle', defaultColor: '#93C5FD' },
      // Mane locks (Separate rainbow locks)
      { id: 'mane_1', d: 'M165,115 Q210,110 195,145 Q180,135 170,125 Z', label: 'Mane Lock 1', defaultColor: '#F472B6' },
      { id: 'mane_2', d: 'M175,140 Q225,145 205,180 Q190,165 180,150 Z', label: 'Mane Lock 2', defaultColor: '#FACC15' },
      { id: 'mane_3', d: 'M185,175 Q235,180 215,215 Q200,200 190,185 Z', label: 'Mane Lock 3', defaultColor: '#34D399' },
      // Fluffy Tail
      { id: 'tail_top', d: 'M280,220 Q355,205 345,265 Q310,265 285,235 Z', label: 'Tail Top', defaultColor: '#C084FC' },
      { id: 'tail_bot', d: 'M285,235 Q340,265 330,300 Q290,295 275,250 Z', label: 'Tail Bottom', defaultColor: '#F472B6' },
      // Legs
      { id: 'leg_f', d: 'M135,245 L130,320 L155,320 L165,255 Z', label: 'Front Leg', defaultColor: '#FFFFFF' },
      { id: 'leg_b', d: 'M250,245 L250,320 L275,320 L270,255 Z', label: 'Back Leg', defaultColor: '#FFFFFF' },
      // Hooves
      { id: 'hoof_f', d: 'M130,305 L155,305 L155,320 L130,320 Z', label: 'Front Hoof', defaultColor: '#FACC15' },
      { id: 'hoof_b', d: 'M250,305 L275,305 L275,320 L250,320 Z', label: 'Back Hoof', defaultColor: '#FACC15' },
      // Star 1
      { id: 'star_1', d: 'M330,55 L335,42 L347,42 L337,34 L341,21 L330,29 L319,21 L323,34 L313,42 L325,42 Z', label: 'Big Star', defaultColor: '#FACC15' },
      // Star 2
      { id: 'star_2', d: 'M250,75 L253,67 L261,67 L254,61 L257,53 L250,58 L243,53 L246,61 L239,67 L247,67 Z', label: 'Little Star', defaultColor: '#FACC15' },
    ],
    overlaySvg: `
      <!-- Unicorn Anime Eye -->
      <ellipse cx="132" cy="132" rx="9" ry="12" fill="#1F2937" />
      <circle cx="130" cy="128" r="3.5" fill="#FFFFFF" />
      <circle cx="135" cy="136" r="1.5" fill="#FFFFFF" />
      <path d="M122,122 Q132,117 142,122" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <line x1="122" y1="122" x2="118" y2="117" stroke="#1F2937" stroke-width="2" stroke-linecap="round" />

      <!-- Cute Nostril & Smile -->
      <circle cx="102" cy="148" r="2.5" fill="#E11D48" />
      <path d="M106,155 Q114,160 120,154" stroke="#E11D48" stroke-width="2" fill="none" stroke-linecap="round" />
      <!-- Cheeks -->
      <circle cx="125" cy="148" r="6" fill="#FDA4AF" opacity="0.6" />

      <!-- Horn ridges -->
      <line x1="140" y1="85" x2="151" y2="90" stroke="#1F2937" stroke-width="2" stroke-linecap="round" />
      <line x1="144" y1="65" x2="153" y2="70" stroke="#1F2937" stroke-width="2" stroke-linecap="round" />
      <line x1="148" y1="48" x2="155" y2="52" stroke="#1F2937" stroke-width="2" stroke-linecap="round" />

      <!-- Wing Feathers Details -->
      <path d="M225,165 Q255,145 285,150" stroke="#1F2937" stroke-width="2" fill="none" />
      <path d="M235,175 Q265,160 280,175" stroke="#1F2937" stroke-width="2" fill="none" />

      <!-- Cloud swirls -->
      <path d="M80,310 Q90,300 100,310" stroke="#1F2937" stroke-width="2" fill="none" />
      <path d="M200,305 Q210,295 220,305" stroke="#1F2937" stroke-width="2" fill="none" />
      <path d="M320,310 Q330,300 340,310" stroke="#1F2937" stroke-width="2" fill="none" />
    `,
  },

  // ================= 3. FAIRYTALE ROYAL CASTLE =================
  {
    id: 'fairytale_castle',
    title: 'Fairytale Royal Castle',
    emoji: '🏰',
    category: 'Castle',
    regions: [
      // Sky
      { id: 'sky', d: 'M0,0 L400,0 L400,290 L0,290 Z', label: 'Sky', defaultColor: '#38BDF8' },
      // Rainbow Arc Outer
      { id: 'rainbow_1', d: 'M20,290 Q200,20 380,290 L360,290 Q200,45 40,290 Z', label: 'Rainbow Outer', defaultColor: '#F43F5E' },
      // Rainbow Arc Inner
      { id: 'rainbow_2', d: 'M40,290 Q200,45 360,290 L340,290 Q200,70 60,290 Z', label: 'Rainbow Inner', defaultColor: '#FACC15' },
      // Green Hill
      { id: 'hill', d: 'M0,280 Q200,220 400,280 L400,400 L0,400 Z', label: 'Castle Hill', defaultColor: '#34D399' },
      // Castle River
      { id: 'river', d: 'M160,340 Q170,400 130,400 L270,400 Q230,400 240,340 Z', label: 'Moat River', defaultColor: '#2563EB' },
      // Castle Bridge
      { id: 'bridge', d: 'M160,335 L240,335 L240,355 L160,355 Z', label: 'Drawbridge', defaultColor: '#FB923C' },
      // Main Keep Wall
      { id: 'main_wall', d: 'M140,190 L260,190 L260,340 L140,340 Z', label: 'Main Wall', defaultColor: '#FEF3C7' },
      // Main Castle Gate
      { id: 'door', d: 'M175,340 L175,275 Q200,250 225,275 L225,340 Z', label: 'Grand Gate', defaultColor: '#FB923C' },
      // Left Tower Wall
      { id: 'tower_l', d: 'M75,160 L135,160 L135,340 L75,340 Z', label: 'Left Tower', defaultColor: '#F472B6' },
      // Left Roof Spire
      { id: 'roof_l', d: 'M65,160 L105,80 L145,160 Z', label: 'Left Spire', defaultColor: '#C084FC' },
      // Right Tower Wall
      { id: 'tower_r', d: 'M265,160 L325,160 L325,340 L265,340 Z', label: 'Right Tower', defaultColor: '#F472B6' },
      // Right Roof Spire
      { id: 'roof_r', d: 'M255,160 L295,80 L335,160 Z', label: 'Right Spire', defaultColor: '#C084FC' },
      // Tall Center Spire
      { id: 'spire_center', d: 'M170,190 L170,110 L230,110 L230,190 Z', label: 'Center Tower', defaultColor: '#FEF3C7' },
      // Center Roof
      { id: 'roof_center', d: 'M160,110 L200,40 L240,110 Z', label: 'Center Spire', defaultColor: '#F43F5E' },
      // Windows
      { id: 'win_c', d: 'M188,140 L188,125 Q200,115 212,125 L212,140 Z', label: 'Center Window', defaultColor: '#FACC15' },
      { id: 'win_l', d: 'M95,210 L95,190 Q105,180 115,190 L115,210 Z', label: 'Left Window', defaultColor: '#FACC15' },
      { id: 'win_r', d: 'M285,210 L285,190 Q295,180 305,190 L305,210 Z', label: 'Right Window', defaultColor: '#FACC15' },
      // Flags
      { id: 'flag_l', d: 'M105,80 L105,50 L130,65 Z', label: 'Left Flag', defaultColor: '#FACC15' },
      { id: 'flag_c', d: 'M200,40 L200,10 L230,25 Z', label: 'Center Flag', defaultColor: '#F43F5E' },
      { id: 'flag_r', d: 'M295,80 L295,50 L320,65 Z', label: 'Right Flag', defaultColor: '#FACC15' },
    ],
    overlaySvg: `
      <!-- Gate Grille / Wood Planks -->
      <line x1="200" y1="255" x2="200" y2="340" stroke="#1F2937" stroke-width="2.5" />
      <circle cx="192" cy="305" r="2.5" fill="#FEF08A" />
      <circle cx="208" cy="305" r="2.5" fill="#FEF08A" />

      <!-- Stone Bricks on Towers -->
      <rect x="85" y="240" width="18" height="8" rx="2" fill="none" stroke="#1F2937" stroke-width="1.5" />
      <rect x="108" y="240" width="18" height="8" rx="2" fill="none" stroke="#1F2937" stroke-width="1.5" />
      <rect x="96" y="252" width="18" height="8" rx="2" fill="none" stroke="#1F2937" stroke-width="1.5" />

      <rect x="275" y="240" width="18" height="8" rx="2" fill="none" stroke="#1F2937" stroke-width="1.5" />
      <rect x="298" y="240" width="18" height="8" rx="2" fill="none" stroke="#1F2937" stroke-width="1.5" />
      <rect x="286" y="252" width="18" height="8" rx="2" fill="none" stroke="#1F2937" stroke-width="1.5" />

      <!-- Castle Battlements / Crenellations -->
      <path d="M140,190 L140,178 L155,178 L155,190 L170,190 L170,178 L185,178 L185,190 L200,190 L200,178 L215,178 L215,190 L230,190 L230,178 L245,178 L245,190 L260,190" stroke="#1F2937" stroke-width="2.5" fill="none" />

      <!-- River Ripple waves -->
      <path d="M175,370 Q195,365 215,370" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M185,385 Q200,380 215,385" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />
    `,
  },

  // ================= 4. PRINCESS KITTEN WITH TIARA =================
  {
    id: 'princess_kitten',
    title: 'Princess Kitten & Crown',
    emoji: '🐱',
    category: 'Pet',
    regions: [
      // Cozy Bedroom Background
      { id: 'bg_room', d: 'M0,0 L400,0 L400,290 L0,290 Z', label: 'Room Wall', defaultColor: '#F3E8FF' },
      // Floor Rug
      { id: 'rug', d: 'M0,290 L400,290 L400,400 L0,400 Z', label: 'Fluffy Rug', defaultColor: '#FDA4AF' },
      // Royal Cushion Basket
      { id: 'cushion_back', d: 'M110,240 Q200,200 290,240 Q330,310 200,340 Q70,310 110,240 Z', label: 'Cushion Bed', defaultColor: '#C4B5FD' },
      // Cushion Pillow
      { id: 'pillow', d: 'M125,260 Q200,230 275,260 Q290,320 200,330 Q110,320 125,260 Z', label: 'Velvet Pillow', defaultColor: '#F9A8D4' },
      // Kitten Ears
      { id: 'ear_l', d: 'M140,110 L125,45 L175,85 Z', label: 'Left Ear', defaultColor: '#FB923C' },
      { id: 'ear_l_inner', d: 'M142,100 L134,58 L168,85 Z', label: 'Left Inner Ear', defaultColor: '#FDA4AF' },
      { id: 'ear_r', d: 'M260,110 L275,45 L225,85 Z', label: 'Right Ear', defaultColor: '#FB923C' },
      { id: 'ear_r_inner', d: 'M258,100 L266,58 L232,85 Z', label: 'Right Inner Ear', defaultColor: '#FDA4AF' },
      // Kitten Head
      { id: 'head', d: 'M130,135 Q115,185 155,205 Q200,220 245,205 Q285,185 270,135 Q200,105 130,135 Z', label: 'Kitten Face', defaultColor: '#FDBA74' },
      // Kitten Tiara
      { id: 'cat_tiara', d: 'M180,85 L188,60 L200,72 L212,60 L220,85 Z', label: 'Cat Tiara', defaultColor: '#FACC15' },
      { id: 'cat_tiara_gem', d: 'M196,70 L200,65 L204,70 L200,75 Z', label: 'Tiara Jewel', defaultColor: '#F43F5E' },
      // Kitten Body
      { id: 'body', d: 'M155,200 Q145,265 170,285 Q200,290 230,285 Q255,265 245,200 Z', label: 'Kitten Body', defaultColor: '#FDBA74' },
      // Big Satin Bow Collar
      { id: 'bow_l', d: 'M200,205 L170,190 L170,220 Z', label: 'Bow Left Wing', defaultColor: '#F472B6' },
      { id: 'bow_r', d: 'M200,205 L230,190 L230,220 Z', label: 'Bow Right Wing', defaultColor: '#F472B6' },
      { id: 'bow_knot', d: 'M192,198 L208,198 L208,212 L192,212 Z', label: 'Bow Knot', defaultColor: '#EC4899' },
      // Front Paws
      { id: 'paw_l', d: 'M168,260 Q168,285 185,285 Q195,285 192,260 Z', label: 'Left Paw', defaultColor: '#FEF3C7' },
      { id: 'paw_r', d: 'M208,260 Q205,285 215,285 Q232,285 232,260 Z', label: 'Right Paw', defaultColor: '#FEF3C7' },
      // Tail
      { id: 'tail', d: 'M245,260 Q305,250 295,200 Q280,200 280,240 Z', label: 'Kitten Tail', defaultColor: '#FDBA74' },
      // Yarn Ball (Left)
      { id: 'yarn', d: 'M55,340 A25,25 0 1,0 105,340 A25,25 0 1,0 55,340', label: 'Yarn Ball', defaultColor: '#34D399' },
    ],
    overlaySvg: `
      <!-- Cat Anime Eyes -->
      <ellipse cx="168" cy="152" rx="10" ry="13" fill="#1F2937" />
      <circle cx="165" cy="148" r="4" fill="#FFFFFF" />
      <circle cx="171" cy="156" r="2" fill="#FFFFFF" />
      <path d="M156,140 Q168,135 178,140" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />

      <ellipse cx="232" cy="152" rx="10" ry="13" fill="#1F2937" />
      <circle cx="229" cy="148" r="4" fill="#FFFFFF" />
      <circle cx="235" cy="156" r="2" fill="#FFFFFF" />
      <path d="M222,140 Q232,135 244,140" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />

      <!-- Cute Cat Nose & Mouth -->
      <polygon points="196,168 204,168 200,173" fill="#F43F5E" />
      <path d="M200,173 L200,177" stroke="#1F2937" stroke-width="2" />
      <path d="M194,177 Q200,182 206,177" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M194,177 Q188,181 184,178" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M206,177 Q212,181 216,178" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />

      <!-- Whiskers -->
      <line x1="150" y1="168" x2="120" y2="162" stroke="#1F2937" stroke-width="2" stroke-linecap="round" />
      <line x1="150" y1="174" x2="120" y2="176" stroke="#1F2937" stroke-width="2" stroke-linecap="round" />
      <line x1="250" y1="168" x2="280" y2="162" stroke="#1F2937" stroke-width="2" stroke-linecap="round" />
      <line x1="250" y1="174" x2="280" y2="176" stroke="#1F2937" stroke-width="2" stroke-linecap="round" />

      <!-- Cheeks -->
      <circle cx="152" cy="168" r="6" fill="#FDA4AF" opacity="0.6" />
      <circle cx="248" cy="168" r="6" fill="#FDA4AF" opacity="0.6" />

      <!-- Yarn String Swirl -->
      <path d="M95,355 Q130,375 160,360 Q170,355 175,340" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />
    `,
  },

  // ================= 5. MAGICAL PUMPKIN CARRIAGE =================
  {
    id: 'pumpkin_carriage',
    title: 'Magical Pumpkin Carriage',
    emoji: '🎠',
    category: 'Fairytale',
    regions: [
      // Night Sky
      { id: 'sky', d: 'M0,0 L400,0 L400,320 L0,320 Z', label: 'Sky', defaultColor: '#9333EA' },
      // Cobblestone Road
      { id: 'road', d: 'M0,320 L400,320 L400,400 L0,400 Z', label: 'Royal Road', defaultColor: '#DDD6FE' },
      // Carriage Pumpkin Center Cabin
      { id: 'cabin_center', d: 'M160,140 Q130,230 160,310 Q200,320 240,310 Q270,230 240,140 Q200,130 160,140 Z', label: 'Cabin Center', defaultColor: '#FB923C' },
      // Pumpkin Left Rib
      { id: 'cabin_l', d: 'M160,140 Q105,180 115,260 Q125,305 160,310 Q130,230 160,140 Z', label: 'Cabin Left', defaultColor: '#F97316' },
      // Pumpkin Right Rib
      { id: 'cabin_r', d: 'M240,140 Q295,180 285,260 Q275,305 240,310 Q270,230 240,140 Z', label: 'Cabin Right', defaultColor: '#F97316' },
      // Heart Window
      { id: 'window', d: 'M200,235 C190,210 165,215 165,230 C165,245 200,265 200,265 C200,265 235,245 235,230 C235,215 210,210 200,235 Z', label: 'Heart Window', defaultColor: '#FEF08A' },
      // Crown on Carriage Roof
      { id: 'crown_roof', d: 'M185,130 L190,105 L200,115 L210,105 L215,130 Z', label: 'Roof Crown', defaultColor: '#FACC15' },
      // Carriage Steps
      { id: 'steps', d: 'M180,310 L220,310 L215,335 L185,335 Z', label: 'Carriage Steps', defaultColor: '#C084FC' },
      // Left Front Wheel Rim
      { id: 'wheel_l_rim', d: 'M85,335 A42,42 0 1,0 169,335 A42,42 0 1,0 85,335', label: 'Front Wheel Rim', defaultColor: '#FACC15' },
      // Left Wheel Hub
      { id: 'wheel_l_hub', d: 'M112,335 A15,15 0 1,0 142,335 A15,15 0 1,0 112,335', label: 'Front Wheel Center', defaultColor: '#B45309' },
      // Right Back Wheel Rim
      { id: 'wheel_r_rim', d: 'M230,335 A42,42 0 1,0 314,335 A42,42 0 1,0 230,335', label: 'Back Wheel Rim', defaultColor: '#FACC15' },
      // Right Wheel Hub
      { id: 'wheel_r_hub', d: 'M257,335 A15,15 0 1,0 287,335 A15,15 0 1,0 257,335', label: 'Back Wheel Center', defaultColor: '#B45309' },
      // Lantern Left
      { id: 'lantern_l', d: 'M110,195 L125,195 L120,220 L115,220 Z', label: 'Left Lantern', defaultColor: '#FDE047' },
      // Lantern Right
      { id: 'lantern_r', d: 'M275,195 L290,195 L285,220 L280,220 Z', label: 'Right Lantern', defaultColor: '#FDE047' },
    ],
    overlaySvg: `
      <!-- Wheel Spokes -->
      <!-- Left wheel spokes -->
      <line x1="127" y1="293" x2="127" y2="377" stroke="#1F2937" stroke-width="3" />
      <line x1="85" y1="335" x2="169" y2="335" stroke="#1F2937" stroke-width="3" />
      <line x1="97" y1="305" x2="157" y2="365" stroke="#1F2937" stroke-width="3" />
      <line x1="97" y1="365" x2="157" y2="305" stroke="#1F2937" stroke-width="3" />

      <!-- Right wheel spokes -->
      <line x1="272" y1="293" x2="272" y2="377" stroke="#1F2937" stroke-width="3" />
      <line x1="230" y1="335" x2="314" y2="335" stroke="#1F2937" stroke-width="3" />
      <line x1="242" y1="305" x2="302" y2="365" stroke="#1F2937" stroke-width="3" />
      <line x1="242" y1="365" x2="302" y2="305" stroke="#1F2937" stroke-width="3" />

      <!-- Window curtains -->
      <path d="M180,220 Q190,230 185,245" stroke="#1F2937" stroke-width="2" fill="none" />
      <path d="M220,220 Q210,230 215,245" stroke="#1F2937" stroke-width="2" fill="none" />

      <!-- Golden carriage scrolls -->
      <path d="M140,315 Q200,345 260,315" stroke="#1F2937" stroke-width="3" fill="none" stroke-linecap="round" />
      <!-- Magical sparkle stars -->
      <circle cx="60" cy="80" r="3" fill="#FEF08A" />
      <circle cx="330" cy="90" r="3" fill="#FEF08A" />
      <circle cx="290" cy="50" r="2.5" fill="#FEF08A" />
    `,
  },

  // ================= 6. MERMAID PRINCESS UNDER THE SEA =================
  {
    id: 'mermaid_princess',
    title: 'Mermaid Princess & Starfish',
    emoji: '🧜‍♀️',
    category: 'Fairytale',
    regions: [
      // Ocean Depths
      { id: 'sea_water', d: 'M0,0 L400,0 L400,320 L0,320 Z', label: 'Ocean Water', defaultColor: '#0EA5E9' },
      // Ocean Sand Bed
      { id: 'sand_bed', d: 'M0,320 Q200,290 400,320 L400,400 L0,400 Z', label: 'Sandy Sea Floor', defaultColor: '#FDE68A' },
      // Coral Reef Left
      { id: 'coral_l', d: 'M10,340 Q30,270 45,340 Q60,280 75,340 L80,400 L0,400 Z', label: 'Pink Coral', defaultColor: '#FB7185' },
      // Starfish Hairclip / Crown
      { id: 'star_tiara', d: 'M170,85 L180,60 L200,75 L220,60 L230,85 Z', label: 'Seashell Tiara', defaultColor: '#FACC15' },
      // Mermaid Hair
      { id: 'hair_left', d: 'M150,95 Q115,160 135,240 Q150,235 155,190 Q145,150 160,110 Z', label: 'Wavy Hair Left', defaultColor: '#C084FC' },
      { id: 'hair_right', d: 'M250,95 Q285,160 265,240 Q250,235 245,190 Q255,150 240,110 Z', label: 'Wavy Hair Right', defaultColor: '#C084FC' },
      // Face
      { id: 'face', d: 'M160,110 Q200,100 240,110 Q245,160 200,185 Q155,160 160,110 Z', label: 'Mermaid Face', defaultColor: '#FEF3C7' },
      // Neck & Chest
      { id: 'chest', d: 'M175,180 L170,225 L230,225 L225,180 Z', label: 'Chest', defaultColor: '#FEF3C7' },
      // Seashell Bra
      { id: 'bra_l', d: 'M170,220 Q185,210 195,225 Q185,240 170,225 Z', label: 'Left Seashell', defaultColor: '#F472B6' },
      { id: 'bra_r', d: 'M205,225 Q215,210 230,220 Q230,240 205,225 Z', label: 'Right Seashell', defaultColor: '#F472B6' },
      // Waist
      { id: 'waist', d: 'M180,235 L175,265 L225,265 L220,235 Z', label: 'Waist', defaultColor: '#FEF3C7' },
      // Mermaid Tail Upper
      { id: 'tail_top', d: 'M175,265 Q160,310 190,345 Q215,345 225,265 Z', label: 'Tail Body', defaultColor: '#2DD4BF' },
      // Mermaid Tail Fin Left
      { id: 'fin_l', d: 'M190,345 Q150,370 170,400 Q195,380 200,355 Z', label: 'Tail Fin Left', defaultColor: '#F472B6' },
      // Mermaid Tail Fin Right
      { id: 'fin_r', d: 'M200,355 Q205,380 230,400 Q250,370 210,345 Z', label: 'Tail Fin Right', defaultColor: '#F472B6' },
      // Starfish Friend (Right)
      { id: 'starfish', d: 'M310,330 L315,312 L330,312 L318,300 L322,285 L310,295 L298,285 L302,300 L290,312 L305,312 Z', label: 'Starfish Friend', defaultColor: '#FB923C' },
    ],
    overlaySvg: `
      <!-- Face details -->
      <ellipse cx="185" cy="142" rx="7" ry="9" fill="#1F2937" />
      <circle cx="183" cy="139" r="2.5" fill="#FFFFFF" />
      <circle cx="187" cy="145" r="1.5" fill="#FFFFFF" />
      <path d="M176,134 Q185,130 193,134" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />

      <ellipse cx="215" cy="142" rx="7" ry="9" fill="#1F2937" />
      <circle cx="213" cy="139" r="2.5" fill="#FFFFFF" />
      <circle cx="217" cy="145" r="1.5" fill="#FFFFFF" />
      <path d="M207,134 Q215,130 224,134" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />

      <path d="M193,162 Q200,169 207,162" stroke="#E11D48" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <circle cx="174" cy="155" r="5" fill="#FDA4AF" opacity="0.6" />
      <circle cx="226" cy="155" r="5" fill="#FDA4AF" opacity="0.6" />

      <!-- Pearl Necklace -->
      <circle cx="188" cy="195" r="3" fill="#FFFFFF" stroke="#1F2937" stroke-width="1.5" />
      <circle cx="196" cy="198" r="3.5" fill="#FFFFFF" stroke="#1F2937" stroke-width="1.5" />
      <circle cx="204" cy="198" r="3.5" fill="#FFFFFF" stroke="#1F2937" stroke-width="1.5" />
      <circle cx="212" cy="195" r="3" fill="#FFFFFF" stroke="#1F2937" stroke-width="1.5" />

      <!-- Tail Scales pattern -->
      <path d="M182,280 Q190,288 198,280 Q206,288 214,280" stroke="#1F2937" stroke-width="2" fill="none" />
      <path d="M185,295 Q193,303 201,295 Q209,303 217,295" stroke="#1F2937" stroke-width="2" fill="none" />
      <path d="M188,310 Q196,318 204,310 Q212,318 220,310" stroke="#1F2937" stroke-width="2" fill="none" />

      <!-- Ocean Bubbles -->
      <circle cx="120" cy="80" r="7" fill="none" stroke="#1F2937" stroke-width="2" />
      <circle cx="122" cy="78" r="2" fill="#FFFFFF" />
      <circle cx="130" cy="55" r="5" fill="none" stroke="#1F2937" stroke-width="2" />
      <circle cx="270" cy="90" r="9" fill="none" stroke="#1F2937" stroke-width="2" />
      <circle cx="273" cy="87" r="2.5" fill="#FFFFFF" />
    `,
  },

  // ================= 7. MERMAID & THE PEARL SHELL =================
  {
    id: 'mermaid_shell',
    title: 'Mermaid & Pearl Shell',
    emoji: '🐚',
    category: 'Fairytale',
    regions: [
      { id: 'sea_water', d: 'M0,0 L400,0 L400,300 L0,300 Z', label: 'Ocean Water', defaultColor: '#22D3EE' },
      { id: 'sand_bed', d: 'M0,300 Q200,275 400,300 L400,400 L0,400 Z', label: 'Sandy Sea Floor', defaultColor: '#FDE68A' },
      { id: 'tiara', d: 'M172,95 L182,72 L200,85 L218,72 L228,95 Z', label: 'Pearl Tiara', defaultColor: '#FACC15' },
      { id: 'hair_left', d: 'M150,105 Q110,170 140,250 Q155,245 158,195 Q148,155 162,120 Z', label: 'Wavy Hair Left', defaultColor: '#FB923C' },
      { id: 'hair_right', d: 'M250,105 Q290,170 260,250 Q245,245 242,195 Q252,155 238,120 Z', label: 'Wavy Hair Right', defaultColor: '#FB923C' },
      { id: 'face', d: 'M162,120 Q200,108 238,120 Q244,168 200,192 Q156,168 162,120 Z', label: 'Mermaid Face', defaultColor: '#FEF3C7' },
      { id: 'arm_l', d: 'M155,220 Q140,240 155,255 Q168,250 165,225 Z', label: 'Left Arm', defaultColor: '#FEF3C7' },
      { id: 'arm_r', d: 'M245,220 Q260,240 245,255 Q232,250 235,225 Z', label: 'Right Arm', defaultColor: '#FEF3C7' },
      { id: 'shell_held', d: 'M160,200 Q200,175 240,200 Q245,240 200,260 Q155,240 160,200 Z', label: 'Held Shell', defaultColor: '#FBCFE8' },
      { id: 'waist', d: 'M175,258 L170,285 L230,285 L225,258 Z', label: 'Waist', defaultColor: '#FEF3C7' },
      { id: 'tail_top', d: 'M170,285 Q150,325 185,360 Q212,360 230,285 Z', label: 'Tail Body', defaultColor: '#34D399' },
      { id: 'fin_l', d: 'M185,360 Q142,382 160,400 Q192,390 198,368 Z', label: 'Tail Fin Left', defaultColor: '#2DD4BF' },
      { id: 'fin_r', d: 'M198,368 Q205,390 238,400 Q255,382 212,360 Z', label: 'Tail Fin Right', defaultColor: '#2DD4BF' },
      { id: 'jelly_cap', d: 'M65,150 Q45,120 75,105 Q105,120 85,150 Z', label: 'Jellyfish Friend', defaultColor: '#F0ABFC' },
      { id: 'starfish', d: 'M320,300 L326,280 L342,280 L328,266 L333,248 L320,260 L307,248 L312,266 L298,280 L314,280 Z', label: 'Starfish Friend', defaultColor: '#FB923C' },
      { id: 'oyster_bottom', d: 'M300,355 Q340,335 380,360 Q345,390 300,375 Z', label: 'Oyster Shell', defaultColor: '#E9D5FF' },
      { id: 'oyster_top', d: 'M305,355 Q340,330 375,358 Q340,345 305,355 Z', label: 'Oyster Shell Top', defaultColor: '#C4B5FD' },
      { id: 'pearl', d: 'M330,352 A12,12 0 1,0 354,352 A12,12 0 1,0 330,352', label: 'Pearl', defaultColor: '#FFFFFF' },
    ],
    overlaySvg: `
      <!-- Face -->
      <ellipse cx="185" cy="152" rx="7" ry="9" fill="#1F2937" />
      <circle cx="183" cy="149" r="2.5" fill="#FFFFFF" />
      <circle cx="187" cy="155" r="1.5" fill="#FFFFFF" />
      <path d="M176,144 Q185,140 193,144" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />

      <ellipse cx="215" cy="152" rx="7" ry="9" fill="#1F2937" />
      <circle cx="213" cy="149" r="2.5" fill="#FFFFFF" />
      <circle cx="217" cy="155" r="1.5" fill="#FFFFFF" />
      <path d="M207,144 Q215,140 224,144" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />

      <path d="M193,172 Q200,178 207,172" stroke="#E11D48" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <circle cx="174" cy="165" r="5" fill="#FDA4AF" opacity="0.6" />
      <circle cx="226" cy="165" r="5" fill="#FDA4AF" opacity="0.6" />

      <!-- Shell ridges -->
      <path d="M175,205 Q200,190 225,205" stroke="#1F2937" stroke-width="2" fill="none" />
      <path d="M180,230 Q200,215 220,230" stroke="#1F2937" stroke-width="2" fill="none" />

      <!-- Jellyfish face + tentacles -->
      <circle cx="60" cy="128" r="2" fill="#1F2937" />
      <circle cx="72" cy="128" r="2" fill="#1F2937" />
      <path d="M60,138 Q66,142 72,138" stroke="#1F2937" stroke-width="1.5" fill="none" />
      <path d="M55,150 Q62,165 52,180 Q46,190 52,198" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M65,150 Q58,168 68,182 Q74,192 66,202" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M75,150 Q82,165 74,180 Q68,190 76,198" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />

      <!-- Pearl shine -->
      <circle cx="335" cy="348" r="2.5" fill="#FFFFFF" />

      <!-- Tail scales -->
      <path d="M182,300 Q192,308 202,300" stroke="#1F2937" stroke-width="2" fill="none" />
      <path d="M186,316 Q196,324 206,316" stroke="#1F2937" stroke-width="2" fill="none" />

      <!-- Bubbles -->
      <circle cx="330" cy="90" r="7" fill="none" stroke="#1F2937" stroke-width="2" />
      <circle cx="345" cy="65" r="4" fill="none" stroke="#1F2937" stroke-width="2" />
      <circle cx="40" cy="60" r="6" fill="none" stroke="#1F2937" stroke-width="2" />
    `,
  },

  // ================= 8. PRINCESS & FOREST FRIENDS =================
  {
    id: 'princess_forest_friends',
    title: 'Princess & Forest Friends',
    emoji: '🐿️',
    category: 'Princess',
    regions: [
      { id: 'bg_sky', d: 'M0,0 L400,0 L400,400 L0,400 Z', label: 'Sky Backdrop', defaultColor: '#FDE68A' },
      { id: 'ground', d: 'M0,360 Q200,340 400,360 L400,400 L0,400 Z', label: 'Meadow Ground', defaultColor: '#86EFAC' },
      { id: 'star_1', d: 'M75,235 L80,220 L95,220 L83,211 L88,196 L75,206 L62,196 L67,211 L55,220 L70,220 Z', label: 'Star', defaultColor: '#FFFFFF' },
      { id: 'star_2', d: 'M135,190 L139,178 L151,178 L141,171 L145,159 L135,167 L125,159 L129,171 L119,178 L131,178 Z', label: 'Star', defaultColor: '#FFFFFF' },
      { id: 'star_3', d: 'M60,300 L64,288 L76,288 L66,281 L70,269 L60,277 L50,269 L54,281 L44,288 L56,288 Z', label: 'Star', defaultColor: '#FFFFFF' },
      { id: 'star_4', d: 'M115,320 L118,311 L127,311 L120,306 L123,297 L115,303 L107,297 L110,306 L103,311 L112,311 Z', label: 'Star', defaultColor: '#FFFFFF' },
      { id: 'bird_body', d: 'M60,110 Q35,95 50,75 Q75,65 95,85 Q90,105 60,110 Z', label: 'Little Bird', defaultColor: '#FB923C' },
      { id: 'bird_wing', d: 'M50,80 Q20,55 35,35 Q65,45 55,80 Z', label: 'Bird Wing', defaultColor: '#FDBA74' },
      { id: 'hair_top', d: 'M255,90 Q300,55 345,90 Q355,120 335,135 Q290,110 255,110 Q245,100 255,90 Z', label: 'Big Hair Pouf', defaultColor: '#FB923C' },
      { id: 'hair_side', d: 'M330,130 Q360,180 340,240 Q320,235 318,190 Q322,155 330,130 Z', label: 'Flowing Hair', defaultColor: '#FB923C' },
      { id: 'face', d: 'M258,140 Q295,128 330,140 Q334,180 295,200 Q256,180 258,140 Z', label: 'Princess Face', defaultColor: '#FEF3C7' },
      { id: 'wave_arm', d: 'M222,208 Q210,190 222,172 Q238,165 248,180 Q250,198 235,210 Q228,212 222,208 Z', label: 'Waving Arm', defaultColor: '#FEF3C7' },
      { id: 'sleeve', d: 'M235,205 Q205,200 210,230 Q225,245 245,228 Z', label: 'Puff Sleeve', defaultColor: '#93C5FD' },
      { id: 'bodice', d: 'M262,205 L255,255 Q295,265 330,255 L325,205 Q295,218 262,205 Z', label: 'Dress Bodice', defaultColor: '#60A5FA' },
      { id: 'skirt_main', d: 'M255,255 Q210,300 220,355 Q295,375 375,355 Q380,300 330,255 Q295,265 255,255 Z', label: 'Ballgown Skirt', defaultColor: '#93C5FD' },
      { id: 'skirt_hem', d: 'M220,355 Q295,375 375,355 L378,368 Q295,388 218,368 Z', label: 'Hem Ruffle', defaultColor: '#FEF3C7' },
      { id: 'squirrel_tail', d: 'M40,330 Q0,300 20,250 Q60,240 65,290 Q75,320 40,330 Z', label: 'Squirrel Tail', defaultColor: '#F97316' },
      { id: 'squirrel_body', d: 'M55,340 Q40,370 70,385 Q100,390 110,365 Q100,335 55,340 Z', label: 'Squirrel Body', defaultColor: '#FB923C' },
      { id: 'squirrel_ear', d: 'M95,335 L88,315 L108,325 Z', label: 'Squirrel Ear', defaultColor: '#FB923C' },
    ],
    overlaySvg: `
      <!-- Princess face -->
      <ellipse cx="283" cy="160" rx="7" ry="9" fill="#1F2937" />
      <circle cx="281" cy="157" r="2.5" fill="#FFFFFF" />
      <path d="M274,152 Q283,148 291,152" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />

      <ellipse cx="313" cy="160" rx="7" ry="9" fill="#1F2937" />
      <circle cx="311" cy="157" r="2.5" fill="#FFFFFF" />
      <path d="M305,152 Q313,148 322,152" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />

      <path d="M290,180 Q297,186 304,180" stroke="#E11D48" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <circle cx="272" cy="173" r="5" fill="#FDA4AF" opacity="0.6" />
      <circle cx="324" cy="173" r="5" fill="#FDA4AF" opacity="0.6" />

      <!-- Hair strand lines -->
      <path d="M280,100 Q290,118 285,132" stroke="#1F2937" stroke-width="2" fill="none" />
      <path d="M320,100 Q310,118 315,132" stroke="#1F2937" stroke-width="2" fill="none" />

      <!-- Bird face -->
      <circle cx="80" cy="85" r="2" fill="#1F2937" />
      <path d="M95,88 L108,92 L95,96 Z" fill="#FB923C" />

      <!-- Squirrel face -->
      <circle cx="88" cy="355" r="2.5" fill="#1F2937" />
      <circle cx="70" cy="365" r="2" fill="#1F2937" />
      <path d="M75,372 Q82,377 90,372" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />

      <!-- Sparkle dots on stars -->
      <circle cx="75" cy="220" r="1.5" fill="#FDE68A" />
      <circle cx="135" cy="175" r="1.5" fill="#FDE68A" />

      <!-- Skirt fold lines -->
      <path d="M245,270 Q260,320 250,365" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M340,270 Q330,320 345,365" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />
    `,
  },

  // ================= 9. ICE PRINCESS & SWEET TREAT =================
  {
    id: 'ice_princess_treat',
    title: 'Ice Princess & Sweet Treat',
    emoji: '❄️',
    category: 'Fairytale',
    regions: [
      { id: 'bg_ice', d: 'M0,0 L400,0 L400,400 L0,400 Z', label: 'Frosty Sky', defaultColor: '#BFDBFE' },
      { id: 'heart_deco', d: 'M55,55 C40,35 10,45 10,70 C10,95 55,120 55,120 C55,120 100,95 100,70 C100,45 70,35 55,55 Z', label: 'Floating Heart', defaultColor: '#F472B6' },
      { id: 'snow_1', d: 'M330,60 L336,45 L344,45 L338,55 L352,50 L354,58 L340,60 L352,68 L346,75 L336,63 L330,78 L322,75 L330,63 L316,68 L314,58 L328,58 Z', label: 'Snowflake', defaultColor: '#FFFFFF' },
      { id: 'snow_2', d: 'M50,220 L55,208 L62,208 L57,216 L69,212 L71,219 L59,221 L69,228 L64,234 L56,224 L51,236 L45,234 L51,224 L40,228 L38,220 L49,220 Z', label: 'Snowflake', defaultColor: '#FFFFFF' },
      { id: 'snow_3', d: 'M60,320 L64,310 L70,310 L66,317 L77,314 L79,320 L69,322 L77,328 L73,333 L66,325 L62,335 L57,333 L62,325 L53,328 L51,321 L61,321 Z', label: 'Snowflake', defaultColor: '#FFFFFF' },
      { id: 'hair', d: 'M155,90 Q125,70 150,50 Q190,30 235,55 Q260,80 235,105 Q290,115 300,180 Q285,240 250,250 Q255,180 225,135 Q195,105 155,90 Z', label: 'Icy Hair', defaultColor: '#F0F9FF' },
      { id: 'face', d: 'M165,115 Q200,102 235,115 Q240,160 200,182 Q160,160 165,115 Z', label: 'Face', defaultColor: '#FEF3C7' },
      { id: 'heart_hands', d: 'M182,200 Q175,185 190,182 Q200,190 200,190 Q200,190 210,182 Q225,185 218,200 Q200,215 182,200 Z', label: 'Heart Hands', defaultColor: '#FEF3C7' },
      { id: 'bodice', d: 'M175,205 L168,255 Q200,265 232,255 L225,205 Q200,220 175,205 Z', label: 'Icy Bodice', defaultColor: '#93C5FD' },
      { id: 'skirt', d: 'M168,255 Q140,300 150,360 Q200,378 250,360 Q260,300 232,255 Q200,268 168,255 Z', label: 'Ice Gown Skirt', defaultColor: '#60A5FA' },
      { id: 'skirt_hem', d: 'M150,360 Q200,378 250,360 L253,372 Q200,392 147,372 Z', label: 'Hem Sparkle', defaultColor: '#DBEAFE' },
      { id: 'cone', d: 'M300,290 L340,290 L322,360 Z', label: 'Waffle Cone', defaultColor: '#FB923C' },
      { id: 'scoop', d: 'M290,290 Q292,255 320,252 Q348,255 350,290 Q320,300 290,290 Z', label: 'Ice Cream Scoop', defaultColor: '#FBCFE8' },
    ],
    overlaySvg: `
      <!-- Face -->
      <ellipse cx="185" cy="142" rx="7" ry="9" fill="#1F2937" />
      <circle cx="183" cy="139" r="2.5" fill="#FFFFFF" />
      <circle cx="187" cy="145" r="1.5" fill="#FFFFFF" />
      <path d="M176,134 Q185,130 193,134" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />

      <ellipse cx="215" cy="142" rx="7" ry="9" fill="#1F2937" />
      <circle cx="213" cy="139" r="2.5" fill="#FFFFFF" />
      <circle cx="217" cy="145" r="1.5" fill="#FFFFFF" />
      <path d="M207,134 Q215,130 224,134" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />

      <path d="M193,162 Q200,168 207,162" stroke="#E11D48" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <circle cx="174" cy="155" r="5" fill="#FDA4AF" opacity="0.6" />
      <circle cx="226" cy="155" r="5" fill="#FDA4AF" opacity="0.6" />

      <!-- Hair strand lines -->
      <path d="M165,70 Q180,90 172,110" stroke="#1F2937" stroke-width="2" fill="none" />
      <path d="M270,150 Q280,190 265,225" stroke="#1F2937" stroke-width="2" fill="none" />

      <!-- Heart hands shine -->
      <path d="M190,192 Q200,198 210,192" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />

      <!-- Snowflake center dots -->
      <circle cx="338" cy="58" r="2" fill="#93C5FD" />
      <circle cx="56" cy="220" r="2" fill="#93C5FD" />
      <circle cx="66" cy="320" r="2" fill="#93C5FD" />

      <!-- Floating heart shine -->
      <path d="M30,65 Q40,58 48,65" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.8" />

      <!-- Cone waffle grid -->
      <line x1="305" y1="305" x2="325" y2="340" stroke="#1F2937" stroke-width="1.5" />
      <line x1="313" y1="295" x2="330" y2="325" stroke="#1F2937" stroke-width="1.5" />
      <line x1="308" y1="320" x2="335" y2="308" stroke="#1F2937" stroke-width="1.5" />
      <line x1="303" y1="300" x2="336" y2="290" stroke="#1F2937" stroke-width="1.5" />

      <!-- Scoop swirl -->
      <path d="M300,275 Q320,262 340,275" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />
    `,
  },

  // ================= 10. CROWNED UNICORN =================
  {
    id: 'crowned_unicorn',
    title: 'Crowned Unicorn',
    emoji: '🦄',
    category: 'Fairytale',
    regions: [
      { id: 'sky_soft', d: 'M0,0 L400,0 L400,320 L0,320 Z', label: 'Soft Sky', defaultColor: '#FCE7F3' },
      { id: 'meadow', d: 'M0,310 Q200,280 400,310 L400,400 L0,400 Z', label: 'Meadow', defaultColor: '#BBF7D0' },
      { id: 'uni_body', d: 'M140,215 Q112,265 180,280 Q260,280 288,228 Q262,198 200,198 Z', label: 'Unicorn Body', defaultColor: '#FFFFFF' },
      { id: 'uni_head_neck', d: 'M140,215 L112,148 Q98,108 140,108 Q178,108 188,152 L198,210 Z', label: 'Head & Neck', defaultColor: '#FFFFFF' },
      { id: 'uni_snout', d: 'M102,130 Q76,148 96,168 Q120,168 130,148 Z', label: 'Snout', defaultColor: '#FEF3C7' },
      { id: 'uni_horn', d: 'M132,108 L152,32 L150,103 Z', label: 'Golden Horn', defaultColor: '#FACC15' },
      { id: 'uni_ear', d: 'M158,108 L173,72 L170,113 Z', label: 'Ear', defaultColor: '#FFFFFF' },
      { id: 'crown', d: 'M118,95 L128,65 L142,82 L158,60 L174,82 L186,68 L192,98 Z', label: 'Royal Crown', defaultColor: '#FACC15' },
      { id: 'crown_gem', d: 'M152,80 L158,72 L164,80 L158,88 Z', label: 'Crown Jewel', defaultColor: '#F43F5E' },
      { id: 'mane_1', d: 'M162,120 Q210,112 195,148 Q178,138 168,128 Z', label: 'Mane Lock 1', defaultColor: '#F472B6' },
      { id: 'mane_2', d: 'M172,145 Q225,148 205,185 Q190,168 178,153 Z', label: 'Mane Lock 2', defaultColor: '#C084FC' },
      { id: 'mane_3', d: 'M182,180 Q235,185 215,220 Q198,205 188,190 Z', label: 'Mane Lock 3', defaultColor: '#93C5FD' },
      { id: 'mane_bow_l', d: 'M225,145 L205,132 L205,158 Z', label: 'Mane Bow Left', defaultColor: '#EC4899' },
      { id: 'mane_bow_r', d: 'M225,145 L245,132 L245,158 Z', label: 'Mane Bow Right', defaultColor: '#EC4899' },
      { id: 'tail_top', d: 'M282,225 Q360,208 350,272 Q312,272 285,240 Z', label: 'Tail Top', defaultColor: '#F472B6' },
      { id: 'tail_bot', d: 'M285,240 Q345,272 335,308 Q292,302 278,255 Z', label: 'Tail Bottom', defaultColor: '#C084FC' },
      { id: 'leg_f', d: 'M138,250 L132,325 L158,325 L168,260 Z', label: 'Front Leg', defaultColor: '#FFFFFF' },
      { id: 'leg_b', d: 'M252,250 L252,325 L278,325 L272,260 Z', label: 'Back Leg', defaultColor: '#FFFFFF' },
      { id: 'hoof_f', d: 'M132,310 L158,310 L158,325 L132,325 Z', label: 'Front Hoof', defaultColor: '#FACC15' },
      { id: 'hoof_b', d: 'M252,310 L278,310 L278,325 L252,325 Z', label: 'Back Hoof', defaultColor: '#FACC15' },
      { id: 'leg_bow_f', d: 'M132,290 L158,290 L158,300 L132,300 Z', label: 'Leg Ribbon Front', defaultColor: '#F472B6' },
      { id: 'leg_bow_b', d: 'M252,290 L278,290 L278,300 L252,300 Z', label: 'Leg Ribbon Back', defaultColor: '#F472B6' },
      { id: 'heart_1', d: 'M330,80 C322,68 305,74 305,88 C305,102 330,118 330,118 C330,118 355,102 355,88 C355,74 338,68 330,80 Z', label: 'Heart', defaultColor: '#F9A8D4' },
    ],
    overlaySvg: `
      <!-- Eye -->
      <ellipse cx="132" cy="132" rx="9" ry="12" fill="#1F2937" />
      <circle cx="130" cy="128" r="3.5" fill="#FFFFFF" />
      <circle cx="135" cy="136" r="1.5" fill="#FFFFFF" />
      <path d="M122,122 Q132,117 142,122" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <line x1="122" y1="122" x2="118" y2="117" stroke="#1F2937" stroke-width="2" stroke-linecap="round" />

      <!-- Nostril & smile -->
      <circle cx="102" cy="148" r="2.5" fill="#E11D48" />
      <path d="M106,155 Q114,160 120,154" stroke="#E11D48" stroke-width="2" fill="none" stroke-linecap="round" />
      <circle cx="125" cy="148" r="6" fill="#FDA4AF" opacity="0.6" />

      <!-- Horn ridges -->
      <line x1="140" y1="85" x2="151" y2="90" stroke="#1F2937" stroke-width="2" stroke-linecap="round" />
      <line x1="144" y1="65" x2="153" y2="70" stroke="#1F2937" stroke-width="2" stroke-linecap="round" />
      <line x1="148" y1="48" x2="155" y2="52" stroke="#1F2937" stroke-width="2" stroke-linecap="round" />

      <!-- Mane strand lines -->
      <path d="M180,130 Q195,138 185,150" stroke="#1F2937" stroke-width="1.5" fill="none" />
      <path d="M190,160 Q205,168 195,180" stroke="#1F2937" stroke-width="1.5" fill="none" />

      <!-- Meadow grass tufts -->
      <path d="M40,340 Q45,325 50,340" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M180,355 Q185,340 190,355" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M340,345 Q345,330 350,345" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />

      <!-- Heart shine -->
      <path d="M312,80 Q320,74 326,80" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.8" />
    `,
  },

  // ================= 11. PRINCESS & HER UNICORN KITTEN =================
  {
    id: 'princess_unicorn_kitten',
    title: 'Princess & Unicorn Kitten',
    emoji: '🐱',
    category: 'Pet',
    regions: [
      { id: 'bg_lavender', d: 'M0,0 L400,0 L400,400 L0,400 Z', label: 'Lavender Sky', defaultColor: '#EDE9FE' },
      { id: 'ground', d: 'M0,370 L400,370 L400,400 L0,400 Z', label: 'Ground', defaultColor: '#DDD6FE' },
      { id: 'heart_big', d: 'M340,55 C328,38 300,48 300,68 C300,88 340,115 340,115 C340,115 380,88 380,68 C380,48 352,38 340,55 Z', label: 'Big Heart', defaultColor: '#F9A8D4' },
      { id: 'heart_med', d: 'M330,150 C322,138 305,145 305,158 C305,171 330,190 330,190 C330,190 355,171 355,158 C355,145 338,138 330,150 Z', label: 'Medium Heart', defaultColor: '#F472B6' },
      { id: 'heart_small', d: 'M340,215 C335,207 323,211 323,220 C323,229 340,240 340,240 C340,240 357,229 357,220 C357,211 345,207 340,215 Z', label: 'Small Heart', defaultColor: '#FBCFE8' },
      { id: 'crown', d: 'M105,80 L114,55 L128,70 L145,52 L162,70 L176,55 L185,80 Z', label: 'Princess Crown', defaultColor: '#FACC15' },
      { id: 'crown_gem', d: 'M138,68 L145,60 L152,68 L145,76 Z', label: 'Crown Jewel', defaultColor: '#38BDF8' },
      { id: 'hair', d: 'M95,95 Q65,150 90,230 Q115,235 118,190 Q108,145 128,105 Q170,95 195,110 Q205,150 185,225 Q205,232 215,195 Q225,140 195,95 Q160,75 145,80 Q120,78 95,95 Z', label: 'Princess Hair', defaultColor: '#78350F' },
      { id: 'face', d: 'M108,110 Q145,98 182,110 Q188,158 145,182 Q102,158 108,110 Z', label: 'Face', defaultColor: '#FEF3C7' },
      { id: 'arm_raised', d: 'M175,145 Q200,120 195,100 Q180,95 172,118 Q168,135 175,145 Z', label: 'Raised Arm', defaultColor: '#FEF3C7' },
      { id: 'sleeve', d: 'M172,138 Q198,132 198,158 Q182,172 165,158 Z', label: 'Puff Sleeve', defaultColor: '#F9A8D4' },
      { id: 'bodice', d: 'M112,200 L105,250 Q145,262 182,250 L175,200 Q145,215 112,200 Z', label: 'Bodice', defaultColor: '#F472B6' },
      { id: 'skirt', d: 'M105,250 Q65,295 78,350 Q145,368 210,350 Q222,295 175,250 Q145,262 105,250 Z', label: 'Skirt', defaultColor: '#C084FC' },
      { id: 'skirt_hem', d: 'M78,350 Q145,368 210,350 L213,362 Q145,382 75,362 Z', label: 'Hem', defaultColor: '#FEF3C7' },
      { id: 'kitten_body', d: 'M245,290 Q230,330 265,350 Q300,355 320,335 Q325,300 290,285 Z', label: 'Unicorn Kitten Body', defaultColor: '#FFFFFF' },
      { id: 'kitten_head', d: 'M240,255 Q228,290 260,305 Q290,315 315,300 Q330,270 305,248 Q270,235 240,255 Z', label: 'Kitten Head', defaultColor: '#FFFFFF' },
      { id: 'kitten_ear_l', d: 'M250,235 L240,212 L265,228 Z', label: 'Kitten Ear Left', defaultColor: '#FFFFFF' },
      { id: 'kitten_ear_r', d: 'M296,232 L308,208 L318,232 Z', label: 'Kitten Ear Right', defaultColor: '#FFFFFF' },
      { id: 'horn', d: 'M270,220 L280,175 L286,218 Z', label: 'Unicorn Horn', defaultColor: '#FACC15' },
      { id: 'collar', d: 'M248,295 Q278,305 308,295 L305,305 Q278,315 251,305 Z', label: 'Star Collar', defaultColor: '#38BDF8' },
      { id: 'collar_star', d: 'M278,292 L281,285 L288,285 L282,281 L284,274 L278,278 L272,274 L274,281 L268,285 L275,285 Z', label: 'Collar Star', defaultColor: '#FACC15' },
      { id: 'kitten_tail', d: 'M315,330 Q355,320 350,280 Q335,280 330,310 Q325,325 315,330 Z', label: 'Kitten Tail', defaultColor: '#F9A8D4' },
    ],
    overlaySvg: `
      <!-- Princess face -->
      <ellipse cx="133" cy="132" rx="7" ry="9" fill="#1F2937" />
      <circle cx="131" cy="129" r="2.5" fill="#FFFFFF" />
      <path d="M124,124 Q133,120 141,124" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />

      <ellipse cx="160" cy="132" rx="7" ry="9" fill="#1F2937" />
      <circle cx="158" cy="129" r="2.5" fill="#FFFFFF" />
      <path d="M152,124 Q160,120 169,124" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round" />

      <path d="M138,152 Q145,158 152,152" stroke="#E11D48" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <circle cx="120" cy="145" r="5" fill="#FDA4AF" opacity="0.6" />
      <circle cx="172" cy="145" r="5" fill="#FDA4AF" opacity="0.6" />

      <!-- Hair strand lines -->
      <path d="M100,110 Q90,160 105,215" stroke="#1F2937" stroke-width="2" fill="none" />
      <path d="M190,110 Q200,160 185,215" stroke="#1F2937" stroke-width="2" fill="none" />

      <!-- Kitten face -->
      <ellipse cx="262" cy="270" rx="6" ry="7" fill="#1F2937" />
      <circle cx="260" cy="268" r="2" fill="#FFFFFF" />
      <ellipse cx="288" cy="270" rx="6" ry="7" fill="#1F2937" />
      <circle cx="286" cy="268" r="2" fill="#FFFFFF" />
      <polygon points="270,280 280,280 275,285" fill="#F472B6" />
      <path d="M275,285 Q275,289 275,289" stroke="#1F2937" stroke-width="1.5" />
      <path d="M270,289 Q275,293 280,289" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />
      <line x1="255" y1="278" x2="235" y2="274" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" />
      <line x1="255" y1="284" x2="235" y2="286" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" />
      <line x1="295" y1="278" x2="315" y2="274" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" />
      <line x1="295" y1="284" x2="315" y2="286" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" />

      <!-- Horn ridges -->
      <line x1="274" y1="205" x2="282" y2="207" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" />
      <line x1="277" y1="192" x2="283" y2="194" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" />

      <!-- Heart shine accents -->
      <path d="M312,60 Q320,54 326,60" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.8" />

      <!-- Skirt folds -->
      <path d="M100,270 Q90,310 100,345" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M190,270 Q200,310 190,345" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round" />
    `,
  },
];
