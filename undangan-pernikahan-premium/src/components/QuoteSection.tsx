import React from "react";
import { motion } from "motion/react";
import { weddingConfig } from "../config";
import { ElegantDivider, SwayingLeafBackground } from "./BotanicalDecoration";

export const QuoteSection: React.FC = () => {
  return (
    <section
      className="relative py-20 px-4 bg-brand-bg flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(to bottom, #FFFFFF 0%, #F8F6F2 100%)",
      }}
    >
      {/* Swaying Leaf Background Watermarks */}
      <SwayingLeafBackground position="top-right" />
      <SwayingLeafBackground position="bottom-left" />

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Large Elegant Couple Photo Frame with Golden Double Borders */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mx-auto mb-12 max-w-sm rounded-[32px] overflow-hidden p-3 bg-white shadow-xl border border-brand-gold/10"
        >
          {/* Outer golden design accent */}
          <div className="absolute inset-4 border border-brand-gold/25 rounded-[24px] pointer-events-none z-10" />

          {/* Actual Image */}
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
            alt="Couple Portrait"
            className="w-full aspect-[4/5] object-cover rounded-[24px] transition-transform duration-[2s] hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Bismillah calligraphy or text */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading text-2xl text-brand-gold font-light tracking-wide mb-6"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </motion.h3>

        {/* Elegant Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="glass-card px-8 py-10 md:px-12 gold-border-decor"
        >
          <p className="font-body text-brand-dark leading-relaxed italic text-sm md:text-base text-justify md:text-center">
            "{weddingConfig.quote.text}"
          </p>

          <ElegantDivider className="my-6" />

          <p className="font-heading text-sm text-brand-gold uppercase tracking-[0.15em] font-medium">
            {weddingConfig.quote.source}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
