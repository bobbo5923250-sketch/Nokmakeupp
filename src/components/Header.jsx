import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Socials from './Socials';
import MobileNav from './MobileNav';
import LogoImg from '../img/header/nok.svg';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/wedding', label: 'Wedding' },
  { to: '/daily', label: 'Daily' },
  { to: '/all', label: 'Portfolio' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .site-header {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 60;
          display: flex;
          align-items: center;
          height: 96px;
          padding: 0 clamp(1rem, 4vw, 3.5rem);
          transition: height 0.45s var(--ease), background 0.45s var(--ease),
            box-shadow 0.45s var(--ease), border-color 0.45s var(--ease);
          border-bottom: 1px solid transparent;
        }

        .site-header.is-scrolled {
          height: 72px;
          background: rgba(250, 247, 242, 0.82);
          backdrop-filter: blur(16px) saturate(1.1);
          -webkit-backdrop-filter: blur(16px) saturate(1.1);
          box-shadow: 0 10px 40px rgba(33, 28, 24, 0.06);
          border-color: var(--line-soft);
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
        }

        .brand-link {
          display: inline-flex;
          align-items: center;
          flex: 0 0 auto;
        }

        .brand-logo {
          width: auto;
          height: 40px;
          transition: height 0.45s var(--ease);
        }
        .is-scrolled .brand-logo { height: 34px; }

        .desktop-nav {
          display: none;
          align-items: center;
          gap: clamp(1.6rem, 3vw, 2.8rem);
        }
        @media (min-width: 1024px) {
          .desktop-nav { display: flex; }
        }

        .nav-item {
          position: relative;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink);
          text-decoration: none;
          padding: 0.4rem 0;
          transition: color 0.3s var(--ease);
        }

        .nav-item::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1.5px;
          background: var(--mocha);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.32s var(--ease);
        }

        .nav-item:hover,
        .nav-item.active { color: var(--mocha-deep); }

        .nav-item:hover::after,
        .nav-item.active::after { transform: scaleX(1); }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1.4rem;
          flex: 0 0 auto;
        }

        .header-divider {
          width: 1px;
          height: 22px;
          background: var(--line);
        }

        @media (max-width: 1023px) {
          .site-header { height: 76px; }
          .site-header.is-scrolled { height: 64px; }
          .brand-logo { height: 36px; }
          .is-scrolled .brand-logo { height: 32px; }
        }

        @media (max-width: 480px) {
          .brand-logo { height: 32px; }
        }
      `}</style>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          <Link to="/" className="brand-link" aria-label="Nokmakeupp home">
            <img src={LogoImg} alt="Nokmakeupp" className="brand-logo" width="176" height="40" />
          </Link>

          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-item ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-right">
            <div className="hidden lg:flex items-center">
              <Socials />
            </div>
            <span className="header-divider hidden lg:block" />
            <a
              href="https://lin.ee/aZQJ4JQ"
              target="_blank"
              rel="noreferrer"
              className="u-btn u-btn--primary hidden lg:inline-flex"
              style={{ minHeight: '42px', padding: '0 1.2rem', fontSize: '0.72rem' }}
            >
              จองคิว
            </a>
            <div className="lg:hidden flex items-center">
              <MobileNav />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
