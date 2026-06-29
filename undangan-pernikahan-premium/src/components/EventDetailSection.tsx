import React from "react";
import { motion } from "motion/react";
import { MapPin, Clock, CalendarDays } from "lucide-react";
import { weddingConfig } from "../config";
import { ElegantDivider, SwayingLeafBackground } from "./BotanicalDecoration";

export const EventDetailSection: React.FC = () => {
  const events = [
    {
      id: "akad",
      data: weddingConfig.events.akad,
      iconBg: "bg-brand-gold/10",
      accentBorder: "border-brand-gold/30",
    },
    {
      id: "resepsi",
      data: weddingConfig.events.resepsi,
      iconBg: "bg-brand-accent/20",
      accentBorder: "border-brand-accent/40",
    },
  ];

  return (
    <section
      id="event"
      className="relative py-24 px-4 bg-brand-bg overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(to bottom, #F8F6F2 0%, #FFFFFF 100%)",
      }}
    >
      <SwayingLeafBackground position="top-left" />
      <SwayingLeafBackground position="bottom-right" />

      {/* Decorative center light ray glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading uppercase tracking-[0.25em] text-xs text-brand-secondary mb-2"
          >
            Informasi Acara
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-3xl md:text-5xl text-brand-gold font-light tracking-wide"
          >
            Waktu & Tempat Acara
          </motion.h2>
          <ElegantDivider />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-md mx-auto text-sm text-brand-secondary leading-relaxed font-body"
          >
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud untuk menyelenggarakan acara pernikahan kami pada:
          </motion.p>
        </div>

        {/* Timeline Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-3xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
              className="glass-card p-8 md:p-10 gold-border-decor hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="text-center mb-6">
                <span className="font-heading italic text-brand-gold text-xs uppercase tracking-widest block mb-2">
                  Bagian {index + 1}
                </span>
                <h3 className="font-heading text-2xl md:text-3xl text-brand-gold font-medium tracking-wide">
                  {event.data.title}
                </h3>
                <div className="w-12 h-[1px] bg-brand-gold/30 mx-auto mt-4" />
              </div>

              {/* Event Details Grid */}
              <div className="space-y-5 text-sm font-body text-brand-dark mb-8">
                {/* Date */}
                <div className="flex gap-4 items-start">
                  <div className={`p-2.5 rounded-full ${event.iconBg} text-brand-gold shrink-0`}>
                    <CalendarDays size={18} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-button text-brand-secondary uppercase tracking-widest mb-0.5">
                      Hari & Tanggal
                    </h4>
                    <p className="font-medium text-brand-dark">{event.data.dateText}</p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex gap-4 items-start">
                  <div className={`p-2.5 rounded-full ${event.iconBg} text-brand-gold shrink-0`}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-button text-brand-secondary uppercase tracking-widest mb-0.5">
                      Waktu Pelaksanaan
                    </h4>
                    <p className="font-medium text-brand-dark">{event.data.timeText}</p>
                  </div>
                </div>

                {/* Place / Location */}
                <div className="flex gap-4 items-start">
                  <div className={`p-2.5 rounded-full ${event.iconBg} text-brand-gold shrink-0`}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-button text-brand-secondary uppercase tracking-widest mb-0.5">
                      Tempat & Alamat
                    </h4>
                    <p className="font-semibold text-brand-gold mb-1">{event.data.placeName}</p>
                    <p className="text-xs text-brand-secondary leading-relaxed">{event.data.address}</p>
                  </div>
                </div>
              </div>

              {/* Google Maps Button */}
              <div className="text-center mt-6">
                <a
                  id={`btn-map-${event.id}`}
                  href={event.data.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-gold/30 hover:border-brand-gold bg-white hover:bg-brand-gold text-brand-gold hover:text-white font-button text-xs font-semibold uppercase tracking-widest transition-all duration-300"
                >
                  <MapPin size={12} />
                  Lihat Peta Lokasi
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
