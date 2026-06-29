import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Users, CheckCircle, HelpCircle, XCircle, HeartHandshake } from "lucide-react";
import { weddingConfig } from "../config";
import { ElegantDivider, SwayingLeafBackground } from "./BotanicalDecoration";

interface Wish {
  id: string;
  name: string;
  attendance: "Hadir" | "Absen" | "Ragu";
  guests: number;
  message: string;
  timestamp: string;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: "1",
    name: "Siti Rahma & Keluarga",
    attendance: "Hadir",
    guests: 4,
    message: "Selamat ya Aurelia dan Andi! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Maaf belum bisa hadir langsung, tapi doa terbaik selalu mengiringi langkah kalian.",
    timestamp: "29 Juni 2026 14:15",
  },
  {
    id: "2",
    name: "Rian Hidayat",
    attendance: "Hadir",
    guests: 1,
    message: "Lancar sampai hari H bray! Mantap akhirnya melepas masa lajang juga. Siap meluncur ke lokasi resepsi!",
    timestamp: "29 Juni 2026 11:30",
  },
  {
    id: "3",
    name: "Budi Santoso",
    attendance: "Ragu",
    guests: 2,
    message: "Selamat atas pernikahannya! Masih menyesuaikan jadwal dinas luar kota, tapi diusahakan sekali untuk bisa hadir. Semoga lancar acaranya.",
    timestamp: "28 Juni 2026 09:45",
  },
];

