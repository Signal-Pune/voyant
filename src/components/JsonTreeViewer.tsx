import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface JsonNodeProps {
  name: string;
  value: unknown;
  depth: number;
}

const JsonNode: React.FC<JsonNodeProps> = ({ name, value, depth }) => {
  const [expanded, setExpanded] = useState(true);
  const isExpandable = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);

  const indent = depth * 14;

  if (!isExpandable) {
    return (
      <div style={{ paddingLeft: indent + 14, display: 'flex', gap: '0.5rem' }}>
        <span className="json-key">"{name}"</span>
        <span style={{ color: 'var(--text-muted)' }}>:</span>
        {typeof value === 'string' ? (
          <span className="json-string">"{value}"</span>
        ) : typeof value === 'boolean' ? (
          <span className="json-boolean">{value ? 'true' : 'false'}</span>
        ) : (
          <span className="json-number">{String(value)}</span>
        )}
      </div>
    );
  }

  const entries = isArray
    ? (value as unknown[]).map((v, i) => [String(i), v] as [string, unknown])
    : Object.entries(value as Record<string, unknown>);

  return (
    <div>
      <div
        style={{
          paddingLeft: indent,
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <span style={{ color: 'var(--text-muted)', display: 'inline-flex', transition: 'transform 200ms ease' }}>
          {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </span>
        <span className="json-key">"{name}"</span>
        <span style={{ color: 'var(--text-muted)' }}>:</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          {isArray ? `[${entries.length}]` : `{${entries.length}}`}
        </span>
      </div>
      {expanded && (
        <div style={{ borderLeft: depth === 0 ? 'none' : '1px solid rgba(255,255,255,0.04)', marginLeft: depth === 0 ? 0 : indent + 7 }}>
          {isArray && <div style={{ paddingLeft: indent + 14, color: 'var(--text-muted)' }}>[</div>}
          {!isArray && <div style={{ paddingLeft: indent + 14, color: 'var(--text-muted)' }}>{'{'}</div>}
          {entries.map(([k, v]) => (
            <JsonNode key={k} name={k} value={v} depth={depth + 1} />
          ))}
          {isArray && <div style={{ paddingLeft: indent + 14, color: 'var(--text-muted)' }}>]</div>}
          {!isArray && <div style={{ paddingLeft: indent + 14, color: 'var(--text-muted)' }}>{'}'}</div>}
        </div>
      )}
    </div>
  );
};

interface JsonTreeViewerProps {
  data: Record<string, unknown>;
  className?: string;
}

export const JsonTreeViewer: React.FC<JsonTreeViewerProps> = ({ data, className = '' }) => {
  return (
    <div className={`json-tree-viewer ${className}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', lineHeight: 1.7 }}>
      <div style={{ color: 'var(--text-muted)' }}>{'{'}</div>
      {Object.entries(data).map(([key, value]) => (
        <JsonNode key={key} name={key} value={value} depth={0} />
      ))}
      <div style={{ color: 'var(--text-muted)' }}>{'}'}</div>
    </div>
  );
};
