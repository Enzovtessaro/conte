import React from 'react';
import { ShieldCheck } from 'lucide-react';
import Reveal from './Reveal';
import { ACCOUNTANT_NAME, CRC_REGISTRATION } from '../lib/links';

const logos = [
  { src: '/logos/electrolux.svg', alt: 'Electrolux', className: 'h-6' },
  { src: '/logos/ambev.svg', alt: 'Ambev', className: 'h-6' },
  { src: '/logos/toggl.svg', alt: 'Toggl', className: 'h-5' },
];

const TrustBar: React.FC = () => (
  <section aria-label="Quem confia na Conte" className="pb-8">
    <Reveal className="container mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 md:px-6 lg:flex-row lg:justify-between">
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
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
      </div>
      {CRC_REGISTRATION && (
        <p className="inline-flex shrink-0 flex-wrap items-center justify-center gap-x-2 gap-y-0.5 rounded-2xl text-center lg:whitespace-nowrap lg:rounded-full border border-paper-line bg-white px-3.5 py-1.5 text-sm text-ink">
          <ShieldCheck size={16} className="text-brand-dark" />
          <span>Contadora responsável: {ACCOUNTANT_NAME},</span>
          <span>{CRC_REGISTRATION}</span>
        </p>
      )}
    </Reveal>
  </section>
);

export default TrustBar;
