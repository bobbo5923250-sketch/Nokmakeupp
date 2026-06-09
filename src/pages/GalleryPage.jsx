import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiX, FiZoomIn } from 'react-icons/fi';
import Footer from '../components/Footer';

const PAGE_SIZE = 12;
const TILE_RATIOS = ['4 / 5', '3 / 4', '1 / 1', '5 / 7', '4 / 6'];

function buildColumns(items, count) {
  const columns = Array.from({ length: count }, () => []);
  items.forEach((item, index) => columns[index % count].push(item));
  return columns;
}

function MasonryTile({ src, title, globalIndex, onClick }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '420px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      className="masonry-tile"
      type="button"
      onClick={() => onClick(globalIndex)}
      style={{
        '--tile-ratio': TILE_RATIOS[globalIndex % TILE_RATIOS.length],
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0,0,0)' : 'translate3d(0,22px,0)',
      }}
    >
      {visible && (
        <>
          <img
            src={src}
            alt={`${title} ${globalIndex + 1}`}
            loading={globalIndex < 6 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={globalIndex < 6 ? 'high' : 'auto'}
            draggable="false"
            onLoad={(event) => {
              const decoded = event.currentTarget.decode?.();
              if (decoded) decoded.finally(() => setLoaded(true));
              else setLoaded(true);
            }}
            style={{ opacity: loaded ? 1 : 0 }}
          />
          <span className="tile-index">{String(globalIndex + 1).padStart(2, '0')}</span>
          <span className="tile-zoom"><FiZoomIn /> ดูภาพ</span>
        </>
      )}
    </button>
  );
}

