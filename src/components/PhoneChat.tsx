import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckCheck } from 'lucide-react';

type Message = { from: 'me' | 'her'; sender?: string } & (
  | { text: string }
  | { file: { name: string; meta: string } }
);

interface Scenario {
  messages: Message[];
}

const scenarios: Scenario[] = [
  {
    messages: [
      { from: 'me', text: 'Oi! Preciso emitir uma nota de R$ 8.000 para a Acme 🙏' },
      { from: 'her', text: 'Oi! Pode deixar, já emito e te mando aqui.' },
      { from: 'her', file: { name: 'Nota fiscal.pdf', meta: 'Emitida agora' } },
    ],
  },
  {
    messages: [
      { from: 'her', text: 'Oi! A guia de imposto deste mês já está pronta 👇' },
      { from: 'her', file: { name: 'Guia de imposto.pdf', meta: 'Valor já calculado' } },
      { from: 'me', text: 'Paguei! Valeu 🙌' },
    ],
  },
  {
    messages: [
      { from: 'me', text: 'Vale a pena aumentar meu pró-labore?' },
      { from: 'her', sender: 'Solange', text: 'Boa pergunta! Vou olhar os números da sua PJ e te mostro o cenário que paga menos imposto.' },
      { from: 'me', text: 'Perfeito, obrigado! 😊' },
    ],
  },
];

const STEP_MS = 1100;
const HOLD_MS = 3200;

const Bubble: React.FC<{ message: Message }> = ({ message }) => {
  const mine = message.from === 'me';
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${mine ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[15px] leading-snug text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.15)] ${
          mine ? 'rounded-tr-sm bg-[#D9FDD3]' : 'rounded-tl-sm bg-white'
        }`}
      >
        {message.sender && <p className="mb-0.5 text-[13px] font-semibold text-brand-dark">{message.sender}</p>}
        {'text' in message ? (
          <p>{message.text}</p>
        ) : (
          <div className="flex items-center gap-2.5 rounded-lg bg-black/[0.04] p-2 pr-4">
            <span className="flex h-9 w-8 items-center justify-center rounded-md bg-[#E5484D] text-[9px] font-bold text-white">
              PDF
            </span>
            <div>
              <p className="text-[13px] font-medium">{message.file.name}</p>
              <p className="text-[11px] text-ink-muted">{message.file.meta}</p>
            </div>
          </div>
        )}
        <p className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-ink-faint">
          09:41 {mine && <CheckCheck size={13} className="text-[#53BDEB]" />}
        </p>
      </div>
    </motion.div>
  );
};

const Typing: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="flex w-fit gap-1 rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.15)]"
  >
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-ink-faint"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </motion.div>
);

const PhoneChat: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(reduceMotion ? 3 : 0);

  const scenario = scenarios[active];
  const total = scenario.messages.length;

  useEffect(() => {
    if (reduceMotion) {
      setShown(total);
      return;
    }
    if (shown < total) {
      const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 500 : STEP_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setActive((a) => (a + 1) % scenarios.length);
      setShown(0);
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [shown, total, reduceMotion]);

  const next = scenario.messages[shown];
  const herTyping = !reduceMotion && shown > 0 && next?.from === 'her';

  return (
    <div aria-hidden className="relative isolate mx-auto w-full max-w-[420px]">
      <div className="pointer-events-none absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(37,211,102,0.18),rgba(37,211,102,0.06)_55%,transparent)] blur-2xl" />
      <div className="flex h-[300px] flex-col justify-end gap-3 sm:h-[360px]">
        <AnimatePresence initial={false}>
          {scenario.messages.slice(0, shown).map((m, i) => (
            <Bubble key={`${active}-${i}`} message={m} />
          ))}
          {herTyping && <Typing key={`typing-${active}-${shown}`} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PhoneChat;
