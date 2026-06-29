import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Eye, Play } from "lucide-react";
import { weddingConfig } from "../config";
import { ElegantDivider, SwayingLeafBackground } from "./BotanicalDecoration";

export const GallerySection: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % weddingConfig.gallery.length);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex(
      (activeImageIndex - 1 + weddingConfig.gallery.length) % weddingConfig.gallery.length
    );
  };

  return (
    <section
      id="gallery"
      className="relative py-24 px-4 bg-brand-bg overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(to bottom, #FFFFFF 0%, #F8F6F2 100%)",
      }}
    >
      <SwayingLeafBackground position="top-right" />
      <SwayingLeafBackground position="bottom-left" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading uppercase tracking-[0.25em] text-xs text-brand-secondary mb-2"
          >
            Galeri Foto & Video
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-3xl md:text-5xl text-brand-gold font-light tracking-wide"
          >
            Momen Bahagia Kami
          </motion.h2>
          <ElegantDivider />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-md mx-auto text-sm text-brand-secondary leading-relaxed font-body"
          >
            Lukisan cinta dan kenangan terindah dalam perjalanan asmara kami yang terekam dalam potret cerita.
          </motion.p>
        </div>

        {/* Pinterest Style Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 mb-16">
          {weddingConfig.gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
              className="relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group shadow-md border border-brand-gold/10 p-2 bg-white"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-auto object-cover rounded-xl transform transition-transform duration-[1.2s] group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Elegant Hover Overlay with Blur Reveal */}
                <div className="absolute inset-0 bg-brand-dark/45 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-4 text-center rounded-xl backdrop-blur-[2px]">
                  <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white mb-3 scale-70 group-hover:scale-100 transition-transform duration-500">
                    <Eye size={18} />
                  </div>
                  <p className="font-heading text-lg text-white font-medium tracking-wide drop-shadow-sm">
                    {item.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Responsive YouTube Video Embed */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="glass-card p-4 gold-border-decor"
          >
            <div className="text-center mb-6">
              <span className="font-heading text-brand-gold uppercase tracking-[0.15em] text-xs block mb-1">
                Kisah dalam Sinema
              </span>
              <h3 className="font-heading text-2xl text-brand-dark font-light tracking-wide">
                Video Prewedding Teaser
              </h3>
            </div>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-md">
              <iframe
                id="prewedding-video"
                src={weddingConfig.youtubeEmbedUrl}
                title="Prewedding Teaser Video"
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all cursor-pointer z-50"
              title="Close"
            >
              <X size={24} />
            </button>

            {/* Nav Prev */}
            <button
              onClick={showPrev}
              className="absolute left-4 md:left-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer z-50"
              title="Previous"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Nav Next */}
            <button
              onClick={showNext}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer z-50"
              title="Next"
            >
              <ChevronRight size={24} />
            </button>

            {/* Active Image Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[80vh] flex flex-col items-center cursor-default bg-black rounded-2xl overflow-hidden p-1.5"
            >
              <img
                src={weddingConfig.gallery[activeImageIndex].url}
                alt={weddingConfig.gallery[activeImageIndex].caption}
                className="max-w-full max-h-[72vh] object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
              <div className="py-4 px-6 text-center w-full bg-black/40 backdrop-blur-md absolute bottom-0 left-0">
                <p className="font-heading text-xl text-white tracking-wide">
                  {weddingConfig.gallery[activeImageIndex].caption}
                </p>
                <p className="text-xs text-brand-accent uppercase tracking-widest mt-1">
                  Foto {activeImageIndex + 1} dari {weddingConfig.gallery.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
