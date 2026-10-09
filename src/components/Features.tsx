import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Check, CheckCheck } from 'lucide-react';
import SectionHeading from './SectionHeading';

const ease = [0.22, 1, 0.36, 1] as const;
const card = 'rounded-2xl bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-18px_rgba(0,0,0,0.22)]';

const pop: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: (delay = 0) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay, ease } }),
};

const AccountantVisual: React.FC = () => (
  <div className="w-72 space-y-3">
    <motion.div variants={pop} custom={0.1} className={`${card} flex items-center gap-3 p-4`}>
      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand font-display text-lg font-semibold text-ink">
        S
        <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-dark opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-dark" />
        </span>
      </span>
      <div>
        <p className="font-semibold">Solange</p>
        <p className="text-sm text-ink-muted">Sua contadora · online</p>
      </div>
    </motion.div>
    <motion.div
      variants={pop}
      custom={0.45}
      className="ml-6 w-fit rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[14px] text-ink shadow-[0_18px_40px_-18px_rgba(0,0,0,0.22)]"
    >
      Oi! Já vi sua dúvida, te explico agora 😊
    </motion.div>
  </div>
);

const TaxVisual: React.FC = () => (
  <motion.div variants={pop} custom={0.1} className={`${card} w-72 p-6`}>
    <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">Imposto do mês</p>
    <div className="mt-5 space-y-4">
      <div>
        <p className="mb-2 text-sm text-ink-muted">Sem planejamento</p>
        <div className="h-3 overflow-hidden rounded-full bg-paper-deep">
          <motion.div
            className="h-full rounded-full bg-paper-line"
            variants={{ hidden: { width: '0%' }, show: { width: '100%', transition: { duration: 1, delay: 0.35, ease } } }}
          />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-ink">Com a Conte</p>
        <div className="h-3 overflow-hidden rounded-full bg-paper-deep">
          <motion.div
            className="h-full rounded-full bg-brand"
            variants={{ hidden: { width: '0%' }, show: { width: '58%', transition: { duration: 1, delay: 0.6, ease } } }}
          />
        </div>
      </div>
    </div>
  </motion.div>
);

const InvoiceVisual: React.FC = () => (
  <div className="w-72 space-y-3">
    <motion.div variants={pop} custom={0.1} className={`${card} flex items-center gap-3 p-4`}>
      <span className="flex h-12 w-10 items-center justify-center rounded-lg bg-[#E5484D] text-[10px] font-bold text-white">PDF</span>
      <div className="flex-1">
        <p className="text-sm font-semibold">Nota fiscal.pdf</p>
        <p className="text-xs text-ink-muted">Emitida pela Conte</p>
      </div>
      <motion.span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-ink"
        variants={{
          hidden: { scale: 0, rotate: -45 },
          show: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 380, damping: 14, delay: 0.7 } },
        }}
      >
        <Check size={15} strokeWidth={3} />
      </motion.span>
    </motion.div>
    <motion.div variants={pop} custom={0.3} className={`${card} ml-8 flex items-center gap-3 p-3 opacity-80`}>
      <span className="flex h-9 w-8 items-center justify-center rounded-md bg-[#E5484D]/80 text-[9px] font-bold text-white">PDF</span>
      <p className="text-sm text-ink-muted">Nota do mês passado</p>
    </motion.div>
  </div>
);

const WhatsAppVisual: React.FC = () => (
  <div className="flex w-72 flex-col gap-2.5">
    <motion.div
      variants={pop}
      custom={0.1}
      className="w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[14px] text-ink shadow-[0_18px_40px_-18px_rgba(0,0,0,0.22)]"
    >
      A guia deste mês já está aqui 👇
    </motion.div>
    <motion.div variants={pop} custom={0.4} className={`${card} flex w-fit items-center gap-2.5 rounded-tl-sm p-2.5 pr-4`}>
      <span className="flex h-9 w-8 items-center justify-center rounded-md bg-[#E5484D] text-[9px] font-bold text-white">PDF</span>
      <p className="text-sm font-medium">Guia de imposto.pdf</p>
    </motion.div>
    <motion.div
      variants={pop}
      custom={0.75}
      className="ml-auto w-fit rounded-2xl rounded-tr-sm bg-[#D9FDD3] px-3.5 py-2.5 text-[14px] text-ink shadow-[0_18px_40px_-18px_rgba(0,0,0,0.22)]"
    >
      Paguei! 🙌
      <CheckCheck size={14} className="ml-1.5 inline text-[#53BDEB]" />
    </motion.div>
  </div>
);

const features = [
  {
    label: 'Atendimento',
    visual: <AccountantVisual />,
    title: 'Uma contadora só sua',
    description:
      'Nada de falar com uma pessoa diferente a cada vez. A Solange acompanha sua PJ de perto, conhece seu histórico e responde suas dúvidas rápido.',
  },
  {
    label: 'Planejamento',
    visual: <TaxVisual />,
    title: 'Menos imposto, sem surpresa',
    description:
      'Montamos uma estratégia fiscal pensada para a sua PJ, para você pagar só o imposto necessário e nunca levar susto no fim do mês.',
  },
  {
    label: 'Notas fiscais',
    visual: <InvoiceVisual />,
    title: 'Você avisa, a gente emite',
    description:
      'Esqueça portal de prefeitura e senha esquecida. Você manda os dados do cliente e recebe a nota fiscal pronta.',
  },
  {
    label: 'WhatsApp',
    visual: <WhatsAppVisual />,
    title: 'Tudo no seu WhatsApp',
    description:
      'Guias de imposto chegam prontas, com valor calculado, direto na conversa. Dúvidas também se resolvem por ali, onde você já está.',
  },
];

const Features: React.FC = () => {
  return (
    <section id="diferenciais" className="scroll-mt-24 overflow-x-clip py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Por que a Conte"
          title={
            <>
              Deixe a burocracia da sua PJ <span className="font-serif font-normal italic">com a gente.</span>
            </>
          }
        />

        <div className="space-y-20 md:space-y-32">
          {features.map((f, i) => {
            const reversed = i % 2 === 1;
            return (
              <div key={f.title} className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
                <motion.div
                  className={reversed ? 'md:order-2' : ''}
                  initial={{ opacity: 0, x: reversed ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-120px' }}
                  transition={{ duration: 0.8, ease }}
                >
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted">
                    <span className="font-serif text-xl italic text-ink/25">0{i + 1}</span>
                    {f.label}
                  </span>
                  <h3 className="mt-4 font-display text-3xl md:text-[44px] font-semibold leading-[1.05] tracking-[-0.035em] text-ink text-balance">
                    {f.title}
                  </h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted text-pretty">{f.description}</p>
                </motion.div>

                <motion.div
                  aria-hidden
                  className={`group ${reversed ? 'md:order-1' : ''}`}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-120px' }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
                  }}
                >
                  <div className="relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-[32px] bg-paper-deep transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]">
                    <div className="absolute inset-0 [background-image:radial-gradient(#0A0A0A12_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
                    <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-3xl transition-transform duration-700 ease-out group-hover:scale-125" />
                    <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.03]">
                      <div className="sm:scale-110 lg:scale-125">{f.visual}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
