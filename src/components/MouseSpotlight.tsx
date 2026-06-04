import React, { useEffect, useRef } from 'react';

export const MouseSpotlight: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const handleMouseMove = (e: MouseEvent) => {
      div.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(56, 189, 248, 0.06), transparent 40%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={divRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        transition: 'background 0.1s ease',
      }}
    />
  );
};
