import React, { useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { weddingConfig } from "../config";

// Establish a single persistent HTMLAudioElement outside the component tree
// to prevent duplicate background music playing during re-renders or navigation.
let globalAudio: HTMLAudioElement | null = null;

if (typeof window !== "undefined") {
  globalAudio = new Audio(weddingConfig.musicUrl);
  globalAudio.loop = true;
}

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  shouldPlayOnUnlock: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  setIsPlaying,
  shouldPlayOnUnlock,
}) => {
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Sync state with HTMLAudioElement
  useEffect(() => {
    if (!globalAudio) return;

    if (isPlaying) {
      // Attempt play with browser policy promise handling
      globalAudio.play().catch((err) => {
        console.warn("Autoplay blocked by browser policy:", err);
        setIsPlaying(false);
      });
    } else {
      globalAudio.pause();
    }
  }, [isPlaying, setIsPlaying]);

  // Handle play when lock screen is opened
  useEffect(() => {
    if (shouldPlayOnUnlock && globalAudio) {
      setIsPlaying(true);
    }
  }, [shouldPlayOnUnlock, setIsPlaying]);

  // Volume & mute controllers
  useEffect(() => {
    if (!globalAudio) return;
    globalAudio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-center gap-2 md:bottom-28 md:right-8">
      {/* Volume Slider overlay */}
      {showVolumeSlider && (
        <div className="absolute bottom-16 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full border border-brand-gold/30 shadow-lg flex items-center -rotate-90 origin-bottom transition-all duration-300">
          <input
            id="volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setVolume(val);
              if (val > 0) setIsMuted(false);
            }}
            className="w-20 accent-brand-gold cursor-pointer"
          />
        </div>
      )}

      {/* Main Music Control Button (Vinyl Record style) */}
      <div className="relative group">
        <button
          id="music-play-button"
          onClick={togglePlay}
          className={`relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-105 shadow-md border border-brand-gold/40 ${
            isPlaying
              ? "bg-brand-dark text-brand-accent animate-spin-slow"
              : "bg-white text-brand-dark"
          }`}
          style={{
            backgroundImage: "radial-gradient(circle, #3F3A37 35%, #1F1C1B 65%, #B89A56 100%)",
            boxShadow: "0 0 15px rgba(184, 154, 86, 0.2)",
          }}
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {/* Vinyl center gold cap */}
          <div className="absolute w-3 h-3 bg-brand-gold rounded-full border border-white" />

          {/* Icon overlay with high contrast */}
          <div className="absolute flex items-center justify-center text-white pointer-events-none drop-shadow">
            {isPlaying ? (
              <Pause size={14} className="text-brand-accent animate-pulse" />
            ) : (
              <Play size={14} className="text-brand-gold translate-x-[1px]" />
            )}
          </div>
        </button>
      </div>

      {/* Smaller Volume Mute Toggle Button */}
      <button
        id="music-volume-button"
        onClick={toggleMute}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
        className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-brand-dark border border-brand-gold/20 shadow-sm hover:bg-white transition-all cursor-pointer"
        title="Adjust Volume"
      >
        {isMuted || volume === 0 ? (
          <VolumeX size={14} className="text-brand-secondary" />
        ) : (
          <Volume2 size={14} className="text-brand-gold" />
        )}
      </button>
    </div>
  );
};