export const RsvpForm: React.FC<{ guestName: string }> = ({ guestName }) => {
  const [name, setName] = useState(guestName);
  const [attendance, setAttendance] = useState<"Hadir" | "Absen" | "Ragu">("Hadir");
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusText, setStatusText] = useState("");

  // Sync recipient name once it resolves
  useEffect(() => {
    if (guestName && guestName !== weddingConfig.guestDefaultName) {
      setName(guestName);
    }
  }, [guestName]);

  // Load from LocalStorage or Fallback
  useEffect(() => {
    const saved = localStorage.getItem("wedding_rsvp_wishes");
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch (e) {
        setWishes(INITIAL_WISHES);
      }
    } else {
      setWishes(INITIAL_WISHES);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      alert("Nama dan Ucapan/Doa tidak boleh kosong!");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Construct RSVP payload matching the schema from PDF pages 11-14
    const rsvpData = {
      household_id: "H-Umum",
      nama_tamu: name,
      email: email || "anonymous@invitation.com",
      kehadiran: attendance,
      porsi_tambahan: guestsCount - 1,
      pilihan_menu: "Standar",
      alergi: "Tidak Ada",
      kode_akses: "CONFIRM2026",
      pesan: message,
    };

    try {
      // 1. Submit to Google Apps Script Web App if URL is custom configured
      if (
        weddingConfig.appScriptUrl &&
        !weddingConfig.appScriptUrl.includes("_your_deployed_script_url")
      ) {
        // Construct query parameters for GET or form-data body for POST
        const queryParams = new URLSearchParams(rsvpData as any).toString();
        await fetch(`${weddingConfig.appScriptUrl}?${queryParams}`, {
          method: "POST",
          mode: "no-cors", // Necessary for App Script redirects
        });
      }

      // 2. Persist locally to localStorage for interactive instantaneous feedback
      const newWish: Wish = {
        id: Date.now().toString(),
        name,
        attendance,
        guests: guestsCount,
        message,
        timestamp: new Date().toLocaleString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const updatedWishes = [newWish, ...wishes];
      setWishes(updatedWishes);
      localStorage.setItem("wedding_rsvp_wishes", JSON.stringify(updatedWishes));

      // Reset form fields
      setMessage("");
      setSubmitStatus("success");
      setStatusText("Terima kasih! Konfirmasi kehadiran & doa terbaik Anda berhasil disimpan.");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setStatusText("Gagal menyimpan konfirmasi. Silakan coba beberapa saat lagi.");
    } finally {
      setIsSubmitting(false);
      // Auto clear status after 5s
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }
  };

  return (
    <section
      id="rsvp"
      className="relative py-24 px-4 bg-brand-bg overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(to bottom, #FFFFFF 0%, #F8F6F2 100%)",
      }}
    >
      <SwayingLeafBackground position="top-right" />
      <SwayingLeafBackground position="bottom-left" />

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
            Konfirmasi Kehadiran
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-3xl md:text-5xl text-brand-gold font-light tracking-wide"
          >
            RSVP & Doa Restu
          </motion.h2>
          <ElegantDivider />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-md mx-auto text-sm text-brand-secondary leading-relaxed font-body"
          >
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
          </motion.p>
        </div>

        {/* Form and Comments Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* RSVP FORM (Lg: col-5) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 glass-card p-6 md:p-8 gold-border-decor"
          >
            <h3 className="font-heading text-xl text-brand-gold tracking-wide mb-4 text-center">
              Form Kehadiran
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 font-button text-xs">
              {/* Name */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-secondary mb-1">
                  Nama Tamu
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ketik nama lengkap Anda"
                  className="w-full px-4 py-3 rounded-xl border border-brand-gold/20 bg-white/60 focus:bg-white focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all text-sm text-brand-dark"
                  required
                />
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-secondary mb-1">
                  Alamat Email (Opsional)
                </label>
                <input
                  id="rsvp-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ketik alamat email Anda"
                  className="w-full px-4 py-3 rounded-xl border border-brand-gold/20 bg-white/60 focus:bg-white focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all text-sm text-brand-dark"
                />
              </div>

              {/* Attendance */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-secondary mb-1">
                  Konfirmasi Kehadiran
                </label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {[
                    { value: "Hadir", label: "Hadir" },
                    { value: "Absen", label: "Absen" },
                    { value: "Ragu", label: "Ragu-Ragu" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setAttendance(option.value as any)}
                      className={`py-3 px-1 rounded-xl border text-center font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        attendance === option.value
                          ? "bg-brand-gold text-white border-brand-gold"
                          : "bg-white/50 text-brand-secondary border-brand-gold/10 hover:bg-white"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Guests (If Present) */}
              {attendance !== "Absen" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <label className="block text-[10px] uppercase tracking-widest text-brand-secondary mb-1">
                    Jumlah Tamu Hadir
                  </label>
                  <div className="flex items-center gap-3 mt-1">
                    <button
                      type="button"
                      onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                      className="w-10 h-10 rounded-xl bg-white border border-brand-gold/20 flex items-center justify-center font-bold text-brand-gold hover:bg-brand-gold/10 cursor-pointer"
                    >
                      -
                    </button>
                    <div className="w-16 h-10 rounded-xl border border-brand-gold/20 bg-white flex items-center justify-center font-semibold text-brand-dark text-sm">
                      <Users size={14} className="mr-1.5 text-brand-gold" />
                      {guestsCount}
                    </div>
                    <button
                      type="button"
                      onClick={() => setGuestsCount(guestsCount + 1)}
                      className="w-10 h-10 rounded-xl bg-white border border-brand-gold/20 flex items-center justify-center font-bold text-brand-gold hover:bg-brand-gold/10 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Message / Wishes */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-secondary mb-1">
                  Ucapan & Doa Restu
                </label>
                <textarea
                  id="rsvp-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Kirimkan pesan dan doa terbaik untuk mempelai"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-brand-gold/20 bg-white/60 focus:bg-white focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all text-sm text-brand-dark"
                  required
                />
              </div>

              {/* Action Button */}
              <button
                id="btn-rsvp-submit"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-gold hover:bg-brand-dark text-white hover:text-brand-accent font-semibold uppercase tracking-widest cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send size={12} />
                )}
                Kirim Konfirmasi
              </button>

              {/* Submision Status Notice */}
              <AnimatePresence>
                {submitStatus !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`p-3 rounded-xl flex items-start gap-2.5 ${
                      submitStatus === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <CheckCircle size={16} className="shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={16} className="shrink-0 mt-0.5" />
                    )}
                    <span className="text-[11px] leading-relaxed">{statusText}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* COMMENTS / PRAYERS LIST (Lg: col-7) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 flex flex-col h-full"
          >
            <div className="glass-card p-6 md:p-8 gold-border-decor flex flex-col h-[520px]">
              <div className="flex items-center gap-2 mb-4 border-b border-brand-gold/15 pb-4">
                <HeartHandshake size={20} className="text-brand-gold" />
                <h3 className="font-heading text-xl text-brand-dark font-medium">
                  Untaian Doa & Ucapan ({wishes.length})
                </h3>
              </div>

              {/* Scrollable Comment Container */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-4">
                <AnimatePresence initial={false}>
                  {wishes.map((wish) => (
                    <motion.div
                      key={wish.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="bg-white/80 p-4 rounded-xl border border-brand-gold/10 shadow-sm relative group"
                    >
                      {/* Name Header */}
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="font-heading font-semibold text-brand-dark text-base tracking-wide">
                          {wish.name}
                        </h4>

                        {/* Attendance Badge with Icon */}
                        <div className="flex items-center gap-1 shrink-0">
                          {wish.attendance === "Hadir" && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
                              <CheckCircle size={10} />
                              Hadir ({wish.guests})
                            </span>
                          )}
                          {wish.attendance === "Ragu" && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5">
                              <HelpCircle size={10} />
                              Ragu-ragu
                            </span>
                          )}
                          {wish.attendance === "Absen" && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-rose-700 bg-rose-50 border border-rose-100 rounded-full px-2 py-0.5">
                              <XCircle size={10} />
                              Absen
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Comment Message */}
                      <p className="font-body text-xs text-brand-secondary leading-relaxed mb-2 whitespace-pre-line text-justify">
                        "{wish.message}"
                      </p>

                      {/* Comment Timestamp */}
                      <span className="block text-[9px] font-button text-right text-brand-secondary/70">
                        {wish.timestamp}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
