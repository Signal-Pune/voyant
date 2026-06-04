import React from 'react';
import { SpotlightCard } from './SpotlightCard';

interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  span?: 'normal' | 'wide' | 'tall';
}

interface BentoGridProps {
  items: BentoItem[];
}

export const BentoGrid: React.FC<BentoGridProps> = ({ items }) => {
  return (
    <div className="bento-grid">
      {items.map((item, i) => (
        <SpotlightCard
          key={i}
          className={`bento-card ${item.span === 'wide' ? 'bento-wide' : ''} ${item.span === 'tall' ? 'bento-tall' : ''} ${item.className || ''}`}
          size={300}
        >
          <div className="bento-card-content">
            <div className="bento-icon-wrapper">
              {item.icon}
            </div>
            <h3 className="bento-title">{item.title}</h3>
            <p className="bento-desc">{item.description}</p>
          </div>
          <div className="bento-card-border" />
        </SpotlightCard>
      ))}
    </div>
  );
};
