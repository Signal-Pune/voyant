import React from 'react';

const items = [
  'CPCB Compliant',
  'Plug-and-Play Retrofit',
  'AI-Powered Telemetry',
  'Real-Time Monitoring',
  'Edge Computing',
  'MQTT Telemetry',
  'Industrial IoT',
  'Pune Engineering',
];

export const MarqueeStrip: React.FC = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(90deg, rgba(249,115,22,0.08), rgba(56,189,248,0.08))',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        overflow: 'hidden',
        padding: '0.85rem 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '3rem',
          animation: 'marqueeScroll 25s linear infinite',
          width: 'max-content',
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '3rem',
            }}
          >
            {item}
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-orange)', opacity: 0.5, flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  );
};
