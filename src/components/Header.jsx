import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Socials from './Socials';
import MobileNav from './MobileNav';
import LogoImg from '../img/header/nok.svg'; 

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/wedding', label: 'Wedding Makeup' },
    { to: '/daily', label: 'Daily Makeup' },
    { to: '/all', label: 'All Makeup' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500&display=swap');

        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          width: 100%;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
        }

        .site-header.is-initial {
          height: 100px;
          background: transparent;
          padding: 0 4rem;
        }

        .site-header.is-scrolled {
          height: 80px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 0 4rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .desktop-nav {
          display: none;
          gap: 3rem;
        }
        @media (min-width: 1024px) {
          .desktop-nav { display: flex; }
        }

        .nav-item {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #1a1410;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-item:hover, .nav-item.active {
          color: #b89a6a;
        }

        /* ส่วนควบคุม Right Section ให้เรียงตัวแนวนอน */
        .header-right-box {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        @media (max-width: 1024px) {
          .site-header.is-initial, .site-header.is-scrolled {
            padding: 0 1.5rem;
            height: 70px;
          }
        }
      `}</style>

      <header className={`site-header ${scrolled ? 'is-scrolled' : 'is-initial'}`}>
        <div className="header-inner">
          
          {/* 1. LOGO */}
          <Link to="/" className="flex items-center">
            <img 
              src={LogoImg} 
              alt="Logo" 
              className={`transition-all duration-500 object-contain ${scrolled ? 'h-[35px]' : 'h-[42px]'}`} 
            />
          </Link>

          {/* 2. CENTER: NAV (แสดงเฉพาะคอมพิวเตอร์) */}
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

          {/* 3. RIGHT SECTION (Socials & MobileNav) */}
          <div className="header-right-box">
            
            {/* Socials: บังคับ Flex-Row แนวนอน และซ่อนบนมือถือ */}
            <div className="hidden lg:flex items-center">
              <Socials />
            </div>

            {/* Mobile Navigation: แสดงเฉพาะมือถือ และซ่อนบนคอมพิวเตอร์ (lg:hidden) */}
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