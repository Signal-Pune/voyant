export const Footer = () => {
  return (
    <footer id="main-footer" style={{ borderTop: '1px solid var(--border-color)', padding: '6rem 0 2rem 0', background: 'var(--bg)' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '6rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem', fontWeight: 400 }}>Voyant Systems</h3>
            <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: '1rem', maxWidth: '300px', lineHeight: '1.6' }}>
              Pioneering edge telemetry and AI compliance solutions for heavy-duty industrial applications.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>NAVIGATION</span>
              <a href="#solutions" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Solutions</a>
              <a href="#ai-agent-simulator" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>AI Agent</a>
              <a href="#capabilities-config" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Integration Specs</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>LEGAL</span>
              <span style={{ color: 'var(--text-secondary)' }}>CIN: U62013PN2023PTC225117</span>
              <span style={{ color: 'var(--text-secondary)' }}>Pimple Saudagar, Pune, MH</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>&copy; 2026 Voyant Systems Pvt. Ltd.</span>
          <span>ESTD. 2023 // PUNE, INDIA</span>
        </div>
      </div>
    </footer>
  );
};
