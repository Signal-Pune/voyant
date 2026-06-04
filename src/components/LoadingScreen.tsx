import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => onComplete?.(), 600);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: '#07090e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="var(--accent-orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 12px rgba(249,115,22,0.4))' }}>
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontWeight: 800, fontSize: '1.5rem', color: '#f8fafc', letterSpacing: '0.05em' }}>VOYANT</span>
          <span style={{ fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.25em', color: '#94a3b8', marginTop: '3px' }}>SYSTEMS PVT LTD</span>
        </div>
      </div>

      <div style={{ width: '200px', height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${Math.min(100, progress)}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--accent-orange), var(--accent-cyan))',
            borderRadius: '2px',
            transition: 'width 0.15s ease',
            boxShadow: '0 0 10px rgba(56,189,248,0.3)',
          }}
        />
      </div>

      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
        {Math.min(100, Math.round(progress))}%
      </span>
    </div>
  );
};
