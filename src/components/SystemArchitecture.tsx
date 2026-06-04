import React from 'react';

export const SystemArchitecture: React.FC = () => {
  return (
    <section className="section" id="capabilities" style={{ background: 'rgba(5, 7, 10, 0.3)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container architecture-grid">
        {/* SVG Diagram Side */}
        <div className="architecture-visual fade-in-left">
          <svg viewBox="0 0 600 380" className="schema-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="recdGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#c2410c" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Grid */}
            <rect width="100%" height="100%" fill="transparent" />

            {/* 1. PHYSICAL EXHAUST DUCT & RECD FILTER */}
            {/* Inlet exhaust pipe */}
            <path d="M 20,100 L 160,100" stroke="url(#pipeGrad)" strokeWidth="36" strokeLinecap="butt" fill="none" />
            <text x="35" y="70" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">EXHAUST INLET</text>
            
            {/* Filter housing */}
            <rect x="160" y="65" width="100" height="70" rx="8" fill="url(#recdGrad)" stroke="#ea580c" strokeWidth="2" filter="url(#glow)" />
            <text x="210" y="105" fill="#ffffff" fontSize="12" fontWeight="800" textAnchor="middle" letterSpacing="0.05em">RECD FILTER</text>
            <text x="210" y="120" fill="rgba(255,255,255,0.7)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">CATALYTIC DPF</text>

            {/* Outlet exhaust pipe */}
            <path d="M 260,100 L 400,100" stroke="url(#pipeGrad)" strokeWidth="36" fill="none" />
            <text x="310" y="70" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">CLEAN EXHAUST</text>
            
            {/* Flow line animation */}
            <path d="M 15,100 L 160,100 M 260,100 L 410,100" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="3" className="svg-flow-path" fill="none" />
            
            {/* 2. SENSOR PROBES */}
            {/* Temperature probe */}
            <path d="M 110,82 L 110,65 L 130,50" stroke="#38bdf8" strokeWidth="2" fill="none" />
            <circle cx="110" cy="85" r="3" fill="#38bdf8" />
            <text x="135" y="48" fill="#38bdf8" fontSize="10" fontWeight="bold">Temp Probe</text>

            {/* Differential Pressure taps */}
            {/* Inlet pressure tap */}
            <path d="M 130,118 L 130,140 L 175,185" stroke="#f97316" strokeWidth="2" strokeDasharray="3,3" fill="none" />
            <circle cx="130" cy="118" r="3" fill="#f97316" />
            {/* Outlet pressure tap */}
            <path d="M 290,118 L 290,145 L 225,185" stroke="#f97316" strokeWidth="2" strokeDasharray="3,3" fill="none" />
            <circle cx="290" cy="118" r="3" fill="#f97316" />
            
            <text x="250" y="160" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">DP SENSOR TAPS</text>

            {/* 3. VOYANT EDGE CONTROLLER */}
            <rect x="150" y="185" width="100" height="90" rx="8" fill="url(#boxGrad)" stroke="var(--accent-cyan)" strokeWidth="2" filter="url(#glow)" />
            <text x="200" y="210" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">VOYANT EDGE</text>
            <text x="200" y="222" fill="var(--accent-cyan)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">TELEMETRY RTU</text>
            
            {/* Controller indicator lights */}
            <circle cx="175" cy="250" r="4" className="svg-led-green" fill="#22c55e" />
            <circle cx="195" cy="250" r="4" className="svg-led-orange" fill="#f97316" />
            <circle cx="215" cy="250" r="4" fill="#64748b" />
            <circle cx="225" cy="250" r="2.5" fill="#64748b" />

            {/* Connecting lines from probes to Edge */}
            <path d="M 130,50 L 170,185" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" fill="none" />

            {/* 4. CLOUD COMPLIANCE PORTAL */}
            {/* Cloud Icon */}
            <g transform="translate(420, 180)">
              <rect x="0" y="0" width="130" height="85" rx="6" fill="#0b1329" stroke="#38bdf8" strokeWidth="1.5" />
              <path d="M 35,45 Q 35,30 50,30 Q 55,20 70,25 Q 85,20 90,32 Q 100,32 100,45 Q 100,55 90,55 L 35,55 Z" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" filter="url(#glow)" />
              <text x="65" y="72" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">VOYANT CLOUD</text>
            </g>

            {/* 5. WIRELESS TRANSFERS (MQTT) */}
            <g transform="translate(285, 210)">
              {/* Wireless Wave 1 */}
              <path d="M 10,0 A 30,30 0 0,1 40,30" className="svg-signal-wave" strokeWidth="2.5" fill="none" />
              {/* Wireless Wave 2 */}
              <path d="M 25,-10 A 45,45 0 0,1 70,35" className="svg-signal-wave" strokeWidth="2.5" fill="none" />
              {/* Wireless Wave 3 */}
              <path d="M 40,-20 A 60,60 0 0,1 100,40" className="svg-signal-wave" strokeWidth="2.5" fill="none" />
            </g>
            <text x="350" y="200" fill="var(--accent-cyan)" fontSize="9" fontFamily="var(--font-mono)">MQTT TELEMETRY</text>
          </svg>
        </div>

        {/* Text Details Side */}
        <div className="architecture-text fade-in-right">
          <span className="section-tag">Edge-to-SaaS Architecture</span>
          <h3>Engineered Close to the Metal</h3>
          <p>
            Voyant Systems integrates firmware loops, physical sensors, and cloud diagnostics directly. Our system continuously samples emission states and communicates them securely, eliminating manual compliance audits.
          </p>

          <ul className="architecture-list">
            <li className="architecture-item">
              <div className="architecture-bullet">01</div>
              <div className="architecture-item-text">
                <h4>Firmware & Edge Loops</h4>
                <p>On-device controllers sample backpressure and exhaust temperatures at sub-second intervals, buffering logs locally to prevent data gaps during connectivity drops.</p>
              </div>
            </li>
            <li className="architecture-item">
              <div className="architecture-bullet">02</div>
              <div className="architecture-item-text">
                <h4>Sensor Integration</h4>
                <p>Plug-and-play connections to thermocouple probes and differential pressure sensors with noise-filtering signal conditioning circuits.</p>
              </div>
            </li>
            <li className="architecture-item">
              <div className="architecture-bullet">03</div>
              <div className="architecture-item-text">
                <h4>Compliance SaaS Analytics</h4>
                <p>Secure MQTT broker connection aggregates telemetry streams, feeding the compliance reporting suite and triggering instant alerts if backpressure thresholds spike.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
