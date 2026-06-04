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
  const pmWidth = Math.min(100, Math.max(0, ((pmCapture - 70) / (95 - 70)) * 100));
  const maxTempScale = recdStatus === 'Regenerating' ? 550 : 400;
  const tempWidth = Math.min(100, Math.max(0, ((exhaustTemp - 40) / (maxTempScale - 40)) * 100));
  const dpWidth = Math.min(100, Math.max(0, (diffPressure / 8) * 100));
  const complianceWidth = cpcbStatus === 'CPCB OK' ? 100 : cpcbStatus === 'WARNING' ? 50 : 25;

  const showFailover = cpcbStatus === 'WARNING' || cpcbStatus === 'CRITICAL';

  return (
    <div
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-color)',
        borderRadius: '4px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
      }}
      id={isCompact ? 'telemetry-dashboard-compact' : 'telemetry-dashboard'}
    >
      {/* Banner */}
      {showFailover && (
        <div style={{
          background: 'rgba(255, 51, 102, 0.1)',
          borderBottom: '1px solid #ff3366',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
          color: '#ff3366',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem'
        }}>
          <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ display: 'block', marginBottom: '0.2rem' }}>SENSOR FAILOVER TO PIN 12 ACTIVE</strong>
            <span style={{ color: 'var(--text-secondary)' }}>Primary thermocouple open-circuit code ERR-TEMP-01. Re-routed to redundant channel.</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{
        padding: '1rem 1.5rem',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--bg)'
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ display: 'block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }}></span>
          <Zap size={14} style={{ color: 'var(--accent)' }} />
          RECD_TELEMETRY_LINK
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          NODE_RECD_02 // PUNE
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        borderBottom: '1px solid var(--border-color)'
      }}>
        
        {/* Metric 1 */}
        <div style={{ padding: '1.5rem', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <CircularProgress value={pmCapture} max={100} size={44} strokeWidth={3} color="var(--accent)">
              <CheckCircle2 size={16} style={{ color: 'var(--accent)' }} />
            </CircularProgress>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>PM_CAPTURE</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                {pmCapture.toFixed(1)}<span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '2px' }}>%</span>
              </div>
            </div>
          </div>
          <div style={{ height: '2px', background: 'var(--bg)', width: '100%' }}>
            <div style={{ height: '100%', background: 'var(--accent)', width: `${pmWidth}%`, transition: 'width 0.5s ease' }}></div>
          </div>
        </div>

        {/* Metric 2 */}
        <div style={{ padding: '1.5rem', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <CircularProgress value={exhaustTemp} max={maxTempScale} size={44} strokeWidth={3} color="#f97316">
              <Thermometer size={16} style={{ color: '#f97316' }} />
            </CircularProgress>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>EXHAUST_TEMP</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                {exhaustTemp.toFixed(1)}<span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '2px' }}>°C</span>
              </div>
            </div>
          </div>
          <div style={{ height: '2px', background: 'var(--bg)', width: '100%' }}>
            <div style={{ height: '100%', background: '#f97316', width: `${tempWidth}%`, transition: 'width 0.5s ease' }}></div>
          </div>
        </div>

        {/* Metric 3 */}
        <div style={{ padding: '1.5rem', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <CircularProgress value={diffPressure} max={8} size={44} strokeWidth={3} color="var(--accent)">
              <Activity size={16} style={{ color: 'var(--accent)' }} />
            </CircularProgress>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>DIFF_PRESSURE</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                {diffPressure.toFixed(1)}<span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '2px' }}>kPa</span>
              </div>
            </div>
          </div>
          <div style={{ height: '2px', background: 'var(--bg)', width: '100%' }}>
            <div style={{ height: '100%', background: 'var(--accent)', width: `${dpWidth}%`, transition: 'width 0.5s ease' }}></div>
          </div>
        </div>

        {/* Metric 4 */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <CircularProgress value={complianceWidth} max={100} size={44} strokeWidth={3} color={cpcbStatus === 'CPCB OK' ? 'var(--accent)' : '#ff3366'}>
              <Cpu size={16} style={{ color: cpcbStatus === 'CPCB OK' ? 'var(--accent)' : '#ff3366' }} />
            </CircularProgress>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>COMPLIANCE</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: cpcbStatus === 'CPCB OK' ? 'var(--text-primary)' : '#ff3366' }}>
                {cpcbStatus}
              </div>
            </div>
          </div>
          <div style={{ height: '2px', background: 'var(--bg)', width: '100%' }}>
            <div style={{ height: '100%', background: cpcbStatus === 'CPCB OK' ? 'var(--accent)' : '#ff3366', width: `${complianceWidth}%`, transition: 'width 0.5s ease' }}></div>
          </div>
        </div>
        
      </div>

      {/* Log Console */}
      <div ref={consoleRef} style={{
        background: 'var(--bg-console)',
        padding: '1.5rem',
        height: isCompact ? '150px' : '200px',
        overflowY: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        lineHeight: '1.6'
      }}>
        {logs.map((log, index) => (
          <div key={index} style={{ marginBottom: '0.4rem', color: log.type === 'SYSTEM' ? 'var(--text-muted)' : 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }}>[{log.timestamp}]</span>
            <span style={{ color: log.type === 'SYSTEM' ? 'var(--accent-secondary)' : 'var(--accent)', marginRight: '0.5rem' }}>[{log.type}]</span>
            {log.message}
          </div>
        ))}
        <span className="console-cursor" style={{ display: 'inline-block', width: '8px', height: '12px', background: 'var(--accent)', animation: 'blink 1s step-end infinite' }}></span>
      </div>
    </div>
  );
};
