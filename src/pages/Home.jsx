import React, { useEffect, useRef } from 'react';
import WomanImg1 from '../img/home/woman1.jpg'; 
import WomanImg2 from '../img/home/1.JPG';
import WomanImg3 from '../img/home/2.JPG';
import WomanImg4 from '../img/home/3.JPG';
import { Link } from 'react-router-dom';

const Home = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.classList.add('loaded');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap');

        :root {
          --white: #ffffff;
          --ink: #1a1410;
          --gold: #b89a6a;
          --cream: #f9f6f2;
        }

        .home-page { background-color: var(--white); scroll-behavior: smooth; }

        /* ─── FULLSCREEN HERO ─── */
        .hero-fullscreen {
          position: relative;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: var(--white);
        }

        .hero-bg-wrapper { position: absolute; inset: 0; z-index: 1; }
        .hero-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          transform: scale(1.1);
          transition: transform 2.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .loaded .hero-bg-image { transform: scale(1); }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1), rgba(0,0,0,0.5));
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          text-align: center;
          padding: 0 2rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 1.5s ease 0.5s;
        }
        .loaded .hero-content { opacity: 1; transform: translateY(0); }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 10vw, 7rem);
          font-weight: 300;
          line-height: 0.9;
          margin-bottom: 2rem;
        }
        .hero-title em { font-style: italic; color: var(--gold); }

        .hero-subtitle {
          font-size: 0.75rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          display: block;
        }

        /* ─── SHOWCASE SECTION ─── */
        .showcase-section {
          padding: 100px 5%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .service-card {
          position: relative;
          height: 75vh;
          overflow: hidden;
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
          
          /* --- จุดที่แก้ไข: เพิ่มขอบมนที่นี่ --- */
          border-radius: 30px; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        .service-card.reveal { opacity: 1; transform: translateY(0); }

        .service-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s ease;
        }
        .service-card:hover img { transform: scale(1.1); }

        .service-overlay-content {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 40px;
          transition: background 0.4s ease;
        }
        .service-card:hover .service-overlay-content { background: rgba(0,0,0,0.4); }

        .service-label h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          color: white;
          margin-bottom: 15px;
          font-weight: 300;
        }

        .view-more-btn {
          align-self: flex-start;
          color: white;
          text-decoration: none;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.4);
          padding: 12px 24px;
          /* ปรับปุ่มให้โค้งมนด้วยเพื่อให้เข้ากับภาพ */
          border-radius: 50px;
          transition: all 0.3s ease;
        }
        .view-more-btn:hover {
          background: white;
          color: var(--ink);
        }

        .scroll-down {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          color: white;
          text-decoration: none;
          text-align: center;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          opacity: 0.8;
        }

        .line { width: 1px; height: 50px; background: white; margin: 10px auto; animation: scrolldown 2s infinite; }
        @keyframes scrolldown { 0%{transform: scaleY(0); transform-origin: top;} 50%{transform: scaleY(1); transform-origin: top;} 51%{transform: scaleY(1); transform-origin: bottom;} 100%{transform: scaleY(0); transform-origin: bottom;} }

        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: 1fr; }
          .service-card { height: 60vh; border-radius: 20px; }
        }
      `}</style>

      <div className="home-page" ref={heroRef}>
        
        {/* SECTION 1: HERO */}
        <section className="hero-fullscreen">
          <div className="hero-bg-wrapper">
            <img src={WomanImg1} alt="Breathtaking Visual" className="hero-bg-image" />
            <div className="hero-overlay" />
          </div>

          <div className="hero-content">
            <span className="hero-subtitle">Professional Makeup Artist</span>
            <h1 className="hero-title">
              The Art of <em>Natural</em><br />Glamour
            </h1>
            <Link to="https://lin.ee/aZQJ4JQ" className="view-more-btn" style={{alignSelf: 'center', borderColor: 'white'}}>Book an Experience</Link>
          </div>

          <a href="#work" className="scroll-down">
            <span>Scroll</span>
            <div className="line" />
          </a>
        </section>

        {/* SECTION 2: SHOWCASE (3 ภาพที่ขอบมน) */}
        <section className="showcase-section" id="work">
          <div className="services-grid">
            
            {/* Wedding Makeup */}
            <div className="service-card scroll-reveal">
              <img src={WomanImg2} alt="Wedding Makeup" />
              <div className="service-overlay-content">
                <div className="service-label">
                  <h3>Wedding Makeup</h3>
                </div>
                <Link to="/wedding" className="view-more-btn">Explore Diary</Link>
              </div>
            </div>

            {/* Diary Makeup */}
            <div className="service-card scroll-reveal" style={{ transitionDelay: '0.2s' }}>
              <img src={WomanImg3} alt="Diary Makeup" />
              <div className="service-overlay-content">
                <div className="service-label">
                  <h3>Diary Makeup</h3>
                </div>
                <Link to="/daily" className="view-more-btn">View Collection</Link>
              </div>
            </div>

            {/* Editorial / Portfolio */}
            <div className="service-card scroll-reveal" style={{ transitionDelay: '0.4s' }}>
              <img src={WomanImg4} alt="Portfolio" />
              <div className="service-overlay-content">
                <div className="service-label">
                  <h3>All Works</h3>
                </div>
                <Link to="/all" className="view-more-btn">View All</Link>
              </div>
            </div>

          </div>
        </section>

      </div>
    </>
  );
};

export default Home;