import React, { useState } from "react";
import { MailOpen } from "lucide-react";
import { weddingConfig } from "../config";
import { GoldCornerOrnament, GoldenDustParticles } from "./BotanicalDecoration";
import { JavaneseGunungan, JavaneseJasminSway, ShineSweepOverlay } from "./JavaneseOrnament";

interface LockScreenProps {
  unlocked: boolean;
  onUnlock: () => void;
  guestName: string;
}

export const LockScreen: React.FC<LockScreenProps> = ({
  unlocked,
  onUnlock,
  guestName,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleBukaUndangan = () => {
    setIsTransitioning(true);
    // Play transition animation for 1.6s before unlocking fully
    setTimeout(() => {
      onUnlock();
    }, 1500);
  };

  return (
    <div
      className={`fixed inset-0 w-full h-screen z-[9999] flex flex-col items-center justify-center bg-brand-bg px-4 overflow-hidden transition-all duration-[1200ms] cubic-bezier(0.85, 0, 0.15, 1) ${
        unlocked ? "transform -translate-y-full opacity-0 pointer-events-none" : "transform translate-y-0"
      }`}
      style={{
        backgroundImage: "radial-gradient(circle, #FDFCFA 0%, #F8F6F2 100%)",
      }}
    >
      {/* Javanese jasmine garlands hanging from top corners */}
      <JavaneseJasminSway side="left" height="h-64" className="opacity-40" />
      <JavaneseJasminSway side="right" height="h-64" className="opacity-40" />

      {/* Golden Dust Ambient Particles */}
      {!unlocked && <GoldenDustParticles />}

      {/* Decorative Javanese gold corners */}
      <GoldCornerOrnament className="absolute top-4 left-4" rotation={0} />
      <GoldCornerOrnament className="absolute top-4 right-4" rotation={90} />
      <GoldCornerOrnament className="absolute bottom-4 left-4" rotation={270} />
      <GoldCornerOrnament className="absolute bottom-4 right-4" rotation={180} />

      {/* Main Invitation Box */}
      <div
        className="max-w-md w-full glass-card p-8 md:p-10 text-center relative gold-border-decor z-10 transition-all duration-700 hover:shadow-2xl overflow-hidden"
        style={{
          boxShadow: "0 20px 50px rgba(184, 154, 86, 0.12)",
        }}
      >
        {/* Luxury Shine Sweep overlay */}
        <ShineSweepOverlay />

        {/* Traditional Javanese Pendopo Gunungan top ornament (gently swaying, pulsing, shining) */}
        <div className="flex justify-center mb-4 text-brand-gold">
          <JavaneseGunungan size={90} animate={true} />
        </div>

        {/* Heading */}
        <p className="font-heading tracking-[0.25em] text-xs uppercase text-brand-secondary mb-2">
          The Wedding of
        </p>

        {/* Big Gilded Names with golden shimmer */}
        <h1 className="font-heading text-4xl md:text-5xl font-medium tracking-tight mt-3 mb-1 gold-shimmer-text">
          {weddingConfig.groom.shortName}
        </h1>
        <p className="font-heading text-2xl text-brand-secondary italic my-1">&</p>
        <h1 className="font-heading text-4xl md:text-5xl font-medium tracking-tight mb-4 gold-shimmer-text">
          {weddingConfig.bride.shortName}
        </h1>

        {/* Elegant divider */}
        <div className="w-24 h-[1px] bg-brand-gold/30 mx-auto my-6" />

        {/* Guest Information */}
        <div className="mb-8">
          <p className="font-heading italic text-xs text-brand-secondary uppercase tracking-widest mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
          <div className="inline-block bg-white/55 backdrop-blur-sm border border-brand-gold/25 rounded-xl px-6 py-3 mt-2 min-w-[200px] shadow-sm">
            <h3 className="font-heading text-xl md:text-2xl text-brand-dark font-medium tracking-wide">
              {guestName}
            </h3>
          </div>
          <p className="text-[10px] text-brand-secondary uppercase tracking-[0.15em] mt-3">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Interactive Button */}
        <button
          id="btn-buka-undangan"
          onClick={handleBukaUndangan}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-brand-gold hover:bg-brand-dark text-white hover:text-brand-accent font-button text-xs font-semibold uppercase tracking-widest cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-brand-gold/20"
        >
          <MailOpen size={15} />
          Buka Undangan
        </button>

        {/* Custom date display */}
        <p className="font-heading text-xs text-brand-secondary tracking-widest mt-8">
          Sabtu, 12 Desember 2026
        </p>
      </div>

      {/* CINEMATIC ZOOM-IN CLOUD & STAR TRANSITION OVERLAY */}
      {isTransitioning && (
        <div className="absolute inset-0 w-full h-full z-[10000] pointer-events-none flex items-center justify-center overflow-hidden bg-[#FDFCFA]/30">
          {/* Zoom Star Burst */}
          <div className="absolute text-brand-gold/45 animate-zoom-stars scale-50">
            <svg viewBox="0 0 100 100" className="w-96 h-96">
              <circle cx="50" cy="50" r="1" fill="currentColor" />
              {/* Star Rays */}
              <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
              <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="0.5" />
              <line x1="20" y1="80" x2="80" y2="20" stroke="currentColor" strokeWidth="0.5" />
              {/* Sparkles */}
              <circle cx="35" cy="35" r="2" fill="currentColor" />
              <circle cx="65" cy="65" r="2" fill="currentColor" />
              <circle cx="35" cy="65" r="2" fill="currentColor" />
              <circle cx="65" cy="35" r="2" fill="currentColor" />
            </svg>
          </div>

          {/* Left clouds zooming outwards */}
          <div className="absolute left-[-10%] w-[70%] h-full flex items-center justify-center text-white/95 animate-zoom-cloud-left select-none">
            <svg viewBox="0 0 300 200" className="w-full h-auto drop-shadow-2xl">
              <path
                d="M 50 150 
                   A 40 40 0 0 1 100 110 
                   A 50 50 0 0 1 180 80 
                   A 60 60 0 0 1 270 120 
                   A 40 40 0 0 1 300 160 
                   L 300 200 L 0 200 Z"
                fill="#FFFFFF"
                opacity="0.95"
              />
              <path
                d="M 20 160 
                   A 30 30 0 0 1 60 130 
                   A 45 45 0 0 1 130 110 
                   A 40 40 0 0 1 200 150 
                   L 200 200 L 0 200 Z"
                fill="#EAE6DF"
                opacity="0.8"
              />
            </svg>
          </div>

          {/* Right clouds zooming outwards */}
          <div className="absolute right-[-10%] w-[70%] h-full flex items-center justify-center text-white/95 animate-zoom-cloud-right select-none">
            <svg viewBox="0 0 300 200" className="w-full h-auto drop-shadow-2xl transform scale-x-[-1]">
              <path
                d="M 50 150 
                   A 40 40 0 0 1 100 110 
                   A 50 50 0 0 1 180 80 
                   A 60 60 0 0 1 270 120 
                   A 40 40 0 0 1 300 160 
                   L 300 200 L 0 200 Z"
                fill="#FFFFFF"
                opacity="0.95"
              />
              <path
                d="M 20 160 
                   A 30 30 0 0 1 60 130 
                   A 45 45 0 0 1 130 110 
                   A 40 40 0 0 1 200 150 
                   L 200 200 L 0 200 Z"
                fill="#EAE6DF"
                opacity="0.8"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

