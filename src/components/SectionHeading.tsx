import React from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'light',
}) => {
  const dark = tone === 'dark';
  return (
    <Reveal className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} mb-14 md:mb-16`}>
      <span
        className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] ${
          dark ? 'text-brand' : 'text-ink-muted'
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${dark ? 'bg-brand' : 'bg-ink'}`} />
        {eyebrow}
      </span>
      <h2
        className={`mt-4 font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-balance ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-lg leading-relaxed text-pretty ${dark ? 'text-white/60' : 'text-ink-muted'}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
};

export default SectionHeading;
