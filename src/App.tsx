import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AIAgentSimulator } from './components/AIAgentSimulator';
import type { ReActStep } from './components/AIAgentSimulator';
import { SystemArchitecture } from './components/SystemArchitecture';
import { Capabilities } from './components/Capabilities';
import { Footer } from './components/Footer';
import { ParticleCanvas } from './components/ParticleCanvas';
import { MouseSpotlight } from './components/MouseSpotlight';
import { ScrollProgress } from './components/ScrollProgress';
import { MagneticButton } from './components/MagneticButton';
import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { MarqueeStrip } from './components/MarqueeStrip';
import { BackToTop } from './components/BackToTop';
import { SectionDivider } from './components/SectionDivider';
import { AnimatedGridBackground } from './components/AnimatedGridBackground';
import { SpotlightCard } from './components/SpotlightCard';
import { Activity, Shield, Mail, Wrench, Cpu, Cloud, Gauge, FileCheck } from 'lucide-react';

interface TelemetryLog {
  timestamp: string;
  type: 'SYSTEM' | 'DATA';
  message: string;
}

function App() {
  const [loaded, setLoaded] = useState(false);

  // --- TELEMETRY STATE ---
  const [pmCapture, setPmCapture] = useState(84.5);
  const [exhaustTemp, setExhaustTemp] = useState(345.2);
  const [diffPressure, setDiffPressure] = useState(4.2);
  const [cpcbStatus, setCpcbStatus] = useState<'CPCB OK' | 'BYPASS' | 'WARNING' | 'CRITICAL'>('CPCB OK');
  const [recdStatus, setRecdStatus] = useState<'Active' | 'Regenerating' | 'Bypassed' | 'SensorError'>('Active');

  // --- CONFIG EDITOR STATE ---
  const [cloudSync, setCloudSync] = useState(true);
  const [vibrationLoop, setVibrationLoop] = useState(true);
  const [samplingRate, setSamplingRate] = useState<'250ms' | '500ms' | '1000ms'>('1000ms');

  // --- FAULT INJECTOR STATE ---
  const [activeFault, setActiveFault] = useState<'none' | 'clogging' | 'dropout'>('none');
  const [agentState, setAgentState] = useState<'Idle' | 'Analyzing' | 'Executing Regeneration' | 'Diagnosing Error' | 'Re-routing' | 'Recovering'>('Idle');
  
  // --- RECONSTRUCT LOGS & REACT STEPS ---
  const getTimestamp = () => {
    return new Date().toLocaleTimeString();
  };

  const [logs, setLogs] = useState<TelemetryLog[]>([
    { timestamp: getTimestamp(), type: 'SYSTEM', message: 'Starting edge gateway.' },
    { timestamp: getTimestamp(), type: 'SYSTEM', message: 'Local Modbus PLC connected.' },
    { timestamp: getTimestamp(), type: 'DATA', message: 'Sample received: PM=84.5% temp=345.2C DP=4.2kPa' },
    { timestamp: getTimestamp(), type: 'DATA', message: 'Dashboard updated from Node-RECD-02.' },
  ]);

  const [reactSteps, setReactSteps] = useState<ReActStep[]>([
    { type: 'thought', content: 'Compliance monitor active. Verification cycle running.' },
    { type: 'action', content: 'Sample exhaust DP backpressure and PM capture values from registers.' },
    { type: 'observation', content: 'Metrics: PM Capture = 84.5%, DP = 4.2 kPa, Temp = 345.2°C. Compliance status: CPCB OK.' },
  ]);

  const [episodicMemory, setEpisodicMemory] = useState<string[]>([
    'Edge gateway initialized on Node-RECD-02',
    'Sensors linked: Thermocouple, Differential Pressure tap',
    'CPCB live audit link established over MQTT',
  ]);

  const semanticMemory = [
    '1. PM Capture Rate must exceed 70.0% to satisfy CPCB norms.',
    '2. Exhaust gas operating backpressure (DP) threshold is 6.0 kPa.',
    '3. Thermal catalyst range: 250 - 450 °C (heating cycle operates at 480 - 500 °C).',
    '4. In case of primary sensor failure, query Redundant Channel B (Pin 12).',
  ];

  const getWorkingMemory = () => {
    if (activeFault === 'clogging') {
      return 'Clear particulate filter clogging and restore PM capture rate';
    }
    if (activeFault === 'dropout') {
      return 'Resolve primary temperature sensor dropout anomaly';
    }
    return 'Monitor Node-RECD-02 compliance state';
  };

  // Helper to add logs safely
  const appendLog = (type: 'SYSTEM' | 'DATA', message: string) => {
    setLogs((prev) => {
      const next = [...prev, { timestamp: getTimestamp(), type, message }];
      if (next.length > 30) {
        return next.slice(next.length - 30);
      }
      return next;
    });
  };

  // Helper to add episodic memories safely
  const appendEpisodic = (event: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setEpisodicMemory((prev) => {
      const next = [`${time} - ${event}`, ...prev];
      if (next.length > 5) {
        return next.slice(0, 5);
      }
      return next;
    });
  };

  // --- TELEMETRY SIMULATION LOOP ---
  useEffect(() => {
    let intervalMs = 1000;
    if (samplingRate === '250ms') intervalMs = 250;
    else if (samplingRate === '500ms') intervalMs = 500;

    const timer = setInterval(() => {
      // 1. Check standby state (Filter Loop Active is false)
      if (!vibrationLoop) {
        setPmCapture((prev) => Math.max(0, prev - 8.0));
        setExhaustTemp((prev) => Math.max(45.0, prev - 15.0));
        setDiffPressure((prev) => Math.max(0.1, prev - 0.4));
        setRecdStatus('Bypassed');
        setCpcbStatus('BYPASS');
        return;
      }

      // 2. Standard normal operations (no active fault)
      if (activeFault === 'none' && recdStatus !== 'Regenerating' && recdStatus !== 'SensorError') {
        setPmCapture((prev) => Math.max(81.0, Math.min(88.0, prev + (Math.random() - 0.5) * 0.4)));
        setExhaustTemp((prev) => Math.max(330.0, Math.min(360.0, prev + (Math.random() - 0.5) * 3)));
        setDiffPressure((prev) => Math.max(3.8, Math.min(4.8, prev + (Math.random() - 0.5) * 0.15)));
        setRecdStatus('Active');
        setCpcbStatus('CPCB OK');

        // Occasional standard telemetry log
        if (Math.random() > 0.8) {
          const rand = Math.floor(Math.random() * 10000);
          appendLog('DATA', `Node telemetry sync successful. batch=TX${rand}`);
        }
      }

      // 3. Simulated Clogging behaviour
      if (activeFault === 'clogging') {
        if (agentState === 'Analyzing') {
          // DP continues rising towards fault state before agent activates
          setDiffPressure((prev) => Math.min(7.2, prev + 0.6));
          setPmCapture((prev) => Math.max(68.0, prev - 2.5));
        } else if (agentState === 'Executing Regeneration') {
          // Temperature jumps to regen, pressure begins clearing
          setExhaustTemp((prev) => Math.min(490.0, prev + (500 - prev) * 0.3));
          setDiffPressure((prev) => Math.max(3.7, prev - 0.8));
          setPmCapture((prev) => Math.min(85.5, prev + 2.0));
        } else if (agentState === 'Recovering') {
          // Cooling down to base
          setExhaustTemp((prev) => Math.max(345.0, prev - 25.0));
          setDiffPressure((prev) => Math.max(3.8, Math.min(4.5, prev + (Math.random() - 0.5) * 0.1)));
          setPmCapture((prev) => Math.max(83.0, Math.min(87.0, prev + (Math.random() - 0.5) * 0.2)));
        }
      }

      // 4. Simulated sensor dropout behavior
      if (activeFault === 'dropout') {
        if (agentState === 'Diagnosing Error') {
          setExhaustTemp(0.0);
          setRecdStatus('SensorError');
          setCpcbStatus('WARNING');
        } else {
          // Re-routed state: Oscillates around Pin 12 redundant reading (~343°C)
          setExhaustTemp((prev) => Math.max(338.0, Math.min(348.0, prev + (Math.random() - 0.5) * 1.5)));
          setRecdStatus('Active');
          setCpcbStatus('CPCB OK');
        }
      }

    }, intervalMs);

    return () => clearInterval(timer);
  }, [vibrationLoop, activeFault, agentState, recdStatus, samplingRate]);

  // --- FAULT INJECTORS & AGENT STEPS TIMING ---
  const injectCloggingFault = () => {
    setActiveFault('clogging');
    setAgentState('Analyzing');
    appendLog('SYSTEM', 'WARNING: High backpressure delta detected across DPF taps.');
    
    setReactSteps([
      { type: 'thought', content: 'PM capture rate dropped. DP backpressure is climbing rapidly (currently 6.5 kPa). Soot loading exceeds limit.' },
      { type: 'action', content: 'Query internal parameters and diagnose DPF status.' },
      { type: 'observation', content: 'DP taps confirm soot loading high. Verification status: CPCB WARNING.' }
    ]);

    // Start automated mitigation loop
    setTimeout(() => {
      setAgentState('Executing Regeneration');
      setRecdStatus('Regenerating');
      appendLog('SYSTEM', 'AI Agent: Activating filter electrical regeneration loop.');
      setReactSteps((prev) => [
        ...prev,
        { type: 'thought', content: 'Initiating thermal soot burn-off cycle. Activating electrical heating relays.' },
        { type: 'action', content: 'Set register command HEATER_ON.' },
        { type: 'observation', content: 'Relay activated. Core catalyst heating up. Temp rising to 490°C.' }
      ]);
      appendEpisodic('Regeneration heater relay HEATER_ON executed');
    }, 4000);

    setTimeout(() => {
      setAgentState('Recovering');
      appendLog('SYSTEM', 'AI Agent: Backpressure normalized. Initiating heater shutdown.');
      setReactSteps((prev) => [
        ...prev,
        { type: 'thought', content: 'Filter backpressure DP has dropped to 3.8 kPa. Particulate blockages cleared.' },
        { type: 'action', content: 'Set register command HEATER_OFF to start cooling cycle.' },
        { type: 'observation', content: 'Relay deactivated. Gas temperature stabilizing back to base operating level.' }
      ]);
    }, 9000);

    setTimeout(() => {
      setAgentState('Idle');
      setActiveFault('none');
      setRecdStatus('Active');
      setCpcbStatus('CPCB OK');
      appendLog('SYSTEM', 'Compliance status restored to CPCB OK.');
      appendEpisodic('Catalytic DPF soot load cleared');
      setReactSteps((prev) => [
        ...prev,
        { type: 'thought', content: 'Temperature cooled to 345°C. DP stable at 4.0 kPa. Recovery cycle successful.' },
        { type: 'action', content: 'Resume standard passive filtration monitoring.' },
        { type: 'observation', content: 'Monitoring active. System compliance: CPCB OK.' }
      ]);
    }, 14000);
  };

  const injectSensorDropout = () => {
    setActiveFault('dropout');
    setAgentState('Diagnosing Error');
    appendLog('SYSTEM', 'ERROR: Core thermocouple primary channel reported 0.0°C.');
    
    setReactSteps([
      { type: 'thought', content: 'Primary exhaust temperature reading is 0.0°C. Reading is out-of-bounds (expected >150°C). Suspecting sensor disconnect.' },
      { type: 'action', content: 'Scan secondary input lines. Query Pin 12 (exhaust redundant thermocouple).' },
      { type: 'observation', content: 'Redundant thermocouple Channel B is ONLINE. Temp: 343.5°C.' }
    ]);

    // Start automated failover
    setTimeout(() => {
      setAgentState('Re-routing');
      appendLog('SYSTEM', 'AI Agent: Re-routing variable telemetry mapping to redundant Channel B.');
      setReactSteps((prev) => [
        ...prev,
        { type: 'thought', content: 'Channel B reports valid telemetry. Core variable mapping re-routed to Pin 12.' },
        { type: 'action', content: 'Rebind core temperature variable to redundant register. Dispatch repair ticket.' },
        { type: 'observation', content: 'Mapping re-routed. Temperature display restored to 343.5°C. Maintenance alert registered.' }
      ]);
      appendEpisodic('Primary Temp sensor failed. Auto-failover to Pin 12 completed');
    }, 4000);

    setTimeout(() => {
      setAgentState('Idle');
      setExhaustTemp(343.5);
      setRecdStatus('Active');
      setCpcbStatus('CPCB OK');
      setReactSteps((prev) => [
        ...prev,
        { type: 'thought', content: 'Core telemetry operational via Channel B. Site compliance safe. Awaiting physical repair.' },
        { type: 'action', content: 'Maintain redundant telemetry variables and run verification diagnostics.' },
        { type: 'observation', content: 'Redundant input normal. System compliance status: CPCB OK.' }
      ]);
    }, 8000);
  };

  const clearActiveFault = () => {
    // Instantly reset parameters to normal
    setActiveFault('none');
    setAgentState('Idle');
    setRecdStatus('Active');
    setPmCapture(84.5);
    setExhaustTemp(345.2);
    setDiffPressure(4.2);
    setCpcbStatus('CPCB OK');
    appendLog('SYSTEM', 'Active simulation faults cleared. Telemetry reset.');
    setReactSteps([
      { type: 'thought', content: 'Compliance monitor active. Verification cycle running.' },
      { type: 'action', content: 'Sample exhaust DP backpressure and PM capture values from registers.' },
      { type: 'observation', content: 'Metrics: PM Capture = 84.5%, DP = 4.2 kPa, Temp = 345.2°C. Compliance status: CPCB OK.' },
    ]);
  };

  // --- DYNAMIC CONFIG CLICK ACTIONS ---
  const handleToggleSync = () => {
    const next = !cloudSync;
    setCloudSync(next);
    appendLog('SYSTEM', `Cloud synchronization state updated to: ${next ? 'ENABLED' : 'DISABLED'}`);
  };

  const handleToggleVibration = () => {
    const next = !vibrationLoop;
    setVibrationLoop(next);
    appendLog('SYSTEM', `Filter monitoring loop state updated: ${next ? 'ACTIVE' : 'STANDBY'}`);
  };

  const handleChangeSamplingRate = (rate: '250ms' | '500ms' | '1000ms') => {
    setSamplingRate(rate);
    appendLog('SYSTEM', `Edge gateway sampling rate set to ${rate}`);
  };

  // --- REGISTER GSAP PLUGIN ---
  gsap.registerPlugin(ScrollTrigger);

  // --- ENHANCED SCROLL REVEALS ---
  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.reveal-item, .fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
      revealObserver.observe(el);
    });

    return () => revealObserver.disconnect();
  }, []);

  // --- GSAP SECTION HEADER REVEALS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('.section-header').forEach((header) => {
        gsap.from(header, {
          y: 50,
          opacity: 0,
          scale: 0.96,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });

      document.querySelectorAll('.value-card').forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // --- MOUSE TRACKING FOR CARD GLOWS & SHOWCASE SPOTLIGHT ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.querySelectorAll<HTMLElement>('.value-card, .agent-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
      document.querySelectorAll<HTMLElement>('.showcase-img-container').forEach(container => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        container.style.setProperty('--spotlight-x', `${x}%`);
        container.style.setProperty('--spotlight-y', `${y}%`);
      });
      document.querySelectorAll<HTMLElement>('.bento-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <CustomCursor />
      <div className="vignette-overlay" aria-hidden="true"></div>
      <AnimatedGridBackground />
      <div className="ambient-glow-container" aria-hidden="true">
        <div className="ambient-orb ambient-orb-1"></div>
        <div className="ambient-orb ambient-orb-2"></div>
        <div className="ambient-orb ambient-orb-3"></div>
      </div>
      <ParticleCanvas />
      <MouseSpotlight />
      <ScrollProgress />
      <Header />

      <SmoothScroll>
      <main>
        {/* HERO SECTION WITH TELEMETRY DASHBOARD */}
        <Hero
          pmCapture={pmCapture}
          exhaustTemp={exhaustTemp}
          diffPressure={diffPressure}
          cpcbStatus={cpcbStatus}
          recdStatus={recdStatus}
          logs={logs}
        />

        <MarqueeStrip />

        {/* STATS SECTION */}
        <section className="stats" id="stats-section">
          <div className="container stats-grid">
            <div className="stat-item fade-in-up stagger-1" id="stat-latency">
              <div className="stat-number">01</div>
              <div className="stat-label">Floor Audit &amp; Design</div>
            </div>
            <div className="stat-item fade-in-up stagger-2" id="stat-uptime">
              <div className="stat-number">02</div>
              <div className="stat-label">RECD Placement</div>
            </div>
            <div className="stat-item fade-in-up stagger-3" id="stat-deployments">
              <div className="stat-number">03</div>
              <div className="stat-label">Sensors &amp; Edge wiring</div>
            </div>
            <div className="stat-item fade-in-up stagger-4" id="stat-savings">
              <div className="stat-number">04</div>
              <div className="stat-label">Live Cloud Reporting</div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* SOLUTIONS SECTION - Bento Grid */}
        <section className="section" id="solutions">
          <div className="container">
            <div className="section-header fade-in-up">
              <span className="section-tag">Retrofit Solutions</span>
              <h2 className="section-title">
                Practical CPCB compliance for diesel generators
              </h2>
              <p className="section-desc">
                Voyant Systems installs plug-and-play retrofit RECD filters and edge gateway controllers that help you meet environmental norms without replacing expensive generator assets.
              </p>
            </div>

            <div className="bento-grid">
              <SpotlightCard className="bento-card bento-wide" size={350}>
                <div className="bento-card-content">
                  <div className="bento-icon-wrapper"><Wrench size={22} /></div>
                  <h3 className="bento-title">Plug-and-Play RECDs</h3>
                  <p className="bento-desc">Easily retrofit legacy diesel generator (DG) sets with CPCB-approved emission control filters to capture particulate matter without degrading engine efficiency.</p>
                </div>
                <div className="bento-card-border" />
              </SpotlightCard>

              <SpotlightCard className="bento-card" size={250}>
                <div className="bento-card-content">
                  <div className="bento-icon-wrapper"><Activity size={22} /></div>
                  <h3 className="bento-title">AI SaaS Portal</h3>
                  <p className="bento-desc">Live edge telemetry dashboards with automated compliance certificates.</p>
                </div>
                <div className="bento-card-border" />
              </SpotlightCard>

              <SpotlightCard className="bento-card" size={250}>
                <div className="bento-card-content">
                  <div className="bento-icon-wrapper"><Shield size={22} /></div>
                  <h3 className="bento-title">Edge Guardrails</h3>
                  <p className="bento-desc">On-device AI diagnostics with autonomous thermal regenerations.</p>
                </div>
                <div className="bento-card-border" />
              </SpotlightCard>

              <SpotlightCard className="bento-card" size={250}>
                <div className="bento-card-content">
                  <div className="bento-icon-wrapper"><Cpu size={22} /></div>
                  <h3 className="bento-title">Edge Computing</h3>
                  <p className="bento-desc">Sub-second interval sampling with local buffering for data gaps.</p>
                </div>
                <div className="bento-card-border" />
              </SpotlightCard>

              <SpotlightCard className="bento-card bento-wide" size={350}>
                <div className="bento-card-content">
                  <div className="bento-icon-wrapper"><Cloud size={22} /></div>
                  <h3 className="bento-title">Cloud Compliance Analytics</h3>
                  <p className="bento-desc">Secure MQTT broker aggregates telemetry streams, feeding compliance reporting with instant backpressure spike alerts and automated CPCB audit trails.</p>
                </div>
                <div className="bento-card-border" />
              </SpotlightCard>

              <SpotlightCard className="bento-card" size={250}>
                <div className="bento-card-content">
                  <div className="bento-icon-wrapper"><Gauge size={22} /></div>
                  <h3 className="bento-title">Live Monitoring</h3>
                  <p className="bento-desc">Real-time PM capture, exhaust temp, and differential pressure.</p>
                </div>
                <div className="bento-card-border" />
              </SpotlightCard>

              <SpotlightCard className="bento-card" size={250}>
                <div className="bento-card-content">
                  <div className="bento-icon-wrapper"><FileCheck size={22} /></div>
                  <h3 className="bento-title">Auto Certificates</h3>
                  <p className="bento-desc">Generate compliance certificates automatically from live data.</p>
                </div>
                <div className="bento-card-border" />
              </SpotlightCard>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* AI COMPLIANCE AGENT SIMULATOR SHOWCASE */}
        <AIAgentSimulator
          agentState={agentState}
          reactSteps={reactSteps}
          workingMemory={getWorkingMemory()}
          episodicMemory={episodicMemory}
          semanticMemory={semanticMemory}
          activeFault={activeFault}
          onInjectFault={activeFault === 'clogging' || activeFault === 'dropout' ? () => {} : (f) => f === 'clogging' ? injectCloggingFault() : injectSensorDropout()}
          onClearFault={clearActiveFault}
        />

        {/* SYSTEM ARCHITECTURE SECTION (SVG ILLUSTRATION) */}
        <SystemArchitecture />

        {/* EDGE PARAMETERS & CONFIG EDITOR SECTION */}
        <Capabilities
          cloudSync={cloudSync}
          vibrationLoop={vibrationLoop}
          samplingRate={samplingRate}
          exhaustTemp={exhaustTemp}
          onToggleSync={handleToggleSync}
          onToggleVibration={handleToggleVibration}
          onChangeSamplingRate={handleChangeSamplingRate}
        />

        <SectionDivider />

        {/* EXHIBITION SHOWCASE & LOCAL EXPERTISE SECTION */}
        <section className="section" id="why-voyant">
          <div className="container showcase-grid">
            <div className="showcase-img-container fade-in-left" id="showcase-visual">
              <img src="/voyant_expo_booth.png" alt="Voyant Systems Display Setup TLC Expo 2026 Chinchwad Pune" className="showcase-img" />
              <div className="showcase-overlay">
                <span className="showcase-tag">Exhibition Showcase</span>
                <div className="showcase-location">TLC Expo 2026, Auto Cluster Exhibition Centre, Chinchwad</div>
              </div>
            </div>

            <div className="showcase-text fade-in-right">
              <span className="section-tag">Pune-Chinchwad Engineering</span>
              <h2 className="section-title">
                Designed for industrial manufacturing hubs
              </h2>

              <blockquote className="showcase-quote">
                Proudly displayed at TLC Expo 2026 and COEP Pune Startup Fest &apos;26.
              </blockquote>

              <p>
                Voyant Systems develops physical emission telemetry filters in Pune, India, serving the dense auto-manufacturing belts of Chinchwad, Bhosari, and Talegaon.
              </p>
              <p>
                Our engineering covers the full stack: from mechanical pipe routing and thermal sensor placements to embedded edge firmware design and on-device compliance routines.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT / CTA SECTION */}
        <section className="cta" id="contact">
          <div className="container">
            <SpotlightCard className="cta-box fade-in-up" id="cta-card" size={500}>
              <div className="cta-content">
                <h2 className="cta-title">Need a CPCB emission retrofit setup?</h2>
                <p className="cta-subtitle">
                  Provide your generator model, rating, and site specifications. Our Pune engineering team will map a custom plug-and-play compliance approach.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                  <MagneticButton href="mailto:contact@voyantsystems.com" className="btn btn-primary btn-shine" id="btn-cta-connect" style={{ fontSize: '1.05rem', padding: '0.9rem 2.2rem' }}>
                    Contact Voyant Systems
                    <Mail size={16} style={{ marginLeft: '0.25rem' }} />
                  </MagneticButton>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent-cyan)', letterSpacing: '0.05em' }}>
                    ROC - PUNE, MH / ESTABLISHED 2023
                  </span>
                </div>
              </div>
              <div className="bento-card-border" />
            </SpotlightCard>
          </div>
        </section>
      </main>

      <Footer />
      </SmoothScroll>

      <BackToTop />
    </>
  );
}

export default App;
