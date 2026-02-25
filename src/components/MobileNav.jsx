import React, { useState, useRef, useEffect } from 'react';
import { CgMenuRight } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { name: 'Home',           path: '/' },
  { name: 'Wedding Makeup', path: '/wedding' },
  { name: 'Daily Makeup',   path: '/daily' },
  { name: 'All Makeup',        path: '/all' },
];

const MobileNav = () => {
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
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={() => setOpenMenu((v) => !v)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '1.6rem', color: '#1a1410', padding: '6px',
          display: 'flex', alignItems: 'center',
        }}
      >
        <CgMenuRight />
      </motion.button>

      {/* Dropdown box */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{   opacity: 0, y: -6,  scale: 0.96 }}
            transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.22 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              minWidth: '180px',
              background: 'rgba(245,240,232,0.97)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(184,154,106,0.3)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(26,20,16,0.12)',
              overflow: 'hidden',
              zIndex: 200,
              transformOrigin: 'top right',
            }}
          >
            {links.map((link, index) => (
              <motion.div
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
                    padding: '0.75rem 1.25rem',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.7rem',
                    fontWeight: 300,
                    letterSpacing: '0.2em',
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;