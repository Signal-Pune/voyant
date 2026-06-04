import React, { useEffect, useRef, useState } from 'react';
import { Brain, AlertOctagon, RefreshCw, Layers } from 'lucide-react';

export interface ReActStep {
  type: 'thought' | 'action' | 'observation';
  content: string;
}

export interface AIAgentSimulatorProps {
  agentState: 'Idle' | 'Analyzing' | 'Executing Regeneration' | 'Diagnosing Error' | 'Re-routing' | 'Recovering';
  reactSteps: ReActStep[];
  workingMemory: string;
  episodicMemory: string[];
  semanticMemory: string[];
  activeFault: 'none' | 'clogging' | 'dropout';
  onInjectFault: (fault: 'clogging' | 'dropout') => void;
  onClearFault: () => void;
}

export const AIAgentSimulator: React.FC<AIAgentSimulatorProps> = ({
  agentState,
  reactSteps,
  workingMemory,
  episodicMemory,
  semanticMemory,
  activeFault,
  onInjectFault,
  onClearFault,
}) => {
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const [flashClogging, setFlashClogging] = useState(false);
  const [flashDropout, setFlashDropout] = useState(false);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [reactSteps]);

  // Map state to CSS classes
  const getBadgeClass = (state: string) => {
    switch (state) {
      case 'Idle':
        return 'status-idle';
      case 'Analyzing':
      case 'Recovering':
        return 'status-active';
      case 'Executing Regeneration':
        return 'status-warning';
      case 'Diagnosing Error':
      case 'Re-routing':
        return 'status-danger';
      default:
        return 'status-idle';
    }
  };

  return (
    <section className="section" id="ai-agent-simulator" style={{ borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <div className="section-header fade-in-up">
          <span className="section-tag">Autonomous Edge Intelligence</span>
          <h2 className="section-title">
            Live AI Compliance Agent Simulator
          </h2>
          <p className="section-desc">
            Observe the on-device AI agent continuously auditing diesel exhaust backpressure and PM capture efficiency. When faults are injected, the agent automatically executes a ReAct reasoning loop (Thought &rarr; Action &rarr; Observation) to recover compliance.
          </p>
        </div>

        <div className="agent-simulator-grid fade-in-up stagger-2">
          {/* ReAct Console Box */}
          <div className="agent-console-box">
            <div className="agent-console-header">
              <div className="agent-console-title">
                <Brain size={16} className="text-accent-cyan" />
                VOYANT-RECD-AGENT-CORE v1.2.0
              </div>
              <div className={`agent-status-badge ${getBadgeClass(agentState)}`}>
                <span className="telemetry-live-dot" style={{
                  background: agentState === 'Idle' ? '#94a3b8' : agentState === 'Executing Regeneration' ? '#f97316' : agentState === 'Diagnosing Error' ? '#ff3366' : '#22c55e'
                }}></span>
                Agent: {agentState}
              </div>
            </div>

            <div className="agent-console-body">
              {reactSteps.map((step, idx) => (
                <div key={idx} className={`console-line ${step.type === 'thought' ? 'agent-thought' : step.type === 'action' ? 'agent-action' : 'agent-observation'}`}>
                  {step.type === 'thought' && (
                    <>
                      <span>[THOUGHT]</span> {step.content}
                    </>
                  )}
                  {step.type === 'action' && (
                    <>
                      <span>[ACTION]</span> {step.content}
                    </>
                  )}
                  {step.type === 'observation' && (
                    <>
                      <span>[OBSERVATION]</span> {step.content}
                    </>
                  )}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>

          {/* Sidebar / Memory Slots & Fault Toggles */}
          <div className="agent-simulator-sidebar">
            {/* Memory Board */}
            <div className="agent-card">
              <div className="agent-card-title">
                <Layers size={14} className="inline-icon" style={{ marginRight: '0.5rem', color: 'var(--accent-orange)' }} />
                Hierarchical Memory Layout
              </div>
              
              <div className="memory-slot">
                <span className="memory-label">Working Memory (Task Goal)</span>
                <div className="memory-value-box text-gradient-cyan">
                  {workingMemory}
                </div>
              </div>

              <div className="memory-slot">
                <span className="memory-label">Semantic Memory (Rules Engine)</span>
                <div className="memory-value-box">
                  <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.78rem' }}>
                    {semanticMemory.map((rule, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem' }}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="memory-slot">
                <span className="memory-label">Episodic Memory (Last Events)</span>
                <div className="memory-value-box" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  {episodicMemory.map((event, idx) => (
                    <div key={idx} style={{ borderBottom: idx < episodicMemory.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', padding: '0.2rem 0' }}>
                      &bull; {event}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fault Injector Panel */}
            <div className="agent-card" style={{ borderColor: activeFault !== 'none' ? 'var(--accent-red)' : 'var(--border-color)' }}>
              <div className="agent-card-title" style={{ color: activeFault !== 'none' ? 'var(--accent-red)' : 'var(--text-primary)' }}>
                <AlertOctagon size={14} className="inline-icon" style={{ marginRight: '0.5rem' }} />
                Fault Injection Panel
              </div>
              
              <div className="fault-btn-group">
                <button
                  className={`fault-btn ${activeFault === 'clogging' ? 'active' : ''} ${flashClogging ? 'flash' : ''}`}
                  onClick={() => {
                    if (activeFault === 'clogging') {
                      onClearFault();
                    } else {
                      setFlashClogging(true);
                      setTimeout(() => setFlashClogging(false), 300);
                      onInjectFault('clogging');
                    }
                  }}
                  disabled={activeFault === 'dropout'}
                >
                  <span>Inject Filter Clogging</span>
                  <RefreshCw size={14} className={activeFault === 'clogging' ? 'animate-spin' : ''} />
                </button>

                <button
                  className={`fault-btn ${activeFault === 'dropout' ? 'active' : ''} ${flashDropout ? 'flash' : ''}`}
                  onClick={() => {
                    if (activeFault === 'dropout') {
                      onClearFault();
                    } else {
                      setFlashDropout(true);
                      setTimeout(() => setFlashDropout(false), 300);
                      onInjectFault('dropout');
                    }
                  }}
                  disabled={activeFault === 'clogging'}
                >
                  <span>Simulate Sensor Dropout</span>
                  <AlertOctagon size={14} />
                </button>
                
                {activeFault !== 'none' && (
                  <button
                    className="btn btn-secondary"
                    onClick={onClearFault}
                    style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', marginTop: '0.5rem', borderColor: 'var(--text-muted)' }}
                  >
                    Clear Active Fault & Reset Agent
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
