import React from 'react';
import Reveal from './Reveal';

const logos = [
  { src: '/logos/electrolux.svg', alt: 'Electrolux', className: 'h-6' },
  { src: '/logos/ambev.svg', alt: 'Ambev', className: 'h-6' },
  { src: '/logos/toggl.svg', alt: 'Toggl', className: 'h-5' },
];

const TrustBar: React.FC = () => (
  <section aria-label="Quem confia na Conte" className="pb-8">
    <Reveal className="container mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-4 md:flex-row md:gap-8 md:px-6">
      <p className="whitespace-nowrap text-sm text-ink-muted">Clientes da Conte trabalham em</p>
      <ul className="flex items-center gap-8">
        {logos.map((logo) => (
          <li key={logo.alt}>
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              decoding="async"
              className={`${logo.className} w-auto opacity-50 grayscale transition-opacity hover:opacity-80`}
            />
          </li>
        ))}
      </ul>
    </Reveal>
  </section>
);

export default TrustBar;
