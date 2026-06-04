import React from 'react';
import { Cpu, ShieldAlert, Activity, Database } from 'lucide-react';

export const SystemArchitecture: React.FC = () => {
  return (
    <section className="section" id="architecture" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '8rem 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '6rem', alignItems: 'start' }}>
        
        {/* Sticky Left Column */}
        <div style={{ position: 'sticky', top: '120px' }}>
          <span className="section-tag" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            SYSTEM_ARCHITECTURE
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.1', marginBottom: '1.5rem', fontWeight: 400 }}>
            Edge intelligence meets deep cloud analytics.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem', maxWidth: '420px' }}>
            Our hardware stack samples exhaust streams at sub-second intervals, routing telemetry through a secure MQTT broker. It predicts filter clogs before they hit critical failure thresholds, ensuring 100% CPCB compliance.
          </p>
        </div>

        {/* Scrolling Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          <div className="architecture-visual" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', padding: '2rem', borderRadius: '4px' }}>
            <svg viewBox="0 0 600 400" className="schema-svg" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
              {/* Clean, editorial wireframe style */}
              <g stroke="var(--text-muted)" strokeWidth="1" fill="none" opacity="0.6">
                <path d="M 30,120 L 150,120" />
                <path d="M 30,160 L 150,160" />
                <rect x="150" y="100" width="120" height="80" />
                <line x1="160" y1="100" x2="160" y2="180" strokeDasharray="4,4" />
                <line x1="260" y1="100" x2="260" y2="180" strokeDasharray="4,4" />
                <path d="M 270,120 L 400,120" />
                <path d="M 270,160 L 400,160" />
              </g>
              
              <text x="35" y="115" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">RAW_EXHAUST</text>
              <text x="210" y="145" fill="var(--text-primary)" fontSize="12" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="0.1em">CATALYTIC RECD</text>
              <text x="310" y="115" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">CLEAN_OUT</text>

              <path d="M 20,140 L 420,140" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="6,6" fill="none" opacity="0.8" />
              <polygon points="420,140 410,136 410,144" fill="var(--accent)" />

              <g stroke="var(--accent-secondary)" strokeWidth="1" fill="none" opacity="0.9">
                <polyline points="100,120 100,80 130,80" />
                <circle cx="100" cy="120" r="3" fill="var(--accent-secondary)" />
                <text x="135" y="83" fill="var(--accent-secondary)" fontSize="10" fontFamily="var(--font-mono)">PT-100</text>
                <polyline points="130,160 130,220 180,220" />
                <circle cx="130" cy="160" r="3" fill="var(--accent-secondary)" />
                <polyline points="290,160 290,240 220,240" />
                <circle cx="290" cy="160" r="3" fill="var(--accent-secondary)" />
              </g>

              <rect x="180" y="210" width="100" height="70" fill="var(--bg-console)" stroke="var(--border-color)" strokeWidth="1" />
              <text x="185" y="225" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)">VOYANT_EDGE</text>
              <text x="185" y="235" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">SN:VY-2026</text>
              
              <rect x="185" y="265" width="6" height="6" fill="var(--accent-secondary)" />
              <rect x="195" y="265" width="6" height="6" fill="var(--accent)" />
              
              <polyline points="280,245 340,245" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="4,4" fill="none" />
              <polygon points="340,245 336,242 336,248" fill="var(--text-muted)" />

              <g transform="translate(360, 210)" stroke="var(--border-color)" fill="none" strokeWidth="1">
                <rect x="0" y="0" width="140" height="80" />
                <line x1="0" y1="20" x2="140" y2="20" />
                <text x="5" y="14" fill="var(--text-primary)" fontSize="9" fontFamily="var(--font-mono)">CLOUD_INFRA</text>
                <ellipse cx="30" cy="45" rx="15" ry="5" />
                <path d="M 15,45 L 15,65 A 15,5 0 0,0 45,65 L 45,45" />
                <text x="55" y="55" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">TSDB</text>
                <rect x="90" y="40" width="40" height="30" strokeDasharray="2,2" />
                <text x="95" y="55" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">API</text>
              </g>
            </svg>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ padding: '2rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
              <Cpu size={24} style={{ color: 'var(--accent)', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>Real-Time Edge</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Sub-second sampling intervals on local controllers ensure instant thermal interventions.</p>
            </div>
            
            <div style={{ padding: '2rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
              <ShieldAlert size={24} style={{ color: 'var(--accent-secondary)', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>Fail-Safe Loop</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Automated MQTT aggregation triggers instant alerts if a filter is bypassed.</p>
            </div>

            <div style={{ padding: '2rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
              <Activity size={24} style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>Predictive ML</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Time-series analysis foresees DPF clogging paths before engine stalling occurs.</p>
            </div>

            <div style={{ padding: '2rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
              <Database size={24} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>Data Vault</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Immutable logs verify CPCB certification audits effortlessly across the region.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

