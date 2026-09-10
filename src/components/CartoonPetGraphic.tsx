import React from 'react';

interface CartoonPetGraphicProps {
  petId: 'unicorn' | 'bunny' | 'kitten' | 'puppy';
  isWashed: boolean;
  isRinsed: boolean;
  isBrushed: boolean;
  isDry?: boolean;
  bubbleCount: number;
  happiness: boolean;
  sparkling: boolean;
  accessoryId?: string;
  onClick?: () => void;
}

export const CartoonPetGraphic: React.FC<CartoonPetGraphicProps> = ({
  petId,
  isWashed,
  isRinsed,
  isBrushed,
  isDry = true,
  bubbleCount,
  happiness,
  sparkling,
  accessoryId,
  onClick,
}) => {
  const isHappy = happiness || isBrushed;
  const isSqueakyClean = isWashed && isRinsed && isBrushed;

  return (
    <div
      onClick={onClick}
      className={`relative w-64 h-64 sm:w-72 sm:h-72 select-none cursor-pointer transition-transform duration-300 ${
        happiness ? 'scale-105 -translate-y-2' : 'hover:scale-102'
      }`}
    >
      {/* Floating Sparkles Aura for Brushed Pet */}
      {sparkling && (
        <div className="absolute -inset-6 pointer-events-none z-30 flex items-center justify-around animate-pulse">
          <span className="text-3xl animate-bounce">✨</span>
          <span className="text-4xl animate-spin">🌟</span>
          <span className="text-3xl animate-bounce" style={{ animationDelay: '150ms' }}>
            💖
          </span>
          <span className="text-4xl animate-pulse" style={{ animationDelay: '300ms' }}>
            ✨
          </span>
        </div>
      )}

      {/* Squeaky Clean Stars Orbiting */}
      {isSqueakyClean && (
        <div className="absolute top-2 right-4 text-2xl animate-bounce text-amber-400 z-30 filter drop-shadow-md">
          ✨
        </div>
      )}

      {/* Main SVG Vector Pet Illustration */}
      <svg
        viewBox="0 0 240 240"
        className="w-full h-full drop-shadow-xl filter overflow-visible"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="unicornBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FDF4FF" />
            <stop offset="100%" stopColor="#F5D0FE" />
          </linearGradient>

          <linearGradient id="hornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          <linearGradient id="rainbowMane1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="50%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>

          <linearGradient id="bunnyFurGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="80%" stopColor="#F5F3FF" />
            <stop offset="100%" stopColor="#EDE9FE" />
          </linearGradient>

          <linearGradient id="kittenFurGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF1F2" />
            <stop offset="50%" stopColor="#FFE4E6" />
            <stop offset="100%" stopColor="#FECDD3" />
          </linearGradient>

          <linearGradient id="puppyFurGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="60%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <radialGradient id="soapBubbleGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#E0F2FE" stopOpacity="0.8" />
            <stop offset="85%" stopColor="#F472B6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0.7" />
          </radialGradient>
        </defs>

        {/* ================= UNICORN ================= */}
        {petId === 'unicorn' && (
          <g id="pet-unicorn-group">
            {/* Rainbow Mane Back Layer */}
            <path
              d="M75,90 Q40,110 50,155 Q65,185 85,190 Q70,145 85,120 Z"
              fill="url(#rainbowMane1)"
              stroke="#7E22CE"
              strokeWidth="2.5"
            />
            <path
              d="M60,110 Q30,135 45,175 Q60,195 78,198"
              fill="#38BDF8"
              stroke="#0284C7"
              strokeWidth="2"
            />

            {/* Back Ears */}
            <path
              d="M78,85 L86,45 Q98,48 102,68 Z"
              fill="#FFFFFF"
              stroke="#D8B4FE"
              strokeWidth="2.5"
            />
            <path d="M83,75 L88,52 Q95,54 97,68 Z" fill="#F472B6" opacity="0.6" />

            <path
              d="M138,85 L146,45 Q158,48 162,68 Z"
              fill="#FFFFFF"
              stroke="#D8B4FE"
              strokeWidth="2.5"
            />
            <path d="M143,75 L148,52 Q155,54 157,68 Z" fill="#F472B6" opacity="0.6" />

            {/* Golden Magic Horn */}
            <g className="animate-pulse">
              <polygon
                points="120,20 108,68 132,68"
                fill="url(#hornGrad)"
                stroke="#B45309"
                strokeWidth="2.5"
              />
              {/* Horn Spiral ridges */}
              <line x1="114" y1="36" x2="126" y2="40" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="111" y1="50" x2="129" y2="55" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              {/* Sparkle on horn tip */}
              <circle cx="120" cy="20" r="4" fill="#FEF08A" />
            </g>

            {/* Body / Shoulders */}
            <path
              d="M70,185 Q60,230 120,235 Q180,230 170,185 Q145,175 120,175 Q95,175 70,185 Z"
              fill="url(#unicornBodyGrad)"
              stroke="#C084FC"
              strokeWidth="2.5"
            />

            {/* Head */}
            <ellipse
              cx="120"
              cy="125"
              rx="52"
              ry="46"
              fill="url(#unicornBodyGrad)"
              stroke="#C084FC"
              strokeWidth="2.5"
            />

            {/* Muzzle / Snout */}
            <ellipse cx="120" cy="148" rx="28" ry="18" fill="#FDF2F8" stroke="#F472B6" strokeWidth="1.5" />
            {/* Nostrils */}
            <circle cx="112" cy="146" r="2.5" fill="#F43F5E" />
            <circle cx="128" cy="146" r="2.5" fill="#F43F5E" />
            {/* Smile */}
            <path d="M114,154 Q120,160 126,154" fill="none" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />

            {/* Cheeks Blush */}
            <ellipse cx="88" cy="138" rx="10" ry="7" fill="#F472B6" opacity={isHappy ? 0.8 : 0.4} />
            <ellipse cx="152" cy="138" rx="10" ry="7" fill="#F472B6" opacity={isHappy ? 0.8 : 0.4} />

            {/* Eyes */}
            {!isHappy ? (
              // Open Anime Glitter Eyes
              <g id="unicorn-eyes-open">
                {/* Left Eye */}
                <ellipse cx="98" cy="116" rx="11" ry="14" fill="#581C87" />
                <ellipse cx="98" cy="118" rx="9" ry="12" fill="#7E22CE" />
                <ellipse cx="98" cy="122" rx="7" ry="7" fill="#C084FC" />
                <circle cx="95" cy="111" r="4.5" fill="#FFFFFF" />
                <circle cx="102" cy="122" r="2.5" fill="#FFFFFF" />
                {/* Eyelashes */}
                <path d="M88,108 Q94,103 103,105" fill="none" stroke="#3B0764" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="88" y1="108" x2="84" y2="103" stroke="#3B0764" strokeWidth="2" strokeLinecap="round" />

                {/* Right Eye */}
                <ellipse cx="142" cy="116" rx="11" ry="14" fill="#581C87" />
                <ellipse cx="142" cy="118" rx="9" ry="12" fill="#7E22CE" />
                <ellipse cx="142" cy="122" rx="7" ry="7" fill="#C084FC" />
                <circle cx="139" cy="111" r="4.5" fill="#FFFFFF" />
                <circle cx="146" cy="122" r="2.5" fill="#FFFFFF" />
                {/* Eyelashes */}
                <path d="M137,105 Q146,103 152,108" fill="none" stroke="#3B0764" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="152" y1="108" x2="156" y2="103" stroke="#3B0764" strokeWidth="2" strokeLinecap="round" />
              </g>
            ) : (
              // Joyful Happy Curved Eyes
              <g id="unicorn-eyes-happy">
                <path d="M88,118 Q98,106 108,118" fill="none" stroke="#581C87" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M132,118 Q142,106 152,118" fill="none" stroke="#581C87" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="86" y1="116" x2="82" y2="112" stroke="#581C87" strokeWidth="2" strokeLinecap="round" />
                <line x1="154" y1="116" x2="158" y2="112" stroke="#581C87" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}

            {/* Front Forelock Mane Locks */}
            <path
              d="M105,75 Q120,95 110,110 Q125,92 135,76 Z"
              fill="#F472B6"
              stroke="#BE185D"
              strokeWidth="1.5"
            />
            <path
              d="M120,72 Q138,90 130,105 Q145,88 142,75 Z"
              fill="#FACC15"
              stroke="#CA8A04"
              strokeWidth="1.5"
            />

            {/* Cute Front Hooves resting on bathtub rim */}
            <g id="unicorn-hooves">
              {/* Left Leg & Hoof */}
              <ellipse cx="88" cy="215" rx="14" ry="18" fill="url(#unicornBodyGrad)" stroke="#C084FC" strokeWidth="2" />
              <path d="M76,215 Q88,208 100,215 L100,225 Q88,228 76,225 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
              {/* Right Leg & Hoof */}
              <ellipse cx="152" cy="215" rx="14" ry="18" fill="url(#unicornBodyGrad)" stroke="#C084FC" strokeWidth="2" />
              <path d="M140,215 Q152,208 164,215 L164,225 Q152,228 140,225 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
            </g>
          </g>
        )}

        {/* ================= BUNNY ================= */}
        {petId === 'bunny' && (
          <g id="pet-bunny-group">
            {/* Long Fluffy Lop Ears */}
            {/* Left Ear */}
            <path
              d="M80,85 C50,90 30,140 45,185 C55,200 70,180 75,145 C78,125 82,95 80,85 Z"
              fill="url(#bunnyFurGrad)"
              stroke="#C4B5FD"
              strokeWidth="2.5"
            />
            <path
              d="M74,95 C55,105 45,145 54,175 C60,185 66,175 70,145 Z"
              fill="#F472B6"
              opacity="0.45"
            />

            {/* Right Ear */}
            <path
              d="M160,85 C190,90 210,140 195,185 C185,200 170,180 165,145 C162,125 158,95 160,85 Z"
              fill="url(#bunnyFurGrad)"
              stroke="#C4B5FD"
              strokeWidth="2.5"
            />
            <path
              d="M166,95 C185,105 195,145 186,175 C180,185 174,175 170,145 Z"
              fill="#F472B6"
              opacity="0.45"
            />

            {/* Head Top Fluff Tuft */}
            <path d="M110,75 Q120,60 125,72 Q130,58 135,75 Z" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="2" />

            {/* Body / Shoulders */}
            <ellipse
              cx="120"
              cy="200"
              rx="55"
              ry="38"
              fill="url(#bunnyFurGrad)"
              stroke="#C4B5FD"
              strokeWidth="2.5"
            />

            {/* Head */}
            <ellipse
              cx="120"
              cy="125"
              rx="50"
              ry="45"
              fill="url(#bunnyFurGrad)"
              stroke="#C4B5FD"
              strokeWidth="2.5"
            />

            {/* Snout Muzzle */}
            <ellipse cx="120" cy="145" rx="20" ry="14" fill="#FFFFFF" />

            {/* Heart Nose */}
            <path d="M116,138 Q120,135 124,138 Q120,144 116,138 Z" fill="#F43F5E" />
            {/* Mouth */}
            <path d="M120,142 L120,147" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
            <path d="M114,147 Q120,152 126,147" fill="none" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />

            {/* Whiskers */}
            <line x1="85" y1="140" x2="65" y2="135" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="85" y1="145" x2="65" y2="148" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="155" y1="140" x2="175" y2="135" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="155" y1="145" x2="175" y2="148" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />

            {/* Cheeks */}
            <circle cx="92" cy="142" r="9" fill="#F472B6" opacity={isHappy ? 0.7 : 0.35} />
            <circle cx="148" cy="142" r="9" fill="#F472B6" opacity={isHappy ? 0.7 : 0.35} />

            {/* Eyes */}
            {!isHappy ? (
              <g id="bunny-eyes-open">
                {/* Left Eye */}
                <ellipse cx="98" cy="118" rx="10" ry="13" fill="#3B1D11" />
                <circle cx="95" cy="114" r="4" fill="#FFFFFF" />
                <circle cx="101" cy="122" r="2" fill="#FFFFFF" />
                {/* Right Eye */}
                <ellipse cx="142" cy="118" rx="10" ry="13" fill="#3B1D11" />
                <circle cx="139" cy="114" r="4" fill="#FFFFFF" />
                <circle cx="145" cy="122" r="2" fill="#FFFFFF" />
              </g>
            ) : (
              <g id="bunny-eyes-happy">
                <path d="M88,120 Q98,110 108,120" fill="none" stroke="#3B1D11" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M132,120 Q142,110 152,120" fill="none" stroke="#3B1D11" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            )}

            {/* Paws on Tub */}
            <ellipse cx="98" cy="212" rx="12" ry="15" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="2" />
            <ellipse cx="142" cy="212" rx="12" ry="15" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="2" />
            {/* Paw pads */}
            <circle cx="98" cy="216" r="3.5" fill="#FBCFE8" />
            <circle cx="142" cy="216" r="3.5" fill="#FBCFE8" />
          </g>
        )}

        {/* ================= KITTEN ================= */}
        {petId === 'kitten' && (
          <g id="pet-kitten-group">
            {/* Pointy Cat Ears */}
            <path d="M75,95 L65,45 L105,75 Z" fill="url(#kittenFurGrad)" stroke="#FDA4AF" strokeWidth="2.5" />
            <path d="M76,88 L72,55 L98,76 Z" fill="#F472B6" opacity="0.6" />

            <path d="M165,95 L175,45 L135,75 Z" fill="url(#kittenFurGrad)" stroke="#FDA4AF" strokeWidth="2.5" />
            <path d="M164,88 L168,55 L142,76 Z" fill="#F472B6" opacity="0.6" />

            {/* Body */}
            <ellipse cx="120" cy="200" rx="55" ry="38" fill="url(#kittenFurGrad)" stroke="#FDA4AF" strokeWidth="2.5" />

            {/* Head */}
            <ellipse cx="120" cy="125" rx="53" ry="44" fill="url(#kittenFurGrad)" stroke="#FDA4AF" strokeWidth="2.5" />

            {/* Cheeks Fluff */}
            <path d="M68,135 Q58,140 68,146 Q58,150 72,154" fill="url(#kittenFurGrad)" stroke="#FDA4AF" strokeWidth="1.5" />
            <path d="M172,135 Q182,140 172,146 Q182,150 168,154" fill="url(#kittenFurGrad)" stroke="#FDA4AF" strokeWidth="1.5" />

            {/* Tiny Pink Nose */}
            <polygon points="116,140 124,140 120,145" fill="#E11D48" />
            {/* Cat Mouth */}
            <path d="M115,148 Q120,152 125,148" fill="none" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
            <path d="M115,148 Q110,152 106,149" fill="none" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
            <path d="M125,148 Q130,152 134,149" fill="none" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />

            {/* Whiskers */}
            <line x1="82" y1="140" x2="55" y2="135" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" />
            <line x1="82" y1="146" x2="55" y2="148" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" />
            <line x1="158" y1="140" x2="185" y2="135" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" />
            <line x1="158" y1="146" x2="185" y2="148" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" />

            {/* Blushing Cheeks */}
            <circle cx="88" cy="144" r="9" fill="#FB7185" opacity={isHappy ? 0.8 : 0.4} />
            <circle cx="152" cy="144" r="9" fill="#FB7185" opacity={isHappy ? 0.8 : 0.4} />

            {/* Eyes */}
            {!isHappy ? (
              <g id="kitten-eyes-open">
                {/* Left Eye */}
                <ellipse cx="96" cy="120" rx="12" ry="14" fill="#0284C7" />
                <ellipse cx="96" cy="122" rx="10" ry="12" fill="#38BDF8" />
                <circle cx="93" cy="116" r="4.5" fill="#FFFFFF" />
                <circle cx="99" cy="125" r="2.5" fill="#FFFFFF" />
                <path d="M86,110 Q94,106 104,110" fill="none" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="86" y1="110" x2="82" y2="105" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />

                {/* Right Eye */}
                <ellipse cx="144" cy="120" rx="12" ry="14" fill="#0284C7" />
                <ellipse cx="144" cy="122" rx="10" ry="12" fill="#38BDF8" />
                <circle cx="141" cy="116" r="4.5" fill="#FFFFFF" />
                <circle cx="147" cy="125" r="2.5" fill="#FFFFFF" />
                <path d="M136,110 Q146,106 154,110" fill="none" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="154" y1="110" x2="158" y2="105" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
              </g>
            ) : (
              <g id="kitten-eyes-happy">
                <path d="M86,122 Q96,110 106,122" fill="none" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M134,122 Q144,110 154,122" fill="none" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            )}

            {/* Paws */}
            <ellipse cx="92" cy="214" rx="13" ry="16" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="2" />
            <circle cx="92" cy="217" r="4" fill="#F43F5E" opacity="0.6" />
            <ellipse cx="148" cy="214" rx="13" ry="16" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="2" />
            <circle cx="148" cy="217" r="4" fill="#F43F5E" opacity="0.6" />
          </g>
        )}

        {/* ================= PUPPY ================= */}
        {petId === 'puppy' && (
          <g id="pet-puppy-group">
            {/* Floppy Dog Ears */}
            <path
              d="M75,90 C50,85 40,120 48,155 C52,175 70,175 75,150 C78,130 82,105 75,90 Z"
              fill="#D97706"
              stroke="#B45309"
              strokeWidth="2.5"
            />
            <path
              d="M165,90 C190,85 200,120 192,155 C188,175 170,175 165,150 C162,130 158,105 165,90 Z"
              fill="#D97706"
              stroke="#B45309"
              strokeWidth="2.5"
            />

            {/* Body */}
            <ellipse cx="120" cy="200" rx="55" ry="38" fill="url(#puppyFurGrad)" stroke="#D97706" strokeWidth="2.5" />

            {/* Head */}
            <ellipse cx="120" cy="125" rx="52" ry="46" fill="url(#puppyFurGrad)" stroke="#D97706" strokeWidth="2.5" />

            {/* Snout */}
            <ellipse cx="120" cy="148" rx="24" ry="18" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="2" />

            {/* Glossy Black Nose */}
            <ellipse cx="120" cy="140" rx="9" ry="7" fill="#1F2937" />
            <ellipse cx="118" cy="138" rx="3" ry="2" fill="#FFFFFF" />

            {/* Cute Puppy Smile & Tongue */}
            <path d="M120,147 L120,154" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <path d="M112,154 Q120,160 128,154" fill="none" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
            {/* Cute Pink Tongue */}
            <path d="M117,156 C117,166 123,166 123,156 Z" fill="#F43F5E" stroke="#BE185D" strokeWidth="1" />

            {/* Rosy Cheeks */}
            <circle cx="86" cy="144" r="9" fill="#FB923C" opacity={isHappy ? 0.7 : 0.35} />
            <circle cx="154" cy="144" r="9" fill="#FB923C" opacity={isHappy ? 0.7 : 0.35} />

            {/* Eyes */}
            {!isHappy ? (
              <g id="puppy-eyes-open">
                {/* Left Eye */}
                <ellipse cx="96" cy="120" rx="11" ry="14" fill="#451A03" />
                <circle cx="93" cy="115" r="4.5" fill="#FFFFFF" />
                <circle cx="99" cy="124" r="2.5" fill="#FFFFFF" />
                {/* Eyebrow */}
                <ellipse cx="95" cy="104" rx="4" ry="3" fill="#D97706" />

                {/* Right Eye */}
                <ellipse cx="144" cy="120" rx="11" ry="14" fill="#451A03" />
                <circle cx="141" cy="115" r="4.5" fill="#FFFFFF" />
                <circle cx="147" cy="124" r="2.5" fill="#FFFFFF" />
                {/* Eyebrow */}
                <ellipse cx="145" cy="104" rx="4" ry="3" fill="#D97706" />
              </g>
            ) : (
              <g id="puppy-eyes-happy">
                <path d="M86,122 Q96,110 106,122" fill="none" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M134,122 Q144,110 154,122" fill="none" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            )}

            {/* Puppy Paws */}
            <ellipse cx="92" cy="214" rx="14" ry="16" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
            <circle cx="92" cy="217" r="4" fill="#B45309" opacity="0.4" />
            <ellipse cx="148" cy="214" rx="14" ry="16" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
            <circle cx="148" cy="217" r="4" fill="#B45309" opacity="0.4" />
          </g>
        )}

        {/* ================= DIRTY SMUDGES (Before wash) ================= */}
        {!isWashed && (
          <g id="dirty-mud-smudges" opacity="0.75">
            {/* Cheek mud smudge */}
            <ellipse cx="78" cy="130" rx="7" ry="5" fill="#78350F" />
            <ellipse cx="83" cy="134" rx="4" ry="3" fill="#92400E" />
            {/* Forehead mud spot */}
            <circle cx="145" cy="98" r="4" fill="#78350F" />
            <ellipse cx="148" cy="102" rx="6" ry="4" fill="#92400E" />
            {/* Paw smudge */}
            <ellipse cx="96" cy="210" rx="5" ry="3" fill="#78350F" />
          </g>
        )}

        {/* ================= SOAP SUDS / BUBBLES ================= */}
        {bubbleCount > 0 && (
          <g id="soap-suds-layer">
            {/* Head Foam Cap */}
            <ellipse cx="108" cy="72" rx="16" ry="14" fill="url(#soapBubbleGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
            <ellipse cx="125" cy="68" rx="18" ry="15" fill="url(#soapBubbleGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
            <ellipse cx="138" cy="75" rx="14" ry="13" fill="url(#soapBubbleGrad)" stroke="#FFFFFF" strokeWidth="1.5" />

            {/* Ear Bubbles */}
            <circle cx="82" cy="78" r="10" fill="url(#soapBubbleGrad)" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="158" cy="78" r="10" fill="url(#soapBubbleGrad)" stroke="#FFFFFF" strokeWidth="1" />

            {/* Floating Soap Bubbles around head */}
            {bubbleCount >= 4 && (
              <>
                <circle cx="68" cy="115" r="9" fill="url(#soapBubbleGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="172" cy="115" r="9" fill="url(#soapBubbleGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="120" cy="170" r="8" fill="url(#soapBubbleGrad)" stroke="#FFFFFF" strokeWidth="1" />
              </>
            )}

            {bubbleCount >= 8 && (
              <>
                <circle cx="55" cy="85" r="12" fill="url(#soapBubbleGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="185" cy="85" r="12" fill="url(#soapBubbleGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="95" cy="180" r="10" fill="url(#soapBubbleGrad)" stroke="#FFFFFF" strokeWidth="1" />
                <circle cx="145" cy="180" r="10" fill="url(#soapBubbleGrad)" stroke="#FFFFFF" strokeWidth="1" />
              </>
            )}
          </g>
        )}

        {/* ================= WATER RINSING DROPLETS ================= */}
        {isRinsed && !isBrushed && (
          <g id="water-droplets-layer" opacity="0.8">
            <path d="M80,105 Q78,115 80,118 Q82,115 80,105 Z" fill="#38BDF8" />
            <path d="M160,105 Q158,115 160,118 Q162,115 160,105 Z" fill="#38BDF8" />
            <path d="M120,85 Q118,95 120,98 Q122,95 120,85 Z" fill="#38BDF8" />
            <path d="M100,165 Q98,175 100,178 Q102,175 100,165 Z" fill="#38BDF8" />
            <path d="M140,165 Q138,175 140,178 Q142,175 140,165 Z" fill="#38BDF8" />
          </g>
        )}

        {/* ================= ROYAL ACCESSORIES ================= */}
        {accessoryId === 'tiara' && (
          <g id="accessory-tiara" transform="translate(120, 52) scale(0.85) translate(-120, -52)">
            {/* Golden Tiara */}
            <polygon
              points="95,65 105,42 120,54 135,42 145,65"
              fill="url(#hornGrad)"
              stroke="#B45309"
              strokeWidth="2"
            />
            {/* Gems */}
            <circle cx="120" cy="50" r="4" fill="#F43F5E" />
            <circle cx="105" cy="46" r="3" fill="#38BDF8" />
            <circle cx="135" cy="46" r="3" fill="#38BDF8" />
            <ellipse cx="120" cy="65" rx="25" ry="4" fill="#FDE047" stroke="#B45309" strokeWidth="1.5" />
          </g>
        )}

        {accessoryId === 'bow' && (
          <g id="accessory-bow" transform="translate(120, 68) scale(0.9) translate(-120, -68)">
            {/* Big Pink Satin Bow */}
            <path d="M120,68 L92,54 Q90,75 120,72 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
            <path d="M120,68 L148,54 Q150,75 120,72 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
            <circle cx="120" cy="68" r="6" fill="#FB7185" stroke="#BE185D" strokeWidth="2" />
            <path d="M116,72 L110,88" stroke="#DB2777" strokeWidth="3" strokeLinecap="round" />
            <path d="M124,72 L130,88" stroke="#DB2777" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {accessoryId === 'flower' && (
          <g id="accessory-flower" transform="translate(150, 75) scale(0.85) translate(-150, -75)">
            {/* Cherry Blossom Cluster */}
            <circle cx="150" cy="66" r="6" fill="#FBCFE8" />
            <circle cx="158" cy="72" r="6" fill="#FBCFE8" />
            <circle cx="155" cy="82" r="6" fill="#FBCFE8" />
            <circle cx="145" cy="82" r="6" fill="#FBCFE8" />
            <circle cx="142" cy="72" r="6" fill="#FBCFE8" />
            <circle cx="150" cy="75" r="5" fill="#FDE047" />
          </g>
        )}

        {accessoryId === 'bell' && (
          <g id="accessory-bell" transform="translate(120, 182) scale(0.9) translate(-120, -182)">
            {/* Gold Bell Collar */}
            <path d="M96,176 Q120,188 144,176" fill="none" stroke="#F43F5E" strokeWidth="5" strokeLinecap="round" />
            <circle cx="120" cy="186" r="7" fill="#FACC15" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="120" cy="188" r="1.5" fill="#78350F" />
          </g>
        )}

        {accessoryId === 'star' && (
          <g id="accessory-star" transform="translate(120, 50) scale(0.85) translate(-120, -50)">
            <polygon
              points="120,38 123,47 132,47 125,53 128,62 120,56 112,62 115,53 108,47 117,47"
              fill="#FDE047"
              stroke="#EA580C"
              strokeWidth="2"
            />
          </g>
        )}

        {accessoryId === 'heart' && (
          <g id="accessory-heart" transform="translate(120, 52) scale(0.85) translate(-120, -52)">
            <path
              d="M120,62 C115,50 98,52 98,64 C98,74 120,86 120,86 C120,86 142,74 142,64 C142,52 125,50 120,62 Z"
              fill="#F43F5E"
              stroke="#9F1239"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
