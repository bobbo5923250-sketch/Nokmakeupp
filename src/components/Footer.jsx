import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import Socials from './Socials';
import LogoImg from '../img/header/nok.svg';

const footerLinks = [
  { to: '/wedding', label: 'Wedding Makeup' },
  { to: '/daily', label: 'Daily Makeup' },
  { to: '/all', label: 'All Portfolio' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .site-footer {
          background: var(--ink);
          color: var(--ivory);
          padding: clamp(3.5rem, 7vw, 6rem) clamp(1.25rem, 5vw, 5rem) 2.2rem;
        }

        .footer-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: clamp(2rem, 5vw, 4rem);
        }

        .footer-brand img {
          height: 42px;
          width: auto;
          margin-bottom: 1.4rem;
          filter: brightness(0) invert(1);
        }

        .footer-brand p {
          max-width: 320px;
          color: rgba(250, 247, 242, 0.62);
          line-height: 1.8;
          font-size: 0.92rem;
          margin: 0 0 1.6rem;
        }

        .footer-col h4 {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold);
          margin: 0 0 1.2rem;
        }

        .footer-col a,
        .footer-col span {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: rgba(250, 247, 242, 0.74);
          text-decoration: none;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 0.85rem;
          transition: color 0.25s var(--ease);
          width: fit-content;
        }

        .footer-col a:hover { color: #fff; }
        .footer-col a svg { font-size: 0.85rem; color: var(--gold); }

        .footer-bottom {
          max-width: 1240px;
          margin: clamp(2.5rem, 5vw, 4rem) auto 0;
          padding-top: 1.6rem;
          border-top: 1px solid rgba(250, 247, 242, 0.12);
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: space-between;
          align-items: center;
          color: rgba(250, 247, 242, 0.5);
          font-size: 0.8rem;
          letter-spacing: 0.02em;
        }

        @media (max-width: 760px) {
          .footer-inner { grid-template-columns: 1fr 1fr; }
          .footer-brand { grid-column: 1 / -1; }
          .footer-bottom { justify-content: center; text-align: center; }
        }
      `}</style>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src={LogoImg} alt="Nokmakeupp" />
            <p>
              ช่างแต่งหน้ามืออาชีพ โคราช — งานเจ้าสาว ออกงาน และวันสำคัญ
              เน้นงานผิวละมุน ดูแพง และถ่ายรูปขึ้นกล้องในทุกโอกาส
            </p>
            <Socials color="rgba(250,247,242,0.8)" gap="1.3rem" size="1.15rem" />
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            {footerLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href="https://lin.ee/aZQJ4JQ" target="_blank" rel="noreferrer">
              LINE Official <FiArrowUpRight />
            </a>
            <a href="https://www.instagram.com/nokmakeupp/" target="_blank" rel="noreferrer">
              @nokmakeupp <FiArrowUpRight />
            </a>
            <a href="https://www.facebook.com/nokmakeupp" target="_blank" rel="noreferrer">
              Facebook <FiArrowUpRight />
            </a>
            <span>Nakhon Ratchasima, TH</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Nokmakeupp. All rights reserved.</span>
          <span>Bridal · Event · Editorial Makeup</span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
