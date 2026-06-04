import { useEffect, useRef } from 'react';
import { TelemetryPanel } from './TelemetryPanel';
import type { TelemetryProps } from './TelemetryPanel';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

interface HeroProps extends TelemetryProps {}

export const Hero = (props: HeroProps) => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.from('.hero-eyebrow', {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })
        .from(
          '.hero-title-line',
          {
            y: '100%',
            opacity: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: 'power4.out',
          },
          '-=0.3'
        )
        .from(
          '.hero-sub',
          {
            y: 20,
            opacity: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .from(
          '.hero-panel',
          {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.6'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" id="hero-section" ref={heroRef}>
      <div className="container hero-grid">
        {/* LEFT: Editorial statement */}
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            <span>CPCB_ENFORCEMENT — ACTIVE</span>
          </div>

          <h1 className="hero-title" aria-label="CPCB Compliance. Automated.">
            <span className="hero-title-overflow">
              <span className="hero-title-line">CPCB</span>
            </span>
            <span className="hero-title-overflow">
              <span className="hero-title-line">Compliance.</span>
            </span>
            <span className="hero-title-overflow">
              <span className="hero-title-line hero-title-accent">Automated.</span>
            </span>
          </h1>

          <p className="hero-subtitle hero-sub">
            Voyant Systems retrofits diesel generator sets with certified RECD
            emission filters and an AI-driven edge monitoring stack — so your
            site stays compliant around the clock, without replacing existing
            assets.
          </p>

          <div className="hero-actions hero-sub">
            <a
              href="#contact"
              className="hero-cta-primary"
              id="btn-hero-pitch"
            >
              Discuss a Project
              <ArrowRight size={15} />
            </a>
            <a
              href="#solutions"
              className="hero-cta-secondary"
              id="btn-hero-solutions"
            >
              How it works
            </a>
          </div>

          {/* Proof strip */}
          <div className="hero-proof hero-sub">
            <div className="hero-proof-item">
              <span className="hero-proof-number">84.5%</span>
              <span className="hero-proof-label">avg. PM capture</span>
            </div>
            <div className="hero-proof-divider" />
            <div className="hero-proof-item">
              <span className="hero-proof-number">24/7</span>
              <span className="hero-proof-label">autonomous monitoring</span>
            </div>
            <div className="hero-proof-divider" />
            <div className="hero-proof-item">
              <span className="hero-proof-number">4 hr</span>
              <span className="hero-proof-label">typical install time</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Live telemetry panel */}
        <div className="hero-panel" aria-label="Live RECD telemetry dashboard">
          <div className="hero-panel-label">
            <span className="hero-panel-dot" />
            LIVE_TELEMETRY — NODE_RECD_02
          </div>
          <div className="hero-panel-inner">
            <TelemetryPanel {...props} />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll-cue" aria-hidden="true">
        <span className="hero-scroll-label">SCROLL</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
};
