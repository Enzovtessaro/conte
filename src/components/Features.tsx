import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const card = 'rounded-2xl bg-white text-ink shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)]';

const AccountantVisual: React.FC = () => (
  <div className="relative w-64">
    <div className={`absolute inset-x-6 -bottom-3 h-14 rounded-2xl bg-white/10`} />
    <div className={`${card} relative flex items-center gap-3 p-4`}>
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-brand font-display text-lg font-semibold text-ink">
        S
        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-dark" />
      </span>
      <div>
        <p className="font-semibold">Solange</p>
        <p className="text-sm text-ink-muted">Sua contadora · online</p>
      </div>
    </div>
  </div>
);

const TaxVisual: React.FC = () => (
  <div className={`${card} w-64 p-5`}>
    <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">Imposto do mês</p>
    <div className="mt-4 space-y-3">
      <div>
        <p className="mb-1.5 text-xs text-ink-muted">Sem planejamento</p>
        <div className="h-2.5 w-full rounded-full bg-paper-line" />
      </div>
      <div>
        <p className="mb-1.5 text-xs font-semibold text-ink">Com a Conte</p>
        <div className="h-2.5 w-3/5 rounded-full bg-brand" />
      </div>
    </div>
  </div>
);

const InvoiceVisual: React.FC = () => (
  <div className={`${card} flex w-64 items-center gap-3 p-4`}>
    <span className="flex h-11 w-10 items-center justify-center rounded-lg bg-[#E5484D] text-[10px] font-bold text-white">PDF</span>
    <div className="flex-1">
      <p className="text-sm font-semibold">Nota fiscal.pdf</p>
      <p className="text-xs text-ink-muted">Emitida pela Conte</p>
    </div>
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-ink">
      <Check size={14} strokeWidth={3} />
    </span>
  </div>
);

const WhatsAppVisual: React.FC = () => (
  <div className="flex w-64 flex-col gap-2">
    <div className="w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[14px] text-ink shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)]">
      A guia deste mês já está aqui 👇
    </div>
    <div className="ml-auto w-fit rounded-2xl rounded-tr-sm bg-[#D9FDD3] px-3.5 py-2.5 text-[14px] text-ink shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)]">
      Paguei! 🙌
      <CheckCheck size={14} className="ml-1.5 inline text-[#53BDEB]" />
    </div>
  </div>
);

const features = [
  {
    visual: <AccountantVisual />,
    title: 'Uma contadora só sua',
    description: 'Sempre a mesma pessoa, que conhece você e sua PJ.',
  },
  {
    visual: <TaxVisual />,
    title: 'Menos imposto',
    description: 'Estratégia fiscal pensada para você pagar só o necessário.',
  },
  {
    visual: <InvoiceVisual />,
    title: 'Notas emitidas por nós',
    description: 'Você avisa, a gente emite. Sem decorar portal de prefeitura.',
  },
  {
    visual: <WhatsAppVisual />,
    title: 'Tudo no WhatsApp',
    description: 'Guias de imposto e dúvidas resolvidas onde você já está.',
  },
];

const Features: React.FC = () => {
  return (
    <section id="diferenciais" className="scroll-mt-24 bg-ink py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          tone="dark"
          eyebrow="Por que a Conte"
          title={
            <>
              Deixe a burocracia da sua PJ{' '}
              <span className="font-serif font-normal italic text-brand">com a gente.</span>
            </>
          }
        />

        <div className="grid gap-4 md:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06} className="h-full">
              <div className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">
                <div
                  aria-hidden
                  className="relative flex h-56 items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(37,211,102,0.14),transparent_65%)]"
                >
                  <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#FFFFFF14_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
                  <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-1.5">{f.visual}</div>
                </div>
                <div className="border-t border-white/10 p-7 md:p-8">
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-white">{f.title}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-white/60">{f.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
