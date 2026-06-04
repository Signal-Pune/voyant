import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AIAgentSimulator } from './components/AIAgentSimulator';
import type { ReActStep } from './components/AIAgentSimulator';
import { SystemArchitecture } from './components/SystemArchitecture';
import { Capabilities } from './components/Capabilities';
import { Footer } from './components/Footer';
import { Activity, Shield, Mail, Wrench, Cpu, Cloud, Gauge, FileCheck, ArrowUpRight } from 'lucide-react';

interface TelemetryLog {
  timestamp: string;
  type: 'SYSTEM' | 'DATA';
  message: string;
}

function App() {
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

  const expoImgRef = useRef<HTMLImageElement>(null);

  // --- REGISTER GSAP PLUGIN ---
  gsap.registerPlugin(ScrollTrigger);

  // --- CONSOLIDATED DATA-REVEAL SYSTEM ---
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = 'true';
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // --- EXPO PHOTO PARALLAX ---
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !expoImgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(expoImgRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '#why-voyant',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <Header />

      <main id="main-content">
        {/* ── HERO ── */}
        <Hero
          pmCapture={pmCapture}
          exhaustTemp={exhaustTemp}
          diffPressure={diffPressure}
          cpcbStatus={cpcbStatus}
          recdStatus={recdStatus}
          logs={logs}
        />

        {/* ── OUTCOME NUMBERS STRIP ── */}
        <section className="outcomes-strip" id="stats-section" aria-label="Key outcomes">
          <div className="container outcomes-grid">
            {[
              { number: '84.5%', label: 'Average PM Capture Rate', tag: 'PM_EFFICIENCY' },
              { number: '4 hr', label: 'Typical on-site installation', tag: 'INSTALL_TIME' },
              { number: '24/7', label: 'Autonomous compliance monitoring', tag: 'UPTIME_COVERAGE' },
              { number: '100%', label: 'CPCB-certified filter media', tag: 'CERTIFICATION' },
            ].map((item, i) => (
              <div key={i} className="outcome-item" data-reveal style={{ transitionDelay: `${i * 0.08}s` }} id={`outcome-${i}`}>
                <div className="outcome-number">{item.number}</div>
                <div className="outcome-label">{item.label}</div>
                <div className="outcome-tag">{item.tag}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SOLUTIONS — EDITORIAL NUMBERED LIST ── */}
        <section className="section editorial-section" id="solutions">
          <div className="container">
            <div className="editorial-header" data-reveal>
              <span className="section-tag">RETROFIT_SOLUTIONS</span>
              <h2 className="editorial-title">
                Practical CPCB compliance<br />for diesel generator sets
              </h2>
            </div>

            <div className="editorial-list">
              {[
                {
                  num: '01',
                  tag: '[HARDWARE]',
                  title: 'Plug-and-Play RECD Filters',
                  desc: 'Certified emission control devices retrofit onto existing DG sets without engine modification. Captures >70% of particulate matter at all load conditions.',
                  icon: <Wrench size={16} />,
                },
                {
                  num: '02',
                  tag: '[FIRMWARE]',
                  title: 'Edge Gateway & On-Device AI',
                  desc: 'A ruggedised edge controller reads Modbus registers at 250ms intervals. The on-device AI agent autonomously detects anomalies and initiates thermal regeneration cycles.',
                  icon: <Cpu size={16} />,
                },
                {
                  num: '03',
                  tag: '[CLOUD]',
                  title: 'Cloud Compliance Analytics',
                  desc: 'Telemetry streams to a secure MQTT broker in real time. Compliance certificates are generated automatically — ready for CPCB audit without manual data entry.',
                  icon: <Cloud size={16} />,
                },
                {
                  num: '04',
                  tag: '[MONITORING]',
                  title: 'Live Dashboards & Auto-Certificates',
                  desc: 'The SaaS portal delivers live PM capture rates, exhaust temperatures, and differential pressure with instant spike alerts and exportable CPCB audit trails.',
                  icon: <Activity size={16} />,
                },
                {
                  num: '05',
                  tag: '[COMPLIANCE]',
                  title: 'Edge Guardrails & Failover',
                  desc: 'Redundant sensor channels and self-healing logic keep compliance data flowing even through hardware failures — auto-rerouting to backup channels and logging every event.',
                  icon: <Shield size={16} />,
                },
              ].map((item, i) => (
                <div key={i} className="editorial-list-item" data-reveal style={{ transitionDelay: `${i * 0.06}s` }}>
                  <div className="eli-num">{item.num}</div>
                  <div className="eli-body">
                    <h3 className="eli-title">{item.title}</h3>
                    <p className="eli-desc">{item.desc}</p>
                  </div>
                  <div className="eli-tag">{item.tag}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AI COMPLIANCE AGENT SIMULATOR ── */}
        <section className="agent-frame" id="agent-context">
          <div className="container">
            <div className="agent-frame-header" data-reveal>
              <span className="section-tag">AUTONOMOUS_INTELLIGENCE</span>
              <h2 className="editorial-title">
                What happens when your filter<br />clogs at 3am?
              </h2>
              <p className="agent-frame-desc">
                There's no technician on-site. The Voyant edge agent detects
                rising backpressure, initiates a thermal regeneration cycle,
                and logs the full recovery — before your CPCB audit trail is
                ever touched. Run the simulation below.
              </p>
            </div>
          </div>
        </section>

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

        {/* ── SYSTEM ARCHITECTURE ── */}
        <SystemArchitecture />

        {/* ── EDGE PARAMETERS & CONFIG ── */}
        <Capabilities
          cloudSync={cloudSync}
          vibrationLoop={vibrationLoop}
          samplingRate={samplingRate}
          exhaustTemp={exhaustTemp}
          onToggleSync={handleToggleSync}
          onToggleVibration={handleToggleVibration}
          onChangeSamplingRate={handleChangeSamplingRate}
        />

        {/* ── EXPO SHOWCASE — FULL BLEED ── */}
        <section className="expo-section" id="why-voyant">
          <div className="expo-image-col">
            <div className="expo-image-mask">
              <img
                ref={expoImgRef}
                src="/voyant_expo_booth.png"
                alt="Voyant Systems RECD display at TLC Expo 2026, Auto Cluster Exhibition Centre, Chinchwad, Pune"
                className="expo-img"
                width={1024}
                height={1024}
                loading="lazy"
              />
            </div>
            <div className="expo-badge">
              <span className="expo-badge-dot" />
              Exhibition Showcase
            </div>
          </div>

          <div className="expo-copy-col" data-reveal>
            <span className="section-tag">PUNE-CHINCHWAD ENGINEERING</span>
            <h2 className="expo-headline">
              Designed for India's industrial manufacturing hubs.
            </h2>
            <blockquote className="expo-quote">
              "Proudly displayed at TLC Expo 2026 and COEP Pune Startup Fest '26."
            </blockquote>
            <p className="expo-body">
              Voyant Systems develops physical emission telemetry filters in
              Pune, serving the dense auto-manufacturing belts of Chinchwad,
              Bhosari, and Talegaon.
            </p>
            <p className="expo-body">
              Our engineering covers the full stack: mechanical pipe routing,
              thermal sensor placement, embedded edge firmware, and on-device
              compliance routines.
            </p>
            <div className="expo-meta">
              <span>TLC Expo 2026</span>
              <span className="expo-meta-sep">·</span>
              <span>Auto Cluster Exhibition Centre, Chinchwad</span>
            </div>
          </div>
        </section>

        {/* ── CTA — CONTACT ── */}
        <section className="contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-left" data-reveal>
              <span className="section-tag">GET_IN_TOUCH</span>
              <h2 className="contact-headline">
                Running a DG set?<br />
                Let's check compliance.
              </h2>
              <p className="contact-body">
                Provide your generator model, rating, and site location. Our
                Pune engineering team will map a custom plug-and-play
                compliance approach — typically scoped within 48 hours.
              </p>
              <div className="contact-credentials">
                <div className="cred-item">
                  <span className="cred-label">CIN</span>
                  <span className="cred-value">U62013PN2023PTC225117</span>
                </div>
                <div className="cred-item">
                  <span className="cred-label">Registered</span>
                  <span className="cred-value">ROC-Pune, Maharashtra</span>
                </div>
                <div className="cred-item">
                  <span className="cred-label">Est.</span>
                  <span className="cred-value">2023</span>
                </div>
              </div>
            </div>

            <div className="contact-right" data-reveal style={{ transitionDelay: '0.15s' }}>
              <a
                href="mailto:contact@voyantsystems.com"
                className="contact-email-link"
                id="btn-cta-connect"
                aria-label="Email Voyant Systems"
              >
                <span className="contact-email-label">Write to us</span>
                <span className="contact-email-address">
                  contact@voyantsystems.com
                </span>
                <ArrowUpRight size={24} className="contact-email-icon" />
              </a>
              <div className="contact-icons-row">
                <div className="contact-icon-chip"><Gauge size={14} /> Live telemetry</div>
                <div className="contact-icon-chip"><FileCheck size={14} /> Auto certificates</div>
                <div className="contact-icon-chip"><Mail size={14} /> 48hr scoping</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;

