import React from 'react';

/**
 * ShinyText component from React Bits (https://reactbits.dev)
 * Creates a continuous shimmering gradient animation across text.
 */
export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = ''
}) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`relative inline-block overflow-hidden ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0.2) 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        animation: disabled ? 'none' : `shine ${animationDuration} linear infinite`,
      }}
    >
      {text}
    </span>
  );
}
