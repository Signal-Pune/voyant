import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [reactSteps]);

  const getBadgeColor = (state: string) => {
    switch (state) {
      case 'Idle':
        return 'var(--text-muted)';
      case 'Analyzing':
      case 'Recovering':
        return 'var(--accent)';
      case 'Executing Regeneration':
        return '#f97316';
      case 'Diagnosing Error':
      case 'Re-routing':
        return '#ff3366';
      default:
        return 'var(--text-muted)';
    }
  };

  return (
    <section className="section" id="ai-agent-simulator" style={{ padding: '8rem 0', background: 'var(--bg)' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'left', marginLeft: 0 }}>
          <span className="section-tag" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>AGENT_SIMULATION</span>
          <h2 className="section-title" style={{ fontWeight: 400 }}>
            Live Autonomy Loop
          </h2>
          <p className="section-desc" style={{ maxWidth: '600px' }}>
            Observe the on-device AI executing a rigorous ReAct loop (Thought &rarr; Action &rarr; Observation) to mitigate injected hardware faults dynamically.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem' }}>
          
          {/* Strict Terminal Window */}
          <div style={{ background: 'var(--bg-console)', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-color)', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Brain size={14} style={{ color: 'var(--accent)' }} />
                AGENT_CORE v1.2.0
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: getBadgeColor(agentState), display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'block', width: '6px', height: '6px', borderRadius: '50%', background: getBadgeColor(agentState) }}></span>
                STATE: {agentState.toUpperCase()}
              </div>
            </div>

            <div style={{ padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-primary)', flex: 1, overflowY: 'auto', maxHeight: '400px' }}>
              {reactSteps.map((step, idx) => (
                <div key={idx} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                  <span style={{ 
                    color: step.type === 'thought' ? 'var(--text-muted)' : step.type === 'action' ? 'var(--accent)' : 'var(--accent-secondary)',
                    marginRight: '0.5rem',
                    fontWeight: 600
                  }}>
                    [{step.type.toUpperCase()}]
                  </span>
                  <span style={{ color: step.type === 'thought' ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                    {step.content}
                  </span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>

          {/* Memory & Injector Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Layers size={14} /> MEMORY_HIERARCHY
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>WORKING_MEMORY</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--accent)' }}>{workingMemory}</div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>SEMANTIC_MEMORY</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {semanticMemory.map((rule, idx) => (
                    <div key={idx} style={{ paddingBottom: '0.2rem', marginBottom: '0.2rem' }}>&bull; {rule}</div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>EPISODIC_LOGS</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {episodicMemory.map((evt, i) => (
                    <div key={i} style={{ paddingBottom: '0.4rem', borderBottom: i < episodicMemory.length -1 ? '1px solid rgba(255,255,255,0.05)' : 'none', marginBottom: '0.4rem' }}>&gt; {evt}</div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-elevated)', border: `1px solid ${activeFault !== 'none' ? '#ff3366' : 'var(--border-color)'}`, borderRadius: '4px', padding: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: activeFault !== 'none' ? '#ff3366' : 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertOctagon size={14} /> FAULT_INJECTION_UNIT
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={() => activeFault === 'clogging' ? onClearFault() : onInjectFault('clogging')}
                  disabled={activeFault === 'dropout'}
                  style={{ 
                    background: activeFault === 'clogging' ? 'var(--accent-dim)' : 'transparent',
                    border: `1px solid ${activeFault === 'clogging' ? 'var(--accent)' : 'var(--border-color)'}`,
                    color: activeFault === 'clogging' ? 'var(--accent)' : 'var(--text-primary)',
                    padding: '0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', cursor: activeFault === 'dropout' ? 'not-allowed' : 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '4px'
                  }}
                >
                  [ INJECT DPF CLOG ] <RefreshCw size={14} className={activeFault === 'clogging' ? 'animate-spin' : ''} />
                </button>

                <button
                  onClick={() => activeFault === 'dropout' ? onClearFault() : onInjectFault('dropout')}
                  disabled={activeFault === 'clogging'}
                  style={{ 
                    background: activeFault === 'dropout' ? 'rgba(255,51,102,0.1)' : 'transparent',
                    border: `1px solid ${activeFault === 'dropout' ? '#ff3366' : 'var(--border-color)'}`,
                    color: activeFault === 'dropout' ? '#ff3366' : 'var(--text-primary)',
                    padding: '0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', cursor: activeFault === 'clogging' ? 'not-allowed' : 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '4px'
                  }}
                >
                  [ DROP TEMP SENSOR ] <AlertOctagon size={14} />
                </button>

                {activeFault !== 'none' && (
                  <button
                    onClick={onClearFault}
                    style={{ background: 'var(--text-primary)', color: 'var(--bg)', border: 'none', padding: '0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '4px', marginTop: '0.5rem' }}
                  >
                    RESET_SYSTEM
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
