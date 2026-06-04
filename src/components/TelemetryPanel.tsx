import React, { useEffect, useRef } from 'react';
import { CheckCircle2, Cpu, Thermometer, Activity, Zap, AlertTriangle } from 'lucide-react';
import { CircularProgress } from './CircularProgress';

export interface TelemetryProps {
  pmCapture: number;
  exhaustTemp: number;
  diffPressure: number;
  cpcbStatus: 'CPCB OK' | 'BYPASS' | 'WARNING' | 'CRITICAL';
  recdStatus: 'Active' | 'Regenerating' | 'Bypassed' | 'SensorError';
  logs: Array<{ timestamp: string; type: 'SYSTEM' | 'DATA'; message: string }>;
  isCompact?: boolean;
}

export const TelemetryPanel: React.FC<TelemetryProps> = ({
  pmCapture,
  exhaustTemp,
  diffPressure,
  cpcbStatus,
  recdStatus,
  logs,
  isCompact = false,
}) => {
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  // Compute fill widths
  // PM Capture scale between 70% and 95%
  const pmWidth = Math.min(100, Math.max(0, ((pmCapture - 70) / (95 - 70)) * 100));
  // Temp scale between 40 and 400 deg C (or higher for regen)
  const maxTempScale = recdStatus === 'Regenerating' ? 550 : 400;
  const tempWidth = Math.min(100, Math.max(0, ((exhaustTemp - 40) / (maxTempScale - 40)) * 100));
  // DP scale between 0 and 8 kPa
  const dpWidth = Math.min(100, Math.max(0, (diffPressure / 8) * 100));
  // Compliance status fill width
  const complianceWidth = cpcbStatus === 'CPCB OK' ? 100 : cpcbStatus === 'WARNING' ? 50 : 25;

  const showFailover = cpcbStatus === 'WARNING' || cpcbStatus === 'CRITICAL';

  return (
    <div
      className={`telemetry-card ${isCompact ? 'compact-telemetry' : ''}`}
      id={isCompact ? 'telemetry-dashboard-compact' : 'telemetry-dashboard'}
    >
      {/* Mobbin-inspired floating warning banner */}
      {showFailover && (
        <div className="telemetry-alert-banner">
          <AlertTriangle size={14} style={{ flexShrink: 0 }} />
          <div>
            <strong>SENSOR FAILOVER TO PIN 12 ACTIVE</strong>
            <span>Primary thermocouple open-circuit code ERR-TEMP-01. Re-routed to redundant channel.</span>
          </div>
        </div>
      )}

      <div className="telemetry-header">
        <div className="telemetry-title">
          <span className="telemetry-live-dot"></span>
          <Zap size={14} style={{ color: 'var(--accent-cyan)', marginRight: '0.35rem' }} />
          RECD Live Telemetry
        </div>
        <div className="node-selector" id="telemetry-node-id">
          Node-RECD-02 (Pune-Chinchwad)
        </div>
      </div>

      <div className="telemetry-grid">
        {/* Metric 1: PM Capture Rate */}
        <div className="telemetry-metric metric-green" id="metric-pm">
          <div className="metric-top-row">
            <CircularProgress
              value={pmCapture}
              max={100}
              size={44}
              strokeWidth={3}
              color="var(--accent-green)"
            >
              <CheckCircle2 size={16} style={{ color: 'var(--accent-green)' }} />
            </CircularProgress>
            <div className="metric-value-block">
              <div className="metric-label">PM Capture Rate</div>
              <div className="metric-value" id="pm-val" style={{ transition: 'color 250ms cubic-bezier(0.19, 1, 0.22, 1)' }}>
                {pmCapture.toFixed(1)}
                <span className="metric-unit">%</span>
              </div>
            </div>
          </div>
          <div className="metric-sparkline">
            <div className="metric-sparkline-fill" id="pm-fill" style={{ width: `${pmWidth}%` }}></div>
          </div>
        </div>

        {/* Metric 2: Exhaust Gas Temperature */}
        <div className="telemetry-metric metric-orange" id="metric-temp">
          <div className="metric-top-row">
            <CircularProgress
              value={exhaustTemp}
              max={maxTempScale}
              size={44}
              strokeWidth={3}
              color="var(--accent-orange)"
            >
              <Thermometer size={16} style={{ color: 'var(--accent-orange)' }} />
            </CircularProgress>
            <div className="metric-value-block">
              <div className="metric-label">Exhaust Gas Temp</div>
              <div className="metric-value" id="temp-val" style={{ transition: 'color 250ms cubic-bezier(0.19, 1, 0.22, 1)' }}>
                {exhaustTemp.toFixed(1)}
                <span className="metric-unit"> °C</span>
              </div>
            </div>
          </div>
          <div className="metric-sparkline">
            <div className="metric-sparkline-fill" id="temp-fill" style={{ width: `${tempWidth}%` }}></div>
          </div>
        </div>

        {/* Metric 3: Differential Pressure */}
        <div className="telemetry-metric" id="metric-dp">
          <div className="metric-top-row">
            <CircularProgress
              value={diffPressure}
              max={8}
              size={44}
              strokeWidth={3}
              color="var(--accent-cyan)"
            >
              <Activity size={16} style={{ color: 'var(--accent-cyan)' }} />
            </CircularProgress>
            <div className="metric-value-block">
              <div className="metric-label">Differential Pressure</div>
              <div className="metric-value" id="dp-val" style={{ transition: 'color 250ms cubic-bezier(0.19, 1, 0.22, 1)' }}>
                {diffPressure.toFixed(1)}
                <span className="metric-unit"> kPa</span>
              </div>
            </div>
          </div>
          <div className="metric-sparkline">
            <div className="metric-sparkline-fill" id="dp-fill" style={{ width: `${dpWidth}%` }}></div>
          </div>
        </div>

        {/* Metric 4: CPCB Compliance Status */}
        <div className={`telemetry-metric ${cpcbStatus === 'CPCB OK' ? 'metric-green' : cpcbStatus === 'WARNING' ? 'metric-orange' : 'metric-orange'}`} id="metric-compliance">
          <div className="metric-top-row">
            <CircularProgress
              value={complianceWidth}
              max={100}
              size={44}
              strokeWidth={3}
              color={cpcbStatus === 'CPCB OK' ? 'var(--accent-green)' : 'var(--accent-orange)'}
            >
              <Cpu size={16} style={{ color: cpcbStatus === 'CPCB OK' ? 'var(--accent-green)' : 'var(--accent-orange)' }} />
            </CircularProgress>
            <div className="metric-value-block">
              <div className="metric-label">CPCB Norms</div>
              <div className="metric-value" id="compliance-val" style={{ transition: 'color 250ms cubic-bezier(0.19, 1, 0.22, 1)' }}>
                {cpcbStatus}
              </div>
            </div>
          </div>
          <div className="metric-sparkline">
            <div className="metric-sparkline-fill" id="compliance-fill" style={{ width: `${complianceWidth}%` }}></div>
          </div>
        </div>
      </div>

      {/* Stream Gateway Log Console */}
      <div className="telemetry-console" id="log-console" ref={consoleRef}>
        {logs.map((log, index) => (
          <div
            key={index}
            className={`console-line ${log.type === 'SYSTEM' ? 'console-system' : 'console-data'}`}
          >
            [{log.timestamp}] [{log.type}] {log.message}
          </div>
        ))}
        <span className="console-cursor"></span>
      </div>
    </div>
  );
};
