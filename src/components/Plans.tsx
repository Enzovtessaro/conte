import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Button from './Button';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { SIGNUP_URL } from '../lib/links';

interface Plan {
  question: string;
  price: string;
  features: string[];
  featured?: boolean;
}

const plans: Plan[] = [
  {
    question: 'Você é MEI?',
    price: '99',
    features: [
      'Abertura de empresa',
      'Uma nota fiscal por mês',
      'Emissão de guia de imposto',
      'Declaração anual',
      'Atendimento humanizado',
    ],
  },
  {
    question: 'Você é ME ou EPP?',
    price: '359',
    features: [
      'Tudo do plano MEI',
      'Contabilidade completa',
      'Planejamento e consultoria tributária',
      'Pró-labore do sócio',
      'Declarações acessórias mensais',
      'Notas fiscais ilimitadas',
      'Assessor dedicado e atendimento prioritário',
      'Endereço fiscal gratuito',
    ],
    featured: true,
  },
];

const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => {
  const dark = plan.featured;
  return (
    <div
      className={`relative flex h-full flex-col rounded-[28px] p-8 md:p-10 ${
        dark ? 'bg-ink text-white shadow-float' : 'border border-paper-line bg-white shadow-card'
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{plan.question}</h3>
        {dark && (
          <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-ink">Mais completo</span>
        )}
      </div>
      <div className="mt-6 flex items-baseline gap-1">
        <span className={`text-lg ${dark ? 'text-white/60' : 'text-ink-muted'}`}>R$</span>
        <span className="font-display text-6xl font-semibold tracking-[-0.04em]">{plan.price}</span>
        <span className={dark ? 'text-white/60' : 'text-ink-muted'}>/mês</span>
      </div>

      <ul className={`mt-8 space-y-3.5 border-t pt-8 ${dark ? 'border-white/10' : 'border-paper-line'}`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                dark ? 'bg-brand text-ink' : 'bg-ink text-white'
              }`}
            >
              <Check size={12} strokeWidth={3} />
            </span>
            <span className={dark ? 'text-white/85' : 'text-ink-soft'}>{feature}</span>
          </li>
        ))}
      </ul>

      <Button href={SIGNUP_URL} size="lg" variant={dark ? 'accent' : 'primary'} className="mt-10 w-full">
        Começar agora
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
      </Button>
    </div>
  );
};

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
          description="Escolha o plano ideal para a fase da sua carreira. Abertura de empresa grátis em qualquer plano."
        />

        <div className="mx-auto grid max-w-4xl items-stretch gap-5 md:grid-cols-2">
          {plans.map((plan, index) => (
            <Reveal key={plan.question} delay={index * 0.08} className="h-full">
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
