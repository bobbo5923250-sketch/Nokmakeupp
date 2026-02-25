import React, { useEffect, useRef, useState, useCallback } from 'react';

// ✅ Create React App (Webpack)
const modules = import.meta.glob('../img/portfolio/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true });
const imagePaths = Object.keys(modules).sort();
const imageMap = {};
imagePaths.forEach((path) => {
  // modules[path].default คือ URL ของรูปภาพที่ Vite ประมวลผลแล้ว
  imageMap[path] = modules[path].default;
});

const PAGE_SIZE = 12;

function buildColumns(items, count) {
  const cols = Array.from({ length: count }, () => []);
  items.forEach((item, i) => cols[i % count].push(item));
  return cols;
}

// Fade-in เมื่อ scroll มาถึง
const MasonryTile = ({ path, globalIndex, onClick }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const src = imageMap[path];

  return (
    <div
      ref={ref}
      className="masonry-tile"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
      onClick={() => onClick(globalIndex)}
    >
      <img src={src} alt={`Wedding makeup ${globalIndex + 1}`} loading="lazy" />
      <div className="tile-zoom"><span>View</span></div>
    </div>
  );
};

const Daily = () => {
  const sectionRef   = useRef(null);
  const sentinelRef  = useRef(null);
  const [lightbox, setLightbox] = useState(null);
  const [page, setPage]         = useState(1);

  const visiblePaths = imagePaths.slice(0, page * PAGE_SIZE);
  const hasMore      = visiblePaths.length < imagePaths.length;
  const progress     = (visiblePaths.length / imagePaths.length) * 100;

  const colCount = 3;
  const columns  = buildColumns(
    visiblePaths.map((p, i) => ({ path: p, globalIndex: i })),
    colCount
  );

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setPage((p) => p + 1); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasMore, page]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((p) => p !== null ? (p + 1) % imagePaths.length : p);
      if (e.key === 'ArrowLeft')  setLightbox((p) => p !== null ? (p - 1 + imagePaths.length) % imagePaths.length : p);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add('loaded'));
  }, []);

  const lightboxSrc = lightbox !== null ? imageMap[imagePaths[lightbox]] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Montserrat:wght@200;300&display=swap');

        :root {
          --cream: #f5f0e8;
          --ink:   #1a1410;
          --gold:  #b89a6a;
          --muted: #7a6f63;
        }

        .about-section {
          font-family: 'Montserrat', sans-serif;
          background: var(--cream);
          min-height: 100vh;
          padding: 130px 3rem 5rem;
          position: relative;
        }
        .about-section::before {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.5;
        }
        @media (max-width: 640px) { .about-section { padding: 100px 1rem 3rem; } }

        /* ── Header ── */
        .about-header {
          display: flex; align-items: baseline; justify-content: space-between;
          margin-bottom: 2.5rem; position: relative; z-index: 1;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .loaded .about-header { opacity: 1; transform: translateY(0); }

        .about-eyebrow {
          font-size: 0.6rem; font-weight: 300; letter-spacing: 0.35em;
          text-transform: uppercase; color: var(--gold);
          display: flex; align-items: center; gap: 0.75rem;
        }
        .about-eyebrow::before { content: ''; width: 2rem; height: 1px; background: var(--gold); display: block; }

        .about-title {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: clamp(2rem, 4vw, 3.5rem); color: var(--ink); line-height: 1;
        }
        .about-title em { font-style: italic; color: var(--gold); }
        .about-count { font-size: 0.6rem; font-weight: 200; letter-spacing: 0.2em; color: var(--muted); }

        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           Pinterest Masonry Layout
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .masonry {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          position: relative;
          z-index: 1;
        }
        .masonry-col {
          display: flex; flex-direction: column;
          gap: 12px; flex: 1; min-width: 0;
        }
        .masonry-tile {
          cursor: pointer;
          border-radius: 16px;
          overflow: hidden;
          background: #e8e0d4;
          position: relative;
        }
        .masonry-tile img {
          width: 100%; height: auto; display: block;
          transition: transform 0.45s ease;
        }
        .masonry-tile:hover img { transform: scale(1.04); }
        .masonry-tile::after {
          content: ''; position: absolute; inset: 0; border-radius: 16px;
          background: rgba(26,20,16,0); transition: background 0.4s ease; pointer-events: none;
        }
        .masonry-tile:hover::after { background: rgba(26,20,16,0.18); }
        .tile-zoom {
          position: absolute; inset: 0; display: flex; align-items: center;
          justify-content: center; z-index: 2; opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
        }
        .masonry-tile:hover .tile-zoom { opacity: 1; }
        .tile-zoom span {
          font-size: 0.55rem; font-weight: 300; letter-spacing: 0.35em; text-transform: uppercase;
          color: rgba(245,240,232,0.9); border: 1px solid rgba(245,240,232,0.45);
          padding: 0.5rem 1rem; border-radius: 2px;
        }

        /* ── Footer ── */
        .gallery-footer {
          display: flex; flex-direction: column; align-items: center;
          gap: 0.75rem; padding: 3rem 0 1rem; position: relative; z-index: 1;
        }
        .progress-track { width: 160px; height: 1px; background: rgba(184,154,106,0.2); }
        .progress-fill  { height: 100%; background: var(--gold); transition: width 0.6s ease; }
        .progress-label {
          font-size: 0.55rem; font-weight: 200; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--muted);
        }
        .loading-dots span {
          display: inline-block; width: 4px; height: 4px; border-radius: 50%;
          background: var(--gold); margin: 0 3px; opacity: 0.3;
          animation: dotPulse 1.2s ease-in-out infinite;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dotPulse { 0%,100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 1; transform: scale(1.4); } }
        .all-loaded {
          font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic;
          font-size: 0.9rem; letter-spacing: 0.1em; color: var(--muted);
        }

        /* ── Lightbox ── */
        .lightbox-overlay {
          position: fixed; inset: 0; background: rgba(26,20,16,0.95); z-index: 200;
          display: flex; align-items: center; justify-content: center; animation: lbFadeIn 0.3s ease;
        }
        @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .lightbox-img { max-width: 86vw; max-height: 86vh; object-fit: contain; animation: lbScale 0.35s ease; }
        @keyframes lbScale { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .lightbox-close {
          position: absolute; top: 1.75rem; right: 2rem; background: none; border: none; cursor: pointer;
          font-family: 'Montserrat', sans-serif; font-size: 0.55rem; font-weight: 300;
          letter-spacing: 0.3em; text-transform: uppercase; color: rgba(245,240,232,0.45);
          transition: color 0.2s ease;
        }
        .lightbox-close:hover { color: var(--gold); }
        .lightbox-counter {
          position: absolute; bottom: 1.75rem; left: 50%; transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif; font-size: 0.85rem; font-weight: 300;
          letter-spacing: 0.15em; color: rgba(245,240,232,0.3);
        }
        .lightbox-prev, .lightbox-next {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          font-family: 'Montserrat', sans-serif; font-size: 0.55rem; font-weight: 300;
          letter-spacing: 0.25em; text-transform: uppercase; color: rgba(245,240,232,0.4);
          transition: color 0.2s ease; padding: 1.5rem;
        }
        .lightbox-prev { left: 0.5rem; }
        .lightbox-next { right: 0.5rem; }
        .lightbox-prev:hover, .lightbox-next:hover { color: var(--gold); }
      `}</style>

      <section className="about-section" ref={sectionRef}>

        {/* Header */}
        <div className="about-header">
          <span className="about-eyebrow">Gallery</span>
          <h1 className="about-title">Daily <em>Makeup</em></h1>
          <span className="about-count">{imagePaths.length} works</span>
        </div>

        {/* Masonry */}
        <div className="masonry">
          {columns.map((col, ci) => (
            <div className="masonry-col" key={ci}>
              {col.map(({ path, globalIndex }) => (
                <MasonryTile
                  key={path}
                  path={path}
                  globalIndex={globalIndex}
                  onClick={setLightbox}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Footer: progress + sentinel */}
        <div className="gallery-footer">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-label">
            {visiblePaths.length} / {imagePaths.length}
          </span>
          {hasMore ? (
            <>
              <div ref={sentinelRef} style={{ height: '1px' }} />
              <div className="loading-dots">
                <span /><span /><span />
              </div>
            </>
          ) : (
            <p className="all-loaded">— All works displayed —</p>
          )}
        </div>

        {/* Lightbox */}
        {lightbox !== null && (
          <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
            <img
              className="lightbox-img"
              src={lightboxSrc}
              alt={`Wedding makeup ${lightbox + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
            <button className="lightbox-close" onClick={() => setLightbox(null)}>Close · Esc</button>
            <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + imagePaths.length) % imagePaths.length); }}>← Prev</button>
            <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % imagePaths.length); }}>Next →</button>
            <span className="lightbox-counter">{lightbox + 1} / {imagePaths.length}</span>
          </div>
        )}

      </section>
    </>
  );
};

export default Daily;