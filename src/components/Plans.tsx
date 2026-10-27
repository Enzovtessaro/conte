import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Button from './Button';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { SIGNUP_URL } from '../lib/links';

const mainFeatures = [
  'Contabilidade completa',
  'Planejamento e consultoria tributária',
  'Pró-labore do sócio',
  'Declarações acessórias mensais',
  'Notas fiscais ilimitadas',
  'Assessor dedicado e atendimento prioritário',
  'Endereço fiscal gratuito',
  'Abertura de empresa grátis',
];

const meiFeatures = ['Uma nota fiscal por mês', 'Guia de imposto', 'Declaração anual'];

const Plans: React.FC = () => {
  return (
    <section id="planos" className="scroll-mt-24 py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Planos"
          title={
            <>
              Preço simples, <span className="font-serif font-normal italic">sem surpresa.</span>
            </>
          }
          description="Um plano completo para a sua PJ. Abertura de empresa grátis."
        />

        <div className="mx-auto max-w-5xl space-y-4">
          <Reveal>
            <div className="grid overflow-hidden rounded-[32px] bg-ink text-white shadow-float md:grid-cols-[0.9fr_1.1fr]">
              <div className="flex flex-col p-8 md:p-12">
                <span className="w-fit rounded-full bg-brand px-3 py-1 text-xs font-semibold text-ink">Plano completo</span>
                <h3 className="mt-6 font-display text-3xl md:text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-balance">
                  Trabalha para o Brasil ou para o exterior?
                </h3>
                <div className="mt-8 flex items-baseline gap-1">
                  <span className="text-lg text-white/60">R$</span>
                  <span className="font-display text-7xl font-semibold tracking-[-0.04em]">359</span>
                  <span className="text-white/60">/mês</span>
                </div>
                <Button href={SIGNUP_URL} size="lg" variant="accent" className="mt-10 w-full sm:w-fit">
                  Começar agora
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>

              <div className="border-t border-white/10 p-8 md:border-l md:border-t-0 md:p-12">
                <p className="text-sm font-medium text-white/50">Tudo incluso</p>
                <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {mainFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-white/85">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-col gap-5 rounded-[28px] border border-paper-line bg-white p-6 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-7">
              <div className="flex shrink-0 items-baseline gap-4">
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">Ainda é MEI?</h3>
                <p className="text-ink-muted">
                  <span className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink">R$ 99</span>/mês
                </p>
              </div>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-muted">
                {meiFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-1.5">
                    <Check size={14} strokeWidth={2.5} className="text-brand-dark" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={SIGNUP_URL}
                className="group inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold text-ink"
              >
                Começar como MEI
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Plans;
