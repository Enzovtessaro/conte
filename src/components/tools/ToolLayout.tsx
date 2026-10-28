import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react';
import Seo from '../Seo';
import { SITE_URL } from '../../lib/links';

export interface ToolFaq {
  q: string;
  a: string;
}

interface ToolLayoutProps {
  path: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  updated: string;
  calculator: React.ReactNode;
  children: React.ReactNode;
  faqs: ToolFaq[];
  sources: { title: string; url: string }[];
  related: { to: string; title: string; description: string }[];
  /** Breadcrumb level between Início and this page, for programmatic pages under a calculator. */
  parent?: { to: string; name: string };
}

const ToolLayout: React.FC<ToolLayoutProps> = ({
  path,
  name,
  seoTitle,
  seoDescription,
  h1,
  intro,
  updated,
  calculator,
  children,
  faqs,
  sources,
  related,
  parent,
}) => {
  const url = `${SITE_URL}${path}`;
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name,
      url,
      description: seoDescription,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      inLanguage: 'pt-BR',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      provider: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
        ...(parent ? [{ '@type': 'ListItem', position: 2, name: parent.name, item: `${SITE_URL}${parent.to}` }] : []),
        { '@type': 'ListItem', position: parent ? 3 : 2, name, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <main>
      <Seo title={seoTitle} description={seoDescription} path={path} jsonLd={schema} />

      <section className="relative overflow-hidden pt-32 pb-10 md:pt-40 md:pb-14">
        <div aria-hidden className="pointer-events-none absolute -right-40 top-10 -z-10 h-[480px] w-[480px] rounded-full bg-brand/15 blur-[120px]" />
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <nav aria-label="Você está em" className="text-sm text-ink-muted">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-ink">Início</Link>
              </li>
              <li aria-hidden><ChevronRight size={14} /></li>
              {parent && (
                <>
                  <li>
                    <Link to={parent.to} className="hover:text-ink">{parent.name}</Link>
                  </li>
                  <li aria-hidden><ChevronRight size={14} /></li>
                </>
              )}
              <li aria-current="page" className="text-ink">{name}</li>
            </ol>
          </nav>
          <h1 className="mt-6 max-w-3xl font-display text-[40px] leading-[1.05] sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-ink text-balance">
            {h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-ink-muted text-pretty">{intro}</p>
          <p className="mt-4 text-sm text-ink-faint">Regras e tabelas de {updated}.</p>
        </div>
      </section>

      <section aria-label="Calculadora" className="pb-16 md:pb-24">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">{calculator}</div>
      </section>

      {children}

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-ink">Perguntas frequentes</h2>
          <div className="mt-8 divide-y divide-paper-line border-y border-paper-line">
            {faqs.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="font-display text-lg md:text-xl font-semibold tracking-[-0.01em] text-ink">{f.q}</h3>
                <p className="mt-2 max-w-2xl text-[17px] leading-relaxed text-ink-muted">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-sm font-semibold text-ink">Fontes oficiais</p>
            <ul className="mt-2 space-y-1.5">
              {sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-ink-muted underline decoration-ink/20 underline-offset-4 hover:text-ink hover:decoration-ink"
                  >
                    {s.title}
                    <ArrowUpRight size={13} />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-sm text-ink-faint">
              Esta calculadora é uma simulação com as regras de {updated}. Cada caso tem detalhes próprios (atividade, município,
              faturamento dos últimos 12 meses); para uma análise exata, fale com uma contadora da Conte.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper-deep py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-ink">Veja também</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.to}>
                <Link
                  to={r.to}
                  className="flex h-full items-center justify-between gap-4 rounded-2xl border border-paper-line bg-white p-5 transition-shadow hover:shadow-card"
                >
                  <span>
                    <span className="block font-semibold text-ink">{r.title}</span>
                    <span className="mt-0.5 block text-sm text-ink-muted">{r.description}</span>
                  </span>
                  <ArrowRight size={18} className="shrink-0 text-ink-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </main>
  );
};

export default ToolLayout;
