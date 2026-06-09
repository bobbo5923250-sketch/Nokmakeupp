import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiCheck,
  FiMessageCircle,
  FiStar,
} from 'react-icons/fi';
import Footer from '../components/Footer';
import HeroImg from '../img/home/woman1.jpg';
import WomanImg2 from '../img/home/1.JPG';
import WomanImg3 from '../img/home/2.JPG';
import WomanImg4 from '../img/home/3.JPG';

const stats = [
  { value: '8+', label: 'ปีประสบการณ์' },
  { value: '500+', label: 'ลูกค้าที่ไว้ใจ' },
  { value: '4.9', label: 'คะแนนรีวิว' },
];

const services = [
  {
    title: 'Bridal Makeup',
    eyebrow: 'Wedding day',
    copy: 'ลุคเจ้าสาวที่ติดทนทั้งวัน ถ่ายรูปสวย และยังเป็นตัวคุณในทุกมุมกล้อง',
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
    title: 'Full Portfolio',
    eyebrow: 'Selected works',
    copy: 'รวมผลงานจริงให้เห็นสไตล์งานผิว งานตา และโทนสีที่เลือกได้ตามโอกาส',
    image: WomanImg4,
    to: '/all',
  },
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

const steps = [
  {
    no: '01',
    title: 'ทักมาปรึกษาลุค',
    copy: 'ส่งวันงาน สถานที่ และรูปลุคที่ชอบทาง LINE เพื่อให้ช่วยแนะนำสไตล์ที่ใช่',
  },
  {
    no: '02',
    title: 'จองคิว & เช็กราคา',
    copy: 'ยืนยันคิวด้วยมัดจำ พร้อมสรุปรายละเอียดและราคาที่ชัดเจนตั้งแต่ต้น',
  },
  {
    no: '03',
    title: 'วันงานสวยมั่นใจ',
    copy: 'ถึงวันจริงเตรียมงานผิวให้ละเอียด ติดทน และดูแพงในทุกช็อต',
  },
];

const proofPoints = [
  'ประเมินลุคให้เข้ากับชุด โทนผิว และสถานที่จัดงาน',
  'งานผิวละเอียด ดูแพง ติดทน ไม่หนักหน้า',
  'ใช้แบรนด์เครื่องสำอางคุณภาพ ปลอดภัยกับผิว',
  'จองคิวและปรึกษาลุคผ่าน LINE ได้สะดวกทุกขั้นตอน',
];

function warmImage(src) {
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
  return img.decode?.().catch(() => undefined);
}

const Home = () => {
  const pageRef = useRef(null);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [activeLook, setActiveLook] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    const root = pageRef.current;
    if (root) root.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      [WomanImg2, WomanImg3, WomanImg4].forEach((src) => warmImage(src));
    }, 500);
    return () => window.clearTimeout(timer);
  }, []);

  const look = lookMoods[activeLook];

  return (
    <>
      <style>{`
        .home {
          font-family: var(--font-sans);
          color: var(--ink);
          background: var(--ivory);
        }

        .serif { font-family: var(--font-serif); }

        /* ---------- HERO ---------- */
        .hero {
          position: relative;
          padding: clamp(7rem, 14vw, 11rem) clamp(1.25rem, 5vw, 5rem) clamp(3rem, 6vw, 5rem);
          max-width: 1320px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: center;
        }

        .hero-eyebrow { margin-bottom: 1.6rem; }

        .hero-title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(2.8rem, 6vw, 5.4rem);
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin: 0 0 1.6rem;
        }
        .hero-title em {
          font-style: italic;
          color: var(--mocha);
        }

        .hero-copy {
          max-width: 460px;
          color: var(--soft);
          font-size: clamp(1rem, 1.4vw, 1.12rem);
          line-height: 1.85;
          margin: 0 0 2.2rem;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-bottom: 2.8rem;
        }

        .hero-stats {
          display: flex;
          gap: clamp(1.5rem, 4vw, 3rem);
        }
        .hero-stat-value {
          font-family: var(--font-serif);
          font-size: clamp(1.7rem, 3vw, 2.4rem);
          line-height: 1;
          color: var(--ink);
        }
        .hero-stat-label {
          display: block;
          margin-top: 0.4rem;
          font-size: 0.78rem;
          color: var(--soft);
          letter-spacing: 0.02em;
        }
        .hero-stat + .hero-stat {
          padding-left: clamp(1.5rem, 4vw, 3rem);
          border-left: 1px solid var(--line);
        }

        /* hero image */
        .hero-visual {
          position: relative;
        }
        .hero-frame {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: 220px 220px 18px 18px;
          overflow: hidden;
          background: var(--sand);
          box-shadow: var(--shadow-lg);
        }
        .hero-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 18%;
          transform: scale(1.05);
          transition: opacity 0.9s var(--ease), transform 2.2s var(--ease);
          opacity: 0;
        }
        .hero-frame img.loaded { opacity: 1; transform: scale(1); }

        .hero-badge {
          position: absolute;
          left: -1.2rem;
          bottom: 2.2rem;
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.85rem 1.2rem;
          background: rgba(250, 247, 242, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--line-soft);
          border-radius: 16px;
          box-shadow: var(--shadow-md);
        }
        .hero-badge-dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #4caf72;
          box-shadow: 0 0 0 4px rgba(76, 175, 114, 0.18);
        }
        .hero-badge strong {
          display: block;
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--ink);
        }
        .hero-badge span {
          font-size: 0.72rem;
          color: var(--soft);
        }

        .hero-tag {
          position: absolute;
          right: -0.6rem;
          top: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1rem;
          background: var(--ink);
          color: var(--ivory);
          border-radius: 999px;
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          box-shadow: var(--shadow-md);
        }
        .hero-tag svg { color: var(--gold); }

        /* ---------- SECTION SHELL ---------- */
        .section {
          padding: clamp(4rem, 9vw, 8rem) clamp(1.25rem, 5vw, 5rem);
        }
        .section-inner { max-width: 1240px; margin: 0 auto; }

        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2rem;
          margin-bottom: clamp(2rem, 4vw, 3.5rem);
        }
        .section-title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(2.1rem, 4.4vw, 3.8rem);
          line-height: 1.12;
          margin: 0.8rem 0 0;
          max-width: 14ch;
        }
        .section-title em { font-style: italic; color: var(--mocha); }
        .section-copy {
          max-width: 420px;
          color: var(--soft);
          line-height: 1.85;
          margin: 0;
        }

        /* ---------- SERVICES ---------- */
        .services {
          background: var(--cream);
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2vw, 1.6rem);
        }
        .service-card {
          background: var(--ivory);
          border: 1px solid var(--line-soft);
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease);
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
        }
        .service-media {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: var(--sand);
        }
        .service-media img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.8s var(--ease);
        }
        .service-card:hover .service-media img { transform: scale(1.06); }
        .service-eyebrow {
          position: absolute;
          top: 1rem; left: 1rem;
          padding: 0.4rem 0.8rem;
          background: rgba(250, 247, 242, 0.92);
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--mocha-deep);
        }
        .service-body { padding: 1.5rem 1.5rem 1.7rem; }
        .service-body h3 {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: 1.65rem;
          margin: 0 0 0.6rem;
        }
        .service-body p {
          color: var(--soft);
          line-height: 1.7;
          font-size: 0.94rem;
          margin: 0 0 1.2rem;
          min-height: 64px;
        }
        .service-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--ink);
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: gap 0.3s var(--ease), color 0.3s var(--ease);
        }
        .service-link:hover { gap: 0.8rem; color: var(--mocha-deep); }

        /* ---------- LOOK STUDIO (dark) ---------- */
        .look {
          background: var(--ink);
          color: var(--ivory);
        }
        .look .section-title { color: var(--ivory); }
        .look .section-copy { color: rgba(250, 247, 242, 0.66); }
        .look .u-eyebrow { color: var(--gold); }
        .look .u-eyebrow::before { background: var(--gold); }

        .look-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: clamp(2rem, 5vw, 4rem);
          align-items: center;
        }
        .look-tabs { display: grid; gap: 0.8rem; margin-top: 2.2rem; }
        .look-tab {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 1rem;
          align-items: center;
          width: 100%;
          padding: 1.1rem 1.2rem;
          border: 1px solid rgba(250, 247, 242, 0.14);
          border-radius: 14px;
          background: rgba(250, 247, 242, 0.03);
          color: var(--ivory);
          cursor: pointer;
          text-align: left;
          transition: background 0.3s var(--ease), border-color 0.3s var(--ease), transform 0.3s var(--ease);
        }
        .look-tab:hover, .look-tab.is-active {
          background: rgba(194, 168, 120, 0.12);
          border-color: rgba(194, 168, 120, 0.5);
          transform: translateX(5px);
        }
        .look-num {
          font-family: var(--font-serif);
          color: var(--gold);
          font-size: 1.5rem;
          line-height: 1;
        }
        .look-tab strong {
          display: block;
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: 1.4rem;
          line-height: 1.1;
          margin-bottom: 0.25rem;
        }
        .look-tab small {
          color: rgba(250, 247, 242, 0.6);
          font-size: 0.82rem;
        }
        .look-arrow {
          color: rgba(250, 247, 242, 0.4);
          transition: transform 0.3s var(--ease), color 0.3s var(--ease);
        }
        .look-tab.is-active .look-arrow, .look-tab:hover .look-arrow {
          color: var(--gold);
          transform: translateX(4px);
        }

        .look-preview {
          position: relative;
          aspect-ratio: 3 / 4;
          border-radius: 20px;
          overflow: hidden;
          background: #2c211d;
        }
        .look-preview img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          animation: lookFade 0.6s var(--ease);
        }
        @keyframes lookFade {
          from { opacity: 0.3; transform: scale(1.04); }
          to { opacity: 1; transform: scale(1); }
        }
        .look-preview::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(20,16,13,0.82), rgba(20,16,13,0.05) 58%);
        }
        .look-card {
          position: absolute;
          left: 1.3rem; right: 1.3rem; bottom: 1.3rem;
          z-index: 2;
          padding: 1.4rem;
          border: 1px solid rgba(250, 247, 242, 0.16);
          border-radius: 16px;
          background: rgba(20, 16, 13, 0.5);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .look-swatches { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .look-swatch {
          width: 26px; height: 26px;
          border-radius: 50%;
          border: 1px solid rgba(250, 247, 242, 0.4);
        }
        .look-card h3 {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(1.7rem, 3vw, 2.4rem);
          margin: 0 0 0.6rem;
        }
        .look-card p {
          color: rgba(250, 247, 242, 0.74);
          line-height: 1.7;
          font-size: 0.92rem;
          margin: 0 0 1.1rem;
        }
        .look-card a {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--gold);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          transition: gap 0.3s var(--ease);
        }
        .look-card a:hover { gap: 0.8rem; }

        /* ---------- PROCESS ---------- */
        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.2rem, 3vw, 2.5rem);
        }
        .process-step {
          padding-top: 1.6rem;
          border-top: 2px solid var(--line);
          transition: border-color 0.3s var(--ease);
        }
        .process-step:hover { border-color: var(--mocha); }
        .process-no {
          font-family: var(--font-serif);
          font-size: 2.6rem;
          color: var(--mocha);
          line-height: 1;
          margin-bottom: 1rem;
        }
        .process-step h3 {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: 1.5rem;
          margin: 0 0 0.7rem;
        }
        .process-step p {
          color: var(--soft);
          line-height: 1.75;
          font-size: 0.95rem;
          margin: 0;
        }

        /* ---------- SIGNATURE ---------- */
        .signature { background: var(--cream); }
        .signature-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: clamp(2rem, 5vw, 4.5rem);
          align-items: center;
        }
        .signature-media {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: 20px;
          overflow: hidden;
          background: var(--sand);
          box-shadow: var(--shadow-md);
        }
        .signature-media img { width: 100%; height: 100%; object-fit: cover; }
        .proof-list { list-style: none; padding: 0; margin: 1.8rem 0 2.2rem; display: grid; gap: 1rem; }
        .proof-list li {
          display: flex;
          gap: 0.85rem;
          align-items: flex-start;
          color: var(--soft);
          line-height: 1.65;
        }
        .proof-check {
          flex: 0 0 auto;
          width: 26px; height: 26px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(164, 120, 100, 0.14);
          color: var(--mocha-deep);
          font-size: 0.8rem;
          margin-top: 0.1rem;
        }

        /* ---------- QUOTE ---------- */
        .quote {
          background: var(--ink);
          color: var(--ivory);
          text-align: center;
        }
        .quote-inner { max-width: 880px; margin: 0 auto; }
        .quote-stars {
          display: inline-flex;
          gap: 0.3rem;
          color: var(--gold);
          margin-bottom: 1.6rem;
          font-size: 1rem;
        }
        .quote blockquote {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(1.5rem, 3.4vw, 2.6rem);
          line-height: 1.4;
          margin: 0 0 1.8rem;
        }
        .quote blockquote em { font-style: italic; color: var(--gold); }
        .quote cite {
          font-style: normal;
          color: rgba(250, 247, 242, 0.6);
          font-size: 0.9rem;
          letter-spacing: 0.04em;
        }

        /* ---------- CTA ---------- */
        .cta { padding: clamp(4rem, 9vw, 7rem) clamp(1.25rem, 5vw, 5rem); }
        .cta-card {
          max-width: 1100px;
          margin: 0 auto;
          background: linear-gradient(135deg, #b58a72 0%, var(--mocha-deep) 100%);
          border-radius: 28px;
          padding: clamp(2.5rem, 6vw, 4.5rem);
          color: var(--ivory);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2.5rem;
          box-shadow: var(--shadow-lg);
        }
        .cta-card h2 {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.14;
          margin: 0 0 0.9rem;
          max-width: 16ch;
        }
        .cta-card p {
          color: rgba(255, 255, 255, 0.84);
          line-height: 1.75;
          margin: 0;
          max-width: 44ch;
        }

        /* ---------- FLOATING BOOK ---------- */
        .floating-book {
          position: fixed;
          right: 1.2rem; bottom: 1.2rem;
          z-index: 50;
          display: none;
          align-items: center;
          gap: 0.5rem;
          padding: 0 1.3rem;
          min-height: 52px;
          border-radius: 999px;
          background: var(--ink);
          color: var(--ivory);
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          box-shadow: var(--shadow-lg);
          transition: transform 0.3s var(--ease), background 0.3s var(--ease);
        }
        .floating-book:hover { transform: translateY(-3px); background: var(--mocha-deep); }
        .floating-book svg { color: var(--gold); }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width: 980px) {
          .hero {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding-top: clamp(6rem, 18vw, 8rem);
          }
          .hero-visual { order: -1; max-width: 440px; }
          .hero-frame { border-radius: 160px 160px 16px 16px; }
          .services-grid { grid-template-columns: 1fr; max-width: 460px; margin: 0 auto; }
          .look-grid, .signature-grid { grid-template-columns: 1fr; }
          .signature-media { order: -1; max-width: 460px; }
          .process-grid { grid-template-columns: 1fr; gap: 0; }
          .process-step { padding: 1.4rem 0; border-top: none; border-bottom: 1px solid var(--line); }
          .process-step:last-child { border-bottom: none; }
          .section-head { flex-direction: column; align-items: flex-start; gap: 0.8rem; }
          .cta-card { flex-direction: column; align-items: flex-start; }
        }

        @media (max-width: 600px) {
          .home { padding-bottom: 80px; }
          .floating-book { display: inline-flex; left: 1rem; right: 1rem; justify-content: center; }
          .hero-actions { width: 100%; }
          .hero-actions .u-btn { flex: 1; }
          .service-body p { min-height: 0; }
          .hero-badge { left: 0.6rem; }
          .cta-card { border-radius: 22px; }
          .cta-card .u-btn { width: 100%; }
        }
        @media (max-width: 400px) {
          .hero-stats { gap: 1rem; }
          .hero-stat + .hero-stat { padding-left: 1rem; }
        }
      `}</style>

      <main className="home" ref={pageRef}>
        {/* HERO */}
        <section className="hero">
          <div className="reveal">
            <span className="u-eyebrow hero-eyebrow">Nokmakeupp · Korat</span>
            <h1 className="hero-title">
              แต่งหน้าให้คุณ<br />
              สวยอย่าง<em>เป็นธรรมชาติ</em>
            </h1>
            <p className="hero-copy">
              ช่างแต่งหน้ามืออาชีพสำหรับเจ้าสาว ออกงาน และวันสำคัญ
              เน้นงานผิวละมุน โครงหน้าชัด ถ่ายรูปขึ้นกล้อง และดูแพงแบบเป็นตัวคุณ
            </p>
            <div className="hero-actions">
              <a href="https://lin.ee/aZQJ4JQ" target="_blank" rel="noreferrer" className="u-btn u-btn--primary">
                <FiCalendar /> จองคิวผ่าน LINE
              </a>
              <Link to="/all" className="u-btn u-btn--ghost">
                ดูผลงานทั้งหมด <FiArrowRight />
              </Link>
            </div>
            <div className="hero-stats">
              {stats.map((s) => (
                <div className="hero-stat" key={s.label}>
                  <span className="hero-stat-value serif">{s.value}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="hero-frame">
              <img
                src={HeroImg}
                alt="Nokmakeupp professional makeup"
                className={heroLoaded ? 'loaded' : ''}
                decoding="async"
                fetchPriority="high"
                draggable="false"
                onLoad={(e) => {
                  const d = e.currentTarget.decode?.();
                  if (d) d.finally(() => setHeroLoaded(true));
                  else setHeroLoaded(true);
                }}
              />
            </div>
            <span className="hero-tag"><FiStar /> Bridal Specialist</span>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              <div>
                <strong>เปิดรับคิวแล้ว</strong>
                <span>ตอบกลับเร็วทาง LINE</span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section services">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <span className="u-eyebrow">Services</span>
                <h2 className="section-title">เลือกลุคตาม<em>โอกาส</em>ของคุณ</h2>
              </div>
              <p className="section-copy">
                เลือกดูผลงานตามโอกาส เพื่อเทียบสไตล์งานผิว งานตา และความติดทนก่อนตัดสินใจจองคิว
              </p>
            </div>

            <div className="services-grid">
              {services.map((service, index) => (
                <article
                  className="service-card reveal"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  key={service.title}
                >
                  <div className="service-media">
                    <img src={service.image} alt={service.title} loading="lazy" decoding="async" draggable="false" />
                    <span className="service-eyebrow">{service.eyebrow}</span>
                  </div>
                  <div className="service-body">
                    <h3>{service.title}</h3>
                    <p>{service.copy}</p>
                    <Link to={service.to} className="service-link">
                      ดูผลงาน <FiArrowUpRight />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* LOOK STUDIO */}
        <section className="section look">
          <div className="section-inner look-grid">
            <div className="reveal">
              <span className="u-eyebrow">Look Studio</span>
              <h2 className="section-title">ลองเลือก <em>mood</em><br />ก่อนจองคิว</h2>
              <p className="section-copy">
                เลือกโทนที่ใกล้กับสไตล์ที่ชอบ แล้วส่งชื่อ mood ผ่าน LINE
                เพื่อให้ช่วยแนะนำลุคที่เข้ากับชุดและวันงานได้เร็วขึ้น
              </p>

              <div className="look-tabs">
                {lookMoods.map((item, index) => (
                  <button
                    type="button"
                    key={item.name}
                    className={`look-tab ${activeLook === index ? 'is-active' : ''}`}
                    onClick={() => setActiveLook(index)}
                  >
                    <span className="look-num">0{index + 1}</span>
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.tone}</small>
                    </span>
                    <FiArrowRight className="look-arrow" />
                  </button>
                ))}
              </div>
            </div>

            <div className="look-preview reveal">
              <img src={look.image} alt={look.name} key={look.name} loading="lazy" decoding="async" draggable="false" />
              <div className="look-card">
                <div className="look-swatches" aria-hidden="true">
                  {look.colors.map((color) => (
                    <span className="look-swatch" style={{ background: color }} key={color} />
                  ))}
                </div>
                <h3>{look.name}</h3>
                <p>{look.copy}</p>
                <a href="https://lin.ee/aZQJ4JQ" target="_blank" rel="noreferrer">
                  ส่ง mood นี้ให้ช่าง <FiMessageCircle />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <span className="u-eyebrow">How it works</span>
                <h2 className="section-title">จองง่าย ใน <em>3 ขั้นตอน</em></h2>
              </div>
              <p className="section-copy">
                ขั้นตอนเรียบง่าย ตั้งแต่ปรึกษาลุคจนถึงวันงานจริง เพื่อให้คุณสบายใจและพร้อมสวยในวันสำคัญ
              </p>
            </div>

            <div className="process-grid">
              {steps.map((step, index) => (
                <div className="process-step reveal" style={{ transitionDelay: `${index * 0.1}s` }} key={step.no}>
                  <div className="process-no">{step.no}</div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SIGNATURE */}
        <section className="section signature">
          <div className="section-inner signature-grid">
            <div className="signature-media reveal">
              <img src={WomanImg2} alt="Soft bridal makeup detail" loading="lazy" decoding="async" draggable="false" />
            </div>
            <div className="reveal">
              <span className="u-eyebrow">Why book with us</span>
              <h2 className="section-title">ลุคที่คิดมาให้ครบ<br />ตั้งแต่ปรึกษา<em>จนถึงวันจริง</em></h2>
              <p className="section-copy" style={{ maxWidth: 'none' }}>
                ลูกค้าแต่ละคนมีโทนผิว สไตล์ชุด และความมั่นใจไม่เหมือนกัน
                เราจึงคุยลุคก่อนจอง เพื่อให้ผลลัพธ์ออกมาสวย ดูมืออาชีพ และใช้งานได้จริงตลอดงาน
              </p>
              <ul className="proof-list">
                {proofPoints.map((point) => (
                  <li key={point}>
                    <span className="proof-check"><FiCheck /></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a href="https://lin.ee/aZQJ4JQ" target="_blank" rel="noreferrer" className="u-btn u-btn--primary">
                สอบถามราคาและคิวว่าง <FiArrowRight />
              </a>
            </div>
          </div>
        </section>

        {/* QUOTE */}
        <section className="section quote">
          <div className="quote-inner reveal">
            <span className="quote-stars">
              <FiStar /><FiStar /><FiStar /><FiStar /><FiStar />
            </span>
            <blockquote>
              “แต่งหน้าสวยมากค่ะ งานผิวเนียน ติดทนทั้งวันงาน
              <em> ถ่ายรูปออกมาดูแพงสุด ๆ</em> ประทับใจมากจริง ๆ”
            </blockquote>
            <cite>— รีวิวจากเจ้าสาว Nokmakeupp</cite>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="cta-card reveal">
            <div>
              <h2>พร้อมสวยในวันสำคัญของคุณแล้วหรือยัง?</h2>
              <p>
                แจ้งวันงาน สถานที่ จำนวนคน และลุคที่ชอบ เพื่อให้เราช่วยเช็กคิวและประเมินราคาได้แม่นยำขึ้น
              </p>
            </div>
            <a href="https://lin.ee/aZQJ4JQ" target="_blank" rel="noreferrer" className="u-btn u-btn--light">
              <FiCalendar /> จองคิวตอนนี้
            </a>
          </div>
        </section>

        <Footer />

        <a href="https://lin.ee/aZQJ4JQ" target="_blank" rel="noreferrer" className="floating-book">
          <FiMessageCircle /> จองคิว
        </a>
      </main>
    </>
  );
};

export default Home;
