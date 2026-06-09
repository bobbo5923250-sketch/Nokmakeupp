import React, { useState, useRef, useEffect } from 'react';
import { CgClose, CgMenuRight } from 'react-icons/cg';
import { FiArrowUpRight } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import Socials from './Socials';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Wedding Makeup', path: '/wedding' },
  { name: 'Daily Makeup', path: '/daily' },
  { name: 'All Portfolio', path: '/all' },
];

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const wrapRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = (e, path) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => navigate(path), 240);
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'flex' }}>
      <Motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        style={{
          width: '44px',
          height: '44px',
          background: 'rgba(33,28,24,0.05)',
          border: '1px solid var(--line)',
          borderRadius: '999px',
          cursor: 'pointer',
          fontSize: '1.4rem',
          color: 'var(--ink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 210,
          position: 'relative',
        }}
      >
        {open ? <CgClose /> : <CgMenuRight />}
      </Motion.button>

      <AnimatePresence>
        {open && (
          <>
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(33,28,24,0.32)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                zIndex: 190,
              }}
            />

            <Motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.42 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(86vw, 360px)',
                background: 'var(--ivory)',
                borderLeft: '1px solid var(--line)',
                boxShadow: '-30px 0 80px rgba(33,28,24,0.18)',
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                padding: '6.5rem 1.8rem 2rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--mocha)',
                  marginBottom: '1.4rem',
                }}
              >
                Menu
              </span>

              <nav style={{ display: 'flex', flexDirection: 'column' }}>
                {links.map((link, index) => {
                  const active = location.pathname === link.path;
                  return (
                    <Motion.a
                      key={link.path}
                      href={link.path}
                      onClick={(e) => go(e, link.path)}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + index * 0.06, duration: 0.3 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem 0',
                        borderBottom: '1px solid var(--line-soft)',
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.55rem',
                        fontWeight: 400,
                        color: active ? 'var(--mocha-deep)' : 'var(--ink)',
                        textDecoration: 'none',
                      }}
                    >
                      {link.name}
                      <FiArrowUpRight style={{ fontSize: '1.1rem', color: 'var(--mocha)' }} />
                    </Motion.a>
                  );
                })}
              </nav>

              <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                <a
                  href="https://lin.ee/aZQJ4JQ"
                  target="_blank"
                  rel="noreferrer"
                  className="u-btn u-btn--primary"
                  style={{ width: '100%', marginBottom: '1.6rem' }}
                >
                  จองคิวผ่าน LINE
                </a>
                <Socials gap="1.4rem" size="1.2rem" />
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
