import React from 'react';
import { FileText, Headphones, MessageCircle, TrendingDown } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const features = [
  {
    icon: <Headphones size={22} />,
    title: 'Uma contadora só sua',
    description: 'Sempre a mesma pessoa, que conhece você e sua PJ.',
  },
  {
    icon: <TrendingDown size={22} />,
    title: 'Menos imposto',
    description: 'Estratégia fiscal pensada para você pagar só o necessário.',
  },
  {
    icon: <FileText size={22} />,
    title: 'Notas emitidas por nós',
    description: 'Você avisa, a gente emite. Sem decorar portal de prefeitura.',
  },
  {
    icon: <MessageCircle size={22} />,
    title: 'Tudo no WhatsApp',
    description: 'Guias de imposto e dúvidas resolvidas onde você já está.',
  },
];

const Features: React.FC = () => {
  return (
    <section id="diferenciais" className="scroll-mt-24 py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Por que a Conte"
          title={
            <>
              Deixe a burocracia da sua PJ <span className="font-serif font-normal italic">com a gente.</span>
            </>
          }
        />

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-deep text-ink">{f.icon}</span>
              <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.02em] text-ink">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{f.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
