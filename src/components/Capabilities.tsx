import React from 'react';
import { TiltCard } from './TiltCard';
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

export const Capabilities: React.FC<CapabilitiesProps> = ({
  cloudSync,
  vibrationLoop,
  samplingRate,
  exhaustTemp,
  onToggleSync,
  onToggleVibration,
  onChangeSamplingRate,
}) => {
  return (
    <section className="section" id="capabilities-config" style={{ borderBottom: '1px solid var(--border-color)' }}>
      <div className="container capabilities-grid">
        {/* Core text information */}
        <div className="capabilities-text fade-in-left">
          <span className="section-tag">Integration Specs</span>
          <h2 className="section-title">Edge Telemetry Configurations</h2>
          <p className="section-desc">
            Each retrofit is managed through a lightweight local config definition. Configure gateway behavior, adjust physical logging frequencies, or update network sync routines directly.
          </p>

          <ul className="cap-list">
            <li className="cap-item fade-in-up stagger-1">
              <div className="cap-indicator">01</div>
              <div className="cap-content">
                <h4>Network Synchronization</h4>
                <p>Toggle cloud synchronizations to route logs over MQTT or preserve local storage budgets on standalone industrial sites.</p>
              </div>
            </li>
            <li className="cap-item fade-in-up stagger-2">
              <div className="cap-indicator">02</div>
              <div className="cap-content">
                <h4>Variable Sampling Ticks</h4>
                <p>Adjust the edge-node sampling rates down to 250ms for fine-grained process diagnostics, or buffer logs at 1000ms to preserve bandwidth.</p>
              </div>
            </li>
            <li className="cap-item fade-in-up stagger-3">
              <div className="cap-indicator">03</div>
              <div className="cap-content">
                <h4>Live Configuration Hot-Reloads</h4>
                <p>Config updates hot-reload on-device without triggering controller reboots, maintaining uptime on critical generators.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Dynamic Config Editor Panel */}
        <TiltCard className="config-editor fade-in-right" id="config-interactive-card">
          <div className="config-header">
            <div className="config-file-name">
              <span className="config-dot"></span>
              voyant-recd-config.json
            </div>
            <div className="config-actions">
              <div className="config-window-dot"></div>
              <div className="config-window-dot"></div>
              <div className="config-window-dot"></div>
            </div>
          </div>

          <div className="config-body">
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

          <div className="config-control-panel">
            <span className="config-label-text">Edge Node Controls</span>
            <div className="config-toggles">
              <label className="config-toggle-item" id="label-toggle-sync">
                <input
                  type="checkbox"
                  checked={cloudSync}
                  onChange={onToggleSync}
                  className="toggle-input"
                />
                <span className="toggle-button"></span>
                <span className="toggle-label">Cloud Sync</span>
              </label>

              <label className="config-toggle-item" id="label-toggle-vibration">
                <input
                  type="checkbox"
                  checked={vibrationLoop}
                  onChange={onToggleVibration}
                  className="toggle-input"
                />
                <span className="toggle-button"></span>
                <span className="toggle-label">Filter Loop Active</span>
              </label>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <span className="config-label-text">Gateway Sampling Rate</span>
              <div className="config-selector-group">
                {(['250ms', '500ms', '1000ms'] as const).map((rate) => (
                  <button
                    key={rate}
                    className={`config-selector-btn ${samplingRate === rate ? 'active' : ''}`}
                    onClick={() => onChangeSamplingRate(rate)}
                  >
                    {rate}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
};
