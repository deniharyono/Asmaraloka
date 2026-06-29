import React from "react";
import { motion } from "motion/react";
import { weddingConfig } from "../config";
import { GoldenDustParticles } from "./BotanicalDecoration";
import { JavaneseGunungan, JavaneseJasminSway, ShineSweepOverlay } from "./JavaneseOrnament";

export const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center bg-brand-bg px-4 py-20 text-center overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(to bottom, #F8F6F2 0%, #FFFFFF 100%)",
      }}
    >
      {/* Javanese jasmine garlands hanging gracefully on the sides of the Hero section */}
      <JavaneseJasminSway side="left" height="h-72" className="opacity-50" />
      <JavaneseJasminSway side="right" height="h-72" className="opacity-50" />

      {/* Sparkly Ambient Effect */}
      <GoldenDustParticles />

      {/* Elegant Radial Soft Floating Glow */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand-accent/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-brand-gold/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Floating floral illustration as watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0">
        <svg
          className="w-[80vw] h-[80vw] max-w-[500px] text-brand-gold animate-spin-slow"
          viewBox="0 0 100 100"
        >
          <path
            d="M50 5 C55 25 75 25 95 50 C75 75 55 75 50 95 C45 75 25 75 5 50 C25 25 45 25 50 5 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative max-w-xl w-full glass-card p-10 md:p-14 gold-border-decor z-10 overflow-hidden">
        {/* Shine Sweep Overlay */}
        <ShineSweepOverlay />

        {/* Traditional Javanese Pendopo Gunungan top ornament (gently swaying, pulsing, shining) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <JavaneseGunungan size={100} animate={true} />
        </motion.div>

        {/* Greeting Label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-heading uppercase tracking-[0.25em] text-xs text-brand-secondary mb-4"
        >
          Walimatul Ursy
        </motion.p>

        {/* Groom & Bride elegant cursive serif heading with gold shimmer */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mt-2 mb-2 gold-shimmer-text"
        >
          {weddingConfig.groom.shortName}
        </motion.h2>

        {/* Refined cursive connector */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="font-heading text-3xl text-brand-secondary italic my-2 animate-float-gentle"
        >
          &
        </motion.div>

        {/* Bride Name with gold shimmer */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 gold-shimmer-text"
        >
          {weddingConfig.bride.shortName}
        </motion.h2>

        {/* Custom date details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-24 h-[1px] bg-brand-gold/30 mx-auto my-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-heading text-sm text-brand-dark tracking-[0.2em] font-medium"
        >
          SABTU, 12 DESEMBER 2026
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.3 }}
          className="text-xs text-brand-secondary uppercase tracking-widest mt-2"
        >
          Jakarta, Indonesia
        </motion.p>
      </div>
    </section>
  );
};
