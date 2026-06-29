import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { weddingConfig } from "../config";
import { ElegantDivider, SwayingLeafBackground } from "./BotanicalDecoration";

export const LoveStorySection: React.FC = () => {
  return (
    <section
      className="relative py-24 px-4 bg-brand-bg overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(to bottom, #F8F6F2 0%, #FFFFFF 100%)",
      }}
    >
      <SwayingLeafBackground position="top-left" />
      <SwayingLeafBackground position="bottom-right" />

      {/* Decorative radial soft glow background */}
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading uppercase tracking-[0.25em] text-xs text-brand-secondary mb-2"
          >
            Kisah Cinta Kami
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-3xl md:text-5xl text-brand-gold font-light tracking-wide"
          >
            Perjalanan Cerita Indah
          </motion.h2>
          <ElegantDivider />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-md mx-auto text-sm text-brand-secondary leading-relaxed font-body"
          >
            Dari pertemuan sederhana hingga janji setia sehidup semati. Inilah bingkai cerita kasih kami berdua.
          </motion.p>
        </div>

        {/* Chronological Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Timeline Guide Gold Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-brand-gold/10 via-brand-gold/40 to-brand-gold/10 -translate-x-1/2 pointer-events-none" />

          {/* Timeline Nodes */}
          <div className="space-y-16">
            {weddingConfig.loveStory.map((story, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={story.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Gold Center Node Marker */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white border border-brand-gold flex items-center justify-center -translate-x-1/2 z-20 shadow">
                    <Heart size={12} className="text-brand-gold fill-current animate-pulse" />
                  </div>

                  {/* Left Column Spacer (Desktop only) */}
                  <div className="hidden md:block w-1/2" />

                  {/* Right Column / Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full md:w-[45%] pl-10 md:pl-0"
                  >
                    <div className="glass-card p-6 md:p-8 gold-border-decor hover:shadow-lg transition-shadow duration-300 relative">
                      {/* Timeline Card Photo (Optional but highly recommended) */}
                      {story.image && (
                        <div className="rounded-xl overflow-hidden mb-4 aspect-video shadow-inner">
                          <img
                            src={story.image}
                            alt={story.title}
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[1.2s]"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      {/* Header */}
                      <span className="font-heading italic text-xs text-brand-gold block mb-1">
                        {story.date}
                      </span>
                      <h3 className="font-heading text-xl md:text-2xl text-brand-dark font-medium tracking-wide mb-3">
                        {story.title}
                      </h3>

                      {/* Divider */}
                      <div className="w-12 h-[1px] bg-brand-gold/30 my-3" />

                      {/* Text */}
                      <p className="text-xs md:text-sm text-brand-secondary leading-relaxed font-body text-justify">
                        {story.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
