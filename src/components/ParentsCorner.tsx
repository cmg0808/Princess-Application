import React from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, ShieldCheck, Heart, Info } from 'lucide-react';
import { playSound } from '../utils/audio';

interface ParentsCornerProps {
  isMuted: boolean;
  onToggleSound: () => void;
}

const spring = { type: 'spring' as const, stiffness: 360, damping: 22 };

const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; delay?: number }> = ({
  icon,
  title,
  children,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ ...spring, delay }}
    className="w-full glass-strong glow-lavender rounded-[28px] p-4 sm:p-5 flex flex-col gap-2"
  >
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-pink-600 shrink-0">
        {icon}
      </div>
      <h3 className="font-display italic text-base sm:text-lg font-bold text-[#4A3B5C]">{title}</h3>
    </div>
    <div className="text-sm text-[#4A3B5C]/80 leading-relaxed pl-10">{children}</div>
  </motion.div>
);

export const ParentsCorner: React.FC<ParentsCornerProps> = ({ isMuted, onToggleSound }) => {
  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center gap-3 select-none">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="w-full glass-strong glow-gold px-5 py-4 rounded-[28px] text-center"
      >
        <h2 className="font-display italic text-xl sm:text-2xl font-bold text-[#4A3B5C]">Parents Corner</h2>
        <p className="text-xs font-bold text-[#4A3B5C]/70 mt-1">Settings, privacy &amp; a little about this app</p>
      </motion.div>

      <Section icon={isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />} title="Sound" delay={0.04}>
        <div className="flex items-center justify-between gap-3">
          <span>Sound effects for taps, games, and rewards.</span>
          <motion.button
            id="btn-parents-sound-toggle"
            onClick={() => {
              onToggleSound();
              if (isMuted) playSound.chime();
            }}
            whileTap={{ scale: 0.92 }}
            className={`shrink-0 px-4 py-2 rounded-full font-black text-xs cursor-pointer ${
              isMuted ? 'glass text-[#4A3B5C]' : 'bg-pink-500 text-white glow-pink'
            }`}
          >
            {isMuted ? 'Off' : 'On'}
          </motion.button>
        </div>
      </Section>

      <Section icon={<ShieldCheck className="w-4 h-4" />} title="Privacy Policy" delay={0.08}>
        <p>
          This app does not collect, store, or share any personal information. There is no sign-up, no account,
          and no data ever leaves this device. Stars, stickers, and saved artwork are kept only in this browser's
          local storage, and are never sent anywhere.
        </p>
        <p className="mt-2">
          No analytics, no advertising, no location, and no names or other personal details are ever requested,
          collected, or transmitted — for children or adults.
        </p>
      </Section>

      <Section icon={<Info className="w-4 h-4" />} title="About &amp; Credits" delay={0.12}>
        <p>Princess Kingdom is a fairytale activity world made with love for curious little hands.</p>
        <p className="mt-2 text-xs text-[#4A3B5C]/60">Version 1.0</p>
      </Section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.16 }}
        className="flex items-center gap-1.5 text-xs font-bold text-[#4A3B5C]/50 pb-24"
      >
        <Heart className="w-3.5 h-3.5" />
        <span>Made for one very lucky princess</span>
      </motion.div>
    </div>
  );
};
