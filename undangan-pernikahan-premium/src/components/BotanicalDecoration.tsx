import React, { useEffect, useState } from "react";

/**
 * Botanical Decoration Elements
 * Renders beautiful vector-based floral ornaments, swaying leaves, and golden particles.
 */

// Elegant Gold Botanical Corner Ornament SVG
export const GoldCornerOrnament: React.FC<{ className?: string; rotation?: number }> = ({
  className = "",
  rotation = 0,
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-24 h-24 text-brand-gold opacity-60 pointer-events-none transition-transform duration-700 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Outer corner line */}
      <path d="M 5,95 L 5,5 L 95,5" />
      {/* Elegant branch 1 */}
      <path d="M 5,5 Q 40,10 60,35" />
      <path d="M 30,12 Q 35,5 45,8" />
      <path d="M 45,22 Q 52,15 60,20" strokeWidth="0.5" />
      {/* Elegant branch 2 */}
      <path d="M 5,5 Q 10,40 35,60" />
      <path d="M 12,30 Q 5,35 8,45" />
      <path d="M 22,45 Q 15,52 20,60" strokeWidth="0.5" />
      {/* Decorative center flower bud */}
      <path d="M 5,5 Q 25,25 45,45" />
      <circle cx="45" cy="45" r="2.5" fill="currentColor" />
      {/* Tiny leaves */}
      <path d="M 20,20 C 15,25 25,30 25,25 C 25,20 15,15 20,20 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M 32,32 C 27,37 37,42 37,37 C 37,32 27,27 32,32 Z" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
};

// Sleek botanical divider
export const ElegantDivider: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center gap-4 my-6 select-none ${className}`}>
      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-brand-gold/40" />
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 text-brand-gold animate-float-gentle"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        {/* Centered stylized leaf */}
        <path d="M12 2C12 2 6 8 6 13C6 16.3137 8.68629 19 12 19C15.3137 19 18 16.3137 18 13C18 8 12 2 12 2Z" />
        <path d="M12 19V6" />
        <path d="M12 9Q14 11 16 10" />
        <path d="M12 12Q10 14 8 13" />
      </svg>
      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-brand-gold/40" />
    </div>
  );
};

// Gentle Swaying Leaf Overlay (monstera / fern aesthetic)
export const SwayingLeafBackground: React.FC<{ position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }> = ({
  position,
}) => {
  const getStyles = () => {
    switch (position) {
      case "top-left":
        return "top-[-5%] left-[-10%] rotate-45 md:left-[-5%] md:top-[-5%]";
      case "top-right":
        return "top-[-5%] right-[-10%] -rotate-45 md:right-[-5%] md:top-[-5%]";
      case "bottom-left":
        return "bottom-[-5%] left-[-10%] rotate-[135deg] md:left-[-5%]";
      case "bottom-right":
        return "bottom-[-5%] right-[-10%] -rotate-[135deg] md:right-[-5%]";
    }
  };

  return (
    <div className={`absolute w-64 h-64 md:w-96 md:h-96 opacity-[0.06] pointer-events-none select-none z-0 ${getStyles()}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-brand-gold animate-sway"
        fill="currentColor"
      >
        {/* Palm frond outline with separated leaves */}
        <path d="M10,90 Q50,50 90,10 Q60,30 50,50 Q40,70 10,90 Z" />
        <path d="M40,50 C30,45 25,35 30,30 C35,25 45,30 45,40 C45,45 42,48 40,50 Z" />
        <path d="M50,40 C40,35 35,25 40,20 C45,15 55,20 55,30 C55,35 52,38 50,40 Z" />
        <path d="M60,30 C50,25 45,15 50,10 C55,5 65,10 65,20 C65,25 62,28 60,30 Z" />
        <path d="M30,60 C20,55 15,45 20,40 C25,35 35,40 35,50 C35,55 32,58 30,60 Z" />
        <path d="M20,70 C10,65 5,55 10,50 C15,45 25,50 25,60 C25,65 22,68 20,70 Z" />
      </svg>
    </div>
  );
};

// Golden Dust Sparkles (Floating Particle Generator)
interface Sparkle {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
}

export const GoldenDustParticles: React.FC = () => {
  const [particles, setParticles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Generate constant set of particles with deterministic styling
    const newParticles = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${12 + Math.random() * 15}s`,
      size: `${3 + Math.random() * 5}px`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-brand-gold/30 blur-[0.5px]"
          style={{
            left: p.left,
            bottom: "-20px",
            width: p.size,
            height: p.size,
            animationName: "float-dust",
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}
        />
      ))}
    </div>
  );
};

// Floating Falling Petals (Floral aesthetics)
interface Petel {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  rotate: string;
}

export const FallingFlowerPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petel[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${15 + Math.random() * 12}s`,
      size: `${8 + Math.random() * 10}px`,
      rotate: `${Math.random() * 180}deg`,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            top: "-20px",
            animationName: "petal-fall",
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          }}
        >
          {/* Petal SVG drawing (delicate light rose/beige petal) */}
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            className="text-brand-accent/40 fill-current"
            style={{ transform: `rotate(${p.rotate})` }}
          >
            <path d="M12,2 C12,2 4,10 4,14 C4,18.42 7.58,22 12,22 C16.42,22 20,18.42 20,14 C20,10 12,2 12,2 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
