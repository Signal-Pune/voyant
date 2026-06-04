import React from 'react';
import { TelemetryPanel } from './TelemetryPanel';
import type { TelemetryProps } from './TelemetryPanel';
import { TextScramble } from './TextScramble';
import { MagneticButton } from './MagneticButton';
import { ShimmerBadge } from './ShimmerBadge';
import { Zap } from 'lucide-react';

interface HeroProps extends TelemetryProps {}

export const Hero: React.FC<HeroProps> = (props) => {
  return (
    <section className="hero" id="hero-section">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="fade-in-up stagger-1">
            <ShimmerBadge
              text="Plug-and-Play Compliance"
              icon={<Zap size={12} style={{ color: 'var(--accent-orange)' }} />}
            />
          </div>

          <h1 className="hero-title fade-in-up stagger-2">
            <TextScramble text="CPCB emission" delay={200} duration={1200} />
            <br />
            <TextScramble text="compliance, retrofitted." delay={800} duration={1200} />
          </h1>

          <p className="hero-subtitle fade-in-up stagger-3">
            Voyant Systems builds plug-and-play retrofit controllers for Diesel Generator sets (RECDs) that guarantee CPCB norms compliance with real-time AI SaaS analytics.
          </p>

          <div className="hero-actions fade-in-up stagger-4">
            <MagneticButton href="#contact" className="btn btn-primary btn-shine" id="btn-hero-pitch">
              Discuss a Project
              <svg className="btn-icon" viewBox="0 0 24 24" width="16" height="16">
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"></polygon>
              </svg>
            </MagneticButton>
            <MagneticButton href="#solutions" className="btn btn-secondary" id="btn-hero-solutions">
              Explore Solutions
            </MagneticButton>
          </div>
        </div>

        {/* Live Telemetry Card & Backup visual container for responsiveness */}
        <div className="hero-visual-side fade-in-right">
          {/* Main live telemetry dashboard */}
          <TelemetryPanel {...props} />

          {/* Fallback visual for mobile stack display rules */}
          <div className="hero-proof">
            <img src="/voyant_expo_booth.png" alt="Voyant Systems industrial automation display booth" className="hero-proof-img" />
            <div className="hero-proof-caption">
              <span>TLC Expo 2026 / Chinchwad</span>
              Industrial automation display with live data, PLC hardware, and operator dashboard.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
