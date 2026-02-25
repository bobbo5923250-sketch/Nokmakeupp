import React from 'react';
import { SiFacebook, SiTiktok, SiInstagram, SiLine } from "react-icons/si";

const Socials = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
      {[
        { href: 'https://www.facebook.com/nokmakeupp',                    icon: <SiFacebook /> },
        { href: 'https://www.instagram.com/nokmakeupp/',  icon: <SiInstagram /> },
        { href: 'https://www.tiktok.com/@nokmakeupp_korat', icon: <SiTiktok /> },
        { href: 'https://lin.ee/aZQJ4JQ',                icon: <SiLine /> },
      ].map(({ href, icon }, i) => (
        <a
          key={i}
          href={href}
          target='_blank'
          rel='noreferrer'
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.1rem',
            color: '#1a1410',
            transition: 'color 0.25s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#b89a6a'}
          onMouseLeave={e => e.currentTarget.style.color = '#1a1410'}
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default Socials;