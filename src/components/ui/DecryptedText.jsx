import React, { useState, useEffect, useRef } from 'react';

/**
 * DecryptedText component from React Bits (https://reactbits.dev)
 * Creates a cyber-editorial scramble & reveal text animation.
 */
export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_#@*&',
  className = '',
  animateOn = 'view', // 'view' | 'hover'
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    let interval;
    let currentIteration = 0;

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
      : characters.split('');

    const shuffleText = () => {
      if (sequential) {
        setRevealedIndices((prevRevealed) => {
          if (prevRevealed.size < text.length) {
            const nextIndex =
              revealDirection === 'start'
                ? prevRevealed.size
                : text.length - 1 - prevRevealed.size;
            const newRevealed = new Set(prevRevealed);
            newRevealed.add(nextIndex);
            setDisplayText(
              text
                .split('')
                .map((char, index) => {
                  if (char === ' ') return ' ';
                  if (newRevealed.has(index)) return text[index];
                  return availableChars[Math.floor(Math.random() * availableChars.length)];
                })
                .join('')
            );
            return newRevealed;
          } else {
            clearInterval(interval);
            setIsScrambling(false);
            setDisplayText(text);
            return prevRevealed;
          }
        });
      } else {
        setDisplayText(
          text
            .split('')
            .map((char) => {
              if (char === ' ') return ' ';
              return availableChars[Math.floor(Math.random() * availableChars.length)];
            })
            .join('')
        );
        currentIteration++;
        if (currentIteration >= maxIterations) {
          clearInterval(interval);
          setIsScrambling(false);
          setDisplayText(text);
        }
      }
    };

    if (isScrambling) {
      interval = setInterval(shuffleText, speed);
    } else {
      setDisplayText(text);
    }

    return () => clearInterval(interval);
  }, [isScrambling, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly]);

  useEffect(() => {
    if (animateOn !== 'view') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealedIndices(new Set());
            setIsScrambling(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentEl = containerRef.current;
    if (currentEl) observer.observe(currentEl);

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, [animateOn]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      setIsHovering(true);
      setRevealedIndices(new Set());
      setIsScrambling(true);
    }
  };

  const handleMouseLeave = () => {
    if (animateOn === 'hover') {
      setIsHovering(false);
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block font-mono select-none ${className}`}
      {...props}
    >
      {displayText}
    </span>
  );
}
