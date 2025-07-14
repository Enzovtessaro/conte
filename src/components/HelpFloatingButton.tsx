import React, { useEffect, useRef, useState } from 'react';

const POP_SOUND_URL = 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae5b2.mp3'; // Free pop sound
const WHATSAPP_LINK = 'https://wa.link/9zuprd';
const ICON_URL = 'https://i.ibb.co/Pz5STbY5/Logo-oi.png';

const HelpFloatingButton: React.FC = () => {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const popSoundRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Listen for scroll
    const onScroll = () => setScrolled(true);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (scrolled) {
      timerRef.current = setTimeout(() => {
        setShow(true);
        // Play pop sound
        if (popSoundRef.current) {
          popSoundRef.current.currentTime = 0;
          popSoundRef.current.play();
        }
      }, 60000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [scrolled]);

  if (!show) return null;

  return (
    <div
  style={{
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(240, 255, 240, 0.95)', // soft greenish tint
    border: '1px solid #00bf63',
    borderRadius: '999px',
    padding: '8px 14px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
  }}
  role="button"
  tabIndex={0}
  aria-label="Precisa de ajuda?"
  onClick={() => window.open(WHATSAPP_LINK, '_blank')}
  onKeyPress={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      window.open(WHATSAPP_LINK, '_blank');
    }
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
>
  <audio ref={popSoundRef} src={POP_SOUND_URL} preload="auto" />
  <span style={{ fontSize: '14px', fontWeight: 500, color: '#000' }}>
    Precisa de ajuda?
  </span>
  <img
    src={ICON_URL}
    alt="WhatsApp"
    width={32}
    height={32}
    style={{ display: 'block' }}
  />
</div>

  );
};

export default HelpFloatingButton; 