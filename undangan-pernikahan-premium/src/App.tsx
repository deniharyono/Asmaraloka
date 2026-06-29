import React, { useState, useEffect } from "react";
import { LockScreen } from "./components/LockScreen";
import { HeroSection } from "./components/HeroSection";
import { QuoteSection } from "./components/QuoteSection";
import { BrideGroomSection } from "./components/BrideGroomSection";
import { CountdownTimer } from "./components/CountdownTimer";
import { EventDetailSection } from "./components/EventDetailSection";
import { GallerySection } from "./components/GallerySection";
import { LoveStorySection } from "./components/LoveStorySection";
import { RsvpForm } from "./components/RsvpForm";
import { BottomNavigation } from "./components/BottomNavigation";
import { AudioPlayer } from "./components/AudioPlayer";
import { weddingConfig } from "./config";
import { GoldCornerOrnament, FallingFlowerPetals } from "./components/BotanicalDecoration";
import { InvitationEditor } from "./components/InvitationEditor";
import { Edit3 } from "lucide-react";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldPlayOnUnlock, setShouldPlayOnUnlock] = useState(false);
  const [guestName, setGuestName] = useState(weddingConfig.guestDefaultName);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Read guest query parameter on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) {
      setGuestName(decodeURIComponent(to));
    }
  }, []);

  // Control scrolling lock based on invitation unlock state
  useEffect(() => {
    if (!unlocked) {
      document.body.classList.add("overflow-hidden");
      document.body.classList.add("h-screen");
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.remove("h-screen");
    }
  }, [unlocked]);

  // Handle invitation opening
  const handleUnlockInvitation = () => {
    setUnlocked(true);
    setShouldPlayOnUnlock(true);
    setIsPlaying(true);
  };

  return (
    <div className="relative min-h-screen bg-brand-bg text-brand-dark overflow-x-hidden selection:bg-brand-gold/20 selection:text-brand-gold">
      {/* 1. LOCK SCREEN (SECTION 0) */}
      <LockScreen unlocked={unlocked} onUnlock={handleUnlockInvitation} guestName={guestName} />

      {/* Main content viewport containing all sections */}
      <div className={`transition-all duration-1000 ${unlocked ? "opacity-100" : "opacity-0 h-screen overflow-hidden"}`}>
        
        {/* Soft Falling Petals Ambient Backdrop */}
        {unlocked && <FallingFlowerPetals />}

        {/* 2. HERO SECTION (SECTION 1) */}
        <HeroSection />

        {/* 3. QUOTE SECTION (SECTION 2) */}
        <QuoteSection />

        {/* 4. BRIDE & GROOM DETAILS (SECTION 3) */}
        <BrideGroomSection />

        {/* 5. COUNTDOWN CLOCK (SECTION 4) */}
        <CountdownTimer />

        {/* 6. EVENT TIMELINE & DETAILS (SECTION 5) */}
        <EventDetailSection />

        {/* 7. PHOTO & VIDEO GALLERY (SECTION 6) */}
        <GallerySection />

        {/* 8. LOVE STORY TIMELINE (SECTION 7) */}
        <LoveStorySection />

        {/* 9. RSVP FORM & PRAYER COMMENTS (SECTION 8) */}
        <RsvpForm guestName={guestName} />

        {/* PERSISTENT FOOTER BRIDGING THE EVENT */}
        <footer className="py-12 bg-white text-center border-t border-brand-gold/15 relative z-10">
          <div className="max-w-md mx-auto px-4">
            <div className="w-10 h-[1px] bg-brand-gold/40 mx-auto mb-4" />
            <p className="font-heading text-xl font-semibold text-brand-gold tracking-widest">
              {weddingConfig.groom.shortName} & {weddingConfig.bride.shortName}
            </p>
            <p className="text-[10px] text-brand-secondary font-button uppercase tracking-widest mt-1">
              #AureliaAndi2026
            </p>
            <p className="text-[9px] text-brand-secondary/60 mt-6 leading-relaxed">
              Dibuat dengan sepenuh hati menggunakan modern React, Tailwind v4 & Framer Motion.<br />
              © 2026 Aurelia & Andi. All Rights Reserved.
            </p>
          </div>
          {/* Subtle gold decoration at the bottom */}
          <GoldCornerOrnament className="absolute bottom-2 left-2 w-12 h-12" rotation={270} />
          <GoldCornerOrnament className="absolute bottom-2 right-2 w-12 h-12" rotation={180} />
        </footer>

        {/* PERSISTENT STICKY BOTTOM GLASS NAVIGATION */}
        <BottomNavigation isUnlocked={unlocked} />

        {/* PERSISTENT VINYL AUDIO CONTROLLER */}
        <AudioPlayer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          shouldPlayOnUnlock={shouldPlayOnUnlock}
        />
      </div>

      {/* PERSISTENT FLOATING EDIT UNDANGAN BUTTON */}
      <div className="fixed bottom-24 left-4 z-50 md:bottom-28 md:left-8">
        <button
          id="btn-edit-undangan"
          onClick={() => setIsEditorOpen(true)}
          className="relative group flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold text-white shadow-lg shadow-brand-gold/20 hover:bg-brand-dark hover:text-brand-accent hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-brand-gold/40"
          title="Edit Isi Undangan"
          style={{
            backgroundImage: "linear-gradient(135deg, #B89A56 0%, #D6C19A 50%, #B89A56 100%)",
          }}
        >
          {/* Pulsing ring indicator */}
          <span className="absolute -inset-1.5 rounded-full bg-brand-gold/20 animate-ping pointer-events-none" />
          
          <Edit3 size={18} />
          
          {/* Tooltip */}
          <span className="absolute left-14 bg-brand-dark text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md border border-brand-gold/20">
            Edit Undangan
          </span>
        </button>
      </div>

      {/* VISUAL EDITING COMPONENT MODAL OVERLAY */}
      <InvitationEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} />
    </div>
  );
}
