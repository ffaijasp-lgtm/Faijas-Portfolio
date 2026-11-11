import React, { useRef, useState } from 'react';

/**
 * SpotlightCard component from React Bits (https://reactbits.dev)
 * Creates a dynamic radial spotlight that smoothly follows the cursor over dark cards.
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 222, 0, 0.15)",
  borderColor = "rgba(255, 222, 0, 0.4)",
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        "--spotlight-color": spotlightColor,
        "--border-spotlight": borderColor,
      }}
      className={`relative overflow-hidden bg-[#0d0d0d] border border-white/10 transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), var(--spotlight-color), transparent 70%)`,
        }}
      />

      {/* Subtle border highlight follow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 border border-transparent"
        style={{
          opacity: isHovered ? 1 : 0,
          borderImage: `radial-gradient(300px circle at var(--mouse-x, 0) var(--mouse-y, 0), var(--border-spotlight), transparent 80%) 1`,
        }}
      />

      {/* Inner Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
