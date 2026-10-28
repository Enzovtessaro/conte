import React from 'react';
import { Link } from 'react-router-dom';

// Hub-to-spoke links from a calculator to its programmatic pages, so every page is reachable by crawlers.
const ScenarioLinks: React.FC<{ title: string; links: { to: string; label: string }[] }> = ({ title, links }) => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto max-w-4xl px-4 md:px-6">
      <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-ink">{title}</h2>
      <ul className="mt-6 flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="inline-flex rounded-full border border-paper-line bg-white px-4 py-2 text-[15px] text-ink transition-shadow hover:shadow-card">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ScenarioLinks;
