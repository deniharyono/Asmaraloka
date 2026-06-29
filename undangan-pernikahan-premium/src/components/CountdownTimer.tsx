import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { motion } from "motion/react";
import { weddingConfig } from "../config";
import { ElegantDivider, SwayingLeafBackground } from "./BotanicalDecoration";

interface TimeRemaining {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isCompleted: boolean;
}

export const CountdownTimer: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    isCompleted: false,
  });

  useEffect(() => {
    const targetTime = new Date(weddingConfig.weddingDate).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeRemaining({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          isCompleted: true,
        });
        return;
      }

      // Exact mathematical calculation mirroring pages 9-10 of PDF
      const daysVal = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hoursVal = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutesVal = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secondsVal = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({
        days: String(daysVal).padStart(2, "0"),
        hours: String(hoursVal).padStart(2, "0"),
        minutes: String(minutesVal).padStart(2, "0"),
        seconds: String(secondsVal).padStart(2, "0"),
        isCompleted: false,
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Hari", value: timeRemaining.days },
    { label: "Jam", value: timeRemaining.hours },
    { label: "Menit", value: timeRemaining.minutes },
    { label: "Detik", value: timeRemaining.seconds },
  ];

  return (
    <section
      className="relative py-20 px-4 bg-brand-bg text-center overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(to bottom, #FFFFFF 0%, #F8F6F2 100%)",
      }}
    >
      <SwayingLeafBackground position="top-right" />
      <SwayingLeafBackground position="bottom-left" />

      <div className="max-w-xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading uppercase tracking-[0.25em] text-xs text-brand-secondary mb-2"
        >
          Menghitung Hari Bahagia
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading text-3xl md:text-4xl text-brand-gold font-light tracking-wide mb-2"
        >
          Hari Pernikahan
        </motion.h2>
        <ElegantDivider />

        {/* Dynamic Countdown Grid with Luxury Rings */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-md mx-auto my-10">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-square flex flex-col justify-center items-center bg-white/70 backdrop-blur-md rounded-2xl border border-brand-gold/20 shadow-md p-2 hover:shadow-lg transition-shadow"
            >
              <span className="font-heading text-2xl md:text-4xl font-semibold text-brand-gold">
                {unit.value}
              </span>
              <span className="text-[10px] md:text-xs font-button text-brand-secondary uppercase tracking-widest mt-1">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        {timeRemaining.isCompleted && (
          <p className="text-sm italic font-body text-brand-gold mb-6 animate-pulse">
            Acara pernikahan sedang berlangsung atau sudah selesai dilaksanakan!
          </p>
        )}

        {/* Save to Calendar Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-8"
        >
          <a
            id="btn-save-date"
            href={weddingConfig.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gold hover:bg-brand-dark text-white hover:text-brand-accent transition-all duration-300 font-button text-xs font-semibold uppercase tracking-widest shadow-md hover:-translate-y-0.5"
          >
            <Calendar size={14} />
            Simpan Tanggal (Google Calendar)
          </a>
        </motion.div>
      </div>
    </section>
  );
};
