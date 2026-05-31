import React, { useState, useRef, useEffect } from 'react';
import { CgMenuRight } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const links = [
  { name: 'Home',           path: '/' },
  { name: 'Wedding Makeup', path: '/wedding' },
  { name: 'Daily Makeup',   path: '/daily' },
  { name: 'All Makeup',        path: '/all' },
];

const MobileNav = ({ color = '#1a1410' }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate  = useNavigate();
  const wrapRef   = useRef(null);

  // ปิดเมื่อคลิกนอก dropdown
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    setOpenMenu(false);
    setTimeout(() => navigate(path), 250);
  };

  return (
    // ไม่ต้องมี lg:hidden ที่นี่ — Header.jsx จัดการด้วย <div className="lg:hidden"> แล้ว
    <div ref={wrapRef} style={{ position: 'relative' }}>

      {/* Hamburger button */}
      <Motion.button
        whileTap={{ scale: 0.88 }}
        onClick={() => setOpenMenu((v) => !v)}
        style={{
          width: '42px',
          height: '42px',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(184,154,106,0.22)',
          borderRadius: '999px',
          cursor: 'pointer',
          fontSize: '1.45rem',
          color,
          padding: '0',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <CgMenuRight />
      </Motion.button>

      {/* Dropdown box */}
      <AnimatePresence>
        {openMenu && (
          <Motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{   opacity: 0, y: -6,  scale: 0.96 }}
            transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.22 }}
            style={{
              position: 'fixed',
              top: '76px',
              left: '0.9rem',
              right: '0.9rem',
              minWidth: '0',
              background: 'rgba(245,240,232,0.97)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(184,154,106,0.3)',
              borderRadius: '16px',
              boxShadow: '0 18px 46px rgba(26,20,16,0.16)',
              overflow: 'hidden',
              zIndex: 200,
              transformOrigin: 'top center',
            }}
          >
            {links.map((link, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                <a
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  style={{
                    display: 'block',
                    padding: '1rem 1.1rem',
                    fontFamily: "'Noto Sans Thai', sans-serif",
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#1a1410',
                    textDecoration: 'none',
                    borderBottom: index < links.length - 1
                      ? '1px solid rgba(184,154,106,0.12)'
                      : 'none',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(184,154,106,0.08)';
                    e.currentTarget.style.color = '#b89a6a';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#1a1410';
                  }}
                >
                  {link.name}
                </a>
              </Motion.div>
            ))}
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
