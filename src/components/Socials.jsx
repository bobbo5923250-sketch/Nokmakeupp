import React from 'react';
import { SiFacebook, SiTiktok, SiInstagram, SiLine } from 'react-icons/si';

const socials = [
  { href: 'https://www.facebook.com/nokmakeupp', icon: <SiFacebook />, label: 'Facebook' },
  { href: 'https://www.instagram.com/nokmakeupp/', icon: <SiInstagram />, label: 'Instagram' },
  { href: 'https://www.tiktok.com/@nokmakeupp_korat', icon: <SiTiktok />, label: 'TikTok' },
  { href: 'https://lin.ee/aZQJ4JQ', icon: <SiLine />, label: 'LINE' },
];

const Socials = ({ color = 'var(--ink)', size = '1.05rem', gap = '1.1rem' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap }}>
      {socials.map(({ href, icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: size,
            color,
            transition: 'color 0.25s ease, transform 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--mocha)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = color;
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default Socials;
