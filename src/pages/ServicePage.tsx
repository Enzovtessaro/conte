import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import CTA from '../components/CTA';
import Seo from '../components/Seo';
import { ServiceContent, services } from '../data/services';
import { SIGNUP_URL, SITE_URL, WHATSAPP_URL } from '../lib/links';

const ORG_ID = `${SITE_URL}/#organization`;

const buildSchema = (s: ServiceContent) => [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.h1,
    description: s.intro,
    serviceType: s.eyebrow,
    url: `${SITE_URL}/${s.slug}`,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Brasil' },
    offers: {
      '@type': 'Offer',
      name: s.price.label,
      url: SIGNUP_URL,
      price: `${s.price.value}.00`,
      priceCurrency: 'BRL',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: s.eyebrow, item: `${SITE_URL}/${s.slug}` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
];

const sectionTitle = 'font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-ink';
const textLink = 'underline decoration-ink/20 underline-offset-4 hover:decoration-ink';

const ServicePage: React.FC<{ service: ServiceContent }> = ({ service: s }) => {
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <main>
      <Seo title={s.seoTitle} description={s.seoDescription} path={`/${s.slug}`} jsonLd={buildSchema(s)} />

      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div aria-hidden className="pointer-events-none absolute -right-40 top-10 -z-10 h-[480px] w-[480px] rounded-full bg-brand/15 blur-[120px]" />
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <nav aria-label="Você está em" className="text-sm text-ink-muted">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-ink">Início</Link>
              </li>
              <li aria-hidden><ChevronRight size={14} /></li>
              <li aria-current="page" className="text-ink">{s.eyebrow}</li>
            </ol>
          </nav>
          <h1 className="mt-6 font-display text-[40px] leading-[1.05] sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-ink text-balance">
            {s.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-ink-muted text-pretty">{s.intro}</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={SIGNUP_URL} size="lg">
              Começar agora
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Button>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`text-[15px] font-medium text-ink ${textLink}`}>
              Tirar dúvidas no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto grid max-w-4xl gap-10 px-4 md:grid-cols-[0.8fr_1.2fr] md:px-6">
          <h2 className={sectionTitle}>Para quem é?</h2>
          <ul className="space-y-4">
            {s.audience.map((item) => (
              <li key={item} className="flex items-start gap-3 text-lg text-ink-soft">
                <Check size={20} strokeWidth={2.5} className="mt-1 shrink-0 text-brand-dark" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper-deep py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <h2 className={sectionTitle}>Como funciona</h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {s.steps.map((step, i) => (
              <li key={step.title} className="h-full list-none rounded-3xl border border-paper-line bg-white p-7">
                  <span className="font-serif text-4xl italic leading-none text-ink/20">0{i + 1}</span>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.02em] text-ink">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid max-w-4xl gap-10 px-4 md:grid-cols-[1.2fr_0.8fr] md:px-6">
          <div>
            <h2 className={sectionTitle}>O que está incluso</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {s.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-soft">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-fit rounded-[28px] border border-paper-line bg-white p-8 shadow-float">
            <p className="text-sm font-medium text-ink-muted">{s.price.label}</p>
            <p className="mt-3 flex items-baseline gap-1">
              <span className="text-lg text-ink-muted">R$</span>
              <span className="font-display text-6xl font-semibold tracking-[-0.04em] text-ink">{s.price.value}</span>
              <span className="text-ink-muted">/mês</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{s.price.note}</p>
            <Button href={SIGNUP_URL} size="lg" className="mt-6 w-full">
              Começar agora
            </Button>
            <Link to="/#planos" className={`mt-4 block text-center text-sm text-ink-muted ${textLink}`}>
              Ver todos os planos
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <h2 className={sectionTitle}>Perguntas frequentes</h2>
          <div className="mt-8 divide-y divide-paper-line border-y border-paper-line">
            {s.faqs.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="font-display text-lg md:text-xl font-semibold tracking-[-0.01em] text-ink">{f.q}</h3>
                <p className="mt-2 max-w-2xl text-[17px] leading-relaxed text-ink-muted">{f.a}</p>
              </div>
            ))}
          </div>
          {s.source && (
            <a href={s.source.url} target="_blank" rel="noopener noreferrer" className={`mt-6 inline-block text-sm text-ink-muted ${textLink}`}>
              Fonte oficial: {s.source.title} ↗
            </a>
          )}
        </div>
      </section>

      <section className="bg-paper-deep py-16 md:py-24">
        <div className="container mx-auto grid max-w-4xl gap-12 px-4 md:grid-cols-2 md:px-6">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">Leia no blog</h2>
            <ul className="mt-6 space-y-4">
              {s.reading.map((r) => (
                <li key={r.url}>
                  <a href={r.url} target="_blank" rel="noopener" className={`group inline-flex items-start gap-2 text-[17px] font-medium text-ink ${textLink}`}>
                    {r.title}
                    <ArrowUpRight size={16} className="mt-1 shrink-0 text-ink-muted" />
                  </a>
                </li>
              ))}
            </ul>
            {s.tool && (
              <Link to={s.tool.to} className="mt-8 block rounded-2xl border border-paper-line bg-white p-5 transition-shadow hover:shadow-card">
                <p className="font-semibold text-ink">{s.tool.title} →</p>
                <p className="mt-1 text-sm text-ink-muted">{s.tool.description}</p>
              </Link>
            )}
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">Outros serviços da Conte</h2>
            <ul className="mt-6 space-y-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    to={`/${o.slug}`}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-paper-line bg-white p-5 transition-shadow hover:shadow-card"
                  >
                    <span>
                      <span className="block font-semibold text-ink">{o.eyebrow}</span>
                      <span className="mt-0.5 block text-sm text-ink-muted">{o.h1}</span>
                    </span>
                    <ArrowRight size={18} className="shrink-0 text-ink-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
};

export default ServicePage;
