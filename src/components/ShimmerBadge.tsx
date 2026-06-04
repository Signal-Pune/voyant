import React from 'react';

interface ShimmerBadgeProps {
  text: string;
  icon?: React.ReactNode;
}

export const ShimmerBadge: React.FC<ShimmerBadgeProps> = ({ text, icon }) => {
  return (
    <span
      className="shimmer-badge"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.35rem 1rem',
        borderRadius: '999px',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        fontSize: '0.8rem',
        fontWeight: 600,
        color: 'var(--text-secondary)',
        backdropFilter: 'blur(8px)',
        letterSpacing: '0.02em',
      }}
    >
      {icon}
      {text}
    </span>
  );
};
