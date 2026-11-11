import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * MagneticButton component inspired by React Bits (https://reactbits.dev)
 * Attracts the button element smoothly towards the cursor when hovering.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  onClick,
  as: Component = 'button',
  ...props
}) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion || !buttonRef.current) return;

    const el = buttonRef.current;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: distanceX,
        y: distanceY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength]);

  return (
    <Component
      ref={buttonRef}
      className={`inline-block ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
}
