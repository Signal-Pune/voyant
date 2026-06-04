import { motion } from 'framer-motion';
import { TelemetryPanel } from './TelemetryPanel';
import type { TelemetryProps } from './TelemetryPanel';
import { ArrowRight } from 'lucide-react';
import LaserFlow from './LaserFlow';

interface HeroProps extends TelemetryProps {}

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const titleVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const },
  }
};

const panelVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.25 },
  },
};

// Title words/lines to animate individually
const titleLines = ['CPCB', 'Compliance.', 'Automated.'];

export const Hero = (props: HeroProps) => {
  return (
    <section className="hero-section" id="hero-section">
      <div className="container hero-grid" style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
        {/* LEFT: Editorial copy */}
        <motion.div
          className="hero-copy"
          style={{ pointerEvents: 'auto' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div className="hero-eyebrow" variants={fadeUpVariants}>
            <span className="hero-eyebrow-dot" />
            <span>CPCB_ENFORCEMENT — ACTIVE</span>
          </motion.div>

          {/* Title — word-by-word reveal */}
          <motion.h1 
            className="hero-title" 
            aria-label="CPCB Compliance. Automated."
            variants={titleVariants}
          >
            {titleLines.map((line, i) => (
              <motion.span
                key={i}
                className={`hero-title-line${i === 2 ? ' hero-title-accent' : ''}`}
                variants={wordVariants}
                style={{ display: 'inline-block', marginRight: i !== 2 ? '0.2em' : '0' }}
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p className="hero-subtitle" variants={fadeUpVariants}>
            Voyant Systems retrofits diesel generator sets with certified RECD
            emission filters and an AI-driven edge monitoring stack — so your
            site stays compliant around the clock, without replacing existing
            assets.
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero-actions" variants={fadeUpVariants}>
            <a href="#contact" className="hero-cta-primary" id="btn-hero-pitch">
              Discuss a Project
              <ArrowRight size={15} />
            </a>
            <a href="#solutions" className="hero-cta-secondary" id="btn-hero-solutions">
              How it works
            </a>
          </motion.div>

          {/* Proof strip */}
          <motion.div className="hero-proof" variants={fadeUpVariants}>
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
          </motion.div>
        </motion.div>

        {/* RIGHT: Live telemetry panel */}
        <motion.div
          className="hero-panel"
          style={{ pointerEvents: 'auto', position: 'relative' }}
          aria-label="Live RECD telemetry dashboard"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
        >
          {/* LaserFlow animation container aligned to the top edge of the panel label */}
          <div style={{
            position: 'absolute',
            top: '-250px',
            height: '500px',
            left: '-60px',
            right: '-60px',
            zIndex: 0,
            pointerEvents: 'none'
          }}>
            <LaserFlow 
              color="#CF9EFF" 
              flowSpeed={0.4} 
              wispDensity={1.2}
              fogIntensity={0.5}
            />
          </div>

          <div className="hero-panel-label" style={{ position: 'relative', zIndex: 1 }}>
            <span className="hero-panel-dot" />
            LIVE_TELEMETRY — NODE_RECD_02
          </div>
          <div className="hero-panel-inner" style={{ position: 'relative', zIndex: 1 }}>
            <TelemetryPanel {...props} />
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="hero-scroll-cue"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="hero-scroll-label">SCROLL</span>
        <span className="hero-scroll-line" />
      </motion.div>
    </section>
  );
};
