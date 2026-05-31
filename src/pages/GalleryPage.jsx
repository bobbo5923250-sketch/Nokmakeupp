import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiMessageCircle, FiX } from 'react-icons/fi';

const PAGE_SIZE = 12;

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
      { threshold: 0.05, rootMargin: '120px' }
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
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0,0,0)' : 'translate3d(0,22px,0)',
      }}
    >
      {visible && (
        <>
          <img
            src={src}
            alt={`${title} ${globalIndex + 1}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            style={{ opacity: loaded ? 1 : 0 }}
          />
          <span className="tile-index">{String(globalIndex + 1).padStart(2, '0')}</span>
          <span className="tile-zoom">ดูภาพ</span>
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
    3
  );

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    requestAnimationFrame(() => element.classList.add('loaded'));
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

  const lightboxSrc = lightbox !== null ? images[lightbox]?.src : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Noto+Serif+Thai:wght@300;400;500;600&display=swap');

        :root {
          --cream: #f7f1ea;
          --ink: #17120f;
          --soft-ink: #5b5048;
          --gold: #b59664;
          --rose: #b97872;
        }

        .gallery-page {
          min-height: 100vh;
          padding: 128px clamp(1rem, 4vw, 3rem) 4rem;
          background:
            linear-gradient(180deg, #fbf8f4 0%, var(--cream) 44%, #ffffff 100%);
          color: var(--ink);
          font-family: 'Noto Sans Thai', sans-serif;
        }

        .gallery-hero {
          max-width: 1240px;
          margin: 0 auto 2.4rem;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 430px);
          gap: clamp(1.5rem, 5vw, 4rem);
          align-items: end;
          opacity: 0;
          transform: translate3d(0, 16px, 0);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .loaded .gallery-hero {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .gallery-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--rose);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.9rem;
        }

        .gallery-eyebrow::before {
          content: '';
          width: 42px;
          height: 1px;
          background: var(--rose);
        }

        .gallery-title {
          font-family: 'Noto Serif Thai', serif;
          font-size: clamp(2.55rem, 6.3vw, 5.9rem);
          font-weight: 400;
          line-height: 1.08;
          margin: 0;
        }

        .gallery-title em {
          color: var(--gold);
          font-style: italic;
        }

        .gallery-copy {
          color: var(--soft-ink);
          line-height: 1.8;
          margin: 0 0 1.4rem;
        }

        .gallery-meta {
          display: flex;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .gallery-pill {
          border: 1px solid rgba(181, 150, 100, 0.35);
          border-radius: 999px;
          padding: 0.55rem 0.85rem;
          color: var(--soft-ink);
          font-size: 0.72rem;
          font-weight: 500;
        }

        .masonry {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          max-width: 1240px;
          margin: 0 auto;
        }

        .masonry-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
          min-width: 0;
        }

        .masonry-tile {
          width: 100%;
          min-height: 120px;
          overflow: hidden;
          position: relative;
          padding: 0;
          border: 0;
          border-radius: 8px;
          background: #e7dcd0;
          cursor: pointer;
          transition: opacity 0.7s ease, transform 0.7s ease, box-shadow 0.28s ease;
          text-align: left;
        }

        .masonry-tile:hover {
          box-shadow: 0 18px 40px rgba(23, 18, 15, 0.16);
        }

        .masonry-tile img {
          width: 100%;
          height: auto;
          display: block;
          transform: scale(1);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }

        .masonry-tile:hover img {
          transform: scale(1.035);
        }

        .masonry-tile::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(23, 18, 15, 0);
          transition: background 0.28s ease;
        }

        .masonry-tile:hover::after {
          background: rgba(23, 18, 15, 0.18);
        }

        .tile-index {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 34px;
          height: 28px;
          border-radius: 999px;
          background: rgba(23,18,15,0.48);
          color: rgba(255,255,255,0.84);
          font-family: 'Noto Serif Thai', serif;
          font-size: 1rem;
          opacity: 0;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .masonry-tile:hover .tile-index {
          opacity: 1;
          transform: translateY(-2px);
        }

        .tile-zoom {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 2;
          transform: translate(-50%, -50%);
          opacity: 0;
          color: white;
          border: 1px solid rgba(255,255,255,0.62);
          border-radius: 4px;
          padding: 0.5rem 0.85rem;
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: opacity 0.28s ease;
        }

        .masonry-tile:hover .tile-zoom {
          opacity: 1;
        }

        .gallery-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 3rem 0 1rem;
        }

        .progress-track {
          width: 170px;
          height: 2px;
          background: rgba(181,150,100,0.2);
        }

        .progress-fill {
          height: 100%;
          background: var(--gold);
          transition: width 0.6s ease;
        }

        .progress-label {
          font-size: 0.74rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--soft-ink);
        }

        .gallery-cta {
          max-width: 1000px;
          margin: 3rem auto 0;
          padding: clamp(1.4rem, 4vw, 2.4rem);
          display: flex;
          justify-content: space-between;
          gap: 1.5rem;
          align-items: center;
          border-radius: 8px;
          background: #17120f;
          color: white;
        }

        .gallery-cta h2 {
          font-family: 'Noto Serif Thai', serif;
          font-size: clamp(1.9rem, 3.6vw, 3.1rem);
          font-weight: 400;
          line-height: 1.16;
          margin: 0 0 0.6rem;
        }

        .gallery-cta p {
          margin: 0;
          color: rgba(255,255,255,0.72);
          line-height: 1.7;
        }

        .line-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          min-height: 46px;
          padding: 0 1.1rem;
          border-radius: 6px;
          background: #f1d09a;
          color: #17120f;
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          white-space: nowrap;
          transition: transform 0.24s ease;
        }

        .line-btn:hover {
          transform: translateY(-2px);
        }

        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 12, 10, 0.95);
          animation: lbFadeIn 0.25s ease;
        }

        @keyframes lbFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-img {
          max-width: 86vw;
          max-height: 86vh;
          object-fit: contain;
          box-shadow: 0 26px 80px rgba(0,0,0,0.36);
        }

        .lightbox-panel {
          position: absolute;
          left: 1.5rem;
          bottom: 1.5rem;
          z-index: 2;
          width: min(360px, calc(100vw - 3rem));
          padding: 1rem;
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 8px;
          background: rgba(23,18,15,0.64);
          color: white;
          backdrop-filter: blur(14px);
        }

        .lightbox-panel span {
          display: block;
          color: #f1d09a;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 0.55rem;
        }

        .lightbox-panel h2 {
          font-family: 'Noto Serif Thai', serif;
          font-size: 1.9rem;
          font-weight: 400;
          line-height: 1.16;
          margin: 0 0 0.55rem;
        }

        .lightbox-panel p {
          color: rgba(255,255,255,0.72);
          font-size: 0.84rem;
          line-height: 1.65;
          margin: 0 0 0.9rem;
        }

        .lightbox-btn {
          position: absolute;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(255,255,255,0.24);
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.82);
          cursor: pointer;
          transition: color 0.2s ease, border-color 0.2s ease;
        }

        .lightbox-btn:hover {
          color: #f1d09a;
          border-color: rgba(241,208,154,0.5);
        }

        .lightbox-close { top: 1.5rem; right: 1.5rem; }
        .lightbox-prev { left: 1.5rem; top: 50%; transform: translateY(-50%); }
        .lightbox-next { right: 1.5rem; top: 50%; transform: translateY(-50%); }

        .lightbox-counter {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.55);
          font-size: 0.82rem;
          letter-spacing: 0.04em;
        }

        @media (max-width: 860px) {
          .gallery-page { padding-top: 100px; }
          .gallery-hero {
            grid-template-columns: 1fr;
          }
          .masonry { gap: 8px; }
          .masonry-col { gap: 8px; }
          .gallery-cta {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 560px) {
          .masonry {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          .masonry-col:nth-child(3) { display: none; }
          .line-btn { width: 100%; }
          .lightbox-panel {
            left: 0.75rem;
            right: 0.75rem;
            bottom: 4rem;
            width: auto;
          }
          .lightbox-counter { bottom: 1rem; }
          .lightbox-prev { left: 0.5rem; }
          .lightbox-next { right: 0.5rem; }
        }
      `}</style>

      <section className="gallery-page" ref={sectionRef}>
        <header className="gallery-hero">
          <div>
            <span className="gallery-eyebrow">{eyebrow}</span>
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
          <a href="https://lin.ee/aZQJ4JQ" target="_blank" rel="noreferrer" className="line-btn">
            สอบถามคิวว่าง <FiArrowRight />
          </a>
        </aside>

        {lightbox !== null && lightboxSrc && (
          <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
            <img
              className="lightbox-img"
              src={lightboxSrc}
              alt={`${title} ${accent} ${lightbox + 1}`}
              onClick={(event) => event.stopPropagation()}
            />
            <button className="lightbox-btn lightbox-close" type="button" aria-label="Close" onClick={() => setLightbox(null)}><FiX /></button>
            <button className="lightbox-btn lightbox-prev" type="button" aria-label="Previous" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox - 1 + images.length) % images.length); }}><FiChevronLeft /></button>
            <button className="lightbox-btn lightbox-next" type="button" aria-label="Next" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % images.length); }}><FiChevronRight /></button>
            <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
              <span>Reference #{String(lightbox + 1).padStart(2, '0')}</span>
              <h2>ใช้ลุคนี้เป็น reference</h2>
              <p>ถ้าชอบภาพนี้ ส่งให้ช่างพร้อมวันงานได้เลย จะช่วยประเมินโทนและรายละเอียดได้แม่นขึ้น</p>
              <a href="https://lin.ee/aZQJ4JQ" target="_blank" rel="noreferrer" className="line-btn">
                ส่งรูปนี้ทาง LINE <FiMessageCircle />
              </a>
            </div>
            <span className="lightbox-counter">{lightbox + 1} / {images.length}</span>
          </div>
        )}
      </section>
    </>
  );
};

export default GalleryPage;
