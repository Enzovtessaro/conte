import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Button from './Button';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { SIGNUP_URL } from '../lib/links';

const options = [
  {
    tag: 'Ainda não tenho CNPJ',
    title: 'Abrir empresa',
    description: 'A gente abre sua empresa de graça e te deixa pronto para emitir a primeira nota.',
    points: ['Abertura sem custo', 'Melhor enquadramento para pagar menos imposto', 'Tudo pelo WhatsApp'],
    cta: 'Abrir minha empresa',
    dark: true,
  },
  {
    tag: 'Já tenho empresa',
    title: 'Mudar para a Conte',
    description: 'Cansou de ficar sozinho com a contabilidade? A gente cuida da troca para você.',
    points: ['Troca feita pela gente', 'Contadora dedicada desde o primeiro dia', 'Sem fila e sem robô'],
    cta: 'Quero migrar',
    dark: false,
  },
];

const Services: React.FC = () => {
  return (
    <section id="servicos" className="scroll-mt-24 py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Serviços"
          title={
            <>
              Por onde você quer <span className="font-serif font-normal italic">começar?</span>
            </>
          }
        />

        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {options.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.08} className="h-full">
              <div
                className={`flex h-full flex-col rounded-[28px] p-8 md:p-10 ${
                  o.dark ? 'bg-ink text-white' : 'border border-paper-line bg-white text-ink'
                }`}
              >
                <span className={`text-sm font-medium ${o.dark ? 'text-white/50' : 'text-ink-muted'}`}>{o.tag}</span>
                <h3 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em]">{o.title}</h3>
                <p className={`mt-4 text-lg leading-relaxed ${o.dark ? 'text-white/70' : 'text-ink-muted'}`}>
                  {o.description}
                </p>
                <ul className="mt-8 flex-1 space-y-3">
                  {o.points.map((p) => (
                    <li key={p} className="flex items-center gap-3">
                      <Check size={18} strokeWidth={2.5} className="shrink-0 text-brand" />
                      <span className={o.dark ? 'text-white/85' : 'text-ink-soft'}>{p}</span>
                    </li>
                  ))}
                </ul>
                <Button href={SIGNUP_URL} size="lg" variant={o.dark ? 'white' : 'primary'} className="mt-10 self-start">
                  {o.cta}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
