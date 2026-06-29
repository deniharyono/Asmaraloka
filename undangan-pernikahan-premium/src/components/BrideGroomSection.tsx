import React from "react";
import { motion } from "motion/react";
import { Instagram } from "lucide-react";
import { weddingConfig } from "../config";
import { ElegantDivider, SwayingLeafBackground } from "./BotanicalDecoration";
import { JavaneseGunungan, JavaneseJasminSway, ShineSweepOverlay } from "./JavaneseOrnament";

export const BrideGroomSection: React.FC = () => {
  return (
    <section
      id="couple"
      className="relative py-24 px-4 bg-brand-bg overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(to bottom, #F8F6F2 0%, #FFFFFF 100%)",
      }}
    >
      {/* Background decorations */}
      <SwayingLeafBackground position="top-left" />
      <SwayingLeafBackground position="bottom-right" />

      {/* Soft color glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading uppercase tracking-[0.2em] text-xs text-brand-secondary mb-2"
          >
            Memperkenalkan Pasangan
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-3xl md:text-5xl text-brand-gold font-light tracking-wide"
          >
            Mempelai Wanita & Pria
          </motion.h2>
          <ElegantDivider />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-md mx-auto text-sm text-brand-secondary leading-relaxed font-body"
          >
            Atas Ridho Allah SWT, dengan segala kerendahan hati dan rasa syukur, kami ingin memperkenalkan pasangan berbahagia.
          </motion.p>
        </div>

        {/* Couple Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* GROOM (PRIA) CARD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="glass-card p-6 md:p-8 gold-border-decor text-center flex flex-col items-center relative overflow-hidden"
          >
            {/* Javanese ornaments for groom card */}
            <ShineSweepOverlay />
            <JavaneseJasminSway side="left" height="h-48" className="opacity-40" />
            <JavaneseJasminSway side="right" height="h-48" className="opacity-40" />

            {/* Small Javanese Gunungan at top header of the card (gently swaying, pulsing) */}
            <div className="mb-4 text-brand-gold/80 flex justify-center">
              <JavaneseGunungan size={65} animate={true} />
            </div>

            {/* Elegant Portrait Frame */}
            <div className="relative w-48 h-64 md:w-56 md:h-72 rounded-[24px] overflow-hidden mb-6 shadow-md border-2 border-brand-accent/30 p-1 bg-white z-10">
              <div className="absolute inset-2 border border-brand-gold/20 rounded-[18px] pointer-events-none z-10" />
              <img
                src={weddingConfig.groom.photo}
                alt={weddingConfig.groom.shortName}
                className="w-full h-full object-cover rounded-[18px] transition-transform duration-[1.5s] hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Groom Details */}
            <h3 className="font-heading text-2xl md:text-3xl text-brand-gold font-medium tracking-wide mb-1 z-10 gold-shimmer-text">
              {weddingConfig.groom.fullName}
            </h3>
            <p className="text-xs text-brand-secondary font-button tracking-widest uppercase mb-4 z-10">
              Mempelai Pria
            </p>

            <p className="font-body text-xs text-brand-secondary leading-relaxed mb-6 max-w-xs z-10">
              {weddingConfig.groom.parents}
            </p>

            {/* Social Link */}
            <a
              href={weddingConfig.groom.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 text-xs text-brand-gold hover:bg-brand-gold hover:text-white hover:scale-105 transition-all duration-300 font-button tracking-wider z-10"
            >
              <Instagram size={14} />
              @{weddingConfig.groom.shortName.toLowerCase()}
            </a>
          </motion.div>

          {/* BRIDE (WANITA) CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="glass-card p-6 md:p-8 gold-border-decor text-center flex flex-col items-center relative overflow-hidden order-first md:order-last"
          >
            {/* Javanese ornaments for bride card */}
            <ShineSweepOverlay />
            <JavaneseJasminSway side="left" height="h-48" className="opacity-40" />
            <JavaneseJasminSway side="right" height="h-48" className="opacity-40" />

            {/* Small Javanese Gunungan at top header of the card (gently swaying, pulsing) */}
            <div className="mb-4 text-brand-gold/80 flex justify-center">
              <JavaneseGunungan size={65} animate={true} />
            </div>

            {/* Elegant Portrait Frame */}
            <div className="relative w-48 h-64 md:w-56 md:h-72 rounded-[24px] overflow-hidden mb-6 shadow-md border-2 border-brand-accent/30 p-1 bg-white z-10">
              <div className="absolute inset-2 border border-brand-gold/20 rounded-[18px] pointer-events-none z-10" />
              <img
                src={weddingConfig.bride.photo}
                alt={weddingConfig.bride.shortName}
                className="w-full h-full object-cover rounded-[18px] transition-transform duration-[1.5s] hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Bride Details */}
            <h3 className="font-heading text-2xl md:text-3xl text-brand-gold font-medium tracking-wide mb-1 z-10 gold-shimmer-text">
              {weddingConfig.bride.fullName}
            </h3>
            <p className="text-xs text-brand-secondary font-button tracking-widest uppercase mb-4 z-10">
              Mempelai Wanita
            </p>

            <p className="font-body text-xs text-brand-secondary leading-relaxed mb-6 max-w-xs z-10">
              {weddingConfig.bride.parents}
            </p>

            {/* Social Link */}
            <a
              href={weddingConfig.bride.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 text-xs text-brand-gold hover:bg-brand-gold hover:text-white hover:scale-105 transition-all duration-300 font-button tracking-wider z-10"
            >
              <Instagram size={14} />
              @{weddingConfig.bride.shortName.toLowerCase()}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
