import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { WHATSAPP_URL } from '../lib/links';
import { faqs } from '../data/faq';


const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="duvidas" className="scroll-mt-24 py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Dúvidas"
              title={
                <>
                  Perguntas <span className="font-serif font-normal italic">frequentes</span>
                </>
              }
              description="Não achou sua dúvida aqui?"
            />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="-mt-8 inline-flex items-center gap-2 font-semibold text-ink underline-offset-4 hover:underline"
            >
              Fale com a gente no WhatsApp →
            </a>
          </div>

          <Reveal className="divide-y divide-paper-line border-y border-paper-line">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg md:text-xl font-semibold tracking-[-0.01em] text-ink">{item.q}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                        isOpen ? 'rotate-45 border-ink bg-ink text-white' : 'border-paper-line text-ink'
                      }`}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 text-[17px] leading-relaxed text-ink-muted">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
