import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiCheckCircle, FiHeart, FiMessageCircle } from 'react-icons/fi';
import WomanImg1 from '../img/home/woman1.jpg';
import WomanImg2 from '../img/home/1.JPG';
import WomanImg3 from '../img/home/2.JPG';
import WomanImg4 from '../img/home/3.JPG';

const services = [
  {
    title: 'Bridal Makeup',
    eyebrow: 'Wedding day',
    copy: 'ลุคเจ้าสาวที่ติดทน ถ่ายรูปสวย และยังเป็นตัวคุณในทุกมุมกล้อง',
    image: WomanImg2,
    to: '/wedding',
  },
  {
    title: 'Event Makeup',
    eyebrow: 'Daily & event',
    copy: 'แต่งหน้าออกงาน รับปริญญา พรีเวดดิ้ง หรือวันสำคัญที่ต้องดูมั่นใจเป็นพิเศษ',
    image: WomanImg3,
    to: '/daily',
  },
  {
    title: 'Portfolio',
    eyebrow: 'Selected works',
    copy: 'รวมผลงานจริงเพื่อให้เห็นสไตล์ผิว งานตา และโทนสีที่เลือกได้ตามโอกาส',
    image: WomanImg4,
    to: '/all',
  },
];

const proofPoints = [
  'ประเมินลุคให้เข้ากับชุด โทนผิว และสถานที่',
  'งานผิวละเอียด ดูแพง ไม่หนักหน้า',
  'จองคิวและปรึกษาลุคผ่าน LINE ได้ทันที',
];

const lookMoods = [
  {
    name: 'Soft Bride',
    tone: 'ละมุน หวาน ถ่ายรูปแพง',
    copy: 'เหมาะกับเจ้าสาวที่อยากได้งานผิวสว่าง ตาละมุน และดู timeless ในภาพพิธี',
    image: WomanImg2,
    colors: ['#eac8ba', '#d8a59a', '#f5dec0'],
  },
  {
    name: 'Clean Glam',
    tone: 'ผิวใส คมขึ้น แต่ไม่หนัก',
    copy: 'เหมาะกับงานเย็น รับปริญญา พรีเวดดิ้ง หรือวันที่อยากดูมีพลังขึ้นบนกล้อง',
    image: WomanImg3,
    colors: ['#c58f82', '#8d5f54', '#efd2a1'],
  },
  {
    name: 'Camera Luxe',
    tone: 'โครงชัด แสงแฟลชสวย',
    copy: 'เหมาะกับงานที่มีไฟเยอะหรือถ่ายภาพจริงจัง เน้นมิติหน้าและความติดทนตลอดงาน',
    image: WomanImg4,
    colors: ['#b59664', '#6d5048', '#f1d09a'],
  },
];

function warmImage(src, priority = 'low') {
  const img = new Image();
  img.decoding = 'async';
  img.fetchPriority = priority;
  img.src = src;
  return img.decode?.().catch(() => undefined);
}

