import React, { useEffect, useState } from "react";
import { Home, Heart, CalendarDays, Mail } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "couple", label: "Couple", icon: Heart },
  { id: "event", label: "Event", icon: CalendarDays },
  { id: "rsvp", label: "RSVP", icon: Mail },
];

export const BottomNavigation: React.FC<{ isUnlocked: boolean }> = ({ isUnlocked }) => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (!isUnlocked) return;

    // Scrollspy Observer
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Detect active elements around the viewport center
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      NAV_ITEMS.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [isUnlocked]);

  const handleScrollTo = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  if (!isUnlocked) return null;

  return (
    <nav
      id="bottom-navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[30] max-w-sm w-[90%] md:w-full transition-all duration-500 animate-fade-in"
    >
      <div className="bg-white/70 backdrop-blur-md rounded-full border border-brand-gold/25 p-2 px-4 shadow-[0_10px_35px_-5px_rgba(184,154,86,0.15)] flex justify-between items-center">
        {NAV_ITEMS.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className="flex flex-col items-center justify-center p-2.5 rounded-full relative group transition-all duration-300 cursor-pointer"
              title={item.label}
            >
              {/* Floating gold dot indicator for active tab */}
              {isActive && (
                <div className="absolute top-0 w-1.5 h-1.5 bg-brand-gold rounded-full" />
              )}

              {/* Icon */}
              <div
                className={`transition-all duration-300 ${
                  isActive
                    ? "text-brand-gold scale-110"
                    : "text-brand-secondary/70 group-hover:text-brand-gold group-hover:scale-105"
                }`}
              >
                <IconComponent size={20} className={isActive ? "fill-current/5" : ""} />
              </div>

              {/* Hidden tooltip label (appears on desktop hover) */}
              <span className="absolute bottom-11 scale-0 group-hover:scale-100 transition-all duration-200 bg-brand-dark text-brand-accent text-[9px] font-button font-medium px-2 py-1 rounded shadow pointer-events-none tracking-widest uppercase">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
