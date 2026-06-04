import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer">
      <div className="container footer-content">
        <div className="footer-info">
          <span className="footer-meta" id="footer-details">
            VOYANT SYSTEMS PRIVATE LIMITED / CIN: U62013PN2023PTC225117 / ESTD. 2023
          </span>
          <span className="footer-copyright" style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            Registered Office: Pimple Saudagar, Pune, Maharashtra, India.
          </span>
          <span className="footer-copyright" style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.2rem' }}>
            Directors: Rajesh Bhalerao &amp; Hemraj Bendale.
          </span>
          <span className="footer-copyright" id="footer-copy-text" style={{ marginTop: '0.4rem' }}>
            &copy; 2026 Voyant Systems Private Limited. All rights reserved.
          </span>
        </div>
        <div className="footer-links">
          <a href="#solutions" id="footer-link-sol">Solutions</a>
          <a href="#ai-agent-simulator" id="footer-link-agent">AI Agent</a>
          <a href="#capabilities" id="footer-link-cap">Architecture</a>
          <a href="#why-voyant" id="footer-link-why">Exhibition</a>
        </div>
      </div>
    </footer>
  );
};
