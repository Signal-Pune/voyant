import React from 'react';

export const SectionDivider: React.FC = () => {
  return (
    <div className="section-divider" aria-hidden="true">
      <div className="section-divider-line"></div>
      <div className="section-divider-glow"></div>
    </div>
  );
};
