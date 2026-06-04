import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    { href: '#solutions', label: 'Retrofit Solutions', id: 'link-solutions' },
    { href: '#ai-agent-simulator', label: 'AI Agent Simulator', id: 'link-agent' },
    { href: '#capabilities', label: 'Core Technology', id: 'link-capabilities' },
    { href: '#why-voyant', label: 'Compliance Focus', id: 'link-why-voyant' },
  ];

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-container">
        <a href="#" className="logo" id="nav-logo">
          <div className="logo-icon">
            <svg className="logo-svg" viewBox="0 0 24 24" width="32" height="32">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div className="logo-text">
            VOYANT
            <span>SYSTEMS PVT LTD</span>
          </div>
        </a>

        <nav className="desktop-nav">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={item.href} id={item.id}>{item.label}</a>
              </li>
            ))}
            <li>
              <MagneticButton href="#contact" className="btn btn-secondary" id="btn-header-demo">
                Schedule a Demo
                <ArrowRight size={14} className="btn-icon" />
              </MagneticButton>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <ul className="mobile-nav-links">
            {navItems.map((item, i) => (
              <li key={item.id} style={{ animationDelay: `${i * 0.08}s` }}>
                <a href={item.href} onClick={() => setMenuOpen(false)} id={`mobile-${item.id}`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <MagneticButton href="#contact" className="btn btn-primary btn-shine" onClick={() => setMenuOpen(false)}>
            Schedule a Demo
            <ArrowRight size={16} />
          </MagneticButton>
        </div>
      </div>
    </header>
  );
};