const GalleryPage = ({ modules, eyebrow, title, accent, copy }) => {
  const sectionRef = useRef(null);
  const sentinelRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);
  const [page, setPage] = useState(1);
  const [columnCount, setColumnCount] = useState(() => (
    typeof window === 'undefined' || window.innerWidth > 640 ? 3 : 2
  ));

  const images = useMemo(() => (
    Object.keys(modules).sort().map((path) => ({
      path,
      src: modules[path].default,
    }))
  ), [modules]);

  const visibleImages = images.slice(0, page * PAGE_SIZE);
  const hasMore = visibleImages.length < images.length;
  const progress = images.length ? (visibleImages.length / images.length) * 100 : 0;
  const columns = buildColumns(
    visibleImages.map((image, index) => ({ ...image, globalIndex: index })),
    columnCount
  );

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    requestAnimationFrame(() => element.classList.add('loaded'));
  }, []);

  useEffect(() => {
    const updateColumns = () => {
      setColumnCount(window.innerWidth <= 640 ? 2 : 3);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  useEffect(() => {
    const element = sentinelRef.current;
    if (!element || !hasMore) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPage((current) => current + 1);
      },
      { threshold: 0.1, rootMargin: '220px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasMore, page]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setLightbox(null);
      if (event.key === 'ArrowRight') setLightbox((current) => (current !== null ? (current + 1) % images.length : current));
      if (event.key === 'ArrowLeft') setLightbox((current) => (current !== null ? (current - 1 + images.length) % images.length : current));
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  useEffect(() => {
    if (lightbox === null || images.length === 0) return;

    const preloadIndexes = [
      (lightbox + 1) % images.length,
      (lightbox - 1 + images.length) % images.length,
    ];

    preloadIndexes.forEach((index) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = images[index].src;
      img.decode?.().catch(() => undefined);
    });
  }, [images, lightbox]);

  const lightboxSrc = lightbox !== null ? images[lightbox]?.src : null;

  return (
    <>
      <style>{`
        .gallery-page {
          min-height: 100vh;
          padding: clamp(7rem, 13vw, 10rem) clamp(1rem, 4vw, 3.5rem) 4rem;
          background:
            radial-gradient(120% 60% at 80% 0%, rgba(216, 180, 166, 0.16) 0%, transparent 55%),
            var(--ivory);
          color: var(--ink);
          font-family: var(--font-sans);
        }

        .gallery-hero {
          max-width: 1240px;
          margin: 0 auto 3rem;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 430px);
          gap: clamp(1.5rem, 5vw, 4rem);
          align-items: end;
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
        }
        .loaded .gallery-hero { opacity: 1; transform: translate3d(0, 0, 0); }

        .gallery-title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(2.6rem, 6.5vw, 6rem);
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin: 1rem 0 0;
        }
        .gallery-title em { color: var(--mocha); font-style: italic; }

        .gallery-copy {
          color: var(--soft);
          line-height: 1.85;
          margin: 0 0 1.5rem;
        }

        .gallery-meta { display: flex; gap: 0.6rem; flex-wrap: wrap; }
        .gallery-pill {
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 0.55rem 1rem;
          color: var(--soft);
          font-size: 0.74rem;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.5);
        }

        .masonry {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          max-width: 1240px;
          margin: 0 auto;
        }
        .masonry-col { display: flex; flex-direction: column; gap: 16px; flex: 1; min-width: 0; }

        .masonry-tile {
          width: 100%;
          aspect-ratio: var(--tile-ratio);
          min-height: 120px;
          overflow: hidden;
          position: relative;
          padding: 0;
          border: 0;
          border-radius: 16px;
          background: var(--sand);
          cursor: pointer;
          transition: opacity 0.7s var(--ease), transform 0.7s var(--ease), box-shadow 0.32s var(--ease);
          text-align: left;
          content-visibility: auto;
          contain-intrinsic-size: 360px 480px;
        }
        .masonry-tile:hover { box-shadow: var(--shadow-md); }

        .masonry-tile img {
          width: 100%; height: 100%;
          display: block;
          object-fit: cover;
          transform: scale(1);
          transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
          position: absolute; inset: 0; z-index: 1;
        }
        .masonry-tile:hover img { transform: scale(1.05); }

        .masonry-tile::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(33,28,24,0.42), rgba(33,28,24,0) 45%);
          opacity: 0;
          transition: opacity 0.32s var(--ease);
          z-index: 1;
        }
        .masonry-tile:hover::after { opacity: 1; }

        .tile-index {
          position: absolute;
          top: 0.85rem; left: 0.85rem;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 34px; height: 28px;
          padding: 0 0.5rem;
          border-radius: 999px;
          background: rgba(250, 247, 242, 0.9);
          color: var(--ink);
          font-family: var(--font-serif);
          font-size: 0.9rem;
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity 0.28s var(--ease), transform 0.28s var(--ease);
        }
        .masonry-tile:hover .tile-index { opacity: 1; transform: translateY(0); }

        .tile-zoom {
          position: absolute;
          left: 50%; top: 50%;
          z-index: 2;
          transform: translate(-50%, -46%);
          opacity: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--ink);
          background: rgba(250, 247, 242, 0.94);
          border-radius: 999px;
          padding: 0.55rem 1.1rem;
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
        }
        .masonry-tile:hover .tile-zoom { opacity: 1; transform: translate(-50%, -50%); }

        .gallery-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          padding: 3.5rem 0 1rem;
        }
        .progress-track { width: 180px; height: 3px; border-radius: 999px; background: var(--line); overflow: hidden; }
        .progress-fill { height: 100%; background: var(--mocha); transition: width 0.6s var(--ease); }
        .progress-label {
          font-size: 0.74rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--soft);
        }

        .gallery-cta {
          max-width: 1100px;
          margin: 3.5rem auto 0;
          padding: clamp(2rem, 5vw, 3.5rem);
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          align-items: center;
          border-radius: 26px;
          background: linear-gradient(135deg, #b58a72 0%, var(--mocha-deep) 100%);
          color: var(--ivory);
          box-shadow: var(--shadow-lg);
        }
        .gallery-cta h2 {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(1.9rem, 3.6vw, 3rem);
          line-height: 1.16;
          margin: 0 0 0.6rem;
          max-width: 18ch;
        }
        .gallery-cta p { margin: 0; color: rgba(255, 255, 255, 0.84); line-height: 1.75; max-width: 42ch; }

        /* ---------- LIGHTBOX ---------- */
        .lightbox-overlay {
          position: fixed; inset: 0;
          z-index: 300;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(20, 16, 13, 0.94);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          animation: lbFadeIn 0.28s var(--ease);
        }
        @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }

        .lightbox-img {
          max-width: 86vw;
          max-height: 84vh;
          object-fit: contain;
          border-radius: 6px;
          box-shadow: 0 30px 90px rgba(0,0,0,0.45);
          animation: lbZoom 0.32s var(--ease);
        }
        @keyframes lbZoom { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }

        .lightbox-btn {
          position: absolute;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px; height: 48px;
          border: 1px solid rgba(250, 247, 242, 0.24);
          border-radius: 50%;
          background: rgba(250, 247, 242, 0.06);
          color: rgba(250, 247, 242, 0.85);
          cursor: pointer;
          font-size: 1.15rem;
          transition: color 0.25s var(--ease), border-color 0.25s var(--ease), background 0.25s var(--ease);
        }
        .lightbox-btn:hover {
          color: var(--ink);
          background: var(--ivory);
          border-color: var(--ivory);
        }
        .lightbox-close { top: 1.5rem; right: 1.5rem; }
        .lightbox-prev { left: 1.5rem; top: 50%; transform: translateY(-50%); }
        .lightbox-next { right: 1.5rem; top: 50%; transform: translateY(-50%); }

        .lightbox-counter {
          position: absolute;
          bottom: 1.5rem; left: 50%;
          transform: translateX(-50%);
          color: rgba(250, 247, 242, 0.6);
          font-size: 0.84rem;
          letter-spacing: 0.06em;
        }

        @media (max-width: 860px) {
          .gallery-hero { grid-template-columns: 1fr; gap: 1.2rem; margin-bottom: 2rem; }
          .gallery-title { font-size: clamp(2.4rem, 12vw, 3.4rem); }
          .gallery-copy { font-size: 0.95rem; margin-bottom: 1.1rem; }
          .masonry { gap: 10px; }
          .masonry-col { gap: 10px; }
          .gallery-cta { flex-direction: column; align-items: flex-start; border-radius: 20px; }
        }

        @media (max-width: 560px) {
          .masonry { gap: 8px; }
          .masonry-col { gap: 8px; }
          .masonry-tile { border-radius: 12px; }
          .gallery-cta .u-btn { width: 100%; }
          .lightbox-overlay { align-items: flex-start; padding: 4.4rem 0.75rem 0; }
          .lightbox-img { max-width: 100%; max-height: 64vh; margin-top: 0.5rem; }
          .lightbox-prev { left: 0.75rem; top: auto; bottom: 4.5rem; transform: none; }
          .lightbox-next { right: 0.75rem; top: auto; bottom: 4.5rem; transform: none; }
          .lightbox-close { top: 0.9rem; right: 0.9rem; }
          .lightbox-counter { bottom: 1.2rem; }
        }
      `}</style>

      <section className="gallery-page" ref={sectionRef}>
        <header className="gallery-hero">
          <div>
            <span className="u-eyebrow">{eyebrow}</span>
            <h1 className="gallery-title">{title} <em>{accent}</em></h1>
          </div>
          <div>
            <p className="gallery-copy">{copy}</p>
            <div className="gallery-meta">
              <span className="gallery-pill">{images.length} ผลงานจริง</span>
              <span className="gallery-pill">กดดูภาพใหญ่ได้</span>
              <span className="gallery-pill">จองผ่าน LINE</span>
            </div>
          </div>
        </header>

        <div className="masonry">
          {columns.map((column, columnIndex) => (
            <div className="masonry-col" key={columnIndex}>
              {column.map((image) => (
                <MasonryTile
                  key={image.path}
                  src={image.src}
                  title={`${title} ${accent}`}
                  globalIndex={image.globalIndex}
                  onClick={setLightbox}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="gallery-footer">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-label">{visibleImages.length} / {images.length}</span>
          {hasMore ? <div ref={sentinelRef} style={{ height: 1 }} /> : null}
        </div>

        <aside className="gallery-cta">
          <div>
            <h2>ชอบลุคไหน ส่งรูปให้ช่วยประเมินได้เลย</h2>
            <p>แจ้งวันงาน สถานที่ และจำนวนคนผ่าน LINE เพื่อเช็กคิวและราคาได้รวดเร็วขึ้น</p>
          </div>
          <a href="https://lin.ee/aZQJ4JQ" target="_blank" rel="noreferrer" className="u-btn u-btn--light">
            สอบถามคิวว่าง <FiArrowRight />
          </a>
        </aside>

        {lightbox !== null && lightboxSrc && (
          <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
            <img
              className="lightbox-img"
              src={lightboxSrc}
              alt={`${title} ${accent} ${lightbox + 1}`}
              decoding="async"
              draggable="false"
              onClick={(event) => event.stopPropagation()}
            />
            <button className="lightbox-btn lightbox-close" type="button" aria-label="Close" onClick={() => setLightbox(null)}><FiX /></button>
            <button className="lightbox-btn lightbox-prev" type="button" aria-label="Previous" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox - 1 + images.length) % images.length); }}><FiChevronLeft /></button>
            <button className="lightbox-btn lightbox-next" type="button" aria-label="Next" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % images.length); }}><FiChevronRight /></button>
            <span className="lightbox-counter">{lightbox + 1} / {images.length}</span>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default GalleryPage;
