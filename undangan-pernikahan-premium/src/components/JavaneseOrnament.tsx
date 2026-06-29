import React from "react";

interface JavaneseOrnamentProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

/**
 * Javanese Gunungan (Kayon) Ornament
 * This is a highly polished, symmetrical Javanese shadow puppet motif
 * representing the gateway of life, the tree of existence, and cosmic balance.
 */
export const JavaneseGunungan: React.FC<JavaneseOrnamentProps> = ({
  className = "",
  size = 120,
  animate = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center transition-all duration-1000 ${
        animate ? "animate-sway-javanese animate-pulse-gentle" : ""
      } ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Decorative Golden Glow */}
      <div className="absolute inset-0 bg-brand-gold/10 rounded-full blur-xl scale-75 animate-pulse" />

      {/* Gunungan Shadow Puppet Outline Vector */}
      <svg
        viewBox="0 0 100 120"
        className="w-full h-full text-brand-gold select-none drop-shadow-md"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Shimmer linear gradient definition */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B89A56" />
            <stop offset="30%" stopColor="#F5E5C9" />
            <stop offset="50%" stopColor="#B89A56" />
            <stop offset="80%" stopColor="#D6C19A" />
            <stop offset="100%" stopColor="#B89A56" />
          </linearGradient>
          {/* Subtle gold metallic shimmer sweep pattern */}
          <clipPath id="gununganClip">
            <path d="M 50 10 Q 75 55 85 85 Q 87 95 80 105 Q 75 110 50 110 Q 25 110 20 105 Q 13 95 15 85 Q 25 55 50 10 Z" />
          </clipPath>
        </defs>

        {/* Shimmer background sweeps */}
        <g clipPath="url(#gununganClip)">
          <rect
            width="100"
            height="120"
            fill="url(#goldGradient)"
            opacity="0.15"
            className="animate-pulse"
          />
        </g>

        {/* Outer Triangular Crown / Kayon Leaf border */}
        <path
          d="M 50 10 Q 75 55 85 85 Q 87 95 80 105 Q 75 110 50 110 Q 25 110 20 105 Q 13 95 15 85 Q 25 55 50 10 Z"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          fill="rgba(248, 246, 242, 0.45)"
          className="backdrop-blur-[1px]"
        />

        {/* Inner Tree of Life (Pohon Hayat / Kalpataru) */}
        {/* Trunk */}
        <path d="M 50 110 L 50 50" strokeWidth="2" stroke="currentColor" />
        
        {/* Branches */}
        <path d="M 50 90 Q 65 85 75 75" />
        <path d="M 50 90 Q 35 85 25 75" />
        <path d="M 50 75 Q 70 70 78 55" />
        <path d="M 50 75 Q 30 70 22 55" />
        <path d="M 50 60 Q 65 50 70 35" />
        <path d="M 50 60 Q 35 50 30 35" />
        
        {/* Elegant curly flower buds and leaves on branches */}
        <circle cx="75" cy="75" r="1.5" fill="currentColor" />
        <circle cx="25" cy="75" r="1.5" fill="currentColor" />
        <circle cx="78" cy="55" r="1.5" fill="currentColor" />
        <circle cx="22" cy="55" r="1.5" fill="currentColor" />
        <circle cx="70" cy="35" r="1.5" fill="currentColor" />
        <circle cx="30" cy="35" r="1.5" fill="currentColor" />

        {/* Traditional Javanese Gate (Gapura) in the bottom center */}
        <path d="M 38 110 L 38 90 L 62 90 L 62 110" strokeWidth="1.5" fill="rgba(184, 154, 86, 0.1)" />
        <path d="M 35 90 L 50 78 L 65 90" strokeWidth="1.5" />
        {/* Gate Doors */}
        <path d="M 50 90 L 50 110" strokeWidth="1" strokeDasharray="1 2" />

        {/* Twin mythical guardians or elegant wings left & right of gate */}
        <path d="M 30 100 Q 25 90 32 85 Q 35 95 38 98" fill="currentColor" fillOpacity="0.2" />
        <path d="M 70 100 Q 75 90 68 85 Q 65 95 62 98" fill="currentColor" fillOpacity="0.2" />

        {/* Decorative clouds or cosmic symbols on top */}
        <path d="M 45 35 Q 50 30 55 35 Q 50 40 45 35 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="0.5" />
        <path d="M 40 22 Q 50 15 60 22" strokeWidth="0.5" />
        <path d="M 46 16 Q 50 12 54 16" strokeWidth="0.5" />
      </svg>
    </div>
  );
};

/**
 * Javanese Jasmin Garland Sway (Ronce Melati)
 * Gently sways at the sides of the layout to bring a royal ceremonial scent.
 */
export const JavaneseJasminSway: React.FC<{
  className?: string;
  side?: "left" | "right";
  height?: string;
}> = ({ className = "", side = "left", height = "h-48" }) => {
  return (
    <div
      className={`absolute top-0 ${
        side === "left" ? "left-2" : "right-2"
      } pointer-events-none select-none z-10 animate-sway-javanese ${className}`}
      style={{ transformOrigin: "top center" }}
    >
      <svg
        className={`w-6 ${height} text-brand-gold/60`}
        viewBox="0 0 24 160"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        {/* Hanging Javanese Melati Flowers link */}
        <line x1="12" y1="0" x2="12" y2="150" strokeDasharray="3 4" strokeWidth="1.25" />
        
        {/* Jasmin buds along the string */}
        {[20, 45, 70, 95, 120, 140].map((y, idx) => (
          <g key={idx} transform={`translate(12, ${y})`}>
            {/* Elegant petaled jasmine shape */}
            <circle cx="0" cy="0" r="3.5" className="fill-white stroke-brand-gold" strokeWidth="0.75" />
            <path d="M -3 0 Q 0 -5 3 0 Q 0 5 -3 0 Z" fill="#B89A56" opacity="0.4" />
            <path d="M 0 -3 Q 5 0 0 3 Q -5 0 0 -3 Z" fill="#B89A56" opacity="0.4" />
          </g>
        ))}

        {/* Tassel flower (Kuncup Melati / Kantil) at the end */}
        <g transform="translate(12, 150)">
          <path
            d="M 0 0 Q 6 12 0 20 Q -6 12 0 0 Z"
            className="fill-white stroke-brand-gold"
            strokeWidth="1.25"
          />
          <circle cx="0" cy="0" r="2.5" fill="#B89A56" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Shining Light Beam sweep effect.
 * Creates a beautiful golden light sweep moving across the card on hover/intervals.
 */
export const ShineSweepOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none z-[5]">
      <div
        className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        style={{
          animationName: "shine-sweep",
          animationDuration: "5s",
          animationIterationCount: "infinite",
          animationTimingFunction: "ease-in-out",
        }}
      />
    </div>
  );
};
