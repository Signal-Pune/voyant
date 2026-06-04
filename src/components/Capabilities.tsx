import { JsonTreeViewer } from './JsonTreeViewer';

export interface CapabilitiesProps {
  cloudSync: boolean;
  vibrationLoop: boolean;
  samplingRate: '250ms' | '500ms' | '1000ms';
  exhaustTemp: number;
  onToggleSync: () => void;
  onToggleVibration: () => void;
  onChangeSamplingRate: (rate: '250ms' | '500ms' | '1000ms') => void;
}

export const Capabilities = ({
  cloudSync,
  vibrationLoop,
  samplingRate,
  exhaustTemp,
  onToggleSync,
  onToggleVibration,
  onChangeSamplingRate,
}: CapabilitiesProps) => {
  return (
    <section className="section" id="capabilities-config" style={{ borderBottom: '1px solid var(--border-color)', padding: '8rem 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        {/* Core text information */}
        <div style={{ paddingRight: '2rem' }}>
          <span className="section-tag" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>INTEGRATION_SPECS</span>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', letterSpacing: '-0.02em', lineHeight: '1.1', marginBottom: '2rem' }}>
            Edge Telemetry Configurations
          </h2>
          <p className="section-desc" style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
            Each retrofit is managed through a lightweight local config definition. Configure gateway behavior, adjust physical logging frequencies, or update network sync routines directly.
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: '3rem 0 0 0', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <li style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', paddingTop: '0.2rem' }}>01</div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Network Synchronization</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>Toggle cloud synchronizations to route logs over MQTT or preserve local storage budgets on standalone industrial sites.</p>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', paddingTop: '0.2rem' }}>02</div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Variable Sampling Ticks</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>Adjust the edge-node sampling rates down to 250ms for fine-grained process diagnostics, or buffer logs at 1000ms to preserve bandwidth.</p>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', paddingTop: '0.2rem' }}>03</div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Live Configuration Hot-Reloads</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>Config updates hot-reload on-device without triggering controller reboots, maintaining uptime on critical generators.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Dynamic Config Editor Panel */}
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ display: 'block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }}></span>
              voyant-recd-config.json
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-color)' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-color)' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-color)' }}></div>
            </div>
          </div>

          <div style={{ padding: '1.5rem', background: 'var(--bg-console)', borderBottom: '1px solid var(--border-color)', minHeight: '200px' }}>
            <JsonTreeViewer
              data={{
                edgeNode: 'Voyant-RECD-Pune',
                samplingRate,
                protocols: ['ModbusRTU', 'MQTT'],
                controllers: {
                  dpLoop: vibrationLoop ? 'Active' : 'Standby',
                  exhaustTemp: `Normal (${exhaustTemp.toFixed(1)} C)`,
                },
                cloudSync,
              }}
            />
          </div>

          <div style={{ padding: '1.5rem', background: 'var(--bg-elevated)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1rem' }}>EDGE_NODE_CONTROLS</span>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={cloudSync}
                  onChange={onToggleSync}
                  style={{ cursor: 'pointer', accentColor: 'var(--accent)' }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-primary)' }}>Cloud Sync</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={vibrationLoop}
                  onChange={onToggleVibration}
                  style={{ cursor: 'pointer', accentColor: 'var(--accent)' }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-primary)' }}>Filter Loop</span>
              </label>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--border-color)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1rem' }}>GATEWAY_SAMPLING_RATE</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['250ms', '500ms', '1000ms'] as const).map((rate) => (
                  <button
                    key={rate}
                    onClick={() => onChangeSamplingRate(rate)}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      background: samplingRate === rate ? 'var(--text-primary)' : 'transparent',
                      color: samplingRate === rate ? 'var(--bg)' : 'var(--text-primary)',
                      border: `1px solid ${samplingRate === rate ? 'var(--text-primary)' : 'var(--border-color)'}`,
                      borderRadius: '2px',
                      cursor: 'pointer'
                    }}
                  >
                    {rate}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