const Home = () => {
  const heroRef = useRef(null);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [activeLook, setActiveLook] = useState(0);

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;
    requestAnimationFrame(() => root.classList.add('loaded'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('reveal');
      });
    }, { threshold: 0.14 });

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'image';
    preload.href = WomanImg1;
    preload.fetchPriority = 'high';
    document.head.appendChild(preload);

    const warmTimer = window.setTimeout(() => {
      [WomanImg2, WomanImg3, WomanImg4].forEach((src) => warmImage(src));
    }, 450);

    return () => {
      document.head.removeChild(preload);
      window.clearTimeout(warmTimer);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Noto+Serif+Thai:wght@300;400;500;600&display=swap');

        :root {
          --white: #ffffff;
          --ink: #17120f;
          --soft-ink: #544941;
          --gold: #b59664;
          --rose: #b97872;
          --cream: #f7f1ea;
          --line: rgba(23, 18, 15, 0.12);
        }

        .home-page {
          background: var(--white);
          color: var(--ink);
          font-family: 'Noto Sans Thai', sans-serif;
        }

        .hero-fullscreen {
          position: relative;
          min-height: 100svh;
          width: 100%;
          display: grid;
          align-items: end;
          justify-items: end;
          overflow: hidden;
          color: var(--white);
          background: #17120f;
          padding: 120px clamp(1.25rem, 5vw, 5rem) 42px;
        }

        .hero-bg-wrapper,
        .hero-overlay {
          position: absolute;
          inset: 0;
        }

        .hero-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          transform: scale(1.04);
          transition: opacity 0.8s ease, transform 2.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .loaded .hero-bg-image { transform: scale(1); }

        .hero-overlay {
          background:
            linear-gradient(270deg, rgba(10,8,7,0.76) 0%, rgba(10,8,7,0.42) 45%, rgba(10,8,7,0.10) 100%),
            linear-gradient(0deg, rgba(10,8,7,0.66) 0%, rgba(10,8,7,0.04) 56%);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 760px;
          margin-left: auto;
          text-align: right;
          opacity: 0;
          transform: translate3d(0, 28px, 0);
          transition: opacity 1.1s ease 0.3s, transform 1.1s ease 0.3s;
        }

        .loaded .hero-content { opacity: 1; transform: translate3d(0, 0, 0); }

        .hero-kicker,
        .section-kicker,
        .service-eyebrow {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-kicker {
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.7rem;
          color: rgba(255,255,255,0.84);
          margin-bottom: 1.2rem;
        }

        .hero-kicker::before {
          content: '';
          width: 42px;
          height: 1px;
          background: var(--gold);
        }

        .hero-title {
          font-family: 'Noto Serif Thai', serif;
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 400;
          line-height: 1.02;
          margin: 0 0 1.3rem;
          max-width: 720px;
        }

        .hero-title em { color: #e4c28a; font-style: italic; }

        .hero-copy {
          max-width: 560px;
          margin-left: auto;
          color: rgba(255,255,255,0.82);
          font-size: clamp(1rem, 1.55vw, 1.14rem);
          line-height: 1.9;
          margin: 0 0 1.8rem;
        }

        .hero-actions,
        .section-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          align-items: center;
          justify-content: flex-end;
        }

        .primary-btn,
        .ghost-btn,
        .text-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          min-height: 46px;
          padding: 0 1.2rem;
          border-radius: 6px;
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: transform 0.24s ease, background 0.24s ease, color 0.24s ease, border-color 0.24s ease;
        }

        .primary-btn {
          background: #f1d09a;
          color: #17120f;
          border: 1px solid #f1d09a;
        }

        .primary-btn:hover,
        .ghost-btn:hover,
        .text-link:hover {
          transform: translateY(-2px);
        }

        .ghost-btn {
          color: var(--white);
          border: 1px solid rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.08);
        }

        .showcase-section,
        .look-section,
        .signature-section,
        .cta-section {
          padding: clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 5rem);
        }

        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 2rem;
          max-width: 1240px;
          margin: 0 auto 2rem;
        }

        .section-kicker {
          color: var(--rose);
          margin-bottom: 0.7rem;
        }

        .section-title {
          font-family: 'Noto Serif Thai', serif;
          font-size: clamp(2.25rem, 4.6vw, 4.5rem);
          font-weight: 400;
          line-height: 1.14;
          margin: 0;
        }

        .section-title em { color: var(--gold); font-style: italic; }

        .section-copy {
          max-width: 490px;
          color: var(--soft-ink);
          line-height: 1.8;
          margin: 0;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          max-width: 1240px;
          margin: 0 auto;
        }

        .service-card {
          position: relative;
          min-height: 610px;
          overflow: hidden;
          border-radius: 8px;
          background: #e8dfd2;
          opacity: 0;
          transform: translate3d(0, 34px, 0);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .service-card::before,
        .signature-image::before,
        .look-preview::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, #dfd2c5 8%, #f2e8dc 18%, #dfd2c5 33%);
          background-size: 200% 100%;
          animation: imageSheen 1.1s linear infinite;
          z-index: 0;
        }

        @keyframes imageSheen {
          to { background-position-x: -200%; }
        }

        .service-card.reveal { opacity: 1; transform: translate3d(0, 0, 0); }

        .service-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          inset: 0;
          transform: scale(1);
          transition: transform 0.9s ease;
          z-index: 1;
        }

        .service-card:hover img { transform: scale(1.045); }

        .service-overlay-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.4rem;
          background: linear-gradient(to top, rgba(12,9,7,0.78), rgba(12,9,7,0.06) 62%);
          color: white;
          z-index: 2;
        }

        .service-panel {
          border-top: 1px solid rgba(255,255,255,0.26);
          padding-top: 1.1rem;
        }

        .service-eyebrow {
          color: #f1d09a;
          display: block;
          margin-bottom: 0.65rem;
        }

        .service-panel h3 {
          font-family: 'Noto Serif Thai', serif;
          font-size: clamp(1.85rem, 2.7vw, 2.75rem);
          font-weight: 400;
          line-height: 1.12;
          margin: 0 0 0.75rem;
        }

        .service-panel p {
          color: rgba(255,255,255,0.78);
          line-height: 1.65;
          margin: 0 0 1.1rem;
          min-height: 78px;
        }

        .text-link {
          min-height: auto;
          padding: 0;
          color: white;
        }

        .look-section {
          background: #17120f;
          color: white;
          overflow: hidden;
        }

        .look-studio {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
          gap: clamp(2rem, 6vw, 5rem);
          align-items: center;
        }

        .look-section .section-copy {
          color: rgba(255,255,255,0.72);
          margin-top: 1rem;
        }

        .look-tabs {
          display: grid;
          gap: 0.8rem;
          margin-top: 2rem;
        }

        .look-tab {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.9rem;
          align-items: center;
          width: 100%;
          padding: 1rem;
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          color: white;
          cursor: pointer;
          text-align: left;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }

        .look-tab:hover,
        .look-tab.is-active {
          background: rgba(241,208,154,0.12);
          border-color: rgba(241,208,154,0.45);
          transform: translateX(4px);
        }

        .look-number {
          font-family: 'Noto Serif Thai', serif;
          color: #f1d09a;
          font-size: 1.55rem;
          line-height: 1;
        }

        .look-tab strong {
          display: block;
          font-family: 'Noto Serif Thai', serif;
          font-size: 1.5rem;
          font-weight: 400;
          line-height: 1;
          margin-bottom: 0.3rem;
        }

        .look-tab span:not(.look-number) {
          color: rgba(255,255,255,0.66);
          font-size: 0.82rem;
        }

        .look-arrow {
          color: rgba(255,255,255,0.42);
          transition: transform 0.25s ease, color 0.25s ease;
        }

        .look-tab.is-active .look-arrow,
        .look-tab:hover .look-arrow {
          color: #f1d09a;
          transform: translateX(3px);
        }

        .look-preview {
          position: relative;
          min-height: 680px;
          border-radius: 8px;
          overflow: hidden;
          background: #2c211d;
          isolation: isolate;
        }

        .look-preview img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: lookFade 0.5s ease;
          z-index: 1;
        }

        @keyframes lookFade {
          from { opacity: 0.35; transform: scale(1.035); }
          to { opacity: 1; transform: scale(1); }
        }

        .look-preview::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(12,9,7,0.78), rgba(12,9,7,0.08) 58%);
          z-index: 1;
        }

        .look-card {
          position: absolute;
          left: 1.3rem;
          right: 1.3rem;
          bottom: 1.3rem;
          z-index: 2;
          padding: 1.2rem;
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 8px;
          background: rgba(23,18,15,0.62);
          backdrop-filter: blur(14px);
        }

        .look-card h3 {
          font-family: 'Noto Serif Thai', serif;
          font-size: clamp(2rem, 3.6vw, 3.6rem);
          font-weight: 400;
          line-height: 1.12;
          margin: 0 0 0.7rem;
        }

        .look-card p {
          color: rgba(255,255,255,0.76);
          line-height: 1.75;
          margin: 0 0 1rem;
        }

        .look-swatches {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .look-swatch {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.42);
        }

        .floating-book {
          position: fixed;
          right: 1.2rem;
          bottom: 1.2rem;
          z-index: 45;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          min-height: 46px;
          padding: 0 1rem;
          border-radius: 999px;
          background: #17120f;
          color: white;
          text-decoration: none;
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          box-shadow: 0 14px 34px rgba(23,18,15,0.24);
          transition: transform 0.24s ease, background 0.24s ease;
        }

        .floating-book:hover {
          transform: translateY(-3px);
          background: #2a211c;
        }

        .signature-section {
          background: var(--cream);
        }

        .signature-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: clamp(2rem, 6vw, 5rem);
          align-items: center;
        }

        .signature-image {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: 8px;
          overflow: hidden;
          background: #e3d8cc;
        }

        .signature-image img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .proof-list {
          display: grid;
          gap: 0.9rem;
          margin: 1.7rem 0 2rem;
          padding: 0;
          list-style: none;
        }

        .proof-list li {
          display: flex;
          gap: 0.8rem;
          align-items: flex-start;
          color: var(--soft-ink);
          line-height: 1.65;
        }

        .proof-list svg {
          color: var(--rose);
          flex: 0 0 auto;
          margin-top: 0.25rem;
        }

        .cta-section {
          background: #17120f;
          color: white;
        }

        .cta-inner {
          max-width: 1040px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        .cta-inner .section-copy {
          color: rgba(255,255,255,0.74);
        }

        @media (max-width: 980px) {
          .hero-fullscreen { align-items: end; }
          .services-grid,
          .look-studio,
          .signature-inner {
            grid-template-columns: 1fr;
          }
          .look-preview { min-height: 560px; }
          .service-card { min-height: 520px; }
          .section-head,
          .cta-inner {
            align-items: flex-start;
            flex-direction: column;
          }
          .service-panel p { min-height: auto; }
        }

        @media (max-width: 640px) {
          .home-page {
            padding-bottom: 74px;
          }

          .hero-fullscreen {
            align-items: end;
            justify-items: stretch;
            min-height: 100svh;
            overflow: hidden;
            padding: 92px 1rem 1.1rem;
          }

          .hero-bg-image {
            object-position: 43% 16%;
          }

          .hero-overlay {
            background:
              linear-gradient(180deg, rgba(10,8,7,0.08) 0%, rgba(10,8,7,0.28) 34%, rgba(10,8,7,0.86) 100%),
              linear-gradient(90deg, rgba(10,8,7,0.28), rgba(10,8,7,0.08));
          }

          .hero-content {
            text-align: left;
            margin-left: 0;
            max-width: none;
            padding: 0.2rem 0 0;
          }

          .hero-kicker {
            justify-content: flex-start;
            margin-bottom: 0.75rem;
            font-size: 0.68rem;
            color: rgba(255,255,255,0.78);
          }

          .hero-kicker::before { width: 30px; }

          .hero-copy {
            margin-left: 0;
            max-width: 24rem;
            margin-bottom: 1rem;
          }

          .hero-title {
            max-width: 20rem;
            font-size: clamp(2.25rem, 11vw, 3.35rem);
            line-height: 1.08;
            margin-bottom: 0.8rem;
          }

          .hero-copy { font-size: 0.94rem; }

          .hero-actions {
            display: grid;
            grid-template-columns: 1fr;
            align-items: stretch;
            justify-content: stretch;
            gap: 0.65rem;
          }

          .primary-btn,
          .ghost-btn {
            width: 100%;
            min-height: 48px;
            border-radius: 8px;
          }

          .showcase-section,
          .look-section,
          .signature-section,
          .cta-section {
            padding: 3.2rem 1rem;
          }

          .section-head {
            gap: 0.9rem;
            margin-bottom: 1.2rem;
          }

          .section-kicker {
            font-size: 0.66rem;
            margin-bottom: 0.45rem;
          }

          .section-title {
            font-size: clamp(2rem, 10vw, 3rem);
            line-height: 1.12;
          }

          .section-copy {
            font-size: 0.94rem;
            line-height: 1.75;
          }

          .services-grid {
            gap: 0.9rem;
          }

          .service-card {
            min-height: 460px;
            border-radius: 10px;
          }

          .service-overlay-content {
            padding: 1rem;
          }

          .service-panel h3 {
            font-size: 2rem;
          }

          .service-panel p {
            font-size: 0.92rem;
            line-height: 1.65;
          }

          .look-studio {
            gap: 1.25rem;
          }

          .look-tabs {
            display: flex;
            overflow-x: auto;
            gap: 0.65rem;
            margin: 1.25rem -1rem 0;
            padding: 0 1rem 0.2rem;
            scroll-snap-type: x proximity;
            scrollbar-width: none;
          }

          .look-tabs::-webkit-scrollbar { display: none; }

          .look-tab {
            flex: 0 0 82%;
            grid-template-columns: auto 1fr;
            padding: 0.9rem;
            scroll-snap-align: start;
          }

          .look-arrow { display: none; }

          .look-preview {
            min-height: 500px;
            border-radius: 10px;
          }

          .look-card {
            left: 0.85rem;
            right: 0.85rem;
            bottom: 0.85rem;
            padding: 1rem;
          }

          .look-card h3 {
            font-size: 2rem;
          }

          .signature-inner {
            gap: 1.25rem;
          }

          .signature-image {
            border-radius: 10px;
          }

          .proof-list {
            gap: 0.75rem;
            margin: 1.2rem 0 1.4rem;
          }

          .cta-inner {
            gap: 1.1rem;
          }

          .floating-book {
            left: 0.9rem;
            right: 0.9rem;
            bottom: 0.9rem;
            min-height: 52px;
            justify-content: center;
            padding: 0 1rem;
            border-radius: 10px;
            background: #17120f;
            font-size: 0.84rem;
            box-shadow: 0 14px 32px rgba(23,18,15,0.28);
          }
        }
      `}</style>

      <main className="home-page" ref={heroRef}>
        <section className="hero-fullscreen">
          <div className="hero-bg-wrapper">
            <img
              src={WomanImg1}
              alt="Nokmakeupp professional makeup portfolio"
              className="hero-bg-image"
              decoding="async"
              fetchPriority="high"
              draggable="false"
              onLoad={(event) => {
                const decoded = event.currentTarget.decode?.();
                if (decoded) decoded.finally(() => setHeroLoaded(true));
                else setHeroLoaded(true);
              }}
              style={{ opacity: heroLoaded ? 1 : 0 }}
            />
          </div>
          <div className="hero-overlay" />

          <div>
            <div className="hero-content">
              <span className="hero-kicker">Nokmakeupp Korat</span>
              <h1 className="hero-title">Makeup that feels <em>beautiful</em> in real life</h1>
              <p className="hero-copy">
                แต่งหน้ามืออาชีพสำหรับเจ้าสาว ออกงาน และวันสำคัญ เน้นงานผิวละมุน โครงหน้าชัด
                ถ่ายรูปขึ้นกล้อง และดูแพงแบบไม่เกินตัว
              </p>
              <div className="hero-actions">
                <a href="https://lin.ee/aZQJ4JQ" target="_blank" rel="noreferrer" className="primary-btn">
                  <FiCalendar /> จองคิวผ่าน LINE
                </a>
                <a href="#work" className="ghost-btn">
                  ดูผลงาน <FiArrowRight />
                </a>
              </div>
            </div>

          </div>
        </section>

        <section className="showcase-section" id="work">
          <div className="section-head">
            <div>
              <p className="section-kicker">Selected services</p>
              <h2 className="section-title">Choose your <em>occasion</em></h2>
            </div>
            <p className="section-copy">
              เลือกดูผลงานตามโอกาส เพื่อเทียบสไตล์งานผิว งานตา และความติดทนก่อนตัดสินใจจองคิว
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <article className="service-card scroll-reveal" style={{ transitionDelay: `${index * 0.12}s` }} key={service.title}>
                <img src={service.image} alt={service.title} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" draggable="false" />
                <div className="service-overlay-content">
                  <div className="service-panel">
                    <span className="service-eyebrow">{service.eyebrow}</span>
                    <h3>{service.title}</h3>
                    <p>{service.copy}</p>
                    <Link to={service.to} className="text-link">ดูผลงาน <FiArrowRight /></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="look-section">
          <div className="look-studio">
            <div className="scroll-reveal">
              <p className="section-kicker">Interactive look studio</p>
              <h2 className="section-title">ลองเลือก <em>mood</em> ก่อนจอง</h2>
              <p className="section-copy">
                เลือกโทนที่ใกล้กับสไตล์ที่ชอบ แล้วส่งชื่อ mood ผ่าน LINE เพื่อให้ช่วยแนะนำลุคที่เข้ากับชุดและวันงานได้เร็วขึ้น
              </p>

              <div className="look-tabs">
                {lookMoods.map((look, index) => (
                  <button
                    className={`look-tab ${activeLook === index ? 'is-active' : ''}`}
                    type="button"
                    key={look.name}
                    onClick={() => setActiveLook(index)}
                  >
                    <span className="look-number">0{index + 1}</span>
                    <span>
                      <strong>{look.name}</strong>
                      {look.tone}
                    </span>
                    <FiArrowRight className="look-arrow" />
                  </button>
                ))}
              </div>
            </div>

            <div className="look-preview scroll-reveal">
              <img src={lookMoods[activeLook].image} alt={lookMoods[activeLook].name} loading="lazy" decoding="async" draggable="false" />
              <div className="look-card">
                <div className="look-swatches" aria-hidden="true">
                  {lookMoods[activeLook].colors.map((color) => (
                    <span className="look-swatch" style={{ background: color }} key={color} />
                  ))}
                </div>
                <h3>{lookMoods[activeLook].name}</h3>
                <p>{lookMoods[activeLook].copy}</p>
                <a href="https://lin.ee/aZQJ4JQ" target="_blank" rel="noreferrer" className="text-link">
                  ส่ง mood นี้ให้ช่าง <FiMessageCircle />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="signature-section">
          <div className="signature-inner">
            <div className="signature-image scroll-reveal">
              <img src={WomanImg2} alt="Soft bridal makeup detail" loading="lazy" decoding="async" draggable="false" />
            </div>
            <div className="signature-copy scroll-reveal">
              <p className="section-kicker">Why book with us</p>
              <h2 className="section-title">ลุคสวยที่คิดมาให้ครบตั้งแต่หน้าเว็บจนถึงวันจริง</h2>
              <p className="section-copy">
                ลูกค้าแต่ละคนมีโทนผิว สไตล์ชุด และความมั่นใจไม่เหมือนกัน เราจึงคุยลุคก่อนจอง
                เพื่อให้ผลลัพธ์ออกมาสวย ดูมืออาชีพ และใช้งานได้จริงตลอดงาน
              </p>
              <ul className="proof-list">
                {proofPoints.map((point) => (
                  <li key={point}><FiCheckCircle /> <span>{point}</span></li>
                ))}
              </ul>
              <a href="https://lin.ee/aZQJ4JQ" target="_blank" rel="noreferrer" className="primary-btn">
                สอบถามราคาและคิวว่าง <FiArrowRight />
              </a>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-inner">
            <div>
              <p className="section-kicker">Ready for your date</p>
              <h2 className="section-title">ส่งวันงานมาได้เลย เดี๋ยวช่วยดูคิวให้</h2>
              <p className="section-copy">แนะนำแจ้งวันที่ สถานที่ จำนวนคน และลุคที่ชอบ เพื่อประเมินราคาได้แม่นขึ้น</p>
            </div>
            <a href="https://lin.ee/aZQJ4JQ" target="_blank" rel="noreferrer" className="primary-btn">
              จองคิวตอนนี้ <FiCalendar />
            </a>
          </div>
        </section>

        <a href="https://lin.ee/aZQJ4JQ" target="_blank" rel="noreferrer" className="floating-book">
          <FiHeart /> จองคิว
        </a>
      </main>
    </>
  );
};

export default Home;
