import React, { useState } from "react";
import { X, Save, RotateCcw, Copy, Download, Edit3, Heart, Calendar, MapPin, Music, HelpCircle, AlertCircle, Sparkles } from "lucide-react";
import { weddingConfig, defaultWeddingConfig, WeddingConfig } from "../config";
import { JavaneseGunungan } from "./JavaneseOrnament";

interface InvitationEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InvitationEditor: React.FC<InvitationEditorProps> = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState<WeddingConfig>(() => {
    // Deep clone the active weddingConfig to edit safely
    return JSON.parse(JSON.stringify(weddingConfig));
  });

  const [activeTab, setActiveTab] = useState<"mempelai" | "acara" | "galeri" | "media" | "quote">("mempelai");
  const [copied, setCopied] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  if (!isOpen) return null;

  // Handle nested input changes safely
  const handleChange = (path: string, value: any) => {
    setConfig((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split(".");
      let current = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  // Handle dynamic lists like Gallery
  const handleGalleryChange = (index: number, field: "url" | "caption", value: string) => {
    setConfig((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy.gallery) copy.gallery = [];
      if (!copy.gallery[index]) {
        copy.gallery[index] = { id: index + 1, url: "", caption: "" };
      }
      copy.gallery[index][field] = value;
      return copy;
    });
  };

  const handleAddGalleryItem = () => {
    setConfig((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy.gallery) copy.gallery = [];
      const nextId = copy.gallery.length > 0 ? Math.max(...copy.gallery.map((g: any) => g.id)) + 1 : 1;
      copy.gallery.push({
        id: nextId,
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
        caption: "Foto Baru",
      });
      return copy;
    });
  };

  const handleRemoveGalleryItem = (index: number) => {
    setConfig((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.gallery.splice(index, 1);
      return copy;
    });
  };

  // Handle dynamic lists like Love Story
  const handleLoveStoryChange = (index: number, field: "title" | "date" | "description" | "image", value: string) => {
    setConfig((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy.loveStory) copy.loveStory = [];
      if (!copy.loveStory[index]) {
        copy.loveStory[index] = { id: index + 1, title: "", date: "", description: "" };
      }
      copy.loveStory[index][field] = value;
      return copy;
    });
  };

  const handleAddStoryItem = () => {
    setConfig((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy.loveStory) copy.loveStory = [];
      const nextId = copy.loveStory.length > 0 ? Math.max(...copy.loveStory.map((s: any) => s.id)) + 1 : 1;
      copy.loveStory.push({
        id: nextId,
        title: "Judul Kisah",
        date: "Tanggal Momen",
        description: "Deskripsi singkat tentang momen indah ini.",
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400",
      });
      return copy;
    });
  };

  const handleRemoveStoryItem = (index: number) => {
    setConfig((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.loveStory.splice(index, 1);
      return copy;
    });
  };

  const handleSave = () => {
    try {
      localStorage.setItem("wedding_config", JSON.stringify(config));
      setSavedMsg(true);
      setTimeout(() => {
        setSavedMsg(false);
        // Reload page to apply changes app-wide
        window.location.reload();
      }, 1000);
    } catch (e) {
      alert("Gagal menyimpan konfigurasi ke penyimpanan lokal.");
    }
  };

  const handleReset = () => {
    if (confirm("Apakah Anda yakin ingin mengembalikan seluruh isi undangan ke setelan awal pabrik?")) {
      localStorage.removeItem("wedding_config");
      window.location.reload();
    }
  };

  const handleCopyToClipboard = () => {
    // Generate clean copyable TypeScript config string
    const code = `/**
 * Konfigurasi Undangan Pernikahan (weddingConfig)
 * Tempelkan (paste) kode ini ke dalam file \`/src/config.ts\` untuk membuat perubahan Anda menjadi permanen.
 */
export const weddingConfig: WeddingConfig = ${JSON.stringify(config, null, 2)};`;

    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `wedding_config_${config.groom.shortName}_${config.bride.shortName}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-[100000] w-full h-full bg-brand-dark/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-brand-bg w-full max-w-4xl rounded-3xl shadow-2xl border border-brand-gold/25 overflow-hidden flex flex-col max-h-[90vh] animate-pulse-gentle duration-[3000ms]">
        
        {/* Header Dashboard */}
        <div className="px-6 py-4 border-b border-brand-gold/15 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <JavaneseGunungan size={40} animate={false} />
            <div>
              <h2 className="font-heading text-lg font-bold text-brand-dark flex items-center gap-1.5">
                Pusat Sunting Undangan <span className="text-xs bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded-full font-sans font-medium">v1.2 (PWA)</span>
              </h2>
              <p className="text-xs text-brand-secondary">Sesuaikan isi undangan Anda secara visual dan langsung</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-brand-gold/10 text-brand-secondary hover:text-brand-dark transition-all"
            title="Tutup Panel"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-brand-gold/10 bg-brand-accent/30 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <button
            onClick={() => setActiveTab("mempelai")}
            className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "mempelai"
                ? "border-brand-gold text-brand-gold bg-white/70"
                : "border-transparent text-brand-secondary hover:text-brand-dark"
            }`}
          >
            <Heart size={14} />
            Mempelai
          </button>
          <button
            onClick={() => setActiveTab("acara")}
            className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "acara"
                ? "border-brand-gold text-brand-gold bg-white/70"
                : "border-transparent text-brand-secondary hover:text-brand-dark"
            }`}
          >
            <Calendar size={14} />
            Waktu & Tempat
          </button>
          <button
            onClick={() => setActiveTab("galeri")}
            className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "galeri"
                ? "border-brand-gold text-brand-gold bg-white/70"
                : "border-transparent text-brand-secondary hover:text-brand-dark"
            }`}
          >
            <Sparkles size={14} />
            Galeri & Kisah
          </button>
          <button
            onClick={() => setActiveTab("media")}
            className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "media"
                ? "border-brand-gold text-brand-gold bg-white/70"
                : "border-transparent text-brand-secondary hover:text-brand-dark"
            }`}
          >
            <Music size={14} />
            Musik & Video
          </button>
          <button
            onClick={() => setActiveTab("quote")}
            className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "quote"
                ? "border-brand-gold text-brand-gold bg-white/70"
                : "border-transparent text-brand-secondary hover:text-brand-dark"
            }`}
          >
            <Edit3 size={14} />
            Quotes & Lainnya
          </button>
        </div>

        {/* Form Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: MEMPELAI */}
          {activeTab === "mempelai" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Mempelai Pria (Groom) */}
                <div className="bg-white p-5 rounded-2xl border border-brand-gold/15 shadow-sm space-y-4">
                  <h3 className="font-heading text-base font-bold text-brand-gold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                    Mempelai Pria (Groom)
                  </h3>
                  
                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Nama Panggilan</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl focus:outline-none focus:border-brand-gold"
                      value={config.groom.shortName}
                      onChange={(e) => handleChange("groom.shortName", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Nama Lengkap & Gelar</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl focus:outline-none focus:border-brand-gold"
                      value={config.groom.fullName}
                      onChange={(e) => handleChange("groom.fullName", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Keterangan Orang Tua</label>
                    <textarea
                      rows={2}
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl focus:outline-none focus:border-brand-gold resize-none"
                      value={config.groom.parents}
                      onChange={(e) => handleChange("groom.parents", e.target.value)}
                      placeholder="Putra ke-X dari Bapak... & Ibu..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Username Instagram</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl focus:outline-none focus:border-brand-gold"
                      value={config.groom.instagram}
                      onChange={(e) => handleChange("groom.instagram", e.target.value)}
                      placeholder="https://instagram.com/username"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Link Foto Mempelai Pria (URL)</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl focus:outline-none focus:border-brand-gold"
                      value={config.groom.photo}
                      onChange={(e) => handleChange("groom.photo", e.target.value)}
                    />
                    <p className="text-[10px] text-brand-secondary/70 mt-1">Gunakan tautan gambar Unsplash atau web publik Anda</p>
                  </div>
                </div>

                {/* Mempelai Wanita (Bride) */}
                <div className="bg-white p-5 rounded-2xl border border-brand-gold/15 shadow-sm space-y-4">
                  <h3 className="font-heading text-base font-bold text-brand-gold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                    Mempelai Wanita (Bride)
                  </h3>
                  
                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Nama Panggilan</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl focus:outline-none focus:border-brand-gold"
                      value={config.bride.shortName}
                      onChange={(e) => handleChange("bride.shortName", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Nama Lengkap & Gelar</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl focus:outline-none focus:border-brand-gold"
                      value={config.bride.fullName}
                      onChange={(e) => handleChange("bride.fullName", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Keterangan Orang Tua</label>
                    <textarea
                      rows={2}
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl focus:outline-none focus:border-brand-gold resize-none"
                      value={config.bride.parents}
                      onChange={(e) => handleChange("bride.parents", e.target.value)}
                      placeholder="Putri ke-X dari Bapak... & Ibu..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Username Instagram</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl focus:outline-none focus:border-brand-gold"
                      value={config.bride.instagram}
                      onChange={(e) => handleChange("bride.instagram", e.target.value)}
                      placeholder="https://instagram.com/username"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Link Foto Mempelai Wanita (URL)</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl focus:outline-none focus:border-brand-gold"
                      value={config.bride.photo}
                      onChange={(e) => handleChange("bride.photo", e.target.value)}
                    />
                    <p className="text-[10px] text-brand-secondary/70 mt-1">Gunakan tautan gambar Unsplash atau web publik Anda</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: WAKTU & TEMPAT */}
          {activeTab === "acara" && (
            <div className="space-y-6 animate-fade-in">
              {/* Countdown Target Date */}
              <div className="bg-white p-5 rounded-2xl border border-brand-gold/15 shadow-sm space-y-4">
                <h3 className="font-heading text-base font-bold text-brand-gold flex items-center gap-2">
                  <Calendar size={18} />
                  Target Penghitung Mundur (Countdown Timer)
                </h3>
                <div>
                  <label className="block text-xs font-medium text-brand-secondary mb-1">Tanggal & Waktu Pernikahan (Format ISO)</label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl focus:outline-none focus:border-brand-gold font-mono"
                    value={config.weddingDate}
                    onChange={(e) => handleChange("weddingDate", e.target.value)}
                    placeholder="YYYY-MM-DDTHH:MM:SS+07:00"
                  />
                  <p className="text-[10px] text-brand-secondary/70 mt-1">Contoh: <code>2026-12-12T09:00:00+07:00</code> (Format standard ISO 8601 dengan offset zona waktu WIB/WITA/WIT)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Akad Nikah */}
                <div className="bg-white p-5 rounded-2xl border border-brand-gold/15 shadow-sm space-y-4">
                  <h3 className="font-heading text-base font-bold text-brand-gold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
                    Detail Sesi Akad Nikah
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Nama Acara</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl"
                      value={config.events.akad.title}
                      onChange={(e) => handleChange("events.akad.title", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Teks Hari & Tanggal</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl"
                      value={config.events.akad.dateText}
                      onChange={(e) => handleChange("events.akad.dateText", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Teks Waktu / Jam</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl"
                      value={config.events.akad.timeText}
                      onChange={(e) => handleChange("events.akad.timeText", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Nama Tempat/Gedung</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl"
                      value={config.events.akad.placeName}
                      onChange={(e) => handleChange("events.akad.placeName", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Alamat Lengkap</label>
                    <textarea
                      rows={2}
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl resize-none"
                      value={config.events.akad.address}
                      onChange={(e) => handleChange("events.akad.address", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Link Google Maps (URL)</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl"
                      value={config.events.akad.mapUrl}
                      onChange={(e) => handleChange("events.akad.mapUrl", e.target.value)}
                    />
                  </div>
                </div>

                {/* Resepsi Pernikahan */}
                <div className="bg-white p-5 rounded-2xl border border-brand-gold/15 shadow-sm space-y-4">
                  <h3 className="font-heading text-base font-bold text-brand-gold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
                    Detail Sesi Resepsi
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Nama Acara</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl"
                      value={config.events.resepsi.title}
                      onChange={(e) => handleChange("events.resepsi.title", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Teks Hari & Tanggal</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl"
                      value={config.events.resepsi.dateText}
                      onChange={(e) => handleChange("events.resepsi.dateText", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Teks Waktu / Jam</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl"
                      value={config.events.resepsi.timeText}
                      onChange={(e) => handleChange("events.resepsi.timeText", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Nama Tempat/Gedung</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl"
                      value={config.events.resepsi.placeName}
                      onChange={(e) => handleChange("events.resepsi.placeName", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Alamat Lengkap</label>
                    <textarea
                      rows={2}
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl resize-none"
                      value={config.events.resepsi.address}
                      onChange={(e) => handleChange("events.resepsi.address", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-secondary mb-1">Link Google Maps (URL)</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl"
                      value={config.events.resepsi.mapUrl}
                      onChange={(e) => handleChange("events.resepsi.mapUrl", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GALERI & KISAH */}
          {activeTab === "galeri" && (
            <div className="space-y-6 animate-fade-in">
              {/* Photo Gallery List */}
              <div className="bg-white p-5 rounded-2xl border border-brand-gold/15 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-base font-bold text-brand-gold flex items-center gap-2">
                    <Sparkles size={18} />
                    Galeri Foto Mempelai (Gallery)
                  </h3>
                  <button
                    onClick={handleAddGalleryItem}
                    className="px-3 py-1 bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-white text-xs font-semibold rounded-full transition-all"
                  >
                    + Tambah Foto
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2">
                  {config.gallery.map((item, index) => (
                    <div key={item.id} className="p-3 bg-brand-bg rounded-xl border border-brand-gold/10 space-y-2 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-brand-secondary">Foto #{index + 1}</span>
                        <button
                          onClick={() => handleRemoveGalleryItem(index)}
                          className="text-red-500 hover:text-red-700 text-xs font-medium"
                        >
                          Hapus
                        </button>
                      </div>
                      <input
                        type="text"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-brand-gold/15 rounded-lg"
                        placeholder="Link URL Gambar"
                        value={item.url}
                        onChange={(e) => handleGalleryChange(index, "url", e.target.value)}
                      />
                      <input
                        type="text"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-brand-gold/15 rounded-lg"
                        placeholder="Keterangan / Caption Singkat"
                        value={item.caption}
                        onChange={(e) => handleGalleryChange(index, "caption", e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Love Story List */}
              <div className="bg-white p-5 rounded-2xl border border-brand-gold/15 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-base font-bold text-brand-gold flex items-center gap-2">
                    <Heart size={18} />
                    Linimasa Kisah Cinta (Love Story)
                  </h3>
                  <button
                    onClick={handleAddStoryItem}
                    className="px-3 py-1 bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-white text-xs font-semibold rounded-full transition-all"
                  >
                    + Tambah Momen
                  </button>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {config.loveStory.map((item, index) => (
                    <div key={item.id} className="p-4 bg-brand-bg rounded-2xl border border-brand-gold/10 space-y-3 relative grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-brand-gold">Momen Momen #{index + 1}</span>
                          <button
                            onClick={() => handleRemoveStoryItem(index)}
                            className="text-red-500 hover:text-red-700 text-xs font-medium"
                          >
                            Hapus Momen
                          </button>
                        </div>
                        <div>
                          <label className="text-[10px] text-brand-secondary block mb-0.5">Judul Peristiwa</label>
                          <input
                            type="text"
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-brand-gold/15 rounded-lg"
                            value={item.title}
                            onChange={(e) => handleLoveStoryChange(index, "title", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-brand-secondary block mb-0.5">Waktu / Tanggal</label>
                          <input
                            type="text"
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-brand-gold/15 rounded-lg"
                            value={item.date}
                            onChange={(e) => handleLoveStoryChange(index, "date", e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <label className="text-[10px] text-brand-secondary block mb-0.5">Link Gambar (URL)</label>
                          <input
                            type="text"
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-brand-gold/15 rounded-lg"
                            value={item.image || ""}
                            onChange={(e) => handleLoveStoryChange(index, "image", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-brand-secondary block mb-0.5">Deskripsi Peristiwa</label>
                          <textarea
                            rows={2}
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-brand-gold/15 rounded-lg resize-none"
                            value={item.description}
                            onChange={(e) => handleLoveStoryChange(index, "description", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MUSIK & VIDEO */}
          {activeTab === "media" && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-5 rounded-2xl border border-brand-gold/15 shadow-sm space-y-4">
                <h3 className="font-heading text-base font-bold text-brand-gold flex items-center gap-2">
                  <Music size={18} />
                  Musik Latar Belakang (Wedding Background Music)
                </h3>
                <div>
                  <label className="block text-xs font-medium text-brand-secondary mb-1">Link URL Audio MP3</label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl focus:outline-none focus:border-brand-gold font-mono"
                    value={config.musicUrl}
                    onChange={(e) => handleChange("musicUrl", e.target.value)}
                  />
                  <p className="text-[10px] text-brand-secondary/70 mt-1">Pastikan tautan audio mengarah langsung ke berkas <code>.mp3</code> publik.</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-brand-gold/15 shadow-sm space-y-4">
                <h3 className="font-heading text-base font-bold text-brand-gold flex items-center gap-2">
                  <Sparkles size={18} />
                  Video Romantis / Undangan Teaser (YouTube Embed)
                </h3>
                <div>
                  <label className="block text-xs font-medium text-brand-secondary mb-1">Link URL Embed YouTube</label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl focus:outline-none focus:border-brand-gold font-mono"
                    value={config.youtubeEmbedUrl}
                    onChange={(e) => handleChange("youtubeEmbedUrl", e.target.value)}
                  />
                  <p className="text-[10px] text-brand-secondary/70 mt-1">Gunakan format url embed standard, seperti: <code>https://www.youtube.com/embed/S2hsmE_8E4E</code></p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: QUOTES & SETTINGS */}
          {activeTab === "quote" && (
            <div className="space-y-6 animate-fade-in">
              {/* Quotes / Al-Quran Ayat */}
              <div className="bg-white p-5 rounded-2xl border border-brand-gold/15 shadow-sm space-y-4">
                <h3 className="font-heading text-base font-bold text-brand-gold flex items-center gap-2">
                  <Edit3 size={18} />
                  Kutipan Mutiara / Ayat Suci (Quranic Quote)
                </h3>
                <div>
                  <label className="block text-xs font-medium text-brand-secondary mb-1">Isi Teks Kutipan</label>
                  <textarea
                    rows={4}
                    className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl focus:outline-none focus:border-brand-gold"
                    value={config.quote.text}
                    onChange={(e) => handleChange("quote.text", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-secondary mb-1">Sumber Kutipan / Surah</label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl focus:outline-none focus:border-brand-gold"
                    value={config.quote.source}
                    onChange={(e) => handleChange("quote.source", e.target.value)}
                    placeholder="QS. Ar-Rum: 21"
                  />
                </div>
              </div>

              {/* Technical Integrations */}
              <div className="bg-white p-5 rounded-2xl border border-brand-gold/15 shadow-sm space-y-4">
                <h3 className="font-heading text-base font-bold text-brand-gold flex items-center gap-2">
                  <HelpCircle size={18} />
                  Integrasi Google RSVP & Calendar
                </h3>
                
                <div>
                  <label className="block text-xs font-medium text-brand-secondary mb-1">Google App Script RSVP URL</label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl font-mono"
                    value={config.appScriptUrl}
                    onChange={(e) => handleChange("appScriptUrl", e.target.value)}
                  />
                  <p className="text-[10px] text-brand-secondary/70 mt-1">URL App Script untuk menampung data RSVP tamu secara langsung ke Google Sheets.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-brand-secondary mb-1">Google Calendar Template Link</label>
                  <textarea
                    rows={2}
                    className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl font-mono resize-none"
                    value={config.calendarUrl}
                    onChange={(e) => handleChange("calendarUrl", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-brand-secondary mb-1">Nama Panggilan Tamu Standar (Default)</label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2 text-sm bg-brand-bg border border-brand-gold/20 rounded-xl"
                    value={config.guestDefaultName}
                    onChange={(e) => handleChange("guestDefaultName", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Action Panel Footer */}
        <div className="px-6 py-4 bg-white border-t border-brand-gold/15 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center gap-1.5 transition-all"
              title="Mengembalikan seluruh data pengeditan ke awal bawaan"
            >
              <RotateCcw size={13} />
              Reset Awal
            </button>
            <button
              onClick={handleDownloadJSON}
              className="px-4 py-2 text-xs font-semibold bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold rounded-full flex items-center gap-1.5 transition-all"
              title="Unduh konfigurasi terbaru sebagai berkas JSON"
            >
              <Download size={13} />
              Unduh JSON
            </button>
            <button
              onClick={handleCopyToClipboard}
              className="px-4 py-2 text-xs font-semibold bg-brand-accent/40 hover:bg-brand-accent text-brand-dark rounded-full flex items-center gap-1.5 transition-all"
              title="Salin kode TypeScript konfigurasi lengkap untuk disematkan permanen"
            >
              <Copy size={13} />
              {copied ? "Tersalin!" : "Salin Kode"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {savedMsg && (
              <span className="text-xs text-green-600 font-semibold animate-pulse mr-2">✓ Berhasil Disimpan! Memuat ulang...</span>
            )}
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-brand-gold hover:bg-brand-dark text-white rounded-full font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Save size={14} />
              Simpan & Terapkan
            </button>
          </div>
        </div>

        {/* Warning Alert */}
        <div className="px-6 py-3 bg-amber-50 border-t border-amber-200 text-amber-800 text-[10px] flex items-center gap-2">
          <AlertCircle size={14} className="flex-shrink-0" />
          <span><strong>Perhatian:</strong> Perubahan disimpan sementara di dalam browser ini (localStorage). Untuk menyimpannya secara permanen di server/deploy, klik <strong>"Salin Kode"</strong> dan ganti isi dari file <code>/src/config.ts</code> dengan kode tersebut.</span>
        </div>

      </div>
    </div>
  );
};
